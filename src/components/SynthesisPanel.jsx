import { useState } from 'react'
import { useUser } from '../context/UserContext'
import { getSynthesisOutput, USER_PROFILES } from '../data/userProfiles'

/* Demo mode: outputs from static userProfiles.js · No API connection required
   Live mode: REQUIRES Active Anthropic API connection · Env: VITE_ANTHROPIC_API_KEY */

/* ── Synthesis Panel ────────────────────────────────────────────────── */
export default function SynthesisPanel({ moduleId }) {
  const { profile, demoMode, demoUser, setDemoUser, setDemoMode } = useUser()
  const [dismissed, setDismissed] = useState(false)
  const [showDemoToggle, setShowDemoToggle] = useState(false)

  if (dismissed) return null

  // Determine which user to show synthesis for
  const activeUserId = demoMode ? demoUser : (profile?.userId || null)
  const output = activeUserId ? getSynthesisOutput(activeUserId, moduleId) : null

  // If no profile and not in demo mode, prompt completion
  if (!output && !demoMode) {
    if (!profile) {
      return (
        <div className="synthesis-panel synthesis-panel--prompt">
          <div className="synthesis-panel__icon">◎</div>
          <div className="synthesis-panel__text">
            Complete your profile to unlock personalized insights for this module.
          </div>
          <button className="synthesis-panel__dismiss" onClick={() => setDismissed(true)}>✕</button>
        </div>
      )
    }
    return null
  }

  const user = USER_PROFILES[activeUserId]

  return (
    <div className="synthesis-panel">
      <div className="synthesis-panel__bar">
        <div className="synthesis-panel__left">
          <span className="synthesis-panel__icon">◎</span>
          <span className="synthesis-panel__label">
            {demoMode ? `Synthesis · ${user?.name || 'Demo'}` : 'Synthesis'}
          </span>
        </div>
        <div className="synthesis-panel__controls">
          {/* Hidden demo toggle — accessible for presentation */}
          <button
            className="synthesis-panel__demo-btn"
            onClick={() => setShowDemoToggle(s => !s)}
            title="Demo mode"
          >
            ⚙
          </button>
          <button className="synthesis-panel__dismiss" onClick={() => setDismissed(true)}>✕</button>
        </div>
      </div>

      <div className="synthesis-panel__content">
        {output}
      </div>

      {/* Demo mode selector — hidden from normal view */}
      {showDemoToggle && (
        <div className="synthesis-panel__demo-selector">
          <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Demo Mode — Select User Persona
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {Object.values(USER_PROFILES).map(u => (
              <button
                key={u.id}
                className={`synthesis-panel__persona-btn${demoUser === u.id ? ' synthesis-panel__persona-btn--active' : ''}`}
                onClick={() => { setDemoUser(u.id); setDemoMode(true) }}
              >
                {u.name.split(' ')[0]}
              </button>
            ))}
            <button
              className="synthesis-panel__persona-btn"
              onClick={() => { setDemoMode(false) }}
              style={{ color: '#F4725A' }}
            >
              Off
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
