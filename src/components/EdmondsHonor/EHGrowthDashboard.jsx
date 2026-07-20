import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import EHSidebar from './EHSidebar'
import {
  EH_KPIS, EH_ACTIVATION_HEALTH, EH_MARKET_HEAT,
  EH_LEADERSHIP_DECISIONS, EH_WEEKLY_SUMMARY,
} from '../../data/edmondsHonorMarketingOS'

const HEAT_ICON = { high: '🔴', medium: '🟡', watch: '⚪' }
const HEALTH_MAX = 15

function KPICard({ kpi }) {
  if (kpi.hero) {
    return (
      <div style={{
        background: 'linear-gradient(135deg, #EAA357 0%, #BE6621 48%, #743805 100%)',
        borderRadius: 10, padding: '20px 22px',
        gridColumn: 'span 1',
      }}>
        <div style={{ fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: '#090502', marginBottom: 8, fontWeight: 500 }}>
          {kpi.label}
        </div>
        <div style={{ fontSize: 28, fontWeight: 300, color: '#090502', letterSpacing: '-0.01em' }}>
          {kpi.value}
        </div>
      </div>
    )
  }
  return (
    <div style={{
      background: 'var(--eh-card)', border: '1px solid var(--eh-border)',
      borderRadius: 10, padding: '20px 22px',
    }}>
      <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 8 }}>
        {kpi.label}
      </div>
      <div style={{ fontSize: 24, fontWeight: 300, color: 'var(--eh-text)', letterSpacing: '-0.01em' }}>
        {kpi.value}
      </div>
    </div>
  )
}

export default function EHGrowthDashboard() {
  const navigate  = useNavigate()
  const [leaving, setLeaving] = useState(false)
  const [entered, setEntered] = useState(false)

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  const now = new Date()
  const weekLabel = `Week of ${now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
  const timeLabel = 'this morning, 8:14 AM'

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100vh',
      transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
      opacity: (leaving || !entered) ? 0 : 1,
      transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
    }}>
      <EHSidebar setLeaving={setLeaving} />

      {/* Main content */}
      <div style={{
        flex: 1, background: 'var(--eh-bg)', overflowY: 'auto',
        padding: '36px 40px',
      }}>
        {/* Page header */}
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-gold)', marginBottom: 8 }}>
            Module 01
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: 'var(--eh-paper)', letterSpacing: '0.04em', marginBottom: 6 }}>
            Executive Growth Dashboard
          </h1>
          <p style={{ fontSize: 12, color: 'var(--eh-text-muted)' }}>
            Spend, activation, market heat, content performance, and leadership decisions in one view.
          </p>
        </div>

        <div style={{ borderBottom: '1px solid rgba(201,164,93,0.2)', margin: '24px 0' }} />

        {/* KPI grid */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Key Performance Indicators — YTD
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 32 }}>
          {EH_KPIS.map((kpi, i) => <KPICard key={i} kpi={kpi} />)}
        </div>

        {/* Two-column section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>

          {/* Activation Health */}
          <div style={{ background: 'var(--eh-card)', border: '1px solid var(--eh-border)', borderRadius: 10, padding: '22px 24px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--eh-paper)', marginBottom: 18, fontWeight: 500 }}>
              Activation Health
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {EH_ACTIVATION_HEALTH.map((item) => (
                <div key={item.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--eh-text-secondary)' }}>{item.label}</span>
                    <span style={{ fontSize: 11, color: 'var(--eh-gold)', fontWeight: 500 }}>{item.value}</span>
                  </div>
                  <div style={{ height: 3, background: 'rgba(201,164,93,0.12)', borderRadius: 2 }}>
                    <div style={{
                      height: '100%',
                      width: `${Math.min((item.value / HEALTH_MAX) * 100, 100)}%`,
                      background: 'linear-gradient(90deg, var(--eh-gold), var(--eh-amber))',
                      borderRadius: 2,
                      transition: 'width 0.6s ease',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership Decisions */}
          <div style={{ background: 'var(--eh-card)', border: '1px solid var(--eh-border)', borderRadius: 10, padding: '22px 24px' }}>
            <div style={{ fontSize: 10, letterSpacing: '0.10em', textTransform: 'uppercase', color: 'var(--eh-paper)', marginBottom: 18, fontWeight: 500 }}>
              Leadership Decisions Needed
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {EH_LEADERSHIP_DECISIONS.map((dec, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span style={{ color: 'var(--eh-amber)', fontSize: 14, lineHeight: 1.1, marginTop: 1, flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: 12, color: 'var(--eh-text-secondary)', lineHeight: 1.5 }}>{dec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Market Heat */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Market Heat
          </div>
          <div style={{ background: 'var(--eh-card)', border: '1px solid var(--eh-border)', borderRadius: 10, overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(201,164,93,0.15)' }}>
                  {['Market', 'Heat', 'Key Signal', 'Next Action'].map(h => (
                    <th key={h} style={{
                      padding: '12px 20px', textAlign: 'left',
                      fontSize: 9, letterSpacing: '0.10em', textTransform: 'uppercase',
                      color: 'var(--eh-text-muted)', fontWeight: 500,
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {EH_MARKET_HEAT.map((row, i) => (
                  <tr key={row.market} style={{
                    borderBottom: i < EH_MARKET_HEAT.length - 1 ? '1px solid rgba(201,164,93,0.08)' : 'none',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(201,164,93,0.02)',
                  }}>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--eh-text)', fontWeight: 500 }}>{row.market}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13 }}>{HEAT_ICON[row.heat]}</td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--eh-text-secondary)' }}>{row.signal}</td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--eh-text-muted)' }}>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pre-generated output panel */}
        <div>
          <div style={{ fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 14 }}>
            Generated Output
          </div>
          <div style={{
            background: '#0C0A07', border: '1px solid rgba(201,164,93,0.2)',
            borderLeft: '3px solid var(--eh-gold)',
            borderRadius: 10, padding: '24px 28px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--eh-paper)', letterSpacing: '0.04em' }}>
                  Weekly Leadership Summary
                </div>
                <div style={{ fontSize: 10, color: 'var(--eh-text-muted)', marginTop: 3 }}>
                  Generated: {timeLabel} &mdash; {weekLabel}
                </div>
              </div>
              <div style={{
                fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--eh-gold)', background: 'rgba(201,164,93,0.08)',
                border: '1px solid rgba(201,164,93,0.2)', borderRadius: 4, padding: '4px 8px',
              }}>
                Auto-generated
              </div>
            </div>
            <pre style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, lineHeight: 1.8, color: 'var(--eh-text-secondary)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
            }}>
              {EH_WEEKLY_SUMMARY}
            </pre>
          </div>
        </div>

        {/* Source note */}
        <div style={{ marginTop: 40, fontSize: 10, color: 'var(--eh-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Illustrative prototype data only
        </div>
      </div>
    </div>
  )
}
