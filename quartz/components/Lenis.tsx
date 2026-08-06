// quartz/components/Lenis.tsx
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import script from "./scripts/lenis.inline"

const Lenis: QuartzComponent = () => {
  return null
}

Lenis.afterDOMLoaded = script

export default (() => Lenis) satisfies QuartzComponentConstructor
