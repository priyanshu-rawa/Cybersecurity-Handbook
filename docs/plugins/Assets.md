---
title: Assets
tags:
  - plugin/emitter
image: https://images.unsplash.com/photo-1526304640581-d334cdbbf45e
---

This plugin emits all non-Markdown static assets in your content folder (like images, videos, HTML, etc). The plugin respects the `ignorePatterns` in the global [[configuration]].

Note that all static assets will then be accessible through its path on your generated site, i.e: `host.me/path/to/static.pdf`

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Emitter
- Function name: `Plugin.Assets()` (internal plugin).
- Source: [`quartz/plugins/emitters/assets.ts`](https://github.com/jackyzha0/quartz/blob/v5/quartz/plugins/emitters/assets.ts).
