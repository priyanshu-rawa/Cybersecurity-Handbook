---
title: quartz sync
---

The `sync` command automates the process of pushing your local changes to GitHub and pulling updates from your remote repository. It simplifies the Git workflow for users who want to keep their site updated without running manual Git commands.

## Flags

| Flag          | Shorthand | Description                          | Default           |
| ------------- | --------- | ------------------------------------ | ----------------- |
| `--directory` | `-d`      | The directory of your Quartz project | Current directory |
| `--verbose`   | `-v`      | Enable detailed logging              | `false`           |
| `--commit`    |           | Whether to commit changes            | `true`            |
| `--no-commit` |           | Skip committing changes              | `false`           |
| `--message`   | `-m`      | Custom commit message                | `update content`  |
| `--push`      |           | Whether to push changes to remote    | `true`            |
| `--no-push`   |           | Skip pushing changes                 | `false`           |
| `--pull`      |           | Whether to pull changes from remote  | `true`            |
| `--no-pull`   |           | Skip pulling changes                 | `false`           |

## Workflow

When you run `npx quartz sync`, Quartz performs the following steps:

1. **Pull**: It fetches and merges changes from your remote GitHub repository.
2. **Add**: It stages all new and modified files in your project.
3. **Commit**: It creates a new commit with your changes.
4. **Push**: It sends your new commit to GitHub.

## Common Workflows

### Regular Sync

The most common usage is to simply run the command with no flags. This pulls, commits, and pushes everything.

```shell
npx quartz sync
```

### First Sync

If you have just set up a new repository and haven't pushed anything yet, you might want to skip the pull step.

```shell
npx quartz sync --no-pull
```

### Custom Commit Message

You can provide a more descriptive message for your changes.

```shell
npx quartz sync --message "add new notes about gardening"
```

### Sync from Another Device

If you are working on a different computer and just want to get the latest changes without pushing anything back yet.

```shell
npx quartz sync --no-push --no-commit
```

## Troubleshooting

### Git Buffer

If you have a very large number of changes, Git might occasionally fail due to buffer limits. If this happens, try syncing smaller batches of files or increasing your Git post buffer size.

### Autostash

Quartz uses `git pull --rebase --autostash` internally. This means if you have unstaged changes when you run `sync`, Quartz will temporarily hide them, pull the remote changes, and then bring your changes back. If a conflict occurs during this process, you will need to resolve it manually using standard Git tools.

For more information on initial setup, see [[installation]].
