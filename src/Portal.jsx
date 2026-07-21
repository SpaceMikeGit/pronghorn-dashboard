import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Portal.css'
import Greeting from './components/Greeting'

/* ── Module definitions ─────────────────────────────────────────────── */
const MODULES = [
  {
    num:     '01',
    name:    'Impact Dashboard',
    color:   '#1B5C3A',
    path:    '/dashboard',
    locked:  false,
  },
  {
    num:     '02',
    name:    'Brand Activation System',
    color:   '#8A4A1B',
    path:    '/brand-activation',
    locked:  false,
  },
  {
    num:     '03',
    name:    'Portfolio Health Data Layer',
    color:   '#1A3A6B',
    path:    '/portfolio-health',
    locked:  false,
  },
  {
    num:     '04',
    name:    'Talent Pipeline Tool',
    color:   '#5C1A6B',
    path:    '/talent-pipeline',
    locked:  false,
  },
  {
    num:     '05',
    name:    'Deal Screening Tool',
    color:   '#6B3A1A',
    path:    '/deal-screening',
    locked:  false,
  },
  {
    num:     '06',
    name:    'Brand Partner Toolkit',
    color:   '#2A5C4A',
    path:    '/brand-partner',
    locked:  false,
  },
  {
    num:     'EH',
    name:    "Edmond's Honor Marketing OS",
    subtitle:'Campaign, Activation & Growth Command Prototype',
    color:   '#C9A45D',
    path:    '/edmonds-honor',
    locked:  false,
    isEH:    true,
  },
]

/* ── ModuleCard ─────────────────────────────────────────────────────── */
function ModuleCard({ mod, onNavigate }) {
  const [hovered, setHovered]   = useState(false)
  const [shaking, setShaking]   = useState(false)
  const svgRef                   = useRef(null)

  const handleClick = () => {
    if (mod.locked) {
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
      return
    }
    onNavigate(mod.path)
  }

  return (
    <div
      className={`portal-card${hovered ? ' portal-card--hovered' : ''}${mod.locked ? ' portal-card--locked' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleClick}
      style={{
        '--mod-color': mod.color,
        ...(mod.isEH && hovered ? { boxShadow: '0 0 0 1px rgba(201,164,93,0.35), 0 18px 40px rgba(190,102,33,0.18)' } : {}),
      }}
    >
      {/* SVG border trace */}
      <svg
        ref={svgRef}
        className="portal-card__border"
        viewBox="0 0 160 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <rect
          className="portal-card__border-rect"
          x="1" y="1" width="158" height="198" rx="11"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
        />
        <rect
          className="portal-card__border-trace"
          x="1" y="1" width="158" height="198" rx="11"
          stroke={mod.color}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>

      {/* Color wash interior */}
      <div
        className="portal-card__wash"
        style={{ background: mod.isEH ? 'linear-gradient(135deg, rgba(201,164,93,0.18) 0%, rgba(190,102,33,0.10) 100%)' : mod.color }}
      />

      {/* Card content */}
      <div className="portal-card__content" style={mod.num === '03' ? { paddingTop: 36 } : undefined}>
        {mod.isEH ? (
          <img src="/images/edmonds-honor/eh-hand-logomark.png" alt="Edmond's Honor" style={{ height: 44, width: 'auto', maxWidth: 52, display: 'block', opacity: 0.90 }} />
        ) : (
          <img src="/pronghorn-logomark-white.png" alt="" style={{ height: 44, width: 'auto', maxWidth: 52, display: 'block', opacity: 0.90 }} />
        )}
        <div
          className="portal-card__name"
          style={{ color: hovered ? mod.color : 'rgba(242,237,228,0.85)', transition: 'color 200ms ease-in-out' }}
        >
          {mod.name}
        </div>
        {mod.isEH && (
          <div style={{
            fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'rgba(201,164,93,0.60)', marginTop: 2,
          }}>
            Demo
          </div>
        )}
      </div>

      {/* Locked overlay */}
      {mod.locked && (
        <div className={`portal-card__locked${shaking ? ' portal-card__locked--shake' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <rect x="5" y="11" width="14" height="10" rx="2" stroke="white" strokeWidth="1.5"/>
            <path d="M8 11V7a4 4 0 0 1 8 0v4" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="portal-card__locked-label">In Development</span>
        </div>
      )}
    </div>
  )
}

/* ── Portal ─────────────────────────────────────────────────────────── */
export default function Portal() {
  const navigate  = useNavigate()
  const bgRef     = useRef(null)
  const [leaving, setLeaving] = useState(false)
  const [leaveTo, setLeaveTo] = useState(null)

  /* ── Ken Burns + parallax (same as dashboard) ────────────────────── */
  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const KB_MS = 8000
    let startTime = null
    let rafId     = null
    let kbDone    = false
    let px = 0, py = 0

    bg.style.transformOrigin = 'center center'
    bg.style.transform       = 'scale(1.1)'

    const apply = scale =>
      (bg.style.transform = `scale(${scale.toFixed(4)}) translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`)

    const tick = ts => {
      if (!startTime) startTime = ts
      const t = Math.min((ts - startTime) / KB_MS, 1)
      const e = 1 - Math.pow(1 - t, 3)
      apply(1.1 - 0.1 * e)
      if (t < 1) rafId = requestAnimationFrame(tick)
      else { kbDone = true; rafId = null }
    }

    const onMove = e => {
      px = (e.clientX / window.innerWidth  - 0.5) * -12
      py = (e.clientY / window.innerHeight - 0.5) * -12
      if (kbDone) apply(1.0)
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  /* ── Navigation with slide-out transition ────────────────────────── */
  const handleNavigate = (path) => {
    setLeaveTo(path)
    setLeaving(true)
    setTimeout(() => navigate(path), 380)
  }

  return (
    <div className={`portal${leaving ? ' portal--leaving' : ''}`}>
      {/* Background */}
      <div className="portal__bg" ref={bgRef} />
      <div className="portal__overlay" />

      {/* Content */}
      <div className="portal__content">
        {/* Suite identity */}
        <div className="portal__header">
          <Greeting variant="portal" />
          <h1 className="portal__suite-name">Pronghorn Intelligence Suite</h1>
          <p className="portal__tagline">Portfolio intelligence. Built for scale.</p>
        </div>

        {/* Module cards */}
        <div className="portal__cards">
          {MODULES.map(mod => (
            <ModuleCard key={mod.num} mod={mod} onNavigate={handleNavigate} />
          ))}
        </div>
      </div>
    </div>
  )
}
