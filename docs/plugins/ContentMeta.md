---
title: ContentMeta
description: Displays creation date and reading time.
tags:
  - plugin/component
image:
repository: "[quartz-community/content-meta](https://github.com/quartz-community/content-meta)"
enabled: true
required: false
---

This plugin displays content metadata below the article title, such as the creation date and estimated reading time.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

## Configuration

This plugin accepts the following configuration options:

- `showReadingTime`: Whether to display the estimated reading time. Defaults to `true`.
- `showComma`: Whether to display a comma between metadata items. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/content-meta
  enabled: true
  options:
    showReadingTime: true
    showComma: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.ContentMeta()`.
- Source: [`quartz-community/content-meta`](https://github.com/quartz-community/content-meta)
- Install: `npx quartz plugin add github:quartz-community/content-meta`
