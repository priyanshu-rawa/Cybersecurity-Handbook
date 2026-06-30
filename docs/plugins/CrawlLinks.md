---
title: CrawlLinks
description: Parses and resolves internal links. Removing it is not recommended.
tags:
  - plugin/transformer
image:
repository: "[quartz-community/crawl-links](https://github.com/quartz-community/crawl-links)"
enabled: true
required: true
---

This plugin parses links and processes them to point to the right places. It is also needed for embedded links (like images). See [[Obsidian compatibility]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `markdownLinkResolution`: Sets the strategy for resolving Markdown paths, can be `"absolute"` (default), `"relative"` or `"shortest"`. You should use the same setting here as in [[Obsidian compatibility|Obsidian]].
  - `absolute`: Path relative to the root of the content folder.
  - `relative`: Path relative to the file you are linking from.
  - `shortest`: Name of the file. If this isn't enough to identify the file, use the full absolute path.
- `prettyLinks`: If `true` (default), simplifies links by removing folder paths, making them more user friendly (e.g. `folder/deeply/nested/note` becomes `note`).
- `openLinksInNewTab`: If `true`, configures external links to open in a new tab. Defaults to `false`.
- `lazyLoad`: If `true`, adds lazy loading to resource elements (`img`, `video`, etc.) to improve page load performance. Defaults to `false`.
- `externalLinkIcon`: Adds an icon next to external links when `true` (default) to visually distinguishing them from internal links.
- `disableBrokenWikilinks`: If `true`, internal links whose resolved slug is not present in the site (i.e. no matching file under `markdownLinkResolution`) gain an additional `broken` CSS class alongside `internal`, so they can be styled distinctly. Defaults to `false`. Applies to both wikilinks and regular Markdown links, since both are indistinguishable `<a>` elements by the time this plugin runs.

> [!warning]
> Removing this plugin is _not_ recommended and will likely break the page.

## API

- Category: Transformer
- Function name: `ExternalPlugin.CrawlLinks()`.
- Source: [`quartz-community/crawl-links`](https://github.com/quartz-community/crawl-links)
- Install: `npx quartz plugin add github:quartz-community/crawl-links`
