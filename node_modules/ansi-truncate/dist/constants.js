/* MAIN */
const ANSI_STANDARD_RE = /[\x1B\x9B]/;
const ANSI_LINK_RE = /\x1B\]8;/;
const ELLIPSIS = '…';
const ELLIPSIS_WIDTH = 1;
const RESET_STANDARD = '\x1B[0m';
const RESET_LINK = '\x1B]8;;\x07';
/* EXPORT */
export { ANSI_STANDARD_RE, ANSI_LINK_RE };
export { ELLIPSIS, ELLIPSIS_WIDTH };
export { RESET_STANDARD, RESET_LINK };
