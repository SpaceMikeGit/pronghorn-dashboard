import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useCounterAnimation } from '../hooks/useCounterAnimation'
import { verticalBarAnimations, chartVisited } from '../utils/chartDefaults'

Chart.register(...registerables)

/* ── Static data ──────────────────────────────────────────────────── */
// Portfolio vs. total market — last 12 months (Pronghorn 2025 Impact Report)
const COMPARISON = {
  labels:    ['Revenue Growth', 'Volume Growth'],
  portfolio: [12,   9  ],
  market:    [-3.8, -4.2],
}

const SIGNALS = [
  {
    brand:   'Bayab African Grown Gin',
    rank:    '#1 Selling Gin',
    context: 'At a leading national distributor',
    cat:     'Gin',
  },
  {
    brand:   'Humano Tequila',
    rank:    'Top 30 Fastest-Growing Tequila',
    context: 'National category ranking',
    cat:     'Tequila',
  },
  {
    brand:   "Edmond's Honor",
    rank:    'Top 10 SP+ Craft Whiskey Launch',
    context: 'Since launch · nationally ranked',
    cat:     'Whiskey',
  },
]

const CHART_OPTS = {
  responsive:          true,
  maintainAspectRatio: false,
  animation: {
    duration: 2500,
    easing:   'easeOutQuart',
    delay: ctx =>
      ctx.type === 'data' && ctx.mode === 'default' && ctx.datasetIndex === 0
        ? ctx.dataIndex * 200 : 0,
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
        label: ctx =>
          ` ${ctx.dataset.label}: ${ctx.parsed.y > 0 ? '+' : ''}${ctx.parsed.y}%`,
      },
    },
  },
  scales: {
    x: {
      grid:   { color: 'rgba(242,237,228,0.04)', drawBorder: false },
      ticks:  { color: '#5A554F', font: { family: 'DM Sans', size: 11 } },
      border: { display: false },
    },
    y: {
      grid: {
        color: ctx =>
          ctx.tick.value === 0
            ? 'rgba(242,237,228,0.18)'
            : 'rgba(242,237,228,0.04)',
        drawBorder: false,
      },
      ticks: {
        color:    '#5A554F',
        font:     { family: 'DM Sans', size: 11 },
        callback: v => `${v > 0 ? '+' : ''}${v}%`,
        stepSize: 4,
      },
      border:      { display: false },
      min:         -7,
      max:         16,
      beginAtZero: false,
    },
  },
}

