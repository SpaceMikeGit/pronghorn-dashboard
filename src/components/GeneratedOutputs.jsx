import { useState, useEffect } from 'react'

const STORAGE_KEY = 'pronghorn-generated-outputs'

export function saveOutput(label, text) {
  const existing = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]')
  const entry = { id: Date.now(), label, text, timestamp: new Date().toLocaleTimeString() }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify([entry, ...existing].slice(0, 20)))
  window.dispatchEvent(new CustomEvent('pronghorn-outputs-updated'))
}

export default function GeneratedOutputs() {
  const [open,    setOpen]    = useState(false)
  const [outputs, setOutputs] = useState([])
  const [expanded, setExpanded] = useState(null)

  const load = () => setOutputs(JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]'))

  useEffect(() => {
    load()
    const handler = () => load()
    window.addEventListener('pronghorn-outputs-updated', handler)
    return () => window.removeEventListener('pronghorn-outputs-updated', handler)
  }, [])

  const count = outputs.length

  return (
    <div className="gen-outputs">
      <div className="gen-outputs__divider" />
      <button
        className={`panel-nav__item gen-outputs__trigger${open ? ' panel-nav__item--active' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="panel-nav__num">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M2 2h8v7a1 1 0 01-1 1H3a1 1 0 01-1-1V2z" stroke="currentColor" strokeWidth="1.3" fill="none"/>
            <line x1="4" y1="5" x2="8" y2="5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            <line x1="4" y1="7" x2="6.5" y2="7" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        </span>
        <span>Generated Outputs{count > 0 ? ` (${count})` : ''}</span>
      </button>

      {open && (
        <div className="gen-outputs__drawer">
          {count === 0 ? (
            <div className="gen-outputs__empty">No saved outputs this session.</div>
          ) : (
            outputs.map(o => (
              <div key={o.id} className="gen-outputs__item">
                <div className="gen-outputs__item-header" onClick={() => setExpanded(expanded === o.id ? null : o.id)}>
                  <span className="gen-outputs__item-label">{o.label}</span>
                  <span className="gen-outputs__item-time">{o.timestamp}</span>
                </div>
                {expanded === o.id && (
                  <div className="gen-outputs__item-body">
                    <div className="gen-outputs__item-text">{o.text}</div>
                    <button
                      className="gen-outputs__copy"
                      onClick={() => navigator.clipboard?.writeText(o.text)}
                    >
                      Copy
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
          {count > 0 && (
            <button
              className="gen-outputs__clear"
              onClick={() => { sessionStorage.removeItem(STORAGE_KEY); load() }}
            >
              Clear all
            </button>
          )}
        </div>
      )}
    </div>
  )
}
