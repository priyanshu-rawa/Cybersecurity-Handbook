import Lenis from "./quartz/components/Lenis"          // ✅ Uncommented
import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"

const config = await loadQuartzConfig()
export default config

export const layout = await loadQuartzLayout({
  defaults: {
    afterBody: [Lenis],   // ✅ Lenis component added here
    right: [],            // removes backlinks and TOC
  },
})
