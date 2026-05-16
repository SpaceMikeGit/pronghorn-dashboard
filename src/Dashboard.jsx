import { useState, useMemo, useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useCounter } from './hooks/useCounter'
import MissionModule     from './modules/MissionModule'
import PortfolioModule   from './modules/PortfolioModule'
import TalentModule      from './modules/TalentModule'
import CompetitiveModule from './modules/CompetitiveModule'
import AIModule          from './modules/AIModule'
import QuickActions from './components/QuickActions'
import Greeting from './components/Greeting'
import HomeButton from './components/HomeButton'
import UserNotes        from './components/UserNotes'
import GeneratedOutputs from './components/GeneratedOutputs'

/* ── Module registry ──────────────────────────────────────────────── */
const MODULES = [
  { id: 'mission',     num: '01', label: 'Mission Progress' },
  { id: 'portfolio',   num: '02', label: 'Portfolio Health' },
  { id: 'talent',      num: '03', label: 'Talent Pipeline' },
  { id: 'competitive', num: '04', label: 'Competitive Position' },
  { id: 'ai',          num: '05', label: 'AI & Infrastructure' },
]


/* ── Left panel ───────────────────────────────────────────────────── */
function LeftPanel({ activeModule, onModuleChange, onLogoClick, setLeaving }) {
  const current  = MODULES.find(m => m.id === activeModule)
  const bgRef    = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  /* ── Ken Burns zoom-out + inverse parallax on mouse ──────────────── */
  useEffect(() => {
    const bg = bgRef.current
    if (!bg) return

    const KB_MS = 8000
    let startTime  = null
    let rafId      = null
    let kbDone     = false
    let px = 0, py = 0          // current parallax offset

    // Set initial scale immediately — prevents first-frame flash
    bg.style.transformOrigin = 'center center'
    bg.style.transform       = 'scale(1.1)'

    const apply = scale =>
      (bg.style.transform = `scale(${scale.toFixed(4)}) translate(${px.toFixed(1)}px,${py.toFixed(1)}px)`)

    // Ken Burns rAF loop (runs for exactly 8 s)
    const tick = ts => {
      if (!startTime) startTime = ts
      const t  = Math.min((ts - startTime) / KB_MS, 1)
      const e  = 1 - Math.pow(1 - t, 3)       // ease-out cubic
      apply(1.1 - 0.1 * e)
      if (t < 1) rafId = requestAnimationFrame(tick)
      else { kbDone = true; rafId = null }
    }

    // Parallax — inverse to mouse, max ±10 px
    const onMove = e => {
      px = (e.clientX / window.innerWidth  - 0.5) * -12
      py = (e.clientY / window.innerHeight - 0.5) * -12
      if (kbDone) apply(1.0)
      // During KB the next tick picks up the updated px/py automatically
    }

    rafId = requestAnimationFrame(tick)
    window.addEventListener('mousemove', onMove, { passive: true })

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  const navPortal = menuOpen ? createPortal(
    <nav
      className="panel-nav panel-nav--open"
      style={{
        position: 'fixed',
        top: 60,
        left: 0,
        width: '100vw',
        zIndex: 9999,
        background: '#0A0908',
      }}
    >
      {MODULES.map(m => {
        const active = m.id === activeModule
        return (
          <button
            key={m.id}
            className={`panel-nav__item${active ? ' panel-nav__item--active' : ''}`}
            onClick={() => { onModuleChange(m.id); setMenuOpen(false) }}
          >
            <span className="panel-nav__num">{m.num}</span>
            <span>{m.label}</span>
          </button>
        )
      })}
    </nav>,
    document.body
  ) : null

  return (
    <>
      <div className="left-panel">
        <div className="left-panel__bg" ref={bgRef} />
        <div className="left-panel__overlay" />
        <div className="left-panel__content">

          <HomeButton setLeaving={setLeaving} />

          {/* Hamburger — mobile only */}
          <button
            className="hamburger-btn"
            aria-label="Open navigation"
            onClick={() => setMenuOpen(o => !o)}
          >
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              : <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            }
          </button>
          <div className="panel-logo-gap" />

          {/* Personalized greeting */}
          <Greeting />

          {/* Active module name */}
          <div className="panel-module-name">{current.label}</div>

          {/* Desktop nav — hidden on mobile via CSS */}
          <nav className="panel-nav">
            {MODULES.map(m => {
              const active = m.id === activeModule
              return (
                <button
                  key={m.id}
                  className={`panel-nav__item${active ? ' panel-nav__item--active' : ''}`}
                  onClick={() => onModuleChange(m.id)}
                >
                  <span className="panel-nav__num">{m.num}</span>
                  <span>{m.label}</span>
                </button>
              )
            })}
          </nav>

          <UserNotes moduleId="module01" />
          <QuickActions moduleContext="Impact Dashboard" moduleColor="#1B5C3A" />
          <GeneratedOutputs />

        </div>
      </div>
      {navPortal}
    </>
  )
}

/* ── Right panel ──────────────────────────────────────────────────── */
function RightPanel({ activeModule, animateIn, activeTab, setActiveTab, timeRange, setTimeRange }) {
  return (
    <div className="right-panel">
      {/* Sub-nav */}
      <div className="sub-nav" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex' }}>
          {['Overview', 'Details'].map(tab => {
            const id = tab.toLowerCase()
            return (
              <button
                key={id}
                className={`sub-nav__tab${activeTab === id ? ' sub-nav__tab--active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                {tab}
              </button>
            )
          })}
        </div>
        {activeModule === 'mission' && (
          <div style={{ display: 'flex', gap: 4, paddingRight: 32 }}>
            {[30, 60, 90].map(d => (
              <button
                key={d}
                onClick={() => setTimeRange(d)}
                style={{
                  background: timeRange === d ? 'rgba(27,92,58,0.22)' : 'transparent',
                  border: `1px solid ${timeRange === d ? '#1B5C3A' : 'rgba(242,237,228,0.12)'}`,
                  borderRadius: 4, color: timeRange === d ? '#8ED44A' : '#5A554F',
                  fontSize: 11, padding: '4px 10px', cursor: 'pointer',
                  letterSpacing: '0.04em', transition: 'all 180ms ease',
                }}
              >
                {d}d
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Module content */}
      {activeModule === 'mission' && (
        <MissionModule animateIn={animateIn} activeTab={activeTab} timeRange={timeRange} />
      )}

      {activeModule === 'portfolio' && (
        <PortfolioModule animateIn={animateIn} activeTab={activeTab} />
      )}

      {activeModule === 'talent' && (
        <TalentModule animateIn={animateIn} activeTab={activeTab} />
      )}

      {activeModule === 'competitive' && (
        <CompetitiveModule animateIn={animateIn} activeTab={activeTab} />
      )}

      {activeModule === 'ai' && (
        <AIModule animateIn={animateIn} activeTab={activeTab} />
      )}
    </div>
  )
}

/* ── Dashboard root ───────────────────────────────────────────────── */
export default function App() {
  const [activeModule, setActiveModule] = useState('mission')
  const [activeTab, setActiveTab] = useState('overview')
  const [animatedModules, setAnimatedModules] = useState(() => new Set())
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [timeRange, setTimeRange] = useState(90)

  useEffect(() => {
    // Trigger slide-in on mount
    const t = setTimeout(() => setEntered(true), 20)
    return () => clearTimeout(t)
  }, [])

  // Trigger initial module animation after first paint (not on load)
  useEffect(() => {
    setAnimatedModules(prev => new Set([...prev, 'mission']))
  }, [])

  const handleModuleChange = useCallback((id) => {
    setActiveModule(id)
    setAnimatedModules(prev => prev.has(id) ? prev : new Set([...prev, id]))
  }, [])

  const handleLogoClick = useCallback(() => {
    setActiveModule('mission')
    setActiveTab('overview')
    setAnimatedModules(prev => prev.has('mission') ? prev : new Set([...prev, 'mission']))
  }, [])

  const animateIn = animatedModules.has(activeModule)

  return (
    <div
      className="dashboard-shell"
      style={{
        transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
        opacity:   (leaving || !entered) ? 0 : 1,
        transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      <LeftPanel
        activeModule={activeModule}
        onModuleChange={handleModuleChange}
        onLogoClick={handleLogoClick}
        setLeaving={setLeaving}
      />
      <RightPanel
        activeModule={activeModule}
        animateIn={animateIn}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
      />
    </div>
  )
}
