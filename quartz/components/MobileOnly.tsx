import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

export default ((component: QuartzComponent) => {
  const Component = component
  const MobileOnly: QuartzComponent = (props: QuartzComponentProps) => {
    return (
      <div class="mobile-only">
        <Component {...props} />
      </div>
    )
  }

  MobileOnly.displayName = component.displayName
  MobileOnly.afterDOMLoaded = component?.afterDOMLoaded
  MobileOnly.beforeDOMLoaded = component?.beforeDOMLoaded
  MobileOnly.css = component?.css
  return MobileOnly
}) satisfies QuartzComponentConstructor<QuartzComponent>
