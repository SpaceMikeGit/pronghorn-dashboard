import { useEffect } from 'react'

const easeOutQuart = t => 1 - Math.pow(1 - t, 4)
const DURATION     = 2500

/**
 * Session-level set — tracks which modules have already animated.
 * Persists across component remounts (navigation away / back).
 */
const completed = new Set()

/**
 * Build display text from a .animated-counter element's data attributes
 * and a raw (possibly fractional) value.
 *
 * Supported data attributes:
 *   data-target   — required, numeric end value
 *   data-prefix   — string prepended before the number  (e.g. "+", "$")
 *   data-suffix   — string appended after the number    (e.g. "+", "%", "M", " pts")
 *   data-locale   — "true" → format with toLocaleString (adds thousands comma)
 *   data-decimals — integer ≥ 1 → keep that many decimal places (e.g. "1" → "15.8")
 */
function formatValue(el, raw) {
  const decimals = parseInt(el.dataset.decimals ?? 0, 10)
  const prefix   = el.dataset.prefix ?? ''
  const suffix   = el.dataset.suffix ?? ''
  let str
  if (decimals > 0) {
    str = raw.toFixed(decimals)
  } else if (el.dataset.locale === 'true') {
    str = Math.round(raw).toLocaleString()
  } else {
    str = String(Math.round(raw))
  }
  return prefix + str + suffix
}

/**
 * useCounterAnimation(moduleKey, animateIn, containerRef)
 *
 * Scans `containerRef.current` for all elements with the `.animated-counter`
 * class and animates their text content from 0 → data-target on first
 * module activation. On revisit, snaps directly to final values.
 *
 * The 50 ms setTimeout guard survives React StrictMode's double-fire:
 * StrictMode cancels the first timer via its cleanup cycle; only the second
 * (real) mount's timer reaches the animation code.
 *
 * Usage in a module:
 *   const containerRef = useRef(null)
 *   useCounterAnimation('mission', animateIn, containerRef)
 *   // then: <div className="content-area" ref={containerRef}>
 *   //         <div className="metric-value animated-counter"
 *   //              data-target="70" data-suffix="+">0+</div>
 *
 * For Module 5 (not yet built), follow the same pattern:
 *   - Call useCounterAnimation with a unique moduleKey
 *   - Add .animated-counter + data-target to every numeric metric element
 */
export function useCounterAnimation(moduleKey, animateIn, containerRef, activeTab) {
  useEffect(() => {
    if (!animateIn || !containerRef?.current) return

    const handle = setTimeout(() => {
      const container = containerRef.current
      if (!container) return

      const els = [...container.querySelectorAll('.animated-counter')]
      if (!els.length) return

      if (completed.has(moduleKey)) {
        // Revisit or tab switch — snap all counters to final values
        els.forEach(el => {
          el.textContent = formatValue(el, parseFloat(el.dataset.target ?? 0))
        })
        return
      }
      completed.add(moduleKey)

      const start = performance.now()
      const tick  = now => {
        const progress = Math.min((now - start) / DURATION, 1)
        const ease     = easeOutQuart(progress)
        els.forEach(el => {
          el.textContent = formatValue(el, ease * parseFloat(el.dataset.target ?? 0))
        })
        if (progress < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, 50) // 50 ms delay: survives StrictMode cleanup, imperceptible to users

    return () => clearTimeout(handle)
  }, [animateIn, activeTab]) // eslint-disable-line react-hooks/exhaustive-deps
}
