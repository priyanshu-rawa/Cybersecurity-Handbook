interface TextEncoding {
    /**
     * Verify that the given text is valid UTF-8.
     */
    checkUtf8: (text: string) => boolean;
    /**
     * Encode UTF-8 text to binary.
     */
    encodeUtf8: (text: string) => Uint8Array<ArrayBuffer>;
    /**
     * Encode UTF-8 text to a Uint8Array. The destination must be large enough.
     */
    encodeUtf8Into: (text: string, dest: Uint8Array) => {
        written: number;
    };
    /**
     * Decode UTF-8 text from binary. If `strict` is true, throw on invalid byte
     * sequences instead of silently substituting U+FFFD. Implementations that
     * do not support strict decoding may ignore the flag.
     */
    decodeUtf8: (bytes: Uint8Array, strict?: boolean) => string;
}
type TextEncodingConfig = Omit<TextEncoding, "encodeUtf8Into"> & Partial<Pick<TextEncoding, "encodeUtf8Into">>;
/**
 * Protobuf-ES requires the Text Encoding API to convert UTF-8 from and to
 * binary. This WHATWG API is widely available, but it is not part of the
 * ECMAScript standard. On runtimes where it is not available, use this
 * function to provide your own implementation.
 *
 * Providing `encodeUtf8Into` is optional for backwards compatibility. If it
 * is omitted, we emulate it with a wrapper that calls `encodeUtf8`.
 *
 * Note that the Text Encoding API does not provide a way to validate UTF-8.
 * Our implementation uses String.prototype.isWellFormed, and falls back
 * to use encodeURIComponent().
 */
export declare function configureTextEncoding(textEncoding: TextEncodingConfig): void;
export declare function getTextEncoding(): TextEncoding;
/**
 * Simplistic polyfill for encodeUtf8Into.
 *
 * @private
 */
export declare function emulateEncodeInto(encodeUtf8: (str: string) => Uint8Array): TextEncoding["encodeUtf8Into"];
export {};
