---
title: Fonts
description: Fine-grained font control with per-heading support, Google Fonts integration, and theme font discovery.
tags:
  - plugin/transformer
  - plugin/emitter
image:
repository: "[quartz-community/fonts](https://github.com/quartz-community/fonts)"
enabled: true
required: false
---

This plugin provides fine-grained control over fonts in your Quartz site. It supports per-heading font families, automatic theme font discovery when used with [Quartz Themes](https://github.com/saberzero1/quartz-themes), Google Fonts integration with automatic weight and italic loading, and falls back to Obsidian's default system font stacks.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Why use Fonts?

Quartz uses three CSS variables for fonts: `--headerFont`, `--bodyFont`, and `--codeFont`. Obsidian themes use a different system with per-heading variables (`--h1-font` through `--h6-font`), `--font-text`, and `--font-monospace`. These two systems don't bridge correctly, causing heading fonts to not render as themes intend.

Fonts solves this by:

1. Bridging the Obsidian and Quartz font systems
2. Emitting **unlayered** CSS that correctly overrides Quartz's base heading styles
3. Providing per-heading font control that neither system offers alone
4. Optionally loading fonts from Google Fonts with fine-grained weight and italic control

## Configuration

Font options accept either a CSS font-family string or an object with Google Fonts loading control:

```yaml
# String form
body: '"Inter", sans-serif'

# Object form (for Google Fonts weight/italic control)
body:
  name: Inter
  weights: [400, 600, 700]
  includeItalic: true
```

This plugin accepts the following configuration options:

| Option          | Type                | Default          | Description                                                                                                            |
| --------------- | ------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `title`         | `FontSpecification` | `header` value   | Font family for the site title.                                                                                        |
| `body`          | `FontSpecification` | Obsidian default | Font family for body text.                                                                                             |
| `header`        | `FontSpecification` | Obsidian default | Default font family for all headings (h1-h6).                                                                          |
| `code`          | `FontSpecification` | Obsidian default | Font family for code and monospace elements.                                                                           |
| `interface`     | `FontSpecification` | Obsidian default | Font family for UI elements.                                                                                           |
| `h1` – `h6`     | `FontSpecification` | `header` value   | Per-heading font family overrides.                                                                                     |
| `useThemeFonts` | `boolean`           | `true`           | Use fonts from [Quartz Themes](https://github.com/saberzero1/quartz-themes) as defaults when it is installed.          |
| `fontOrigin`    | `string`            | `"googleFonts"`  | `"googleFonts"` to load from Google Fonts CDN, `"selfHosted"` to download and serve locally, `"local"` for no loading. |

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/fonts
  enabled: true
  options:
    useThemeFonts: true
    fontOrigin: googleFonts
```

### Font resolution

Fonts are resolved using a priority chain:

```
User config (plugin options)
  → Theme fonts (from Quartz Themes, if installed)
    → Obsidian defaults (system font stacks)
```

For individual headings:

```
h1 option → header option → theme --h1-font → theme font → Obsidian default
```

For the site title:

```
title option → header option → theme font → Obsidian default
```

## Usage with Quartz Themes

When [Quartz Themes](https://github.com/saberzero1/quartz-themes) is installed and enabled, Fonts automatically discovers the theme's font metadata and uses it as defaults. Any options you explicitly set in Fonts will override the theme fonts.

Fonts must run **after** Quartz Themes. This is handled automatically by plugin ordering (Quartz Themes = 10, Fonts = 60).

> [!warning]
> If Quartz Themes is enabled but hasn't run yet when Fonts executes, you'll see a warning in the console. Make sure Quartz Themes has a lower `defaultOrder` than Fonts.

## Usage without Quartz Themes

Fonts works standalone. Without a theme, it falls back to Obsidian's default system font stacks. You can set fonts explicitly via the plugin options.

## Examples

```yaml title="quartz.config.yaml"
# Use theme fonts automatically (default behavior)
- source: github:quartz-community/fonts
  enabled: true

# Override just the heading font
- source: github:quartz-community/fonts
  enabled: true
  options:
    header: '"Playfair Display", serif'

# Full control with per-heading fonts
- source: github:quartz-community/fonts
  enabled: true
  options:
    body: '"Inter", sans-serif'
    header: '"Playfair Display", serif'
    code: '"JetBrains Mono", monospace'
    h1: '"Playfair Display", serif'
    h2: '"Lora", serif'

# Load from Google Fonts automatically
- source: github:quartz-community/fonts
  enabled: true
  options:
    fontOrigin: googleFonts
    body: Inter
    header: Playfair Display
    code: JetBrains Mono

# Google Fonts with weight/italic control
- source: github:quartz-community/fonts
  enabled: true
  options:
    fontOrigin: googleFonts
    body:
      name: Inter
      weights: [400, 600, 700]
      includeItalic: true
    header:
      name: Playfair Display
      weights: [400, 700]
    code:
      name: JetBrains Mono
      weights: [400]

# Custom title font (separate from header)
- source: github:quartz-community/fonts
  enabled: true
  options:
    fontOrigin: googleFonts
    title: Abril Fatface
    header: Playfair Display
    body: Inter
    code: JetBrains Mono

# Self-hosted fonts (downloaded at build time, no external requests)
- source: github:quartz-community/fonts
  enabled: true
  options:
    fontOrigin: selfHosted
    body: Inter
    header: Playfair Display
    code: JetBrains Mono

# Ignore theme fonts entirely
- source: github:quartz-community/fonts
  enabled: true
  options:
    useThemeFonts: false
    body: '"Inter", sans-serif'
```

## Self-Hosted Fonts

When `fontOrigin: selfHosted` is set, Fonts downloads fonts from Google Fonts during the build and serves them from your site's `static/fonts/` directory. This makes your site fully self-contained with no external requests to Google at runtime.

At build time, the plugin:

1. Fetches the Google Fonts CSS for your configured fonts
2. Downloads each font file (`.woff2`, `.woff`, etc.)
3. Writes the font files to `static/fonts/` in your build output
4. Generates a `quartz-fonts.css` file with `@font-face` rules pointing to the local files

> [!note]
> Self-hosted fonts require `baseUrl` to be set in your Quartz configuration, since font URLs in the CSS need an absolute path.

```yaml title="quartz.config.yaml"
configuration:
  baseUrl: "example.com"

plugins:
  - source: github:quartz-community/fonts
    enabled: true
    options:
      fontOrigin: selfHosted
      body: Inter
      header: Playfair Display
      code: JetBrains Mono
```

## Google Fonts Validation

When `fontOrigin: googleFonts` is set and the optional [`google-font-metadata`](https://www.npmjs.com/package/google-font-metadata) package is installed, Fonts validates your font configuration at build time:

- Checks that font family names exist in Google Fonts.
- Warns if requested weights are not available for a font.
- Warns if italic is requested but the font doesn't support it.

Install it to enable validation:

```bash
npm install google-font-metadata
```

Validation warnings are logged to the console but do not block the build.

## API

- Category: Transformer, Emitter
- Function name: `ExternalPlugin.Fonts()` (transformer), `ExternalPlugin.FontsEmitter()` (emitter).
- Source: [`quartz-community/fonts`](https://github.com/quartz-community/fonts)
- Install: `npx quartz plugin add github:quartz-community/fonts`
