import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const EH_GOLD = '#C9A45D'

const MODULES = [
  { num: '01', name: 'Executive Growth Dashboard',    path: '/edmonds-honor/growth-dashboard' },
  { num: '02', name: 'Activation Pipeline',            path: '/edmonds-honor/activation-pipeline' },
  { num: '03', name: 'Partnership Fit Matrix',         path: '/edmonds-honor/partnership-fit' },
  { num: '04', name: 'Content & Campaign Calendar',    path: '/edmonds-honor/content-calendar' },
  { num: '05', name: 'Post-Event Recap Generator',     path: '/edmonds-honor/event-recaps' },
]

const DEMO_PATH = [
  { step: 1, label: 'See the growth picture',   sub: 'Executive Growth Dashboard',         path: '/edmonds-honor/growth-dashboard' },
  { step: 2, label: 'Manage the work',           sub: 'Activation Pipeline + Content Calendar', path: '/edmonds-honor/activation-pipeline' },
  { step: 3, label: 'Build the right partners',  sub: 'Partnership Fit Matrix',             path: '/edmonds-honor/partnership-fit' },
  { step: 4, label: 'Prove the impact',          sub: 'Event Recap Generator',              path: '/edmonds-honor/event-recaps' },
]

/* ── Module card — mirrors Portal.jsx ModuleCard exactly ───────────────── */
function EHModuleCard({ mod, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  const svgRef = useRef(null)

  return (
    <div
      style={{
        position: 'relative',
        width: 160,
        height: 200,
        cursor: 'pointer',
        flexShrink: 0,
        borderRadius: 12,
        transform: hovered ? 'scale(1.045)' : 'scale(1)',
        transition: 'transform 200ms ease-in-out',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onNavigate(mod.path)}
    >
      {/* SVG border trace */}
      <svg
        ref={svgRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3 }}
        viewBox="0 0 160 200"
        fill="none"
        preserveAspectRatio="none"
      >
        {/* White base — always visible */}
        <rect x="1" y="1" width="158" height="198" rx="11" stroke="white" strokeWidth="1.5" fill="none" opacity="0.35" />
        {/* Gold trace — animates in on hover */}
        <rect
          x="1" y="1" width="158" height="198" rx="11"
          stroke={EH_GOLD}
          strokeWidth="1.5"
          fill="none"
          style={{
            strokeDasharray: 720,
            strokeDashoffset: hovered ? 0 : 720,
            opacity: hovered ? 1 : 0,
            transition: 'stroke-dashoffset 420ms ease-in-out, opacity 60ms ease-in-out',
          }}
        />
      </svg>

      {/* Warm gold wash on hover */}
      <div style={{
        position: 'absolute', inset: 2, borderRadius: 10, zIndex: 1,
        background: 'linear-gradient(135deg, rgba(201,164,93,0.18) 0%, rgba(190,102,33,0.10) 100%)',
        opacity: hovered ? 0.10 : 0,
        transition: 'opacity 300ms ease-in-out',
      }} />

      {/* Card content */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 10, padding: '20px 12px',
      }}>
        <img
          src="/images/edmonds-honor/eh-hand-logomark.png"
          alt=""
          style={{ width: 44, height: 'auto', display: 'block', opacity: 0.90 }}
        />
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10, fontWeight: 400,
          color: 'rgba(201,164,93,0.55)',
          letterSpacing: '0.12em', lineHeight: 1,
        }}>
          {mod.num}
        </div>
        <div style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11, fontWeight: 400,
          color: 'rgba(250,225,199,0.85)',
          letterSpacing: '0.04em',
          textAlign: 'center', lineHeight: 1.4,
        }}>
          {mod.name}
        </div>
      </div>
    </div>
  )
}

