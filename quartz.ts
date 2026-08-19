// import Lenis from "./quartz/components/Lenis"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
export default config

export const layout = await loadQuartzLayout({
  defaults: {
    afterBody: [],
    right: [],   // <-- removes backlinks and TOC if they were there
  },
})