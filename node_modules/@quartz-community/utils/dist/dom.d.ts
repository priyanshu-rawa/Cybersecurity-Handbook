declare function removeAllChildren(el: HTMLElement): void;
declare function registerEscapeHandler(
  outsideContainer: HTMLElement | null,
  onEscape: () => void,
): () => void;
declare function normalizeRelativeURLs(html: Document, baseUrl: string): void;

export { normalizeRelativeURLs, registerEscapeHandler, removeAllChildren };
