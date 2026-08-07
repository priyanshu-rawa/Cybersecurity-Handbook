// src/index.ts
function joinSegments(...segments) {
  return segments.filter((segment) => segment.length > 0).join("/").replace(/\/+/g, "/");
}
export {
  joinSegments
};
//# sourceMappingURL=index.js.map