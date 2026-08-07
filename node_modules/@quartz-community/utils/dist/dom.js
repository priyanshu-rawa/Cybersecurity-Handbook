// src/dom.ts
function removeAllChildren(el) {
  while (el.firstChild) {
    el.removeChild(el.firstChild);
  }
}
function registerEscapeHandler(outsideContainer, onEscape) {
  if (!outsideContainer) return () => {};
  const onClick = (e) => {
    if (!outsideContainer.classList.contains("active")) {
      return;
    }
    if (e.target === outsideContainer) {
      e.preventDefault();
      e.stopPropagation();
      onEscape();
    }
  };
  const onKeydown = (e) => {
    if (!outsideContainer.classList.contains("active")) {
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      onEscape();
    }
  };
  outsideContainer.addEventListener("click", onClick);
  document.addEventListener("keydown", onKeydown);
  return () => {
    outsideContainer.removeEventListener("click", onClick);
    document.removeEventListener("keydown", onKeydown);
  };
}
function normalizeRelativeURLs(html, baseUrl) {
  const elements = html.querySelectorAll("[src], [href]");
  for (const el of Array.from(elements)) {
    const attr = el.hasAttribute("href") ? "href" : "src";
    const val = el.getAttribute(attr);
    if (!val) continue;
    if (
      val.startsWith("http://") ||
      val.startsWith("https://") ||
      val.startsWith("mailto:") ||
      val.startsWith("tel:") ||
      val.startsWith("#") ||
      val.startsWith("/") ||
      val.startsWith("data:")
    ) {
      continue;
    }
    try {
      const normalized = new URL(val, baseUrl).toString();
      el.setAttribute(attr, normalized);
    } catch {
      continue;
    }
  }
}

export { normalizeRelativeURLs, registerEscapeHandler, removeAllChildren };
//# sourceMappingURL=dom.js.map
//# sourceMappingURL=dom.js.map
