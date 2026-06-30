---
title: Comments
description: Comment system integration (Giscus, Utterances, etc.).
tags:
  - plugin/component
image: "[[giscus-results.png]]"
repository: "[quartz-community/comments](https://github.com/quartz-community/comments)"
enabled: false
required: false
---

Comment system (giscus, utterances, etc.).

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

See [[plugins/Comments]] for detailed usage information.

## Configuration

This plugin accepts the following configuration options:

- `provider`: The comment provider to use. Currently only `giscus` is supported.
- `options`: Provider-specific options.
  - `repo`: The GitHub repository to use for comments.
  - `repoId`: The ID of the GitHub repository.
  - `category`: The discussion category to use.
  - `categoryId`: The ID of the discussion category.
  - `lang`: The language for the comment system. Defaults to `en`.
  - `themeUrl`: URL to a folder with custom themes.
  - `lightTheme`: Filename for the light theme CSS file. Defaults to `light`.
  - `darkTheme`: Filename for the dark theme CSS file. Defaults to `dark`.
  - `mapping`: How to map pages to discussions. Defaults to `url`.
  - `strict`: Use strict title matching. Defaults to `true`.
  - `reactionsEnabled`: Whether to enable reactions for the main post. Defaults to `true`.
  - `inputPosition`: Where to put the comment input box relative to the comments. Defaults to `bottom`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/comments
  enabled: true
  options:
    provider: giscus
    options:
      repo: jackyzha0/quartz
      repoId: MDEwOlJlcG9zaXRvcnkzODcyMTMyMDg
      category: Announcements
      categoryId: DIC_kwDOFxRnmM4B-Xg6
      lang: en
```

## API

- Category: Component
- Function name: `ExternalPlugin.Comments()`.
- Source: [`quartz-community/comments`](https://github.com/quartz-community/comments)
- Install: `npx quartz plugin add github:quartz-community/comments`
