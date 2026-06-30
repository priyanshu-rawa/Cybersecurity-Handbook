import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component: QuartzComponent) => {
  const Component = component
  const DesktopOnly: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <div class="desktop-only">
        <Component {...props} />
      </div>
    )
  }

  DesktopOnly.displayName = component.displayName
  DesktopOnly.afterDOMLoaded = component?.afterDOMLoaded
  DesktopOnly.beforeDOMLoaded = component?.beforeDOMLoaded
  DesktopOnly.css = component?.css
  return DesktopOnly
}) satisfies QuartzComponentConstructor<QuartzComponent>
