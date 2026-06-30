import { Components, Jsx, toJsxRuntime } from "hast-util-to-jsx-runtime"
import { Node, Root } from "hast"
import { Fragment, jsx, jsxs } from "preact/jsx-runtime"
import { h } from "preact"
import { trace } from "./trace"
import { type FilePath } from "./path"

function childrenToString(children: unknown): string {
  if (typeof children === "string") return children
  if (Array.isArray(children)) return children.map(childrenToString).join("")
  return String(children ?? "")
}

const customComponents: Components = {
  table: (props) => (
    <div class="table-container">
      <table {...props} />
    </div>
  ),
  style: ({ children, ...rest }) =>
    h("style", { ...rest, dangerouslySetInnerHTML: { __html: childrenToString(children) } }),
  script: ({ children, ...rest }) =>
    h("script", { ...rest, dangerouslySetInnerHTML: { __html: childrenToString(children) } }),
}

export function htmlToJsx(fp: FilePath, tree: Node) {
  try {
    return toJsxRuntime(tree as Root, {
      Fragment,
      jsx: jsx as Jsx,
      jsxs: jsxs as Jsx,
      elementAttributeNameCase: "html",
      components: customComponents,
    })
  } catch (e) {
    trace(`Failed to parse Markdown in \`${fp}\` into JSX`, e as Error)
  }
}
