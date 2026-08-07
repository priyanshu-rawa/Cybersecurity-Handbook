/**
 * HTML escape utilities for safe string rendering.
 */
/**
 * Escapes HTML special characters in a string to prevent XSS.
 * @param unsafe - The string to escape
 * @returns The escaped string safe for HTML rendering
 *
 * @example
 * escapeHTML('<script>alert("xss")</script>') // '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
 */
declare function escapeHTML(unsafe: string): string;
/**
 * Unescapes HTML entities back to their original characters.
 * @param html - The HTML-escaped string
 * @returns The unescaped string
 *
 * @example
 * unescapeHTML('&lt;div&gt;') // '<div>'
 */
declare function unescapeHTML(html: string): string;

export { escapeHTML, unescapeHTML };
