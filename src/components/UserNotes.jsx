import { useState, useEffect } from 'react'

/* Per-module scratch notes — persisted to localStorage keyed by moduleId */
export default function UserNotes({ moduleId }) {
  const storageKey = `pronghorn-notes-${moduleId}`
  const [open,  setOpen]  = useState(false)
  const [notes, setNotes] = useState(() => localStorage.getItem(storageKey) || '')

  useEffect(() => {
    localStorage.setItem(storageKey, notes)
  }, [notes, storageKey])

  return (
    <div className="user-notes">
      <div className="user-notes__divider" />
      <button
        className={`panel-nav__item user-notes__trigger${open ? ' panel-nav__item--active' : ''}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className="panel-nav__num">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <rect x="1.5" y="1.5" width="9" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" fill="none"/>
            <line x1="3.5" y1="4.5" x2="8.5" y2="4.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            <line x1="3.5" y1="6.5" x2="7" y2="6.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        </span>
        <span>Notes</span>
      </button>
      {open && (
        <div className="user-notes__panel">
          <textarea
            className="user-notes__textarea"
            placeholder="Add session notes..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
          {notes && (
            <button
              className="user-notes__clear"
              onClick={() => setNotes('')}
            >
              Clear
            </button>
          )}
        </div>
      )}
    </div>
  )
}
