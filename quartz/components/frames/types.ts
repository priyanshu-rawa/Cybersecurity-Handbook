import { JSX } from "preact"
import { QuartzComponent, QuartzComponentProps } from "../types"

/**
 * Props passed to a PageFrame's render function.
 * Contains the resolved layout components and the shared component data.
 */
export interface PageFrameProps {
  /** Component data shared across all components on the page */
  componentData: QuartzComponentProps
  /** The Head component (rendered in <head>) — NOT used by frames, included for completeness */
  head: QuartzComponent
  /** Header slot components (rendered inside <header>) */
  header: QuartzComponent[]
  /** Components rendered before the page body */
  beforeBody: QuartzComponent[]
  /** The page body component (Content) */
  pageBody: QuartzComponent
  /** Components rendered after the page body */
  afterBody: QuartzComponent[]
  /** Left sidebar components */
  left: QuartzComponent[]
  /** Right sidebar components */
  right: QuartzComponent[]
  /** Footer component */
  footer: QuartzComponent
}

/**
 * A PageFrame defines the inner HTML structure of a page inside the
 * `<div id="quartz-root">` shell. Different frames can produce completely
 * different layouts (e.g. with/without sidebars, horizontal scroll, etc.)
 * while the outer shell (html, head, body, quartz-root) remains stable
 * for SPA navigation.
 */
export interface PageFrame {
  /** Unique name for this frame (e.g. "default", "full-width", "minimal") */
  name: string
  /** Render the inner page structure. Returns a JSX tree to be placed inside Body > #quartz-body. */
  render: (props: PageFrameProps) => JSX.Element
  /** Optional CSS string to include when this frame is active */
  css?: string
}
