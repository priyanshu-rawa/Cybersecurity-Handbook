---
title: TagPage
description: Generates listing pages for tags.
tags:
  - plugin/pageType
image:
repository: "[quartz-community/tag-page](https://github.com/quartz-community/tag-page)"
enabled: true
required: false
---

This plugin is a page type plugin that emits dedicated pages for each tag used in the content. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars). See [[folder and tag listings]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `numPages`: The maximum number of pages to display per tag before showing a "see more" link. Defaults to `10`.
- `sort`: A function of type `(f1: QuartzPluginData, f2: QuartzPluginData) => number{:ts}` used to sort entries. Defaults to sorting by date and tie-breaking on lexographical order. Requires a TS override.
- `prefixTags`: If `true`, generated tag page titles are prefixed with "Tag: " (e.g. "Tag: recipes"). Defaults to `false`.

## API

- Category: Page Type
- Function name: `ExternalPlugin.TagPage()`.
- Source: [`quartz-community/tag-page`](https://github.com/quartz-community/tag-page)
- Install: `npx quartz plugin add github:quartz-community/tag-page`