/* ── EH Portal shell ───────────────────────────────────────────────────── */
export default function EHPortal() {
  const navigate  = useNavigate()
  const bgRef     = useRef(null)
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)

  /* Ken Burns + parallax */
  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return
    const KB_MS = 8000
    let startTime = null, rafId = null, kbDone = false
    let px = 0, py = 0

    bg.style.transform = 'scale(1.08)'
    const apply = scale => (bg.style.transform = `scale(${scale.toFixed(4)}) translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`)

    const tick = ts => {
      if (!startTime) startTime = ts
      const t = Math.min((ts - startTime) / KB_MS, 1)
      const e = 1 - Math.pow(1 - t, 3)
      apply(1.08 - 0.08 * e)
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
    return () => { if (rafId) cancelAnimationFrame(rafId); window.removeEventListener('mousemove', onMove) }
  }, [])

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  const go = path => {
    setLeaving(true)
    setTimeout(() => navigate(path), 340)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100vw', height: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden',
      background: '#090502',
      transform: leaving ? 'translateX(-48px)' : entered ? 'translateX(0)' : 'translateX(0)',
      opacity: leaving ? 0 : entered ? 1 : 0,
      transition: 'transform 380ms ease-in-out, opacity 380ms ease-in-out',
    }}>
      {/* Background */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute', inset: '-24px',
          background: [
            'radial-gradient(circle at center, rgba(9,5,2,0.35), rgba(9,5,2,0.88) 70%)',
            'linear-gradient(90deg, rgba(9,5,2,0.92) 0%, rgba(9,5,2,0.72) 45%, rgba(9,5,2,0.92) 100%)',
            'url(/images/edmonds-honor/eh-os-bg-desktop.webp)',
          ].join(', '),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center center',
          zIndex: 0,
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(9,5,2,0.45)', zIndex: 1 }} />

      {/* Back to Pronghorn Suite */}
      <button
        onClick={() => go('/')}
        style={{
          position: 'absolute', top: 28, left: 36, zIndex: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--eh-text-muted)', fontSize: 11, letterSpacing: '0.05em',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = EH_GOLD}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--eh-text-muted)'}
      >
        &larr; Pronghorn Suite
      </button>

      {/* Centered content */}
      <div style={{
        position: 'relative', zIndex: 2,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        paddingTop: 'calc(28vh - 80px)',
        gap: 0,
      }}>
        {/* Full brand logo — large + centered */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <img
            src="/images/edmonds-honor/eh-sidebar-logo-button.png"
            alt="Edmond's Honor"
            style={{ height: 120, width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto' }}
          />
        </div>

        {/* Suite name + tagline */}
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h1 style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 'clamp(18px, 2.4vw, 30px)',
            fontWeight: 500,
            color: '#FAE1C7',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            margin: '0 0 14px',
            lineHeight: 1.1,
          }}>
            Edmond's Honor Marketing OS
          </h1>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13, fontWeight: 300,
            color: 'rgba(250,225,199,0.60)',
            letterSpacing: '0.16em',
            margin: 0,
            textTransform: 'uppercase',
          }}>
            Campaign, activation &amp; growth command prototype
          </p>
        </div>

        {/* Demo Path */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 36, alignItems: 'stretch' }}>
          {DEMO_PATH.map((item, i) => (
            <div key={item.step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button
                onClick={() => go(item.path)}
                style={{
                  background: 'rgba(201,164,93,0.06)',
                  border: '1px solid rgba(201,164,93,0.18)',
                  borderRadius: 8, padding: '10px 16px',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'background 0.2s, border-color 0.2s',
                  minWidth: 140,
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,164,93,0.12)'; e.currentTarget.style.borderColor = EH_GOLD }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,164,93,0.06)'; e.currentTarget.style.borderColor = 'rgba(201,164,93,0.18)' }}
              >
                <div style={{ fontSize: 9, color: EH_GOLD, letterSpacing: '0.08em', marginBottom: 4 }}>{item.step}</div>
                <div style={{ fontSize: 11, color: 'rgba(250,225,199,0.9)', fontWeight: 500, marginBottom: 2, lineHeight: 1.3 }}>{item.label}</div>
                <div style={{ fontSize: 10, color: 'var(--eh-text-muted)', lineHeight: 1.3 }}>{item.sub}</div>
              </button>
              {i < DEMO_PATH.length - 1 && (
                <span style={{ color: 'rgba(201,164,93,0.25)', fontSize: 12 }}>→</span>
              )}
            </div>
          ))}
        </div>

        {/* Module cards — exact Pronghorn portal card layout */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', justifyContent: 'center' }}>
          {MODULES.map(mod => (
            <EHModuleCard key={mod.num} mod={mod} onNavigate={go} />
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{
          marginTop: 28,
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 10, fontWeight: 300,
          color: 'rgba(165,141,101,0.5)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
        }}>
          Illustrative data only
        </div>
      </div>
    </div>
  )
}
