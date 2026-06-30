---
title: RemoveDrafts
description: Filters out pages marked as drafts.
tags:
  - plugin/filter
image:
repository: "[quartz-community/remove-draft](https://github.com/quartz-community/remove-draft)"
enabled: true
required: false
---

This plugin filters out content from your vault, so that only finalized content is made available. This prevents [[private pages]] from being published. By default, it filters out all pages with `draft: true` in the frontmatter and leaves all other pages intact.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Filter
- Function name: `ExternalPlugin.RemoveDrafts()`.
- Source: [`quartz-community/remove-draft`](https://github.com/quartz-community/remove-draft)
- Install: `npx quartz plugin add github:quartz-community/remove-draft`