/* ── Component ────────────────────────────────────────────────────── */
export default function CompetitiveModule({ animateIn, activeTab }) {
  const containerRef  = useRef(null)
  const chartRef      = useRef(null)
  const chartInstance = useRef(null)
  useCounterAnimation('competitive', animateIn, containerRef, activeTab)

  const [barsReady, setBarsReady] = useState(false)
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

    const isFirstTime = !chartVisited.has('competitive')
    chartVisited.add('competitive')

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels:   COMPARISON.labels,
        datasets: [
          {
            label:           'Pronghorn Portfolio',
            data:            COMPARISON.portfolio,
            backgroundColor: 'rgba(242,237,228,0.70)',
            borderColor:     'rgba(242,237,228,0.50)',
            borderWidth:     1,
            borderRadius:    3,
            order:           2,
          },
          {
            label:           'Total Market',
            data:            COMPARISON.market,
            backgroundColor: 'rgba(242,237,228,0.18)',
            borderColor:     'rgba(242,237,228,0.12)',
            borderWidth:     1,
            borderRadius:    3,
            order:           3,
          },
        ],
      },
      options: isFirstTime ? CHART_OPTS : { ...CHART_OPTS, animation: false, animations: {} },
    })

    return () => { chartInstance.current?.destroy(); chartInstance.current = null }
  }, [animateIn, activeTab])

  /* ── Overview ───────────────────────────────────────────────────── */
  if (activeTab === 'overview') return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Competitive Position</p>
      <p className="section-subheader">
        Pronghorn-backed brands outperform a declining total spirits market across every key growth metric.
      </p>

      {/* KPI row */}
      <div className="grid-4">
        <div className="card card--hero">
          <div className="card-title">Revenue Advantage</div>
          <div
            className="metric-value animated-counter"
            data-target="15.8"
            data-prefix="+"
            data-suffix=" pts"
            data-decimals="1"
          >+0.0 pts</div>
          <div className="metric-label">Vs. Total Market · Last 12 Mo</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>+12% portfolio vs −3.8% market</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Volume Advantage</div>
          <div
            className="metric-value animated-counter"
            data-target="13.2"
            data-prefix="+"
            data-suffix=" pts"
            data-decimals="1"
          >+0.0 pts</div>
          <div className="metric-label">Vs. Total Market · Last 12 Mo</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>+9% portfolio vs −4.2% market</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Verified National Rankings</div>
          <div className="metric-value animated-counter" data-target="3">0</div>
          <div className="metric-label">Brands · Top National Signals</div>
          <div className="metric-sublabel">Gin · Tequila · Whiskey</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Peak Growth Multiple</div>
          <div className="metric-value animated-counter" data-target="4" data-suffix="×">0×</div>
          <div className="metric-label">Since Investment · Top Brands</div>
          <div className="metric-sublabel">Ten To One · Greenwood</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>
      </div>

      {/* Chart + signal cards */}
      <div className="grid-2">
        {/* Grouped bar chart */}
        <div className="card">
          <div className="card-title">Portfolio vs. Total Market — Last 12 Months</div>
          <div style={{ position: 'relative', height: 200 }}>
            <canvas ref={chartRef} />
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 20, marginTop: 14 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A554F' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(242,237,228,0.70)', flexShrink: 0, display: 'inline-block' }} />
              Pronghorn Portfolio
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#5A554F' }}>
              <span style={{ width: 10, height: 10, borderRadius: 2, background: 'rgba(242,237,228,0.18)', flexShrink: 0, display: 'inline-block' }} />
              Total Market
            </span>
          </div>
          <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn 2025 Impact Report</div>
        </div>

        {/* National ranking signal cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SIGNALS.map(s => (
            <div key={s.brand} className="card border-l-accent" style={{ flex: 1 }}>
              <div className="card-title">{s.rank}</div>
              <p style={{ fontSize: 14, fontWeight: 300, color: '#F2EDE4', lineHeight: 1.4, marginBottom: 4 }}>
                {s.brand}
              </p>
              <p style={{ fontSize: 12, color: '#8C8479', marginBottom: 10 }}>{s.context}</p>
              <span className="pill pill--green">Verified Signal</span>
              <div className="source-tag" style={{ marginTop: 8 }}>Pronghorn 2025 Impact Report</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  /* ── Details ────────────────────────────────────────────────────── */
  return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Competitive Position</p>
      <p className="section-subheader">Cross-category competitive signals and market context.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Category Competitive Breakdown — Tier 1 Brands</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Category</th>
              <th>Commercial Signal</th>
              <th>Growth</th>
            </tr>
          </thead>
          <tbody>
            {[
              { brand: 'Ten To One Rum',         cat: 'Rum',     signal: 'Pronghorn portfolio standout',  growth: '4× since investment' },
              { brand: 'Greenwood Whiskey',       cat: 'Whiskey', signal: 'Pronghorn portfolio standout',  growth: '4× since investment' },
              { brand: 'Bayab African Grown Gin', cat: 'Gin',     signal: '#1 at a leading distributor',   growth: 'Verified national rank' },
              { brand: 'Humano Tequila',          cat: 'Tequila', signal: 'Top 30 fastest-growing',        growth: 'National category'    },
              { brand: "Edmond's Honor",          cat: 'Whiskey', signal: 'Top 10 SP+ craft launch',       growth: 'Since launch'          },
              { brand: 'IslandJon Vodka',         cat: 'Vodka',   signal: 'Pronghorn portfolio standout',  growth: '3× since investment' },
            ].map(row => (
              <tr key={row.brand}>
                <td>{row.brand}</td>
                <td style={{ color: '#5A554F' }}>{row.cat}</td>
                <td>{row.signal}</td>
                <td>
                  <span style={{ color: '#8ED44A', fontSize: 12, fontWeight: 500 }}>{row.growth}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn 2025 Impact Report · All signals verified</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Market Context — Spirits Industry</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Total market revenue</span>
              <span style={{ fontSize: 18, fontWeight: 300, color: '#F4725A' }}>−3.8%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Total market volume</span>
              <span style={{ fontSize: 18, fontWeight: 300, color: '#F4725A' }}>−4.2%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Pronghorn portfolio revenue</span>
              <span style={{ fontSize: 18, fontWeight: 300, color: '#8ED44A' }}>+12%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Pronghorn portfolio volume</span>
              <span style={{ fontSize: 18, fontWeight: 300, color: '#8ED44A' }}>+9%</span>
            </div>
          </div>
          <span className="pill pill--green">Counter-Cyclical Outperformance</span>
          <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Outperformance Summary</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Revenue advantage</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span
                  className="metric-value animated-counter"
                  data-target="15.8"
                  data-prefix="+"
                  data-suffix=" pts"
                  data-decimals="1"
                  style={{ fontSize: 24 }}
                >+0.0 pts</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Volume advantage</span>
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span
                  className="metric-value animated-counter"
                  data-target="13.2"
                  data-prefix="+"
                  data-suffix=" pts"
                  data-decimals="1"
                  style={{ fontSize: 24 }}
                >+0.0 pts</span>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(242,237,228,0.07)' }}>
            <div style={{ fontSize: 12, color: '#8C8479', marginBottom: 8 }}>Brands with national rankings</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {SIGNALS.map(s => (
                <span key={s.brand} className="pill pill--green">{s.cat}</span>
              ))}
            </div>
          </div>
          <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn 2025 Impact Report</div>
        </div>
      </div>

      {/* ── Narrative evolution ──────────────────────────────────────── */}
      <div className="card" style={{ marginTop: 16, marginBottom: 16 }}>
        <div className="card-title">Narrative Evolution — How the Mission Language Has Changed</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Period</th>
              <th>Language</th>
              <th>Framing</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2022 Founding</td>
              <td>"Black entrepreneurs"</td>
              <td style={{ color: '#5A554F' }}>Explicit demographic targeting</td>
            </tr>
            <tr>
              <td>2024–2025</td>
              <td>"Underrepresented businesses and individuals"</td>
              <td style={{ color: '#5A554F' }}>Broader framing</td>
            </tr>
            <tr>
              <td style={{ color: '#F4725A' }}>May 2026</td>
              <td style={{ color: '#F4725A' }}>"Founders" without qualifier</td>
              <td style={{ color: '#F4725A' }}>"Black" removed from primary mission statement</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6, marginTop: 12, marginBottom: 0 }}>
          The evolution reflects deliberate navigation of a materially more challenging DEI legal and political environment post-2023 SCOTUS ruling. The operational mission has not changed — the public language has been made more legally defensible.
        </p>
        <div className="source-tag" style={{ marginTop: 8 }}>Independent analysis / pronghorn.co May 2026</div>
      </div>

      {/* ── Diageo anchor context ─────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Diageo Anchor — Commitment Context</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { label: 'Commitment structure', value: 'Milestone-based — not a committed fund lump sum',        note: null },
            { label: 'Estimated deployment', value: '~$30M of $200M committed (approximate)',                  note: 'Black Enterprise / Startland reporting' },
            { label: 'Distill Ventures',     value: "Wound down March 2025 — Diageo's parallel accelerator",  note: null },
            { label: 'Fund II',              value: 'Not announced as of May 2026',                            note: null },
          ].map((item, i, arr) => (
            <div key={item.label} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
              gap: 16, padding: '12px 0',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(242,237,228,0.06)' : 'none',
            }}>
              <span style={{ fontSize: 12, color: '#8C8479', flexShrink: 0 }}>{item.label}</span>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 13, color: '#F2EDE4' }}>{item.value}</div>
                {item.note && <div style={{ fontSize: 11, color: '#5A554F', marginTop: 2 }}>{item.note}</div>}
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6, marginTop: 14, marginBottom: 0 }}>
          These signals are context, not conclusion — Diageo's milestone commitment to Pronghorn and the wind-down of its parallel accelerator are separate decisions. The risk of restructured disbursements warrants watching, not alarm.
        </p>
        <div className="source-tag" style={{ marginTop: 8 }}>Independently verified — Diageo press releases, Black Enterprise, Startland News</div>
      </div>

      {/* ── Competitor landscape ──────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Competitor Landscape</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            {
              name:      'InvestBev',
              profile:   '~$200M+ raised. Institutional PE rigor. Accelerator competing for same brands. Overlapping investment in Ten To One Rum. Most dangerous near-term competitive threat.',
              pillLabel: 'High — active',
              pillStyle: { background: 'rgba(244,114,90,0.14)', color: '#F4725A', border: '1px solid rgba(244,114,90,0.30)' },
            },
            {
              name:      'Constellation Brands Ventures',
              profile:   "$100M each committed to Female and Minority Founders programs. Now a named public partner on Pronghorn's homepage — simultaneously most operationally credible competitor and institutional ally. Reclassified May 2026.",
              pillLabel: 'Complex — reclassified',
              pillStyle: { background: 'rgba(251,191,36,0.12)', color: '#FBB024', border: '1px solid rgba(251,191,36,0.30)' },
            },
            {
              name:      'Distill Ventures',
              profile:   'Diageo announced wind-down March 2025. Creates deal-flow and talent opportunity for Pronghorn.',
              pillLabel: 'Reduced — opportunity',
              pillStyle: { background: 'rgba(142,212,74,0.12)', color: '#8ED44A', border: '1px solid rgba(142,212,74,0.30)' },
            },
            {
              name:      'Uncle Nearest Venture Fund',
              profile:   'Facing significant legal and financial headwinds as of mid-2025. Competitive footprint has contracted considerably.',
              pillLabel: 'Impaired',
              pillStyle: { background: 'rgba(90,85,79,0.30)', color: '#8C8479', border: '1px solid rgba(90,85,79,0.50)' },
            },
          ].map((c, i, arr) => (
            <div key={c.name} style={{
              display: 'flex', gap: 16, alignItems: 'flex-start',
              padding: '14px 0',
              borderBottom: i < arr.length - 1 ? '1px solid rgba(242,237,228,0.06)' : 'none',
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, color: '#F2EDE4', fontWeight: 500, marginBottom: 4 }}>{c.name}</div>
                <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6, margin: 0 }}>{c.profile}</p>
              </div>
              <span style={{
                fontSize: 10, padding: '3px 9px', borderRadius: 20,
                letterSpacing: '0.04em', flexShrink: 0, whiteSpace: 'nowrap', ...c.pillStyle,
              }}>{c.pillLabel}</span>
            </div>
          ))}
        </div>
        <div className="source-tag" style={{ marginTop: 12 }}>Independently verified · Diageo press releases, company filings, public reporting</div>
      </div>

      {/* ── Opportunity window ────────────────────────────────────────── */}
      <div className="card">
        <div className="card-title">The Opportunity Window</div>
        <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
          {[
            { label: 'Deal Flow', desc: 'Distill Ventures wind-down leaves brands seeking a new growth-stage partner with mission alignment.' },
            { label: 'Talent',    desc: 'Uncle Nearest disruption displaces relationships and talent in the diverse-spirits ecosystem.' },
            { label: 'Narrative', desc: 'Competitor weakening creates space for Pronghorn to define the category.' },
          ].map(tile => (
            <div key={tile.label} style={{
              flex: 1, padding: '14px 16px',
              background: 'rgba(142,212,74,0.05)',
              border: '1px solid rgba(142,212,74,0.15)',
              borderRadius: 6,
            }}>
              <div style={{ fontSize: 12, fontWeight: 500, color: '#8ED44A', marginBottom: 6 }}>{tile.label}</div>
              <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6, margin: 0 }}>{tile.desc}</p>
            </div>
          ))}
        </div>
        <div className="source-tag" style={{ marginTop: 12 }}>Distill Ventures — Diageo announcement March 2025 · Uncle Nearest — public reporting mid-2025</div>
      </div>

    </div>
  )
}
