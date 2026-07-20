import { useEffect, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const NAV_ITEMS = [
  { id: 'growth-dashboard',    label: 'Executive Growth',    path: '/edmonds-honor/growth-dashboard' },
  { id: 'activation-pipeline', label: 'Activation Pipeline', path: '/edmonds-honor/activation-pipeline' },
  { id: 'partnership-fit',     label: 'Partnership Fit',     path: '/edmonds-honor/partnership-fit' },
  { id: 'content-calendar',    label: 'Content Calendar',    path: '/edmonds-honor/content-calendar' },
  { id: 'event-recaps',        label: 'Event Recaps',        path: '/edmonds-honor/event-recaps' },
]

export default function EHSidebar({ setLeaving }) {
  const navigate  = useNavigate()
  const location  = useLocation()
  const bgRef     = useRef(null)
  const [px, setPx] = useState(0)
  const [py, setPy] = useState(0)

  useEffect(() => {
    const onMove = e => {
      setPx((e.clientX / window.innerWidth  - 0.5) * 4)
      setPy((e.clientY / window.innerHeight - 0.5) * 6)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  const go = (path) => {
    if (setLeaving) setLeaving(true)
    setTimeout(() => navigate(path), 320)
  }

  const activeId = NAV_ITEMS.find(n => location.pathname === n.path)?.id

  return (
    <div style={{
      position: 'relative',
      width: 240,
      flexShrink: 0,
      height: '100vh',
      background: 'var(--eh-sidebar)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Texture background with parallax */}
      <div
        ref={bgRef}
        style={{
          position: 'absolute',
          inset: '-10%',
          backgroundImage: 'url(/images/edmonds-honor/eh-sidebar-texture.webp)',
          backgroundSize: 'cover',
          backgroundPosition: '58% center',
          filter: 'saturate(0.75) contrast(0.85)',
          opacity: 0.95,
          transform: `translate(${px}px, ${py}px)`,
          transition: 'transform 0.1s linear',
          zIndex: 0,
        }}
      />
      {/* Dark gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(90deg, rgba(9,5,2,0.94), rgba(9,5,2,0.76)), linear-gradient(180deg, rgba(9,5,2,0.72), rgba(9,5,2,0.96))',
        zIndex: 1,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', padding: '28px 20px' }}>

        {/* Back to Pronghorn Suite */}
        <button
          onClick={() => go('/')}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: 'var(--eh-text-muted)', fontSize: 11, letterSpacing: '0.04em',
            textAlign: 'left', padding: 0, marginBottom: 28,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--eh-gold)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--eh-text-muted)'}
        >
          &larr; Pronghorn Suite
        </button>

        {/* EH logo — routes to /edmonds-honor */}
        <button
          onClick={() => go('/edmonds-honor')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: 20, textAlign: 'left' }}
        >
          <img
            src="/images/edmonds-honor/eh-sidebar-logo-button.png"
            alt="Edmond's Honor"
            style={{ width: 160, height: 'auto', objectFit: 'contain', display: 'block' }}
          />
        </button>

        {/* EH Marketing OS label */}
        <div style={{
          fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--eh-text-muted)', marginBottom: 16,
          borderBottom: '1px solid rgba(201,164,93,0.15)', paddingBottom: 12,
        }}>
          EH Marketing OS
        </div>

        {/* Navigation */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {NAV_ITEMS.map((item, i) => {
            const active = activeId === item.id
            return (
              <button
                key={item.id}
                onClick={() => go(item.path)}
                style={{
                  background: active ? 'rgba(201,164,93,0.08)' : 'none',
                  border: 'none',
                  borderLeft: active ? '2px solid var(--eh-gold)' : '2px solid transparent',
                  cursor: 'pointer',
                  color: active ? 'var(--eh-gold)' : 'var(--eh-text-secondary)',
                  fontSize: 12,
                  letterSpacing: '0.02em',
                  textAlign: 'left',
                  padding: '9px 12px',
                  borderRadius: '0 6px 6px 0',
                  transition: 'color 0.2s, background 0.2s, border-color 0.2s',
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.color = 'var(--eh-text)'; e.currentTarget.style.background = 'rgba(201,164,93,0.04)' } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.color = 'var(--eh-text-secondary)'; e.currentTarget.style.background = 'none' } }}
              >
                <span style={{ fontSize: 10, color: active ? 'var(--eh-gold)' : 'var(--eh-text-muted)', minWidth: 14 }}>0{i + 1}</span>
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Bottom rule */}
        <div style={{ marginTop: 'auto', borderTop: '1px solid rgba(201,164,93,0.12)', paddingTop: 16 }}>
          <div style={{ fontSize: 9, color: 'var(--eh-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Illustrative data only
          </div>
        </div>
      </div>
    </div>
  )
}
