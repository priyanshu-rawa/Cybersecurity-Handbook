---
title: GitHubFlavoredMarkdown
description: GitHub Flavored Markdown support (tables, task lists, footnotes, strikethrough).
tags:
  - plugin/transformer
image:
repository: "[quartz-community/github-flavored-markdown](https://github.com/quartz-community/github-flavored-markdown)"
enabled: true
required: false
---

This plugin enhances Markdown processing to support GitHub Flavored Markdown (GFM) which adds features like autolink literals, footnotes, strikethrough, tables and tasklists.

In addition, this plugin adds optional features for typographic refinement (such as converting straight quotes to curly quotes, dashes to en-dashes/em-dashes, and ellipses) and automatic heading links as a symbol that appears next to the heading on hover.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `enableSmartyPants`: When true, enables typographic enhancements. Default is true.
- `linkHeadings`: When true, automatically adds links to headings. Default is true.

## API

- Category: Transformer
- Function name: `ExternalPlugin.GitHubFlavoredMarkdown()`.
- Source: [`quartz-community/github-flavored-markdown`](https://github.com/quartz-community/github-flavored-markdown)
- Install: `npx quartz plugin add github:quartz-community/github-flavored-markdown`
