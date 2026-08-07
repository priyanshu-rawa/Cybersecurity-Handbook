import type { ContentIndex, FullSlug } from "./dist/index.js";

declare global {
  interface CustomEventMap {
    nav: CustomEvent<{ url: FullSlug }>;
    prenav: CustomEvent<undefined>;
    themechange: CustomEvent<{ theme: "light" | "dark" }>;
    readermodechange: CustomEvent<{ mode: "on" | "off" }>;
    render: CustomEvent<object>;
  }

  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (this: Document, ev: CustomEventMap[K]) => void,
    ): void;
    dispatchEvent<K extends keyof CustomEventMap>(
      ev: CustomEventMap[K] | UIEvent,
    ): void;
  }

  interface Window {
    addCleanup(fn: (...args: unknown[]) => void): void;
    spaNavigate?(url: URL, isBack: boolean): Promise<void>;
  }

  const fetchData: Promise<ContentIndex>;
}
