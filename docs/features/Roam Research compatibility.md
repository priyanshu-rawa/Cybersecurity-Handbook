---
title: "Roam Research Compatibility"
tags:
  - feature/transformer
---

[Roam Research](https://roamresearch.com) is a note-taking tool that organizes your knowledge graph in a unique and interconnected way.

Quartz supports transforming the special Markdown syntax from Roam Research (like `{{[[components]]}}` and other formatting) into
regular Markdown via the [[RoamFlavoredMarkdown]] plugin.

```yaml title="quartz.config.yaml"
plugins:
  - source: github:quartz-community/roam
    enabled: true
    order: 25 # must come before obsidian-flavored-markdown
  - source: github:quartz-community/obsidian-flavored-markdown
    enabled: true
    order: 30
```

For the TS override approach, place overrides before `loadQuartzConfig()` in `quartz.ts`:

```ts title="quartz.ts (override)"
import * as ExternalPlugin from "./.quartz/plugins"

ExternalPlugin.RoamFlavoredMarkdown()
```

> [!warning]
> In YAML, plugin execution order is controlled by the `order` field. Ensure `roam` has a lower `order` value than `obsidian-flavored-markdown` so it runs first.

## Customization

This functionality is provided by the [[RoamFlavoredMarkdown]] plugin. See the plugin page for customization options.
