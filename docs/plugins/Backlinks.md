---
title: Backlinks
description: Shows pages that link to the current page.
tags:
  - plugin/component
image:
repository: "[quartz-community/backlinks](https://github.com/quartz-community/backlinks)"
enabled: true
required: false
---

Shows pages that link to the current page.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[plugins/Backlinks]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `hideWhenEmpty`: Hide the backlinks section if the current page has no backlinks. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/backlinks
  enabled: true
  options:
    hideWhenEmpty: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.Backlinks()`.
- Source: [`quartz-community/backlinks`](https://github.com/quartz-community/backlinks)
- Install: `npx quartz plugin add github:quartz-community/backlinks`
