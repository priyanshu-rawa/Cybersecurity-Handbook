---
title: quartz build
aliases:
  - build
---

The `build` command transforms your Markdown content into a static HTML website. It processes your files through the configured plugins and outputs the final site to a directory of your choice.

## Flags

| Flag              | Shorthand | Description                                               | Default           |
| ----------------- | --------- | --------------------------------------------------------- | ----------------- |
| `--directory`     | `-d`      | The directory containing your Quartz project              | Current directory |
| `--verbose`       | `-v`      | Enable detailed logging for debugging                     | `false`           |
| `--output`        | `-o`      | The directory where the built site will be saved          | `public`          |
| `--serve`         |           | Start a local development server                          | `false`           |
| `--watch`         |           | Rebuild the site when files change                        | `false`           |
| `--port`          |           | The port for the development server                       | `8080`            |
| `--wsPort`        |           | The port for the WebSocket hot-reload server              | `3001`            |
| `--baseDir`       |           | Set a base directory for the site (e.g. for GitHub Pages) | `/`               |
| `--remoteDevHost` |           | The hostname to use for the development server            | `localhost`       |
| `--bundleInfo`    |           | Output a JSON file with bundle size information           | `false`           |
| `--concurrency`   | `-c`      | Number of worker threads to use for building              | CPU core count    |

## Examples

### Basic Build

Generate your site into the `public` folder.

```shell
npx quartz build
```

### Development Mode

Start a local server and watch for changes. This is the most common way to preview your site while writing.

```shell
npx quartz build --serve
```

### Custom Output and Port

Build to a specific folder and run the server on a different port.

```shell
npx quartz build --serve --output dist --port 3000
```

### Performance Tuning

If you have a very large vault, you can limit the number of concurrent workers to save memory.

```shell
npx quartz build --concurrency 2
```

## Serve vs Watch

The `--serve` and `--watch` flags control different behaviors:

- **`--serve`** starts a local development server AND automatically watches for changes (implies `--watch`). This is the recommended mode for local development.
- **`--watch`** only watches for file changes and rebuilds automatically, without starting a server. This is useful for CI pipelines or custom server setups where you want automatic rebuilds but handle serving separately.

In most cases, you want `--serve`:

```shell
npx quartz build --serve
```

## Development Server

The `--serve` flag starts a local web server. This server is intended for development and previewing only. It is not designed for production use. For information on how to deploy your site, see [[hosting]].

### Hot Reloading

When running with `--serve`, Quartz automatically enables `--watch`. It uses a WebSocket connection (on the port specified by `--wsPort`) to notify your browser when a file has changed. The browser will then automatically refresh to show the latest version of your content.
