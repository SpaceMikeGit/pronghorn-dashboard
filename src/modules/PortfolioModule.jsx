import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useCounterAnimation } from '../hooks/useCounterAnimation'
import { horizontalBarAnimations, chartVisited } from '../utils/chartDefaults'

Chart.register(...registerables)

/* ── Static data ──────────────────────────────────────────────────── */
const GROWTH_BRANDS = [
  { name: 'Ten To One Rum',    multiple: 4 },
  { name: 'Greenwood Whiskey', multiple: 4 },
  { name: 'IslandJon Vodka',   multiple: 3 },
]

const SIGNAL_BRANDS = [
  {
    name:   'Bayab African Grown Gin',
    signal: '#1 Selling Gin',
    detail: 'At a leading national distributor',
  },
  {
    name:   'Humano Tequila',
    signal: 'Top 30 Fastest-Growing Tequila',
    detail: 'National category ranking',
  },
  {
    name:   "Edmond's Honor",
    signal: 'Top 10 Craft Whiskey Launch',
    detail: 'SP+ category · last decade',
  },
]

const COMPOSITION = [
  { cat: 'Whiskey', pct: 30 },
  { cat: 'Rum',     pct: 22 },
  { cat: 'Tequila', pct: 18 },
  { cat: 'Vodka',   pct: 15 },
  { cat: 'Other',   pct: 15 },
]

const CHART_OPTS = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    duration: 2500,
    easing: 'easeOutQuart',
    delay: ctx => (ctx.type === 'data' && ctx.mode === 'default' ? ctx.dataIndex * 80 : 0),
  },
  animations: horizontalBarAnimations,
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
        label: ctx => ` ${ctx.parsed.x}× growth since investment`,
      },
    },
  },
  scales: {
    x: {
      grid:        { color: 'rgba(242,237,228,0.04)', drawBorder: false },
      ticks:       { color: '#5A554F', font: { family: 'DM Sans', size: 11 }, callback: v => `${v}×` },
      border:      { display: false },
      beginAtZero: true,
      max:         5,
    },
    y: {
      grid:   { display: false },
      ticks:  { color: '#F2EDE4', font: { family: 'DM Sans', size: 12 } },
      border: { display: false },
    },
  },
}

