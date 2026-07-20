import { useState, useEffect } from 'react'
import EHSidebar from './EHSidebar'
import { EH_PREAKNESS_RECAP } from '../../data/edmondsHonorMarketingOS'

const BLANK_FIELDS = [
  { label: 'Event Name',             type: 'text' },
  { label: 'Market',                 type: 'text' },
  { label: 'Date',                   type: 'text' },
  { label: 'Budget',                 type: 'text' },
]

const BLANK_METRICS = [
  'Qualified Engagements',
  'Account Introductions',
  'Content Assets',
]

const BLANK_AREAS = [
  'What Worked',
  'What to Improve',
  'Transferable to Playbook',
]

const STATUS_OPTIONS = ['Concept', 'In Production', 'Live', 'Recap Complete', 'Learnings Added']

export default function EHEventRecaps() {
  const [leaving, setLeaving] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100vh',
      transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
      opacity: (leaving || !entered) ? 0 : 1,
      transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
    }}>
      <EHSidebar setLeaving={setLeaving} />

      <div style={{ flex: 1, background: 'var(--eh-bg)', overflowY: 'auto', padding: '36px 40px' }}>

        {/* Page header */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-gold)', marginBottom: 8 }}>Module 05</div>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: 'var(--eh-paper)', letterSpacing: '0.04em', marginBottom: 6 }}>
            Post-Event Recap Generator
          </h1>
          <p style={{ fontSize: 12, color: 'var(--eh-text-muted)' }}>
            Capture activation outcomes, surface learnings, and build the repeatable playbook.
          </p>
        </div>

        <div style={{ borderBottom: '1px solid rgba(201,164,93,0.2)', margin: '24px 0' }} />

        {/* Pre-generated recap panel */}
        <div style={{ marginBottom: 36 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Generated Output
          </div>
          <div style={{
            background: '#0C0A07',
            border: '1px solid rgba(201,164,93,0.2)',
            borderLeft: '3px solid var(--eh-gold)',
            borderRadius: 10, padding: '24px 28px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--eh-paper)', letterSpacing: '0.03em', marginBottom: 4 }}>
                  Post-Event Recap — Preakness Cultural Weekend
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {['Baltimore', 'June 2025', 'Learnings Added'].map((tag, i) => (
                    <span key={i} style={{
                      fontSize: 10, letterSpacing: '0.06em',
                      color: 'var(--eh-text-muted)',
                      borderRight: i < 2 ? '1px solid rgba(201,164,93,0.2)' : 'none',
                      paddingRight: i < 2 ? 12 : 0,
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
              <div style={{
                fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--eh-gold)', background: 'rgba(201,164,93,0.08)',
                border: '1px solid rgba(201,164,93,0.2)', borderRadius: 4, padding: '4px 8px',
              }}>
                Learnings Added
              </div>
            </div>

            <pre style={{
              fontFamily: "'DM Sans', monospace",
              fontSize: 12, lineHeight: 1.85, color: 'var(--eh-text-secondary)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
            }}>
              {EH_PREAKNESS_RECAP}
            </pre>
          </div>
        </div>

        {/* Gold rule */}
        <div style={{ borderBottom: '1px solid rgba(201,164,93,0.15)', marginBottom: 32 }} />

        {/* Blank recap template — read-only wireframe */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 6 }}>
            Recap Template
          </div>
          <div style={{ fontSize: 11, color: 'var(--eh-text-muted)', marginBottom: 18, lineHeight: 1.5 }}>
            Structured framework for capturing new activations. Fields are illustrative — this shows the system design.
          </div>

          <div style={{
            background: 'var(--eh-card)', border: '1px solid var(--eh-border)',
            borderRadius: 10, padding: '28px 28px',
          }}>

            {/* Basic fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px 32px', marginBottom: 28 }}>
              {BLANK_FIELDS.map(f => (
                <div key={f.label}>
                  <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 6 }}>
                    {f.label}
                  </div>
                  <div style={{
                    height: 36, background: 'rgba(242,237,228,0.03)',
                    border: '1px solid rgba(201,164,93,0.12)', borderRadius: 6,
                    display: 'flex', alignItems: 'center', padding: '0 12px',
                  }}>
                    <span style={{ fontSize: 11, color: 'rgba(165,141,101,0.4)', fontStyle: 'italic' }}>
                      Enter {f.label.toLowerCase()}...
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Gold rule */}
            <div style={{ borderBottom: '1px solid rgba(201,164,93,0.10)', marginBottom: 24 }} />

            {/* Outcome metrics */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-paper)', marginBottom: 14, fontWeight: 500 }}>
                Outcomes
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px 24px' }}>
                {BLANK_METRICS.map(m => (
                  <div key={m}>
                    <div style={{ fontSize: 10, color: 'var(--eh-text-muted)', marginBottom: 6 }}>{m}</div>
                    <div style={{
                      height: 36, background: 'rgba(242,237,228,0.03)',
                      border: '1px solid rgba(201,164,93,0.12)', borderRadius: 6,
                      display: 'flex', alignItems: 'center', padding: '0 12px',
                    }}>
                      <span style={{ fontSize: 11, color: 'rgba(165,141,101,0.4)', fontStyle: 'italic' }}>0</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gold rule */}
            <div style={{ borderBottom: '1px solid rgba(201,164,93,0.10)', marginBottom: 24 }} />

            {/* Text areas */}
            {BLANK_AREAS.map(area => (
              <div key={area} style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-paper)', marginBottom: 8, fontWeight: 500 }}>
                  {area}
                </div>
                <div style={{
                  height: 80, background: 'rgba(242,237,228,0.03)',
                  border: '1px solid rgba(201,164,93,0.12)', borderRadius: 6,
                  display: 'flex', alignItems: 'flex-start', padding: '12px',
                }}>
                  <span style={{ fontSize: 11, color: 'rgba(165,141,101,0.4)', fontStyle: 'italic' }}>
                    {area.toLowerCase()}...
                  </span>
                </div>
              </div>
            ))}

            {/* Gold rule */}
            <div style={{ borderBottom: '1px solid rgba(201,164,93,0.10)', marginBottom: 20 }} />

            {/* Status selector */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-paper)', marginBottom: 12, fontWeight: 500 }}>
                Status
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(s => (
                  <span key={s} style={{
                    fontSize: 10, letterSpacing: '0.05em',
                    background: 'rgba(242,237,228,0.03)', color: 'var(--eh-text-muted)',
                    border: '1px solid rgba(201,164,93,0.12)', borderRadius: 20,
                    padding: '5px 14px', cursor: 'default',
                  }}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 10, color: 'var(--eh-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Illustrative prototype data only
        </div>
      </div>
    </div>
  )
}
