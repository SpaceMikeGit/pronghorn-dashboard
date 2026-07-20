import { useState, useEffect } from 'react'
import EHSidebar from './EHSidebar'
import { EH_PARTNERS } from '../../data/edmondsHonorMarketingOS'

const SCORE_LABELS = {
  audienceFit:   'Audience Fit',
  culturalCred:  'Cultural Credibility',
  luxury:        'Luxury Alignment',
  story:         'Story Alignment',
  commercial:    'Commercial Value',
  content:       'Content Potential',
  feasibility:   'Execution Feasibility',
  risk:          'Risk (inverse)',
}

const TIER_COLOR = {
  Priority:   { bg: 'rgba(127,163,91,0.12)', text: 'var(--eh-success)',  border: 'rgba(127,163,91,0.25)' },
  Selective:  { bg: 'rgba(190,102,33,0.12)', text: 'var(--eh-bourbon)', border: 'rgba(190,102,33,0.2)' },
  Watch:      { bg: 'rgba(165,141,101,0.10)', text: 'var(--eh-text-muted)', border: 'rgba(165,141,101,0.15)' },
}

function ScoreBar({ value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 3, background: 'rgba(201,164,93,0.10)', borderRadius: 2 }}>
        <div style={{
          height: '100%', width: `${value * 10}%`,
          background: value >= 8 ? 'var(--eh-gold)' : value >= 6 ? 'var(--eh-amber)' : 'var(--eh-text-muted)',
          borderRadius: 2,
        }} />
      </div>
      <span style={{ fontSize: 11, color: 'var(--eh-text-muted)', minWidth: 14, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function PartnerCard({ partner }) {
  const [expanded, setExpanded] = useState(false)
  const tier = TIER_COLOR[partner.tier] || TIER_COLOR.Watch

  return (
    <div
      className={partner.composite >= 8.3 ? 'eh-card-active' : ''}
      style={{
        background: 'var(--eh-card)',
        border: `1px solid ${partner.composite >= 8.3 ? 'var(--eh-gold)' : 'var(--eh-border)'}`,
        borderRadius: 10, padding: '22px 24px', marginBottom: 12,
        transition: 'border-color 0.2s',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--eh-paper)', marginBottom: 8 }}>
            {partner.name}
          </div>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{
              fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
              background: tier.bg, color: tier.text, border: `1px solid ${tier.border}`,
              borderRadius: 20, padding: '3px 10px',
            }}>
              {partner.tier}
            </span>
            <span style={{ fontSize: 11, color: 'var(--eh-text-muted)' }}>
              Brand Rightness Score: <strong style={{ color: 'var(--eh-gold)', fontSize: 14 }}>{partner.composite.toFixed(1)}</strong>
              <span style={{ color: 'var(--eh-text-muted)' }}> / 10</span>
            </span>
          </div>
        </div>

        <button
          onClick={() => setExpanded(e => !e)}
          style={{
            background: 'none', border: '1px solid var(--eh-border)',
            borderRadius: 6, padding: '6px 12px',
            color: 'var(--eh-text-muted)', fontSize: 11, cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--eh-gold)'; e.currentTarget.style.color = 'var(--eh-gold)' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--eh-border)'; e.currentTarget.style.color = 'var(--eh-text-muted)' }}
        >
          {expanded ? 'Hide Scores' : 'View Scores'}
        </button>
      </div>

      {/* Recommendation */}
      <div style={{
        fontSize: 12, color: 'var(--eh-text-secondary)', lineHeight: 1.6,
        borderLeft: '2px solid rgba(201,164,93,0.25)', paddingLeft: 14, marginBottom: expanded ? 16 : 0,
      }}>
        {partner.recommendation}
      </div>

      {/* Score breakdown */}
      {expanded && (
        <div style={{ marginTop: 16, borderTop: '1px solid rgba(201,164,93,0.12)', paddingTop: 16 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Score Breakdown
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px' }}>
            {Object.entries(SCORE_LABELS).map(([key, label]) => (
              <div key={key}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 10, color: 'var(--eh-text-muted)' }}>{label}</span>
                </div>
                <ScoreBar value={partner.scores[key]} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function EHPartnershipFit() {
  const [leaving, setLeaving] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  const sorted = [...EH_PARTNERS].sort((a, b) => b.composite - a.composite)

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100vh',
      transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
      opacity: (leaving || !entered) ? 0 : 1,
      transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
    }}>
      <EHSidebar setLeaving={setLeaving} />

      <div style={{ flex: 1, background: 'var(--eh-bg)', overflowY: 'auto', padding: '36px 40px' }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-gold)', marginBottom: 8 }}>Module 03</div>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: 'var(--eh-paper)', letterSpacing: '0.04em', marginBottom: 6 }}>
            Partnership Fit Matrix
          </h1>
          <p style={{ fontSize: 12, color: 'var(--eh-text-muted)' }}>
            Brand-right scoring for hotels, chefs, galleries, cultural partners, creators, and events.
          </p>
        </div>

        <div style={{ borderBottom: '1px solid rgba(201,164,93,0.2)', margin: '24px 0' }} />

        {/* Score model */}
        <div style={{
          background: 'rgba(201,164,93,0.05)', border: '1px solid rgba(201,164,93,0.15)',
          borderRadius: 8, padding: '16px 20px', marginBottom: 28,
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--eh-gold)', marginBottom: 8, fontWeight: 500 }}>
            Brand Rightness Score Model
          </div>
          <div style={{ fontSize: 11, color: 'var(--eh-text-secondary)', lineHeight: 1.7, fontFamily: 'monospace' }}>
            (Audience Fit + Cultural Credibility + Luxury Alignment + Story Alignment + Commercial Value + Content Potential + Execution Feasibility + (10 &minus; Risk)) &divide; 8
          </div>
        </div>

        {/* Partner cards sorted by score */}
        {sorted.map(p => <PartnerCard key={p.name} partner={p} />)}

        <div style={{ marginTop: 24, fontSize: 10, color: 'var(--eh-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Illustrative prototype data only
        </div>
      </div>
    </div>
  )
}
