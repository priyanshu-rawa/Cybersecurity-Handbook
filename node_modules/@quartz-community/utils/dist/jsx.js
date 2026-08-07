import { toJsxRuntime } from "hast-util-to-jsx-runtime";
import { jsxs, jsx, Fragment } from "preact/jsx-runtime";
import { h } from "preact";

// src/jsx.tsx
function childrenToString(children) {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(childrenToString).join("");
  return String(children ?? "");
}
var builtinComponents = {
  table: (props) =>
    /* @__PURE__ */ jsx("div", {
      class: "table-container",
      children: /* @__PURE__ */ jsx("table", { ...props }),
    }),
  style: ({ children, ...rest }) =>
    h("style", { ...rest, dangerouslySetInnerHTML: { __html: childrenToString(children) } }),
  script: ({ children, ...rest }) =>
    h("script", { ...rest, dangerouslySetInnerHTML: { __html: childrenToString(children) } }),
};
function htmlToJsx(tree, components) {
  return toJsxRuntime(tree, {
    Fragment,
    jsx,
    jsxs,
    elementAttributeNameCase: "html",
    components: { ...builtinComponents, ...components },
  });
}

export { htmlToJsx };
//# sourceMappingURL=jsx.js.map
//# sourceMappingURL=jsx.js.map
