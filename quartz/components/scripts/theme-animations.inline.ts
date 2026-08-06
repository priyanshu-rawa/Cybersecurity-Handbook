// quartz/components/scripts/theme-animations.inline.ts

// Ultra Immersive Theme Switch Animations
// Features: Sunlight effect, Night fade, Reader mode toggle

interface ThemeState {
  isDark: boolean
  isReader: boolean
  isAnimating: boolean
}

const state: ThemeState = {
  isDark: false,
  isReader: false,
  isAnimating: false
}

// ---------- Create overlay elements ----------

function createOverlay() {
  const overlay = document.createElement('div')
  overlay.id = 'theme-overlay'
  overlay.style.cssText = `
    position: fixed;
    inset: 0;
    z-index: 9999;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  `
  document.body.appendChild(overlay)
  return overlay
}

const overlay = createOverlay()

// ---------- Sunlight burst effect ----------

function triggerSunlight() {
  overlay.style.background = 'radial-gradient(circle at center, rgba(255, 200, 50, 0.6), rgba(255, 150, 0, 0.3) 40%, transparent 70%)'
  overlay.style.opacity = '1'
  
  setTimeout(() => {
    overlay.style.opacity = '0'
    setTimeout(() => {
      overlay.style.background = 'transparent'
    }, 700)
  }, 600)
}

// ---------- Night star shimmer effect ----------

function triggerNight() {
  overlay.style.background = 'radial-gradient(circle at center, rgba(100, 80, 255, 0.4), rgba(20, 10, 50, 0.6) 50%, transparent 70%)'
  overlay.style.opacity = '1'
  
  setTimeout(() => {
    overlay.style.opacity = '0'
    setTimeout(() => {
      overlay.style.background = 'transparent'
    }, 700)
  }, 600)
}

// ---------- Reader mode page lift effect ----------

function triggerReaderToggle() {
  const body = document.body
  body.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  
  if (!state.isReader) {
    body.style.transform = 'scale(0.97) translateY(10px)'
    body.style.opacity = '0.7'
    setTimeout(() => {
      body.style.transform = 'scale(1) translateY(0)'
      body.style.opacity = '1'
    }, 400)
  } else {
    body.style.transform = 'scale(1.02) translateY(-10px)'
    body.style.opacity = '0.7'
    setTimeout(() => {
      body.style.transform = 'scale(1) translateY(0)'
      body.style.opacity = '1'
    }, 400)
  }
}

// ---------- Main theme switch handler ----------

function handleThemeSwitch(targetTheme: 'light' | 'dark') {
  if (state.isAnimating) return
  state.isAnimating = true
  
  const body = document.body
  
  // Check current theme
  const currentDark = body.hasAttribute('saved-theme') && body.getAttribute('saved-theme') === 'dark'
  
  // Different animation based on direction
  if (targetTheme === 'dark' && !currentDark) {
    // Switching TO dark mode – night animation
    triggerNight()
  } else if (targetTheme === 'light' && currentDark) {
    // Switching TO light mode – sunlight animation
    triggerSunlight()
  }
  
  // Add a small delay before actual theme switch for animation
  setTimeout(() => {
    // Let the original darkmode.js handle the actual toggle
    // We just provide the visual effects
    
    state.isAnimating = false
  }, 500)
}

// ---------- Hook into existing theme toggle ----------

// Wait for darkmode component to load
function initThemeAnimations() {
  // Listen for themechange events from darkmode.js
  document.addEventListener('themechange', (e: any) => {
    const theme = e.detail?.theme || 'light'
    handleThemeSwitch(theme)
    
    // Update state
    state.isDark = theme === 'dark'
  })
  
  // Watch for reader mode toggle
  document.addEventListener('readermodechange', (e: any) => {
    const mode = e.detail?.mode || 'off'
    state.isReader = mode === 'on'
    triggerReaderToggle()
  })
  
  // Also detect manual clicks on darkmode button
  const darkmodeBtn = document.querySelector('.darkmode')
  if (darkmodeBtn) {
    darkmodeBtn.addEventListener('click', () => {
      // Small haptic feedback on mobile
      if ('vibrate' in navigator) {
        navigator.vibrate?.(10)
      }
    })
  }
}

// ---------- Run on page load ----------

// Wait for DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initThemeAnimations)
} else {
  initThemeAnimations()
}

// ---------- Re-initialize on SPA navigation ----------

document.addEventListener('nav', () => {
  // Re-apply state after navigation
  const body = document.body
  state.isDark = body.hasAttribute('saved-theme') && body.getAttribute('saved-theme') === 'dark'
  
  // Re-hook darkmode button
  const darkmodeBtn = document.querySelector('.darkmode')
  if (darkmodeBtn && !darkmodeBtn.dataset.animated) {
    darkmodeBtn.dataset.animated = 'true'
    darkmodeBtn.addEventListener('click', () => {
      if ('vibrate' in navigator) {
        navigator.vibrate?.(10)
      }
    })
  }
})

// ---------- Sunlight burst for page load (first visit) ----------

// On first load, trigger subtle sunlight
setTimeout(() => {
  const body = document.body
  const isDark = body.hasAttribute('saved-theme') && body.getAttribute('saved-theme') === 'dark'
  
  if (!isDark) {
    // Small sunlight burst on load for light mode
    const overlay = document.getElementById('theme-overlay')
    if (overlay) {
      overlay.style.background = 'radial-gradient(circle at center, rgba(255, 200, 50, 0.3), rgba(255, 150, 0, 0.1) 40%, transparent 70%)'
      overlay.style.opacity = '1'
      setTimeout(() => {
        overlay.style.opacity = '0'
        setTimeout(() => {
          overlay.style.background = 'transparent'
        }, 500)
      }, 400)
    }
  }
}, 300)
