// quartz/components/scripts/lenis.inline.ts
import Lenis from 'lenis'

document.addEventListener('DOMContentLoaded', () => {
  const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
  })

  lenis.on('scroll', (e) => {
    // Optional: add custom logic here
  })

  // Fix for Quartz SPA navigation
  document.addEventListener('nav', () => {
    lenis.stop()
    lenis.scrollTo(0, { immediate: true })
    lenis.start()
  })

  // Expose for debugging
  // window.lenis = lenis
})
