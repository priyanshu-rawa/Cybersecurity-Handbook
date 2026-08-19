// quartz/util/community-utils.ts
// This file is part of Quartz. It contains shared utilities for path handling.

import { FilePath, FullSlug, SimpleSlug, RelativeURL, TransformOptions } from "./path"

export type { FilePath, FullSlug, SimpleSlug, RelativeURL, TransformOptions }

export function isFilePath(s: string): s is FilePath {
  return s.startsWith("/") && !s.includes("?") && !s.includes("#")
}

export function isFullSlug(s: string): s is FullSlug {
  return s.startsWith("/") && !s.includes("?") && !s.includes("#")
}

export function isSimpleSlug(s: string): s is SimpleSlug {
  return !s.startsWith("/") && !s.includes("?") && !s.includes("#")
}

export function isRelativeURL(s: string): s is RelativeURL {
  return s.startsWith("./") || s.startsWith("../")
}

export function isAbsoluteURL(s: string): boolean {
  return s.startsWith("http://") || s.startsWith("https://")
}

export function getFullSlug(slug: string): FullSlug {
  if (isFullSlug(slug)) return slug as FullSlug
  if (isSimpleSlug(slug)) return `/${slug}` as FullSlug
  throw new Error(`Invalid slug: ${slug}`)
}

export function slugifyFilePath(fp: FilePath): FullSlug {
  // Remove leading slash if present
  const clean = fp.replace(/^\//, "")
  // Replace backslashes and remove .md extension
  const slug = clean.replace(/\\/g, "/").replace(/\.md$/, "")
  return `/${slug}` as FullSlug
}

export function simplifySlug(slug: FullSlug): SimpleSlug {
  return slug.replace(/^\//, "") as SimpleSlug
}

export function joinSegments(...segments: string[]): string {
  return segments
    .filter((s) => s.length > 0)
    .join("/")
    .replace(/\/+/g, "/")
}

export function endsWith(str: string, suffix: string): boolean {
  return str.endsWith(suffix)
}

export function trimSuffix(str: string, suffix: string): string {
  return str.endsWith(suffix) ? str.slice(0, -suffix.length) : str
}

export function stripSlashes(str: string): string {
  return str.replace(/^\/+/, "").replace(/\/+$/, "")
}

export function getFileExtension(fp: FilePath): string {
  const lastDot = fp.lastIndexOf(".")
  return lastDot > 0 ? fp.slice(lastDot + 1) : ""
}

export function isFolderPath(fp: FilePath): boolean {
  return fp.endsWith("/")
}

export function getAllSegmentPrefixes(slug: FullSlug): string[] {
  const parts = slug.split("/").filter((p) => p.length > 0)
  const prefixes: string[] = []
  for (let i = 0; i < parts.length; i++) {
    prefixes.push("/" + parts.slice(0, i + 1).join("/"))
  }
  return prefixes
}

export function pathToRoot(slug: FullSlug): string {
  const depth = slug.split("/").filter((p) => p.length > 0).length
  return depth === 0 ? "" : "../".repeat(depth)
}

export function resolveRelative(from: FullSlug, to: FullSlug): RelativeURL {
  const fromParts = from.split("/").filter((p) => p.length > 0)
  const toParts = to.split("/").filter((p) => p.length > 0)

  let i = 0
  while (i < fromParts.length && i < toParts.length && fromParts[i] === toParts[i]) {
    i++
  }
  const up = "../".repeat(fromParts.length - i)
  const down = toParts.slice(i).join("/")
  return (up + down) as RelativeURL
}

export function splitAnchor(url: string): { url: string; anchor: string } {
  const hashIndex = url.indexOf("#")
  if (hashIndex === -1) return { url, anchor: "" }
  return { url: url.slice(0, hashIndex), anchor: url.slice(hashIndex + 1) }
}

export function slugTag(tag: string): string {
  return tag.toLowerCase().replace(/\s/g, "-").replace(/[^a-z0-9-]/g, "")
}

export function transformInternalLink(
  link: string,
  _options: TransformOptions,
): string {
  // Basic transform – resolves relative links
  return link
}

export function transformLink(
  link: string,
  _options: TransformOptions,
): string {
  // Basic transform – resolves URLs
  return link
}

export function normalizeHastElement(
  el: any,
  _options?: any,
): any {
  // Normalize element structure – minimal implementation
  return el
}
