---
title: "Upgrading Quartz"
aliases:
  - upgrading
---

> [!note]
> This is specifically a guide for upgrading your Quartz to a more recent update. If you are coming from Quartz 4 or Quartz 3, check out the [[migrating|migration guide]] for more info.

To fetch the latest Quartz updates, simply run

```bash
npx quartz upgrade
```

As Quartz uses [git](https://git-scm.com/) under the hood for versioning, upgrading effectively 'pulls' in the updates from the official Quartz GitHub repository. Merge conflicts in `quartz.lock.json` are handled automatically — Quartz backs up your lockfile before pulling and restores it afterward. For other files with local changes that conflict with the updates, you may need to resolve these manually yourself (or, pull manually using `git pull origin upstream`).

> [!hint]
> Quartz will try to cache your content before upgrading to try and prevent merge conflicts. If you get a conflict mid-merge, you can stop the merge and then run `npx quartz restore` to restore your content from the cache.

If you have the [GitHub desktop app](https://desktop.github.com/), this will automatically open to help you resolve the conflicts. Otherwise, you will need to resolve this in a text editor like VSCode. For more help on resolving conflicts manually, check out the [GitHub guide on resolving merge conflicts](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/resolving-a-merge-conflict-using-the-command-line#competing-line-change-merge-conflicts).

To update your installed plugins separately, use:

```bash
npx quartz plugin install --latest
```

See the [[upgrade|CLI reference for upgrade]] for more details on available flags.

### Cleaning Up Unused Plugins

If you've removed plugins from your configuration during an upgrade, you can clean up the leftover files:

```bash
npx quartz plugin prune --dry-run  # preview what would be removed
npx quartz plugin prune            # remove orphaned plugins
```

See the [[cli/plugin#prune|plugin prune reference]] for more details.
