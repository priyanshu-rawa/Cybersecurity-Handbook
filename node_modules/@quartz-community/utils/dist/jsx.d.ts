import { Components } from "hast-util-to-jsx-runtime";
import { Node } from "hast";

/**
 * Convert a HAST tree to Preact JSX, with sensible defaults for Quartz plugins.
 *
 * This is the canonical way for pageType body components (and any other code
 * that renders a HAST tree to JSX) to produce output that is safe for
 * `preact-render-to-string`.  It applies built-in component overrides for
 * `<table>`, `<style>`, and `<script>` elements, preventing the common
 * pitfall where inline CSS / JS gets HTML-escaped.
 *
 * @param tree        The HAST root (or node) to render.
 * @param components  Optional additional component overrides.  These are
 *                    merged with (and override) the built-in defaults.
 * @returns           A Preact JSX element ready for `render()`.
 */
declare function htmlToJsx(tree: Node, components?: Partial<Components>): JSX.Element;

export { htmlToJsx };
