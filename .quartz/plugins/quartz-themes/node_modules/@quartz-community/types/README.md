# @quartz-community/types

Type definitions for Quartz community plugins. This package provides TypeScript interfaces and types that mirror the internal Quartz types, enabling external plugins to have full type safety without depending on the core Quartz package.

## Installation

```bash
npm install @quartz-community/types
```

## Usage

```typescript
import {
  QuartzComponent,
  QuartzComponentProps,
  ExplorerOptions,
} from "@quartz-community/types";

const MyComponent: QuartzComponent = (props: QuartzComponentProps) => {
  // Component implementation
};

MyComponent.css = `
  .my-component { /* styles */ }
`;

MyComponent.afterDOMLoaded = `
  // Client-side script
`;
```

## Included Types

- **Component Types**: `QuartzComponent`, `QuartzComponentProps`, `StringResource`
- **Plugin Types**: `QuartzTransformerPlugin`, `QuartzFilterPlugin`, `QuartzEmitterPlugin`
- **Data Types**: `FileTrieNode`, `ContentIndex`, `ContentIndexEntry`
- **Component Options**: `ExplorerOptions`, `GraphOptions`, `SearchOptions`, `D3Config`
- **Utility Types**: `HTMLAttributes`, `EventHandler`, `CleanupFunction`, `ClassValue`

## License

MIT
