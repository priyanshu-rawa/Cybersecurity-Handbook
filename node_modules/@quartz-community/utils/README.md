# @quartz-community/utils

Shared utility functions for Quartz community plugins.

## Installation

```bash
npm install @quartz-community/utils
```

Or using GitHub:

```bash
npm install github:quartz-community/utils
```

## Usage

```ts
import {
  simplifySlug,
  getFullSlug,
  joinSegments,
  removeAllChildren,
  classNames,
} from "@quartz-community/utils";

// Path utilities
const slug = simplifySlug("folder/index"); // "folder/"
const currentSlug = getFullSlug(window); // e.g., "blog/my-post"
const path = joinSegments("a", "b", "c"); // "a/b/c"

// DOM utilities
removeAllChildren(document.getElementById("container")!);

// Language utilities
const classes = classNames("btn", isActive && "active", null); // "btn active"
```

## Modules

### Path (`@quartz-community/utils/path`)

Path manipulation utilities for Quartz slugs:

- `simplifySlug(slug)` - Remove `/index` suffix from slugs
- `getFullSlug(window)` - Get current page slug from document body dataset
- `getFullSlugFromUrl()` - Get current page slug from URL pathname
- `joinSegments(...segments)` - Join path segments with proper slash handling
- `resolvePath(path)` - Ensure path starts with `/`
- `endsWith(str, suffix)` - Check if path ends with suffix
- `trimSuffix(str, suffix)` - Remove suffix from path
- `stripSlashes(str, onlyPrefix?)` - Remove leading/trailing slashes
- `getFileExtension(path)` - Get file extension
- `isFolderPath(path)` - Check if path represents a folder
- `getAllSegmentPrefixes(path)` - Get all path prefixes

### DOM (`@quartz-community/utils/dom`)

DOM manipulation utilities:

- `removeAllChildren(element)` - Remove all child nodes from an element
- `registerEscapeHandler(container, callback)` - Register Escape key and click-outside handlers
- `normalizeRelativeURLs(document, baseUrl)` - Convert relative URLs to absolute

### Lang (`@quartz-community/utils/lang`)

Language/general utilities:

- `classNames(...classes)` - Combine CSS class names, filtering falsy values

## Types

The package exports TypeScript types for type-safe slug handling:

```ts
import type { FullSlug, SimpleSlug, RelativeURL } from "@quartz-community/utils";
```

## License

MIT
