import { slug } from "github-slugger";

// src/path.ts
function isFilePath(s) {
  const validStart = !s.startsWith(".");
  return validStart && _hasFileExtension(s);
}
function isFullSlug(s) {
  const validStart = !(s.startsWith(".") || s.startsWith("/"));
  const validEnding = !s.endsWith("/");
  return validStart && validEnding && !_containsForbiddenCharacters(s);
}
function isSimpleSlug(s) {
  const validStart = !(s.startsWith(".") || (s.length > 1 && s.startsWith("/")));
  const validEnding = !endsWith(s, "index");
  return validStart && !_containsForbiddenCharacters(s) && validEnding && !_hasFileExtension(s);
}
function isRelativeURL(s) {
  const validStart = /^\.{1,2}/.test(s);
  const validEnding = !endsWith(s, "index");
  return validStart && validEnding && ![".md", ".html"].includes(getFileExtension(s) ?? "");
}
function isAbsoluteURL(s) {
  try {
    new URL(s);
  } catch {
    return false;
  }
  return true;
}
function simplifySlug(fp) {
  const res = stripSlashes(trimSuffix(fp, "index"), true);
  return res.length === 0 ? "/" : res;
}
function getFullSlug(window2) {
  const res = window2.document.body.dataset.slug;
  return res;
}
function getFullSlugFromUrl() {
  let rawSlug = window.location.pathname;
  if (rawSlug.endsWith("/")) rawSlug = rawSlug.slice(0, -1);
  if (rawSlug.startsWith("/")) rawSlug = rawSlug.slice(1);
  return rawSlug;
}
function slugifyFilePath(fp, excludeExt) {
  fp = stripSlashes(fp);
  const ext = getFileExtension(fp);
  const withoutFileExt = fp.replace(new RegExp(ext + "$"), "");
  const finalExt = excludeExt || [".md", ".html", void 0].includes(ext) ? "" : ext;
  let slug = _sluggify(withoutFileExt);
  if (endsWith(slug, "_index")) {
    slug = slug.replace(/_index$/, "index");
  }
  const segments = slug.split("/");
  if (segments.length >= 2 && segments[segments.length - 1] === segments[segments.length - 2]) {
    segments[segments.length - 1] = "index";
    slug = segments.join("/");
  }
  return slug + (finalExt ?? "");
}
function joinSegments(...args) {
  if (args.length === 0) {
    return "";
  }
  let joined = args
    .filter((segment) => segment !== "" && segment !== "/")
    .map((segment) => stripSlashes(segment))
    .join("/");
  const first = args[0];
  const last = args[args.length - 1];
  if (first?.startsWith("/")) {
    joined = "/" + joined;
  }
  if (last?.endsWith("/")) {
    joined = joined + "/";
  }
  return joined;
}
function resolvePath(to) {
  if (to.startsWith("/")) return to;
  return "/" + to;
}
function getBasePath() {
  if (typeof document === "undefined") return "";
  return document.body?.dataset?.basepath ?? "";
}
function resolveBasePath(to, basePath) {
  const base = basePath ?? getBasePath();
  const slug = to.startsWith("/") ? to : "/" + to;
  return base + slug;
}
function endsWith(s, suffix) {
  return s === suffix || s.endsWith("/" + suffix);
}
function trimSuffix(s, suffix) {
  if (endsWith(s, suffix)) {
    s = s.slice(0, -suffix.length);
  }
  return s;
}
function stripSlashes(s, onlyStripPrefix) {
  if (s.startsWith("/")) {
    s = s.substring(1);
  }
  if (!onlyStripPrefix && s.endsWith("/")) {
    s = s.slice(0, -1);
  }
  return s;
}
function getFileExtension(s) {
  return s.match(/\.[A-Za-z0-9]+$/)?.[0];
}
function isFolderPath(fplike) {
  return (
    fplike.endsWith("/") ||
    endsWith(fplike, "index") ||
    endsWith(fplike, "index.md") ||
    endsWith(fplike, "index.html")
  );
}
function getAllSegmentPrefixes(path) {
  const segments = path.split("/");
  const results = [];
  for (let i = 0; i < segments.length; i++) {
    results.push(segments.slice(0, i + 1).join("/"));
  }
  return results;
}
function pathToRoot(slug) {
  let rootPath = slug
    .split("/")
    .filter((x) => x !== "")
    .slice(0, -1)
    .map((_) => "..")
    .join("/");
  if (rootPath.length === 0) {
    rootPath = ".";
  }
  return rootPath;
}
function resolveRelative(current, target) {
  const res = joinSegments(pathToRoot(current), simplifySlug(target));
  return res;
}
function splitAnchor(link) {
  const [fp, anchor] = link.split("#", 2);
  if (fp.endsWith(".pdf")) {
    return [fp, anchor === void 0 ? "" : `#${anchor}`];
  }
  if (anchor === void 0) {
    return [fp, ""];
  }
  const bare = anchor.startsWith("^") ? anchor.slice(1) : anchor;
  const slugged = "#" + slug(bare);
  return [fp, slugged];
}
function slugTag(tag) {
  return tag
    .split("/")
    .map((tagSegment) => _sluggify(tagSegment))
    .join("/");
}
function transformInternalLink(link) {
  const [fplike, anchor] = splitAnchor(decodeURI(link));
  const segments = fplike.split("/").filter((x) => x.length > 0);
  const prefix = segments.filter(_isRelativeSegment).join("/");
  const fp = segments.filter((seg) => !_isRelativeSegment(seg) && seg !== "").join("/");
  const slugged = slugifyFilePath(fp);
  const simpleSlug = simplifySlug(slugged);
  const folderPath = isFolderPath(fplike) || isFolderPath(slugged);
  const joined = joinSegments(stripSlashes(prefix), stripSlashes(simpleSlug));
  const trail = folderPath ? "/" : "";
  const res = _addRelativeToStart(joined) + trail + anchor;
  return res;
}
function transformLink(src, target, opts) {
  const targetSlug = transformInternalLink(target);
  if (opts.strategy === "relative") {
    return targetSlug;
  } else {
    const effectiveSrc =
      !endsWith(src, "index") && opts.allSlugs.includes(`${src}/index`) ? `${src}/index` : src;
    const folderTail = isFolderPath(targetSlug) ? "/" : "";
    const canonicalSlug = stripSlashes(targetSlug.slice(".".length));
    const [targetCanonical, targetAnchor] = splitAnchor(canonicalSlug);
    if (opts.strategy === "shortest") {
      const isMultiSegment = targetCanonical.includes("/");
      const isFolderTarget = isFolderPath(targetSlug);
      const matchingFileNames = opts.allSlugs.filter((slug) => {
        if (isMultiSegment) {
          if (slug === targetCanonical || slug.endsWith("/" + targetCanonical)) {
            return true;
          }
          if (isFolderTarget) {
            const withIndex = targetCanonical + "/index";
            return slug === withIndex || slug.endsWith("/" + withIndex);
          }
          return false;
        }
        const parts = slug.split("/");
        const fileName = parts.at(-1);
        return targetCanonical === fileName;
      });
      if (matchingFileNames.length === 1) {
        const matchedSlug = matchingFileNames[0];
        return resolveRelative(effectiveSrc, matchedSlug) + targetAnchor;
      }
    }
    return joinSegments(pathToRoot(effectiveSrc), canonicalSlug) + folderTail;
  }
}
function slugifyPath(s) {
  return s
    .split("/")
    .map((segment) =>
      segment
        .replace(/\s/g, "-")
        .replace(/&/g, "-and-")
        .replace(/%/g, "-percent")
        .replace(/\?/g, "")
        .replace(/#/g, "")
        .toLowerCase(),
    )
    .join("/")
    .replace(/\/$/, "");
}
function normalizeHastElement(rawEl, curBase, newBase) {
  const el = structuredClone(rawEl);
  _rebaseHastElement(el, "src", curBase, newBase);
  _rebaseHastElement(el, "href", curBase, newBase);
  if (el.children) {
    el.children = el.children.map((child) =>
      child.type === "element" ? normalizeHastElement(child, curBase, newBase) : child,
    );
  }
  return el;
}
function _rebaseHastElement(el, attr, curBase, newBase) {
  const value = el.properties?.[attr];
  if (value === void 0 || value === null) return;
  const href = String(value);
  if (!isRelativeURL(href)) return;
  el.properties[attr] = joinSegments(resolveRelative(curBase, newBase), "..", href);
}
function _sluggify(s) {
  return slugifyPath(s);
}
function _containsForbiddenCharacters(s) {
  return s.includes(" ") || s.includes("#") || s.includes("?") || s.includes("&");
}
function _hasFileExtension(s) {
  return getFileExtension(s) !== void 0;
}
function _isRelativeSegment(s) {
  return /^\.{0,2}$/.test(s);
}
function _addRelativeToStart(s) {
  if (s === "") {
    s = ".";
  }
  if (!s.startsWith(".")) {
    s = joinSegments(".", s);
  }
  return s;
}

export {
  endsWith,
  getAllSegmentPrefixes,
  getBasePath,
  getFileExtension,
  getFullSlug,
  getFullSlugFromUrl,
  isAbsoluteURL,
  isFilePath,
  isFolderPath,
  isFullSlug,
  isRelativeURL,
  isSimpleSlug,
  joinSegments,
  normalizeHastElement,
  pathToRoot,
  resolveBasePath,
  resolvePath,
  resolveRelative,
  simplifySlug,
  slugTag,
  slugifyFilePath,
  slugifyPath,
  splitAnchor,
  stripSlashes,
  transformInternalLink,
  transformLink,
  trimSuffix,
};
//# sourceMappingURL=path.js.map
//# sourceMappingURL=path.js.map
