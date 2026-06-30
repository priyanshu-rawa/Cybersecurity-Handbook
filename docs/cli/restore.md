---
title: quartz restore
---

The `restore` command is a safety mechanism that allows you to recover your **content folder** from a local cache. This command only affects your Markdown files and does not restore plugins or configuration.

To restore plugins to a specific state, use [[cli/plugin|npx quartz plugin install]].

## When to Use

You should use `restore` if:

- A `quartz upgrade` failed and corrupted your content.
- You accidentally deleted files in your content folder.
- You encountered complex merge conflicts that you want to undo.

## How it Works

Quartz maintains a hidden cache of your content folder. Every time you run certain commands, Quartz ensures that a backup of your Markdown files exists. The `restore` command simply copies these files back into your main content directory.

```shell
npx quartz restore
```

## Example Workflow

If an update fails and leaves your project in a broken state:

1. **Restore**: Run `npx quartz restore` to bring back your content.
2. **Clean**: Use Git to reset any other broken code files.
3. **Retry**: Attempt the update again or manually apply the changes you need.
