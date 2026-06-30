---
title: quartz tui
---

The `tui` command launches an interactive terminal user interface for managing your Quartz project. It provides a visual way to manage plugins, arrange your site layout, and edit general settings.

## Prerequisites

To use the TUI, you must have the following:

1. **Bun**: The TUI requires the Bun runtime. You can find installation instructions at [bun.sh](https://bun.sh/docs/installation).
2. **TUI Plugin**: You must install the TUI plugin in your Quartz project.

### Installation

Run the following command to add the TUI plugin:

```shell
npx quartz plugin add github:quartz-community/tui
```

## Interface Panels

The TUI is divided into three main panels that you can navigate between.

### Plugins Panel

This panel allows you to browse all available and installed plugins. You can:

- Enable or disable plugins with a single keystroke.
- Configure plugin-specific settings.
- Install new plugins from the community or remove existing ones.

### Layout Panel

The Layout panel is where you define where components appear on your site. You can:

- Move components between different sections (e.g. `left`, `right`, `beforeBody`).
- Reorder components within a section to change their vertical stack.
- Set priorities for components to control their placement.

### Settings Panel

This panel provides a central place to edit your `quartz.config.yaml` settings. You can update:

- `pageTitle`
- Theme colors and fonts
- Analytics configuration
- Deployment settings

## Navigation

The TUI uses standard terminal navigation keys:

- **Arrow Keys**: Move between items and panels.
- **Enter**: Select an item or confirm a change.
- **Esc**: Go back or cancel an action.
- **Tab**: Cycle through different interface elements.

## Important Note

All changes made within the TUI are written directly to your `quartz.config.yaml` file. It is a good practice to have a clean Git state before using the TUI so you can easily review and undo any changes it makes.

For command-line based plugin management, see [[cli/plugin|quartz plugin]].
