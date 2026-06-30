---
title: Frontmatter
aliases:
  - note-properties
  - Note Properties
description: Parses frontmatter and displays note properties in a collapsible panel.
tags:
  - plugin/transformer
  - plugin/component
publish: true
enableToc: true
image:
repository: "[quartz-community/note-properties](https://github.com/quartz-community/note-properties)"
enabled: true
required: true
---

This plugin parses the frontmatter of the page using the [gray-matter](https://github.com/jonschlinkert/gray-matter) library and optionally displays selected properties in a collapsible panel. See [[authoring content#Syntax]], [[Obsidian compatibility]] and [[OxHugo compatibility]] for more information.

> [!note]
> For information on how to add, remove or configure plugins, see the [[configuration#Plugins|Configuration]] page.

> [!warning]
> This plugin must not be removed, otherwise Quartz will break.

## Configuration

This plugin accepts the following configuration options:

- `delimiters`: the delimiters to use for the frontmatter. Can have one value (e.g. `"---"`) or separate values for opening and closing delimiters (e.g. `["---", "~~~"]`). Defaults to `"---"`.
- `language`: the language to use for parsing the frontmatter. Can be `yaml` (default) or `toml`.
- `includeAll`: include all frontmatter properties in the properties panel. When `false`, only `includedProperties` are shown. Defaults to `false`.
- `includedProperties`: properties to include when `includeAll` is `false`. Defaults to `["description", "tags", "aliases"]`.
- `excludedProperties`: properties to always exclude from display, even when `includeAll` is `true`. Defaults to `[]`.
- `hidePropertiesView`: hide the visual properties panel while still processing frontmatter. Useful if you only need frontmatter parsing without the UI. Defaults to `false`.

### Default options

```yaml title="quartz.config.yaml"
- source: github:quartz-community/note-properties
  enabled: true
  options:
    includeAll: false
    includedProperties:
      - description
      - tags
      - aliases
    excludedProperties: []
    hidePropertiesView: false
    delimiters: "---"
    language: yaml
```

## Properties panel

When enabled, this plugin renders a collapsible "Properties" panel before the page body. The panel displays selected frontmatter fields in a table with automatic type rendering:

- **Strings** are shown as plain text. [[wikilinks]] and [markdown links](https://example.com) within strings are rendered as clickable links. Wikilink targets are slugified the same way as body-content links (e.g. `[[My Note]]` resolves to `my-note`) and matching is case-insensitive to mirror Obsidian's behavior, so `[[MyNote]]`, `[[mynote]]`, and `[[MYNOTE]]` all point to the same page.
- **Arrays** are rendered as comma-separated lists.
- **Booleans** are rendered as disabled checkboxes.
- **Numbers** are rendered in a monospace font.
- **Objects** are rendered as JSON in a code block.
- **Tags** get special treatment: they are rendered as highlighted links that point to the corresponding tag page.
- **Null/undefined** values are shown as an em-dash (—).

### Per-note overrides

You can control the properties panel on a per-note basis using frontmatter keys:

- `quartz-properties` (or `quartzProperties`): set to `true` to force-show the panel, or `false` to force-hide it, overriding the global `hidePropertiesView` setting.
- `quartz-properties-collapse` (or `quartzPropertiesCollapse`): set to `true` to start the panel collapsed, or `false` to start it expanded, overriding the default collapse state.

These keys are automatically excluded from the visible properties table.

```yaml title="Example frontmatter"
---
title: My Note
quartz-properties: true
quartz-properties-collapse: false
---
```

## Supported frontmatter

Quartz supports the following frontmatter fields. Where multiple keys are listed, they are aliases — the first matching key is used.

| Field              | Keys                                              | Description                                                                                                                                                                                                                        |
| ------------------ | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Title              | `title`                                           | Page title. Falls back to filename if empty.                                                                                                                                                                                       |
| Description        | `description`                                     | Page description for metadata and search.                                                                                                                                                                                          |
| Tags               | `tags`, `tag`                                     | Categorization tags. Slugified the same way as file paths: spaces become `-`, `&` becomes `-and-`, `%` becomes `-percent`, and tags are lowercased so that `#MyTag` and `#mytag` resolve to the same tag page (matching Obsidian). |
| Aliases            | `aliases`, `alias`                                | Alternative names for the page, used for link resolution.                                                                                                                                                                          |
| Permalink          | `permalink`                                       | Custom URL slug. Also added to aliases.                                                                                                                                                                                            |
| CSS classes        | `cssclasses`, `cssclass`                          | CSS classes applied to the page body.                                                                                                                                                                                              |
| Social image       | `socialImage`, `image`, `cover`                   | Image used for social media previews.                                                                                                                                                                                              |
| Social description | `socialDescription`                               | Description used specifically for social media previews.                                                                                                                                                                           |
| Created date       | `created`, `date`                                 | When the note was created.                                                                                                                                                                                                         |
| Modified date      | `modified`, `lastmod`, `updated`, `last-modified` | When the note was last modified. Falls back to `created` if unset.                                                                                                                                                                 |
| Published date     | `published`, `publishDate`, `date`                | When the note was published.                                                                                                                                                                                                       |
| Publish            | `publish`                                         | Whether the note should be published.                                                                                                                                                                                              |
| Draft              | `draft`                                           | Whether the note is a draft.                                                                                                                                                                                                       |
| Comments           | `comments`                                        | Whether comments are enabled for the note.                                                                                                                                                                                         |
| Language           | `lang`                                            | Language code for the note.                                                                                                                                                                                                        |
| Enable TOC         | `enableToc`                                       | Whether to show the table of contents.                                                                                                                                                                                             |

## API

- Category: Transformer, Component
- Function name: `ExternalPlugin.NoteProperties()`.
- Source: [`quartz-community/note-properties`](https://github.com/quartz-community/note-properties)
- Install: `npx quartz plugin add github:quartz-community/note-properties`
