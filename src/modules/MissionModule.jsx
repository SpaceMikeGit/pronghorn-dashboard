import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useCounterAnimation } from '../hooks/useCounterAnimation'
import { verticalBarAnimations, chartVisited } from '../utils/chartDefaults'
import AIAction from '../components/AIAction'
import SynthesisPanel from '../components/SynthesisPanel'

Chart.register(...registerables)

/* ── Static data ──────────────────────────────────────────────────── */
const YEARS        = ['2021', '2022', '2023', '2024', '2025']
const BRANDS_BY_YR = [5, 8, 11, 10, 8]          // 39 brands, 70+ investment rounds cumulative
const TARGET_PACE  = [6, 6, 6, 6, 6]             // 57 brands ÷ 10 yrs ≈ 6/yr

const CHART_OPTS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2500,
    easing: 'easeOutQuart',
    delay: ctx => (ctx.type === 'data' && ctx.mode === 'default' && ctx.datasetIndex === 0
      ? ctx.dataIndex * 80 : 0),
  },
  animations: verticalBarAnimations,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1A1916',
      titleColor:      '#F2EDE4',
      bodyColor:       '#8C8479',
      borderColor:     'rgba(242,237,228,0.10)',
      borderWidth:     1,
      padding:         10,
      callbacks: {
        label: ctx => ` ${ctx.parsed.y} brand${ctx.parsed.y !== 1 ? 's' : ''}`,
      },
    },
  },
  scales: {
    x: {
      grid:  { color: 'rgba(242,237,228,0.04)', drawBorder: false },
      ticks: { color: '#5A554F', font: { family: 'DM Sans', size: 11 } },
      border:{ display: false },
    },
    y: {
      grid:        { color: 'rgba(242,237,228,0.04)', drawBorder: false },
      ticks:       { color: '#5A554F', font: { family: 'DM Sans', size: 11 }, stepSize: 4 },
      border:      { display: false },
      beginAtZero: true,
      max:         16,
    },
  },
}

const SOURCE_AUDIT = {
  investments: { source: 'Pronghorn 2025 Impact Report', methodology: 'Cumulative count of investment rounds across all portfolio brands since 2021.', confidence: 'High' },
  economic:    { source: 'Pronghorn 2025 Impact Report', methodology: 'Aggregate economic impact calculated from direct revenue, employment, and community investment data across portfolio companies.', confidence: 'High' },
  support:     { source: 'Pronghorn 2025 Impact Report', methodology: 'Headcount-based count of individuals receiving direct program support across Career Accelerator, Spirit Forward, and advisory programs.', confidence: 'Medium — self-reported by program participants' },
  goal:        { source: 'Pronghorn-reported / Independent analysis', methodology: '39 of 57-brand investment goal achieved as of FY25. Three-year target window originally set at fund inception.', confidence: 'High' },
}

