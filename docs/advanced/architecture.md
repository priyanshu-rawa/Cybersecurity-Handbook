---
title: Architecture
---

Quartz is a static site generator. How does it work?

This question is best answered by tracing what happens when a user (you!) runs `npx quartz build` in the command line:

## On the server

1. After running `npx quartz build`, npm will look at `package.json` to find the `bin` entry for `quartz` which points at `./quartz/bootstrap-cli.mjs`.
2. This file has a [shebang](<https://en.wikipedia.org/wiki/Shebang_(Unix)>) line at the top which tells npm to execute it using Node.
3. `bootstrap-cli.mjs` is responsible for a few things:
   1. Parsing the command-line arguments using [yargs](http://yargs.js.org/). The `plugin` subcommand is also handled here for managing external plugins.
   2. Transpiling and bundling the rest of Quartz (which is in Typescript) to regular JavaScript using [esbuild](https://esbuild.github.io/). The `esbuild` configuration here is slightly special as it also handles `.scss` file imports using [esbuild-sass-plugin v2](https://www.npmjs.com/package/esbuild-sass-plugin). Additionally, we bundle 'inline' client-side scripts (any `.inline.ts` file) that components declare using a custom `esbuild` plugin that runs another instance of `esbuild` which bundles for the browser instead of `node`. Modules of both types are imported as plain text.
   3. Running the local preview server if `--serve` is set. This starts two servers:
      1. A WebSocket server on port 3001 to handle hot-reload signals. This tracks all inbound connections and sends a 'rebuild' message a server-side change is detected (either content or configuration).
      2. An HTTP file-server on a user defined port (normally 8080) to serve the actual website files.
   4. If the `--serve` flag is set, it also starts a file watcher to detect source-code changes (e.g. anything that is `.ts`, `.tsx`, `.scss`, or packager files). On a change, we rebuild the module (step 2 above) using esbuild's [rebuild API](https://esbuild.github.io/api/#rebuild) which drastically reduces the build times.
   5. After transpiling the main Quartz build module (`quartz/build.ts`), we write it to a cache file `.quartz-cache/transpiled-build.mjs` and then dynamically import this using `await import(cacheFile)`. However, we need to be pretty smart about how to bust Node's [import cache](https://github.com/nodejs/modules/issues/307) so we add a random query string to fake Node into thinking it's a new module. This does, however, cause memory leaks so we just hope that the user doesn't hot-reload their configuration too many times in a single session :)) (it leaks about ~350kB memory on each reload). After importing the module, we then invoke it, passing in the command line arguments we parsed earlier along with a callback function to signal the client to refresh.
4. In `build.ts`, we start by installing source map support manually to account for the query string cache busting hack we introduced earlier. Then, we start processing content:
   1. Clean the output directory.
   2. Recursively glob all files in the `content` folder, respecting the `.gitignore`.
   3. Parse the Markdown files.
      1. Quartz detects the number of threads available and chooses to spawn worker threads if there are >128 pieces of content to parse (rough heuristic). If it needs to spawn workers, it will invoke esbuild again to transpile the worker script `quartz/worker.ts`. Then, a work-stealing [workerpool](https://www.npmjs.com/package/workerpool) is then created and batches of 128 files are assigned to workers.
      2. Each worker (or just the main thread if there is no concurrency) creates a [unified](https://github.com/unifiedjs/unified) parser based off of the plugins defined in the [[configuration]].
      3. Parsing has three steps:
         1. Read the file into a [vfile](https://github.com/vfile/vfile).
         2. Applied plugin-defined text transformations over the content.
         3. Slugify the file path and store it in the data for the file. See the page on [[paths]] for more details about how path logic works in Quartz (spoiler: its complicated).
         4. Markdown parsing using [remark-parse](https://www.npmjs.com/package/remark-parse) (text to [mdast](https://github.com/syntax-tree/mdast)).
         5. Apply plugin-defined Markdown-to-Markdown transformations.
         6. Convert Markdown into HTML using [remark-rehype](https://github.com/remarkjs/remark-rehype) ([mdast](https://github.com/syntax-tree/mdast) to [hast](https://github.com/syntax-tree/hast)).
         7. Apply plugin-defined HTML-to-HTML transformations.
   4. Filter out unwanted content using plugins.
   5. Emit files using plugins.
      1. Gather all the static resources (e.g. external CSS, JS modules, etc.) each emitter plugin declares.
      2. Emitters that emit HTML files do a bit of extra work here as they need to transform the [hast](https://github.com/syntax-tree/hast) produced in the parse step to JSX. This is done using [hast-util-to-jsx-runtime](https://github.com/syntax-tree/hast-util-to-jsx-runtime) with the [Preact](https://preactjs.com/) runtime. Finally, the JSX is rendered to HTML using [preact-render-to-string](https://github.com/preactjs/preact-render-to-string) which statically renders the JSX to HTML (i.e. doesn't care about `useState`, `useEffect`, or any other React/Preact interactive bits). Here, we also do a bunch of fun stuff like assemble the page [[layout]] from `quartz.config.yaml`, assemble all the inline scripts that actually get shipped to the client, and all the transpiled styles. The bulk of this logic can be found in `quartz/components/renderPage.tsx`. Other fun things of note:
         1. CSS is minified and transformed using [Lightning CSS](https://github.com/parcel-bundler/lightningcss) to add vendor prefixes and do syntax lowering.
         2. Scripts are split into `beforeDOMLoaded` and `afterDOMLoaded` and are inserted in the `<head>` and `<body>` respectively.
      3. Finally, each emitter plugin is responsible for emitting and writing it's own emitted files to disk.
   6. If the `--serve` flag was detected, we also set up another file watcher to detect content changes (only `.md` files). We keep a content map that tracks the parsed AST and plugin data for each slug and update this on file changes. Newly added or modified paths are rebuilt and added to the content map. Then, all the filters and emitters are run over the resulting content map. This file watcher is debounced with a threshold of 250ms. On success, we send a client refresh signal using the passed in callback function.

## On the client

1. The browser opens a Quartz page and loads the HTML. The `<head>` also links to page styles (emitted to `public/index.css`) and page-critical JS (emitted to `public/prescript.js`)
2. Then, once the body is loaded, the browser loads the non-critical JS (emitted to `public/postscript.js`)
3. Once the page is done loading, the page will then dispatch a custom synthetic browser event `"nav"`. This is used so client-side scripts declared by components can 'setup' anything that requires access to the page DOM.
   1. If the [[SPA Routing|enableSPA option]] is enabled in the [[configuration]], this `"nav"` event is also fired on any client-navigation to allow for components to unregister and reregister any event handlers and state.
   2. If it's not, we wire up the `"nav"` event to just be fired a single time after page load to allow for consistency across how state is setup across both SPA and non-SPA contexts.
   3. A separate `"render"` event can be dispatched when the DOM is updated in-place without a full navigation (e.g. after content decryption). Components that attach listeners to content elements should listen for both `"nav"` and `"render"`.

## Community Package Layering

Quartz v5 separates shared code into three community packages, each with a distinct responsibility:

- **`@quartz-community/types`** — Type definitions, interfaces, and the canonical `vfile` DataMap augmentation. This is the "contract" between Quartz and plugins. It has no runtime dependencies.
- **`@quartz-community/utils`** — Shared utility functions (path manipulation, DOM helpers, sorting, date formatting, JSX conversion, etc.). Depends on `@quartz-community/types`.
- **`@quartz-community/runtime`** — Browser-only utilities for client-side scripts (event handling, navigation, storage, script loading). Depends on both `types` and `utils`.

```
types (no deps)
  ↑
utils (depends on types)
  ↑
runtime (depends on types + utils)
  ↑
plugins (depend on any combination)
```

Plugins should import types from `@quartz-community/types`, utility functions from `@quartz-community/utils`, and browser utilities from `@quartz-community/runtime`. This layering ensures plugins don't depend on Quartz core.

## Plugin System

Page types define how a category of pages is rendered. They are configured in the `pageTypes` array in `quartz.config.yaml`.

Quartz v5 introduces a community plugin system. Plugins are standalone Git repositories that are cloned into `.quartz/plugins/` and re-exported through an auto-generated index file at `.quartz/plugins/index.ts`.

### Plugin Types

There are now four plugin categories:

- **Transformers**: Map over content (parse frontmatter, generate descriptions, syntax highlighting)
- **Filters**: Filter content (remove drafts, explicit publish)
- **Emitters**: Reduce over content (generate RSS, sitemaps, alias redirects, OG images)
- **Page Types**: Define how pages are rendered. Each page type handles a specific kind of page (content notes, folder listings, tag listings, 404). The `PageTypeDispatcher` emitter routes pages to the appropriate page type plugin based on the content.
- **Bases Views**: Custom view renderers for the `bases-page` plugin's database-like view system. Plugins can register new view types (e.g., timeline, kanban) via the `ViewRegistry`. See [[making plugins#Bases Views]] for details.

Note that plugin types are **not mutually exclusive** — a single plugin can be a transformer AND provide components (e.g., `obsidian-flavored-markdown`), or be a page type AND provide custom frames (e.g., `canvas-page`).

### Plugin Resolution

When `npx quartz plugin add github:quartz-community/explorer` is run:

1. The repository is cloned into `.quartz/plugins/explorer/`
2. The plugin is built using `tsup` (defined in each plugin's `tsup.config.ts`)
3. An auto-generated `.quartz/plugins/index.ts` re-exports all installed plugins
4. The plugin's commit hash is recorded in `quartz.lock.json`

### Plugin CLI Commands

- `npx quartz plugin add github:quartz-community/<name>` — Install a community plugin
- `npx quartz plugin install --latest` — Update all plugins to latest commits
- `npx quartz plugin install --clean` — Restore plugins from locked commits in `quartz.lock.json` (used in CI/CD)
- `npx quartz plugin remove <name>` — Remove an installed plugin

### Plugin Structure

Each community plugin repository contains:

- `src/index.ts` — Plugin entry point exporting the plugin function
- `tsup.config.ts` — Build configuration using tsup
- `package.json` — Declares dependencies on `@quartz-community/types` and `@quartz-community/utils`

The architecture and design of the plugin system was intentionally left pretty vague here as this is described in much more depth in the guide on [[making plugins|creating plugins]].

## Page Frames

Page frames control the inner HTML structure of each page. While the outer shell (`<html>`, `<head>`, `<body>`, `#quartz-root`) is always the same (required for [[SPA Routing]]), the frame determines how layout slots are arranged inside the page.

The frame system lives in `quartz/components/frames/` and consists of:

- `types.ts` — Defines the `PageFrame` and `PageFrameProps` interfaces
- `DefaultFrame.tsx` — Three-column layout (left sidebar, center, right sidebar, footer)
- `FullWidthFrame.tsx` — No sidebars, single center column
- `MinimalFrame.tsx` — No sidebars, no header/beforeBody, just content and footer
- `registry.ts` — `FrameRegistry` singleton for plugin-registered frames
- `index.ts` — `resolveFrame()` function and built-in frame registry

### Frame Registry

The `FrameRegistry` (`quartz/components/frames/registry.ts`) is a singleton that stores frames registered by community plugins. It mirrors the design of the `ComponentRegistry`. Plugins declare frames in their `package.json` manifest under the `"quartz"."frames"` field, and these are loaded by `quartz/plugins/loader/frameLoader.ts` during plugin initialization.

### Frame Resolution

The rendering pipeline in `quartz/components/renderPage.tsx` delegates to the resolved frame's `render()` function. Frame resolution happens in the `PageTypeDispatcher` emitter (`quartz/plugins/pageTypes/dispatcher.ts`) using this priority:

1. YAML config: `layout.byPageType.<name>.template`
2. Plugin-registered frame: looked up by name in the `FrameRegistry`
3. Built-in frame: looked up by name in the `builtinFrames` map
4. Fallback: `"default"`

The active frame name is set as a `data-frame` attribute on the `.page` element, enabling frame-specific CSS overrides in `quartz/styles/base.scss`.

### Plugin-Provided Frames

Community plugins can ship their own frames by exporting them from a `./frames` subpath and declaring them in the plugin manifest. For example, the `canvas-page` plugin provides a `"canvas"` frame with a fullscreen layout and togglable sidebar. See [[making plugins#Providing Custom Frames]] for implementation details.

See [[layout#Page Frames]] for user-facing documentation and [[making plugins#Page Types]] for how to set frames in page type plugins.
