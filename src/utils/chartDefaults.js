/**
 * Shared chart animation defaults — imported by every module.
 *
 * Rules enforced here:
 *   • All animations trigger on module activation (animateIn prop), never on page load
 *   • Duration: 2500ms, easing: easeOutQuart
 *   • Vertical bars grow upward from x-axis baseline
 *   • Horizontal bars grow rightward from y-axis baseline
 *   • Multi-bar stagger: 80ms per bar
 *   • Donut/arc: clockwise from 12 o'clock (animateRotate: true, circumference from 0)
 *   • Progress bars: CSS transition width 0→target, 2.5s cubic-bezier(0.16,1,0.3,1)
 */

/**
 * Session-level set — tracks which modules have already run their chart
 * entrance animation. Module-level scope survives React StrictMode's
 * double-mount cycle (unlike useRef, which gets reset on cleanup/remount).
 */
export const chartVisited = new Set()

export const ANIM_DURATION = 2500
export const ANIM_EASING   = 'easeOutQuart'

/** 80ms stagger per bar, only on initial 'default' render (not hover/tooltip). */
export const barDelay = ctx =>
  ctx.type === 'data' && ctx.mode === 'default' ? ctx.dataIndex * 80 : 0

/**
 * Forces vertical bars to grow upward from the x-axis baseline.
 * Chart.js default starts bars from y=0 (top of canvas) — this corrects it.
 * Add to CHART_OPTS as:  animations: verticalBarAnimations
 */
export const verticalBarAnimations = {
  y: { from: ctx => ctx.chart.scales.y.getPixelForValue(0) },
}

/**
 * Forces horizontal bars to grow rightward from the y-axis baseline.
 * Add to CHART_OPTS as:  animations: horizontalBarAnimations
 */
export const horizontalBarAnimations = {
  x: { from: ctx => ctx.chart.scales.x.getPixelForValue(0) },
}

/** Standard animation block — spread into every chart's options.animation. */
export const animationBase = {
  duration: ANIM_DURATION,
  easing:   ANIM_EASING,
}

/** Shared tooltip styles. */
export const tooltipDefaults = {
  backgroundColor: '#1A1916',
  titleColor:      '#F2EDE4',
  bodyColor:       '#8C8479',
  borderColor:     'rgba(242,237,228,0.10)',
  borderWidth:     1,
  padding:         10,
}

/** Shared axis grid / border styles. */
export const axisGrid = {
  color:       'rgba(242,237,228,0.04)',
  drawBorder:  false,
}

/** CSS transition string for progress bar fills. */
export const progressTransition = (delayMs = 0) =>
  `width 2.5s cubic-bezier(0.16,1,0.3,1) ${delayMs}ms`
