---
title: ContentIndex
description: Generates sitemap, RSS feed, and content index.
tags:
  - plugin/emitter
image:
repository: "[quartz-community/content-index](https://github.com/quartz-community/content-index)"
enabled: true
required: false
---

This plugin emits both RSS and an XML sitemap for your site. The [[RSS Feed]] allows users to subscribe to content on your site and the sitemap allows search engines to better index your site. The plugin also emits a `contentIndex.json` file which is used by dynamic frontend components like search and graph.

This plugin emits a comprehensive index of the site's content, generating additional resources such as a sitemap, an RSS feed, and a

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

This plugin accepts the following configuration options:

- `enableSiteMap`: If `true` (default), generates a sitemap XML file (`sitemap.xml`) listing all site URLs for search engines in content discovery.
- `enableRSS`: If `true` (default), produces an RSS feed (`index.xml`) with recent content updates.
- `rssLimit`: Defines the maximum number of entries to include in the RSS feed, helping to focus on the most recent or relevant content. Defaults to `10`.
- `rssFullHtml`: If `true`, the RSS feed includes the full rendered HTML content of each page. Defaults to `false`.
- `rssSlug`: Slug to the generated RSS feed XML file. Defaults to `"index"`.
- `includeEmptyFiles`: If `true` (default), content files with no body text are included in the generated index and resources.

## API

- Category: Emitter
- Function name: `ExternalPlugin.ContentIndex()`.
- Source: [`quartz-community/content-index`](https://github.com/quartz-community/content-index)
- Install: `npx quartz plugin add github:quartz-community/content-index`
