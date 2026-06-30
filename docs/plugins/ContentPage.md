---
title: ContentPage
description: Generates HTML pages for Markdown content.
tags:
  - plugin/pageType
image:
repository: "[quartz-community/content-page](https://github.com/quartz-community/content-page)"
enabled: true
required: false
---

This plugin is a page type plugin for the Quartz framework. It generates the HTML pages for each piece of Markdown content. It emits the full-page [[layout]], including headers, footers, and body content, among others. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars). It is now configured in the `pageTypes` section of `quartz.config.yaml`.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin has no configuration options.

## API

- Category: Page Type
- Function name: `ExternalPlugin.ContentPage()`.
- Source: [`quartz-community/content-page`](https://github.com/quartz-community/content-page)
- Install: `npx quartz plugin add github:quartz-community/content-page`
