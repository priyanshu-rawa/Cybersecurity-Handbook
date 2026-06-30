---
title: Darkmode
description: Toggle between light and dark themes.
tags:
  - plugin/component
image: "#0052cc"
repository: "[quartz-community/darkmode](https://github.com/quartz-community/darkmode)"
enabled: true
required: false
---

Dark mode toggle.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[plugins/Darkmode]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `enabled`: Whether to enable the dark mode toggle. Defaults to `true`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/darkmode
  enabled: true
```

## API

- Category: Component
- Function name: `ExternalPlugin.Darkmode()`.
- Source: [`quartz-community/darkmode`](https://github.com/quartz-community/darkmode)
- Install: `npx quartz plugin add github:quartz-community/darkmode`
