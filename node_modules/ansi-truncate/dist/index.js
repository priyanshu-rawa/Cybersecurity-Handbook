/* IMPORT */
import fastStringTruncatedWidth from 'fast-string-truncated-width';
import { ANSI_STANDARD_RE, ANSI_LINK_RE } from './constants.js';
import { ELLIPSIS, ELLIPSIS_WIDTH } from './constants.js';
import { RESET_STANDARD, RESET_LINK } from './constants.js';
/* MAIN */
//TODO: Maybe detect where resetting is necessary more precisely
const truncate = (input, width, options) => {
    const limit = width;
    const ellipsis = options?.ellipsis ?? ELLIPSIS;
    const ellipsisWidth = options?.ellipsisWidth ?? (ellipsis === ELLIPSIS ? ELLIPSIS_WIDTH : undefined);
    const { index, ellipsed, truncated } = fastStringTruncatedWidth(input, { limit, ellipsis, ellipsisWidth });
    if (!truncated)
        return input;
    const slice = input.slice(0, index);
    const isStandardResettable = ANSI_STANDARD_RE.test(slice);
    const isLinkResettable = ANSI_LINK_RE.test(slice);
    return `${slice}${ellipsed ? ellipsis : ''}${isStandardResettable ? RESET_STANDARD : ''}${isLinkResettable ? RESET_LINK : ''}`;
};
/* EXPORT */
export default truncate;
