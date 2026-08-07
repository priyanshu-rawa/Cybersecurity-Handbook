// ============================================
// This is a copy of @quartz-community/utils
// Simplified for Quartz 5 compatibility
// ============================================

// ----- Path utilities -----
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const normalizePath = (path: string): string => {
  return path.replace(/\/+/g, '/').replace(/^\/|\/$/g, '');
}

export const joinPaths = (...paths: string[]): string => {
  return normalizePath(paths.join('/'));
}

export const getExtension = (path: string): string => {
  const ext = path.split('.').pop();
  return ext ? '.' + ext : '';
}

export const getFileName = (path: string): string => {
  return path.split('/').pop() || '';
}

export const getFolderPath = (path: string): string => {
  return path.split('/').slice(0, -1).join('/');
}

export const isAbsolute = (path: string): boolean => {
  return path.startsWith('/');
}

export const isRelative = (path: string): boolean => {
  return path.startsWith('./') || path.startsWith('../');
}

// ----- Date utilities -----
export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
}

export const parseDate = (str: string): Date => {
  return new Date(str);
}

export const isDate = (str: string): boolean => {
  return !isNaN(Date.parse(str));
}

// ----- DOM utilities -----
export const getElement = <T extends Element>(selector: string): T | null => {
  return document.querySelector(selector);
}

export const getElements = <T extends Element>(selector: string): NodeListOf<T> => {
  return document.querySelectorAll(selector);
}

// ----- String utilities -----
export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export const unescapeHtml = (str: string): string => {
  return str
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

// ----- Misc utilities -----
export const sleep = (ms: number): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle = false;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}