/* ── Component ────────────────────────────────────────────────────── */
export default function PortfolioModule({ animateIn, activeTab }) {
  const containerRef  = useRef(null)
  const chartRef      = useRef(null)
  const chartInstance = useRef(null)
  useCounterAnimation('portfolio', animateIn, containerRef, activeTab)

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

    const isFirstTime = !chartVisited.has('portfolio')
    chartVisited.add('portfolio')

    chartInstance.current = new Chart(chartRef.current, {
      type: 'bar',
      data: {
        labels:   GROWTH_BRANDS.map(b => b.name),
        datasets: [{
          data:            GROWTH_BRANDS.map(b => b.multiple),
          backgroundColor: 'rgba(242,237,228,0.70)',
          borderColor:     'rgba(242,237,228,0.50)',
          borderWidth:     1,
          borderRadius:    3,
        }],
      },
      options: isFirstTime ? CHART_OPTS : { ...CHART_OPTS, animation: false, animations: {} },
    })

    return () => { chartInstance.current?.destroy(); chartInstance.current = null }
  }, [animateIn, activeTab])

  /* ── Overview ───────────────────────────────────────────────────── */
  if (activeTab === 'overview') return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Portfolio Health</p>
      <p className="section-subheader">
        39 active brands across five investment cohorts — outperforming the total market by 15.8 points on revenue growth.
      </p>

      {/* KPI row */}
      <div className="grid-4">
        <div className="card card--hero">
          <div className="card-title">Revenue Growth</div>
          <div className="metric-value animated-counter" data-target="12" data-prefix="+" data-suffix="%">+0%</div>
          <div className="metric-label">Portfolio · Last 12 Months</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>+15.8 pts vs total market</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Active Brands</div>
          <div className="metric-value animated-counter" data-target="39">0</div>
          <div className="metric-label">Across 5 Cohorts</div>
          <div className="metric-sublabel">Since 2021</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Tier 1 Performers</div>
          <div className="metric-value animated-counter" data-target="6">0</div>
          <div className="metric-label">Verified Growth Signals</div>
          <div className="metric-sublabel">Commercial momentum confirmed</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Volume Growth</div>
          <div className="metric-value animated-counter" data-target="9" data-prefix="+" data-suffix="%">+0%</div>
          <div className="metric-label">Portfolio · Last 12 Months</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>+13.2 pts vs total market</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>
      </div>

      {/* Growth chart + signals */}
      <div className="grid-2">
        {/* Horizontal bar chart */}
        <div className="card">
          <div className="card-title">Growth Multiple Since Investment</div>
          <div style={{ position: 'relative', height: 160 }}>
            <canvas ref={chartRef} />
          </div>
          <div className="source-tag" style={{ marginTop: 14 }}>Pronghorn 2025 Impact Report</div>
        </div>

        {/* Signal cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {SIGNAL_BRANDS.map(b => (
            <div key={b.name} className="card border-l-accent" style={{ flex: 1 }}>
              <div className="card-title">{b.signal}</div>
              <p style={{ fontSize: 14, fontWeight: 300, color: '#F2EDE4', lineHeight: 1.4, marginBottom: 4 }}>
                {b.name}
              </p>
              <p style={{ fontSize: 12, color: '#8C8479', marginBottom: 10 }}>{b.detail}</p>
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
      <p className="section-header">Portfolio Health</p>
      <p className="section-subheader">Tier 1 brand performance detail and verified commercial signals.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Tier 1 — Verified Growth Leaders</div>
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
              { brand: 'Ten To One Rum',         cat: 'Rum',     signal: 'Pronghorn portfolio standout', growth: '4× since investment' },
              { brand: 'Greenwood Whiskey',       cat: 'Whiskey', signal: 'Pronghorn portfolio standout', growth: '4× since investment' },
              { brand: 'IslandJon Vodka',         cat: 'Vodka',   signal: 'Pronghorn portfolio standout', growth: '3× since investment' },
              { brand: 'Bayab African Grown Gin', cat: 'Gin',     signal: '#1 at a leading distributor',  growth: 'Verified rank'        },
              { brand: 'Humano Tequila',          cat: 'Tequila', signal: 'Top 30 fastest-growing',       growth: 'National category'    },
              { brand: "Edmond's Honor",          cat: 'Whiskey', signal: 'Top 10 SP+ craft launch',      growth: '3.2× mid-funnel vs forecast' },
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
        <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn 2025 Impact Report · All figures verified</div>
        <div className="source-tag" style={{ marginTop: 4 }}>Edmond's Honor growth figure: DCG/ARI campaign results · December 2025</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Portfolio vs. Total Market — Last 12 Months</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Revenue growth</span>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ fontSize: 18, fontWeight: 300, color: '#8ED44A' }}>+12%</span>
                <span style={{ fontSize: 11, color: '#5A554F' }}>vs −3.8% market</span>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Volume growth</span>
              <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                <span style={{ fontSize: 18, fontWeight: 300, color: '#8ED44A' }}>+9%</span>
                <span style={{ fontSize: 11, color: '#5A554F' }}>vs −4.2% market</span>
              </div>
            </div>
          </div>
          <span className="pill pill--green">Outperforming Total Market</span>
          <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Portfolio Composition by Category</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {COMPOSITION.map((row, i) => (
              <div key={row.cat}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: '#8C8479' }}>{row.cat}</span>
                  <span style={{ fontSize: 12, color: '#5A554F' }}>{row.pct}%</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill progress-fill--cream"
                    style={{
                      width:      barsReady ? `${row.pct}%` : '0%',
                      opacity:    1 - i * 0.14,
                      transition: `width 2.5s cubic-bezier(0.16,1,0.3,1) ${i * 80}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="source-tag" style={{ marginTop: 12 }}>Estimated composition · Pronghorn-reported categories</div>
        </div>
      </div>
    </div>
  )
}