/* ── Component ────────────────────────────────────────────────────── */
export default function MissionModule({ animateIn, activeTab, timeRange = 90 }) {
  const containerRef  = useRef(null)
  const chartRef      = useRef(null)
  const chartInstance = useRef(null)
  useCounterAnimation('mission', animateIn, containerRef, activeTab)

  const [barsReady, setBarsReady] = useState(false)
  const [auditOpen, setAuditOpen] = useState(null)

  useEffect(() => {
    if (!animateIn) return
    const t = setTimeout(() => setBarsReady(true), 30)
    return () => clearTimeout(t)
  }, [animateIn])

  useEffect(() => {
    if (!animateIn || !chartRef.current) return
    const existing = Chart.getChart(chartRef.current)
    if (existing) existing.destroy()
    chartInstance.current?.destroy()

    const isFirstTime = !chartVisited.has('mission')
    chartVisited.add('mission')

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels: YEARS,
        datasets: [
          {
            label:           'Brands invested',
            data:            BRANDS_BY_YR,
            backgroundColor: 'rgba(242,237,228,0.70)',
            borderColor:     'rgba(242,237,228,0.50)',
            borderWidth:     1,
            borderRadius:    3,
            order:           2,
          },
          {
            label:       'Target pace',
            data:        TARGET_PACE,
            type:        'line',
            borderColor: 'rgba(244,114,90,0.65)',
            borderWidth: 1.5,
            borderDash:  [4, 4],
            pointRadius: 0,
            fill:        false,
            order:       1,
            tension:     0,
          },
        ],
      },
      options: isFirstTime ? CHART_OPTS : { ...CHART_OPTS, animation: false, animations: {} },
    })

    return () => { chartInstance.current?.destroy(); chartInstance.current = null }
  }, [animateIn, activeTab])

  const AuditPanel = ({ id, label }) => {
    const info = SOURCE_AUDIT[id]
    const open = auditOpen === id
    return (
      <div style={{ marginTop: 8, borderTop: '1px solid rgba(242,237,228,0.06)', paddingTop: 6 }}>
        <button
          onClick={() => setAuditOpen(open ? null : id)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6, padding: 0 }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? 'rotate(90deg)' : 'none', transition: '180ms' }}>
            <path d="M3 2L7 5L3 8" stroke="#5A554F" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: 10, color: '#5A554F', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Source audit</span>
        </button>
        {open && (
          <div style={{ marginTop: 8, padding: '8px 10px', background: 'rgba(242,237,228,0.03)', borderRadius: 4, borderLeft: '2px solid rgba(242,237,228,0.1)' }}>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Source · </span>
              <span style={{ fontSize: 11, color: '#8C8479' }}>{info.source}</span>
            </div>
            <div style={{ marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Methodology · </span>
              <span style={{ fontSize: 11, color: '#8C8479' }}>{info.methodology}</span>
            </div>
            <div>
              <span style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Confidence · </span>
              <span style={{ fontSize: 11, color: info.confidence === 'High' ? '#8ED44A' : '#F2EDE4' }}>{info.confidence}</span>
            </div>
          </div>
        )}
      </div>
    )
  }

  /* ── Overview ───────────────────────────────────────────────────── */
  if (activeTab === 'overview') return (
    <div className="content-area" ref={containerRef}>
      <SynthesisPanel moduleId="module01" />
      <p className="section-header">Mission Progress</p>
      <p className="module-explainer">
        A real-time view of Pronghorn's mission performance across careers, brands, and economic impact — built to the standard that Diageo milestone conversations and third-party scrutiny require.
      </p>
      <p className="section-subheader">
        Developing a scalable template to diversify any industry — driving innovation and accelerating growth.
        {timeRange !== 90 && <span style={{ marginLeft: 8, fontSize: 11, color: '#5A554F' }}>· {timeRange}-day view</span>}
      </p>

      {/* KPI row */}
      <div className="grid-4">
        <div className="card">
          <div className="card-title">Total Investments</div>
          <div className="metric-value animated-counter" data-target="70" data-suffix="+">0+</div>
          <div className="metric-label">Fueling 39 Active Brands</div>
          <div className="metric-sublabel">Since 2021</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
          <AuditPanel id="investments" />
        </div>

        <div className="card card--hero">
          <div className="card-title">Economic Impact</div>
          <div className="metric-value animated-counter" data-target="428" data-prefix="$" data-suffix="M">$0M</div>
          <div className="metric-label">Cumulative · vs $364M goal</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>+18% ahead of pace</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
          <AuditPanel id="economic" />
        </div>

        <div className="card">
          <div className="card-title">FY25 Direct Support</div>
          <div className="metric-value animated-counter" data-target="330" data-suffix="+">0+</div>
          <div className="metric-label">Individuals supported this year alone · Across all programs</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
          <AuditPanel id="support" />
        </div>

        <div className="card">
          <div className="card-title">Investment Goal Progress</div>
          <div className="metric-value animated-counter" data-target="91" data-suffix="%">0%</div>
          <div className="metric-label">39 of 43 brands · Three-year target</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
          <AuditPanel id="goal" />
        </div>
      </div>

      {/* Chart + callouts */}
      <div className="grid-2">
        {/* Bar chart */}
        <div className="card">
          <div className="card-title">Annual Brand Investment vs Target Pace</div>
          <div style={{ position: 'relative', height: 168 }}>
            <canvas ref={chartRef} />
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A554F' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(242,237,228,0.70)', flexShrink: 0, display: 'inline-block' }} />
              Brands invested
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A554F' }}>
              <span style={{ width: 16, height: 1.5, background: 'rgba(244,114,90,0.65)', flexShrink: 0, display: 'inline-block' }} />
              Target pace (6/yr)
            </span>
          </div>
          <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn-reported · 2021–2025</div>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Progress bars */}
          <div className="card">
            <div className="card-title">Mission Pace</div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>Investments toward goal</span>
                <span style={{ fontSize: 12, color: '#F4725A', fontWeight: 500 }}>74%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--cream" style={{ width: barsReady ? '74%' : '0%', transition: 'width 2.5s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>Timeline elapsed (Yr 5 of 10)</span>
                <span style={{ fontSize: 12, color: '#8C8479', fontWeight: 400 }}>50%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--muted" style={{ width: barsReady ? '50%' : '0%', transition: 'width 2.5s cubic-bezier(0.16,1,0.3,1) 80ms' }} />
              </div>
            </div>

            <div className="source-tag" style={{ marginTop: 12 }}>24-point lead over linear pace</div>
          </div>

          {/* Market outperformance */}
          <div className="card border-l-accent" style={{ flex: 1 }}>
            <div className="card-title">Market Outperformance — Last 12 Months</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>Revenue growth</span>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 16, fontWeight: 300, color: '#8ED44A' }}>+12%</span>
                  <span style={{ fontSize: 11, color: '#5A554F' }}>vs −3.8% market</span>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>Volume growth</span>
                <div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}>
                  <span style={{ fontSize: 16, fontWeight: 300, color: '#8ED44A' }}>+9%</span>
                  <span style={{ fontSize: 11, color: '#5A554F' }}>vs −4.2% market</span>
                </div>
              </div>
            </div>
            <span className="pill pill--green">Portfolio vs. Total Market</span>
            <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn 2025 Impact Report</div>
          </div>
        </div>
      </div>

      {/* AI actions */}
      <div className="grid-2" style={{ marginTop: 8 }}>
        <AIAction
          actionType="boardSummary"
          label="Generate Board Summary"
          moduleContext="Impact Dashboard — Mission Progress"
          buildUserInput={() => `Generate a concise board-ready summary of Pronghorn's mission progress for the ${timeRange}-day window. Include investment milestones, economic impact, and key performance indicators.`}
          buildContext={() => ({ module: 'Impact Dashboard', timeRange, section: 'Mission Progress' })}
        />
        <AIAction
          actionType="missionNarrative"
          label="Generate Mission Narrative"
          moduleContext="Impact Dashboard — Mission Progress"
          buildUserInput={() => 'Generate a compelling mission narrative for Pronghorn that can be used in partner presentations, investor updates, and stakeholder communications. Emphasize the 57-brand goal and current progress.'}
          buildContext={() => ({ module: 'Impact Dashboard', section: 'Mission Progress' })}
        />
        <AIAction
          actionType="dataAudit"
          label="Generate Data Audit Summary"
          moduleContext="Impact Dashboard — Mission Progress"
          buildUserInput={() => 'Generate a data quality and audit summary for the Impact Dashboard KPIs — reviewing sources, methodology confidence, and gaps that should be addressed before external reporting.'}
          buildContext={() => ({ module: 'Impact Dashboard', section: 'Mission Progress' })}
        />
        <AIAction
          actionType="proofPoints"
          label="Generate Proof Points"
          moduleContext="Impact Dashboard — Mission Progress"
          buildUserInput={() => 'Generate a proof points document for Pronghorn — a set of the most compelling, citation-ready statistics and impact statements drawn from the current dashboard data, formatted for use in pitch decks and press materials.'}
          buildContext={() => ({ module: 'Impact Dashboard', section: 'Mission Progress' })}
        />
      </div>
    </div>
  )

  /* ── Details ────────────────────────────────────────────────────── */
  return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Mission Progress</p>
      <p className="section-subheader">Brand-level investment detail and portfolio composition.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Portfolio Snapshot — 39 Active Brands · 70+ Investment Rounds</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Cohort</th>
              <th>Brands</th>
              <th>Stage Focus</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { cohort: '2021 – Founding', brands: '5',  stage: 'Seed / pre-launch',   status: 'Active',   pill: 'pill--green' },
              { cohort: '2022',            brands: '8',  stage: 'Early growth',         status: 'Active',   pill: 'pill--green' },
              { cohort: '2023',            brands: '11', stage: 'Growth / expansion',   status: 'Active',   pill: 'pill--green' },
              { cohort: '2024',            brands: '10', stage: 'Scale',                status: 'Active',   pill: 'pill--green' },
              { cohort: '2025',            brands: '8',  stage: 'Mixed stages',         status: 'Active',   pill: 'pill--green' },
            ].map(row => (
              <tr key={row.cohort}>
                <td>{row.cohort}</td>
                <td>{row.brands}</td>
                <td>{row.stage}</td>
                <td><span className={`pill ${row.pill}`}>{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn-reported · 2021–2025</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Remaining Target</div>
          <div className="metric-value animated-counter" data-target="18" style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">Brands remaining to 57-brand goal</div>
          <div className="metric-sublabel">5 years remaining in mission window</div>
          <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn-reported</div>
        </div>
        <div className="card">
          <div className="card-title">Required Annual Rate</div>
          <div className="metric-value animated-counter" data-target="3" style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">Brands/year to close the gap</div>
          <div className="metric-sublabel">Down from 6/yr target pace</div>
          <div className="source-tag" style={{ marginTop: 12 }}>Independent analysis</div>
        </div>
      </div>
    </div>
  )
}
