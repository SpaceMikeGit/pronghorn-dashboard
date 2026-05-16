import { useState, useEffect } from 'react'

const easeOutQuart = t => 1 - Math.pow(1 - t, 4)

/**
 * Session-level set — survives component remounts.
 * Ensures each keyed counter animates exactly once per page session.
 */
const animated = new Set()

/**
 * useCounter(key, target, { trigger, duration })
 *
 * Returns an animated display value that counts from 0 → target
 * the first time `trigger` is true for a given `key`.
 * On revisit (key already in `animated`), returns `target` immediately.
 *
 * @param {string} key       - Unique key per counter instance
 * @param {number} target    - Final numeric value
 * @param {boolean} trigger  - Start animation when this becomes true
 * @param {number} duration  - Animation duration in ms (default 1800)
 */
export function useCounter(key, target, { trigger = false, duration = 2500 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!trigger) return

    // Already ran this session — jump to final value immediately
    if (animated.has(key)) {
      setValue(target)
      return
    }

    // Mark as animated before starting (prevents double-fire in strict mode)
    animated.add(key)

    let rafId
    const start = performance.now()

    const tick = now => {
      const progress = Math.min((now - start) / duration, 1)
      setValue(Math.round(easeOutQuart(progress) * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setValue(target) // guarantee exact final value
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [trigger]) // eslint-disable-line react-hooks/exhaustive-deps

  return value
}
