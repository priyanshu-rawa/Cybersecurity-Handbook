---
title: FolderPage
description: Generates listing pages for folders.
tags:
  - plugin/pageType
image:
repository: "[quartz-community/folder-page](https://github.com/quartz-community/folder-page)"
enabled: true
required: false
---

This plugin is a page type plugin that generates index pages for folders, creating a listing page for each folder that contains multiple content files. It uses the `default` [[layout#Page Frames|page frame]] (three-column layout with sidebars). See [[folder and tag listings]] for more information.

Example: [[advanced/|Advanced]]

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `showFolderCount`: Whether to display the number of pages in the folder. Defaults to `true`.
- `showSubfolders`: Whether to include pages from subfolders in the listing. Defaults to `true`.
- `sort`: A function of type `(f1: QuartzPluginData, f2: QuartzPluginData) => number{:ts}` used to sort entries. Defaults to sorting by date and tie-breaking on lexographical order. Requires a TS override.
- `prefixFolders`: If `true`, generated folder page titles are prefixed with "Folder: " (e.g. "Folder: notes"). Defaults to `false`.

## API

- Category: Page Type
- Function name: `ExternalPlugin.FolderPage()`.
- Source: [`quartz-community/folder-page`](https://github.com/quartz-community/folder-page)
- Install: `npx quartz plugin add github:quartz-community/folder-page`
