// import Lenis from "./quartz/components/Lenis"
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
export default config

export const layout = await loadQuartzLayout({
  defaults: {
    afterBody: [], // ✅ If you want Lenis, change to: [Lenis()]
    right: [],     // removes backlinks and TOC
  },
})
