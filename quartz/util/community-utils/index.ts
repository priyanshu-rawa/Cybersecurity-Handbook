// ============================================
// Local replacement for @quartz-community/utils
// ============================================

// ----- Path & Slug utilities -----
export const isFilePath = (path: string): boolean => /^\.{0,2}\//.test(path);
export const isFullSlug = (slug: string): boolean => /^[^/]+$/.test(slug) && !slug.includes('..');
export const isSimpleSlug = (slug: string): boolean => /^[a-zA-Z0-9_-]+$/.test(slug);
export const isRelativeURL = (url: string): boolean => /^\.{0,2}\//.test(url);
export const isAbsoluteURL = (url: string): boolean => /^https?:\/\//.test(url);

export const getFullSlug = (slug: string): string => slug.replace(/^\/+/, '').replace(/\/+$/, '');
export const slugifyFilePath = (filePath: string): string => {
  return filePath
    .replace(/\.md$/, '')
    .replace(/[^a-zA-Z0-9_\-/]/g, '-')
    .replace(/\/{2,}/g, '/')
    .replace(/^-|-$/g, '');
};
export const simplifySlug = (slug: string): string => slug.split('/').pop() || slug;

export const joinSegments = (...segments: string[]): string => {
  return segments.filter(Boolean).join('/').replace(/\/{2,}/g, '/').replace(/^\/|\/$/g, '');
};

export const endsWith = (str: string, suffix: string): boolean => str.endsWith(suffix);
export const trimSuffix = (str: string, suffix: string): string =>
  str.endsWith(suffix) ? str.slice(0, -suffix.length) : str;
export const stripSlashes = (str: string): string => str.replace(/^\/+|\/+$/g, '');

export const getFileExtension = (path: string): string => {
  const ext = path.split('.').pop();
  return ext ? '.' + ext : '';
};

export const isFolderPath = (path: string): boolean => path.endsWith('/');

export const getAllSegmentPrefixes = (path: string): string[] => {
  const segments = path.split('/').filter(Boolean);
  return segments.map((_, i) => segments.slice(0, i + 1).join('/'));
};

export const pathToRoot = (from: string): string => {
  const depth = from.split('/').filter(Boolean).length;
  return '../'.repeat(depth) || './';
};

export const resolveRelative = (from: string, to: string): string => {
  const fromSegments = from.split('/').filter(Boolean);
  const toSegments = to.split('/').filter(Boolean);
  let i = 0;
  while (i < fromSegments.length && i < toSegments.length && fromSegments[i] === toSegments[i]) i++;
  const back = fromSegments.slice(i).map(() => '..');
  const forward = toSegments.slice(i);
  return [...back, ...forward].join('/') || './';
};

export const splitAnchor = (url: string): [string, string] => {
  const [base, anchor] = url.split('#');
  return [base || '', anchor || ''];
};

export const slugTag = (tag: string): string => {
  return tag.toLowerCase().replace(/[^a-zA-Z0-9_\-]/g, '-');
};

export type FilePath = string;
export type FullSlug = string;
export type SimpleSlug = string;
export type RelativeURL = string;

export interface TransformOptions {
  base: string;
  preserveAnchors?: boolean;
  keepFileExtensions?: boolean;
}

export const transformInternalLink = (link: string, opts: TransformOptions): string => {
  // Basic implementation – adjust if needed
  return link;
};

export const transformLink = (link: string, opts: TransformOptions): string => {
  // Basic implementation – adjust if needed
  return link;
};

export const normalizeHastElement = (el: any, opts?: any): any => {
  // Basic implementation – adjust if needed
  return el;
};
