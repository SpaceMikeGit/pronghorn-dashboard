import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const MODULES = [
  {
    num:      '01',
    title:    'Executive Growth Dashboard',
    subtitle: 'Spend, activation, market heat, and leadership decisions in one view.',
    path:     '/edmonds-honor/growth-dashboard',
  },
  {
    num:      '02',
    title:    'Activation Pipeline',
    subtitle: 'Events, tastings, partnerships, and field execution from concept to recap.',
    path:     '/edmonds-honor/activation-pipeline',
  },
  {
    num:      '03',
    title:    'Partnership Fit Matrix',
    subtitle: 'Brand-right scoring for hotels, chefs, galleries, creators, and cultural partners.',
    path:     '/edmonds-honor/partnership-fit',
  },
  {
    num:      '04',
    title:    'Content & Campaign Calendar',
    subtitle: 'Content programming, pillar strategy, and platform scheduling across markets.',
    path:     '/edmonds-honor/content-calendar',
  },
  {
    num:      '05',
    title:    'Post-Event Recap Generator',
    subtitle: 'Structured recap framework with outcome capture and learning transfer.',
    path:     '/edmonds-honor/event-recaps',
  },
]

const DEMO_PATH = [
  { step: 1, label: 'See the growth picture',   destination: 'Executive Growth Dashboard',  path: '/edmonds-honor/growth-dashboard' },
  { step: 2, label: 'Manage the work',           destination: 'Activation Pipeline + Content Calendar', path: '/edmonds-honor/activation-pipeline' },
  { step: 3, label: 'Build the right partners',  destination: 'Partnership Fit Matrix',      path: '/edmonds-honor/partnership-fit' },
  { step: 4, label: 'Prove the impact',          destination: 'Event Recap Generator',       path: '/edmonds-honor/event-recaps' },
]

function ModuleCard({ mod, onNavigate }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      onClick={() => onNavigate(mod.path)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'var(--eh-card-elevated)' : 'var(--eh-card)',
        border: `1px solid ${hovered ? 'var(--eh-gold)' : 'var(--eh-border)'}`,
        borderRadius: 10,
        padding: '22px 24px',
        cursor: 'pointer',
        transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
        boxShadow: hovered ? '0 0 0 1px rgba(201,164,93,0.18), 0 12px 32px rgba(190,102,33,0.10)' : 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <span style={{
          fontSize: 10, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
          color: 'var(--eh-gold)', minWidth: 24, paddingTop: 2,
        }}>
          {mod.num}
        </span>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--eh-text)', marginBottom: 5, lineHeight: 1.35 }}>
            {mod.title}
          </div>
          <div style={{ fontSize: 12, color: 'var(--eh-text-muted)', lineHeight: 1.5 }}>
            {mod.subtitle}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EHPortal() {
  const navigate  = useNavigate()
  const bgRef     = useRef(null)
  const [entered, setEntered]   = useState(false)
  const [leaving, setLeaving]   = useState(false)

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
      px = (e.clientX / window.innerWidth  - 0.5) * -10
      py = (e.clientY / window.innerHeight - 0.5) * -10
      if (kbDone) apply(1.0)
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => { if (rafId) cancelAnimationFrame(rafId); window.removeEventListener('mousemove', onMove) }
  }, [])

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  const go = (path) => {
    setLeaving(true)
    setTimeout(() => navigate(path), 340)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '100vh',
      overflow: 'hidden',
      background: 'var(--eh-bg)',
      transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
      opacity: (leaving || !entered) ? 0 : 1,
      transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
    }}>
      {/* Background image */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute', inset: '-10%',
          background: [
            'radial-gradient(circle at center, rgba(9,5,2,0.35), rgba(9,5,2,0.88) 70%)',
            'linear-gradient(90deg, rgba(9,5,2,0.92) 0%, rgba(9,5,2,0.72) 45%, rgba(9,5,2,0.92) 100%)',
            'url(/images/edmonds-honor/eh-os-bg-desktop.webp)',
          ].join(', '),
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transformOrigin: 'center center',
        }}
      />

      {/* Back link */}
      <button
        onClick={() => go('/')}
        style={{
          position: 'absolute', top: 28, left: 32, zIndex: 10,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--eh-text-muted)', fontSize: 11, letterSpacing: '0.05em',
          transition: 'color 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--eh-gold)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--eh-text-muted)'}
      >
        &larr; Pronghorn Suite
      </button>

      {/* Scrollable content */}
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%', overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '72px 48px 64px',
      }}>
        <div style={{ width: '100%', maxWidth: 900 }}>

          {/* Logo */}
          <div style={{ marginBottom: 28 }}>
            <img
              src="/images/edmonds-honor/eh-sidebar-logo-button.png"
              alt="Edmond's Honor"
              style={{ height: 56, objectFit: 'contain' }}
            />
          </div>

          {/* Header */}
          <div style={{ marginBottom: 10 }}>
            <div style={{
              fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--eh-gold)', marginBottom: 14,
            }}>
              Marketing OS
            </div>
            <h1 style={{
              fontSize: 28, fontWeight: 300, letterSpacing: '0.06em', textTransform: 'uppercase',
              color: 'var(--eh-text)', lineHeight: 1.2, marginBottom: 14,
            }}>
              Campaign, activation, and growth command prototype.
            </h1>
            <p style={{ fontSize: 13, color: 'var(--eh-text-secondary)', lineHeight: 1.7, maxWidth: 640 }}>
              A sample operating system for connecting brand world-building, field execution,
              content performance, partnership fit, market intelligence, and commercial
              follow-through. Illustrative data only.
            </p>
          </div>

          {/* Gold rule */}
          <div style={{ borderBottom: '1px solid rgba(201,164,93,0.25)', margin: '32px 0' }} />

          {/* Demo Path */}
          <div style={{ marginBottom: 40 }}>
            <div style={{
              fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
              color: 'var(--eh-text-muted)', marginBottom: 18,
            }}>
              Marketing Director Demo Path — Start here
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
              {DEMO_PATH.map((item) => (
                <button
                  key={item.step}
                  onClick={() => go(item.path)}
                  style={{
                    background: 'rgba(201,164,93,0.06)',
                    border: '1px solid rgba(201,164,93,0.2)',
                    borderRadius: 8,
                    padding: '16px 16px',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(201,164,93,0.12)'; e.currentTarget.style.borderColor = 'var(--eh-gold)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(201,164,93,0.06)'; e.currentTarget.style.borderColor = 'rgba(201,164,93,0.2)' }}
                >
                  <div style={{ fontSize: 10, color: 'var(--eh-gold)', marginBottom: 6, letterSpacing: '0.06em' }}>
                    {item.step}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--eh-text)', fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--eh-text-muted)', lineHeight: 1.4 }}>
                    {item.destination}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Gold rule */}
          <div style={{ borderBottom: '1px solid rgba(201,164,93,0.15)', marginBottom: 28 }} />

          {/* Module grid */}
          <div style={{
            fontSize: 9, letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--eh-text-muted)', marginBottom: 16,
          }}>
            All Modules
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {MODULES.map(mod => (
              <ModuleCard key={mod.num} mod={mod} onNavigate={go} />
            ))}
          </div>

          {/* Disclaimer */}
          <div style={{
            marginTop: 48, fontSize: 10, letterSpacing: '0.08em',
            color: 'var(--eh-text-muted)', textTransform: 'uppercase',
            borderTop: '1px solid rgba(201,164,93,0.10)', paddingTop: 20,
          }}>
            All data shown is sample / illustrative unless otherwise noted.
          </div>
        </div>
      </div>
    </div>
  )
}
