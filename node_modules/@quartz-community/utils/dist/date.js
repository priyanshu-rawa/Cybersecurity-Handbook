// src/date.ts
function formatDate(d, locale = "en-US") {
  return d.toLocaleDateString(locale, {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

export { formatDate };
//# sourceMappingURL=date.js.map
//# sourceMappingURL=date.js.map
