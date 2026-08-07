import { Element } from "hast";
import { FullSlug, FilePath } from "@quartz-community/types";
export { FilePath, FullSlug } from "@quartz-community/types";

/** No '/index' ending, no file extension, can have trailing slash for folders. */
type SimpleSlug = string & {
  _brand: "SimpleSlug";
};
/** Starts with './' or '../', used for navigation. */
type RelativeURL = string & {
  _brand: "RelativeURL";
};
interface TransformOptions {
  strategy: "absolute" | "relative" | "shortest";
  allSlugs: FullSlug[];
}
declare function isFilePath(s: string): s is FilePath;
declare function isFullSlug(s: string): s is FullSlug;
declare function isSimpleSlug(s: string): s is SimpleSlug;
declare function isRelativeURL(s: string): s is RelativeURL;
declare function isAbsoluteURL(s: string): boolean;
declare function simplifySlug(fp: FullSlug | string): SimpleSlug;
declare function getFullSlug(window: Window): FullSlug;
declare function getFullSlugFromUrl(): FullSlug;
declare function slugifyFilePath(fp: FilePath, excludeExt?: boolean): FullSlug;
declare function joinSegments(...args: string[]): string;
declare function resolvePath(to: string): string;
/** Read the base path injected at build time via `data-basepath` on `<body>`.
 *  Returns `""` for root deployments, e.g. `"/repository"` for subdirectory. */
declare function getBasePath(): string;
/** Resolve a slug to an absolute URL path, prepending the site's base path.
 *  e.g. `resolveBasePath("features/Callouts")` → `"/repository/features/Callouts"` */
declare function resolveBasePath(to: string, basePath?: string): string;
declare function endsWith(s: string, suffix: string): boolean;
declare function trimSuffix(s: string, suffix: string): string;
declare function stripSlashes(s: string, onlyStripPrefix?: boolean): string;
declare function getFileExtension(s: string): string | undefined;
declare function isFolderPath(fplike: string): boolean;
declare function getAllSegmentPrefixes(path: string): string[];
declare function pathToRoot(slug: FullSlug): RelativeURL;
declare function resolveRelative(current: FullSlug, target: FullSlug | SimpleSlug): RelativeURL;
declare function splitAnchor(link: string): [string, string];
declare function slugTag(tag: string): string;
declare function transformInternalLink(link: string): RelativeURL;
declare function transformLink(src: FullSlug, target: string, opts: TransformOptions): RelativeURL;
/**
 * Slugify a file path for use as an href.
 * Replaces whitespace→hyphens, &→-and-, %→-percent, removes ? and #, and
 * lowercases the result so that link matching is case-insensitive (matching
 * Obsidian's link-resolution semantics). Operates per segment so directory
 * separators are preserved.
 */
declare function slugifyPath(s: string): string;
/**
 * Re-base the relative `href` and `src` attributes of a HAST element so that
 * links inside content originally resolved relative to `newBase` remain valid
 * when the element is embedded at a page with slug `curBase`.
 *
 * Used for transclusions and cross-slug HAST embedding (Quartz core's
 * `renderPage` transclude expansion, canvas-page's embedded file-nodes, and
 * any plugin that takes `vfile.data.htmlAst` from one page and renders it
 * inside another). Absolute URLs pass through unchanged.
 *
 * The element (and its children) are deep-cloned via `structuredClone`, so
 * the original HAST tree is never mutated.
 */
declare function normalizeHastElement<T extends Element>(
  rawEl: T,
  curBase: FullSlug,
  newBase: FullSlug,
): T;

export {
  type RelativeURL,
  type SimpleSlug,
  type TransformOptions,
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
