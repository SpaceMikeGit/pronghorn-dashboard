import { useState, useEffect } from 'react'
import EHSidebar from './EHSidebar'
import {
  EH_CONTENT_PILLARS, EH_PLATFORM_STRATEGY, EH_CALENDAR_WEEKS,
} from '../../data/edmondsHonorMarketingOS'

const PILLAR_COLOR = {
  occasion:     { bg: 'rgba(201,164,93,0.12)',  text: 'var(--eh-gold)',         border: 'rgba(201,164,93,0.25)' },
  craft:        { bg: 'rgba(190,102,33,0.12)',  text: 'var(--eh-bourbon)',      border: 'rgba(190,102,33,0.2)' },
  culture:      { bg: 'rgba(127,163,91,0.12)',  text: 'var(--eh-success)',      border: 'rgba(127,163,91,0.2)' },
  conversation: { bg: 'rgba(165,141,101,0.10)', text: 'var(--eh-text-muted)',  border: 'rgba(165,141,101,0.15)' },
}

function PillarBadge({ pillarId, small }) {
  const pillar = EH_CONTENT_PILLARS.find(p => p.id === pillarId)
  const c = PILLAR_COLOR[pillarId] || PILLAR_COLOR.conversation
  return (
    <span style={{
      fontSize: small ? 9 : 10, letterSpacing: '0.06em',
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: small ? '2px 7px' : '3px 10px', whiteSpace: 'nowrap',
    }}>
      {pillar ? pillar.label : pillarId}
    </span>
  )
}

export default function EHContentCalendar() {
  const [leaving, setLeaving] = useState(false)
  const [entered, setEntered] = useState(false)
  const [activePillar, setActivePillar] = useState(null)

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  const filteredWeeks = activePillar
    ? EH_CALENDAR_WEEKS.map(w => ({
        ...w,
        entries: w.entries.filter(e => e.pillar === activePillar),
      })).filter(w => w.entries.length > 0)
    : EH_CALENDAR_WEEKS

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
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-gold)', marginBottom: 8 }}>Module 04</div>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: 'var(--eh-paper)', letterSpacing: '0.04em', marginBottom: 6 }}>
            Content &amp; Campaign Calendar
          </h1>
          <p style={{ fontSize: 12, color: 'var(--eh-text-muted)' }}>
            Content programming, pillar strategy, and platform scheduling across markets.
          </p>
        </div>

        <div style={{ borderBottom: '1px solid rgba(201,164,93,0.2)', margin: '24px 0' }} />

        {/* Content Pillars */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Content Pillars — Filter
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 4 }}>
            {EH_CONTENT_PILLARS.map(pillar => {
              const active = activePillar === pillar.id
              const c = PILLAR_COLOR[pillar.id]
              return (
                <button
                  key={pillar.id}
                  onClick={() => setActivePillar(active ? null : pillar.id)}
                  style={{
                    background: active ? c.bg : 'var(--eh-card)',
                    border: `1px solid ${active ? c.border : 'var(--eh-border)'}`,
                    borderRadius: 8, padding: '14px 16px',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.2s',
                    borderBottom: active ? `2px solid ${c.text}` : `1px solid var(--eh-border)`,
                  }}
                >
                  <div style={{ fontSize: 11, fontWeight: 500, color: active ? c.text : 'var(--eh-text)', marginBottom: 4 }}>
                    {pillar.label}
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--eh-text-muted)', lineHeight: 1.4 }}>
                    {pillar.desc}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Platform Strategy */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Platform Strategy
          </div>
          <div style={{ background: 'var(--eh-card)', border: '1px solid var(--eh-border)', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,164,93,0.15)' }}>
                  {['Platform', 'Frequency', 'Primary Pillar', 'Format Priority'].map(h => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left',
                      fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase',
                      color: 'var(--eh-text-muted)', fontWeight: 500,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EH_PLATFORM_STRATEGY.map((row, i) => (
                  <tr key={row.platform} style={{
                    borderBottom: i < EH_PLATFORM_STRATEGY.length - 1 ? '1px solid rgba(201,164,93,0.08)' : 'none',
                  }}>
                    <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--eh-paper)', fontWeight: 500 }}>{row.platform}</td>
                    <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--eh-gold)' }}>{row.frequency}</td>
                    <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--eh-text-secondary)' }}>{row.primaryPillar}</td>
                    <td style={{ padding: '13px 20px', fontSize: 12, color: 'var(--eh-text-muted)' }}>{row.formatPriority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4-Week Calendar */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            4-Week Sample Calendar
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredWeeks.map(week => (
              <div key={week.week} style={{ background: 'var(--eh-card)', border: '1px solid var(--eh-border)', borderRadius: 10, overflow: 'hidden' }}>
                <div style={{
                  padding: '12px 20px', borderBottom: '1px solid rgba(201,164,93,0.12)',
                  display: 'flex', alignItems: 'center', gap: 12,
                }}>
                  <span style={{ fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--eh-gold)', fontWeight: 500 }}>
                    Week {week.week}
                  </span>
                </div>
                <div>
                  {week.entries.map((entry, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 16,
                      padding: '12px 20px',
                      borderBottom: i < week.entries.length - 1 ? '1px solid rgba(201,164,93,0.06)' : 'none',
                    }}>
                      <span style={{
                        fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: 'var(--eh-text-muted)', minWidth: 28,
                      }}>
                        {entry.day}
                      </span>
                      <PillarBadge pillarId={entry.pillar} small />
                      <span style={{ fontSize: 12, color: 'var(--eh-text-secondary)', flex: 1 }}>{entry.copy}</span>
                      <span style={{
                        fontSize: 10, color: 'var(--eh-text-muted)',
                        background: 'rgba(242,237,228,0.04)', border: '1px solid rgba(242,237,228,0.08)',
                        borderRadius: 4, padding: '2px 8px', whiteSpace: 'nowrap',
                      }}>
                        {entry.format}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 32, fontSize: 10, color: 'var(--eh-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase', lineHeight: 1.6 }}>
          Sample calendar — content scheduling reflects Atlanta + Baltimore/DC priority markets. Illustrative data only.
        </div>
      </div>
    </div>
  )
}
