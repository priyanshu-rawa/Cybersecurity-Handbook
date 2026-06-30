---
title: HardLineBreaks
description: Treats single newlines as hard line breaks.
tags:
  - plugin/transformer
image: "#ff8000"
repository: "[quartz-community/hard-line-breaks](https://github.com/quartz-community/hard-line-breaks)"
enabled: false
required: false
---

This plugin automatically converts single line breaks in Markdown text into hard line breaks in the HTML output. This plugin is not enabled by default as this doesn't follow the semantics of actual Markdown but you may enable it if you'd like parity with [[Obsidian compatibility|Obsidian]].

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Transformer
- Function name: `ExternalPlugin.HardLineBreaks()`.
- Source: [`quartz-community/hard-line-breaks`](https://github.com/quartz-community/hard-line-breaks)
- Install: `npx quartz plugin add github:quartz-community/hard-line-breaks`
