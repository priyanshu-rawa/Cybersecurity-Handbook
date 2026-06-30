---
title: TableOfContents
description: Generates and renders a table of contents from headings.
tags:
  - plugin/transformer
  - plugin/component
image: https://images.unsplash.com/photo-1768527338896-3765921e992d
repository: "[quartz-community/table-of-contents](https://github.com/quartz-community/table-of-contents)"
enabled: true
required: false
---

This plugin generates a table of contents (TOC) for Markdown documents. See [[table of contents]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `maxDepth`: Limits the depth of headings included in the TOC, ranging from `1` (top level headings only) to `6` (all heading levels). Default is `3`.
- `minEntries`: The minimum number of heading entries required for the TOC to be displayed. Default is `1`.
- `showByDefault`: If `true` (default), the TOC should be displayed by default. Can be overridden by frontmatter settings.
- `collapseByDefault`: If `true`, the TOC will start in a collapsed state. Default is `false`.
- `layout`: The visual layout of the TOC component. Can be `"modern"` or `"legacy"`. Default is `"modern"`.

> [!warning]
> This plugin needs the `Plugin.TableOfContents` component in `quartz.config.yaml` to determine where to display the TOC. Without it, nothing will be displayed. They should always be added or removed together.

## API

- Category: Transformer, Component
- Function name: `ExternalPlugin.TableOfContentsTransformer()`.
- Source: [`quartz-community/table-of-contents`](https://github.com/quartz-community/table-of-contents)
- Install: `npx quartz plugin add github:quartz-community/table-of-contents`
