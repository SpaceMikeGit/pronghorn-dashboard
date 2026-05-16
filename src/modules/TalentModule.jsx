import { useEffect, useRef, useState } from 'react'
import { Chart, registerables } from 'chart.js'
import { useCounterAnimation } from '../hooks/useCounterAnimation'
import { chartVisited } from '../utils/chartDefaults'

Chart.register(...registerables)

/* ── Static data ──────────────────────────────────────────────────── */
// FY25 talent mix — 330 individuals directly supported
const TALENT_MIX = [
  { name: 'Spirits PREP',      count: 72,  label: 'Mid-Career'   },
  { name: 'Summer Internship', count: 45,  label: 'Early Career' },
  { name: 'Portfolio & Other', count: 213, label: 'Broad Support' },
]

const DONUT_COLORS = [
  'rgba(242,237,228,0.80)',
  'rgba(242,237,228,0.45)',
  'rgba(242,237,228,0.18)',
]

const CHART_OPTS = {
  responsive:          true,
  maintainAspectRatio: false,
  cutout:              '68%',
  animation: {
    duration:      2500,
    easing:        'easeOutQuart',
    animateRotate: true,
    animateScale:  false,
  },
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
        label: ctx => ` ${ctx.parsed} professionals`,
      },
    },
  },
}

/* ── Component ────────────────────────────────────────────────────── */
export default function TalentModule({ animateIn, activeTab }) {
  const containerRef  = useRef(null)
  const chartRef      = useRef(null)
  const chartInstance = useRef(null)
  useCounterAnimation('talent', animateIn, containerRef, activeTab)

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

    const isFirstTime = !chartVisited.has('talent')
    chartVisited.add('talent')

    chartInstance.current = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels:   TALENT_MIX.map(p => p.name),
        datasets: [{
          data:            TALENT_MIX.map(p => p.count),
          backgroundColor: DONUT_COLORS,
          borderColor:     '#1A1916',
          borderWidth:     2,
          hoverBorderColor:'#1A1916',
        }],
      },
      options: isFirstTime ? CHART_OPTS : { ...CHART_OPTS, animation: false },
    })

    return () => { chartInstance.current?.destroy(); chartInstance.current = null }
  }, [animateIn, activeTab])

  /* ── Overview ───────────────────────────────────────────────────── */
  if (activeTab === 'overview') return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Talent Pipeline</p>
      <p className="section-subheader">
        542 professionals trained and hired — 49% ahead of the three-year goal, with 330+ individuals directly supported in FY25.
      </p>

      {/* KPI row */}
      <div className="grid-4">
        <div className="card card--hero">
          <div className="card-title">Total Trained &amp; Hired</div>
          <div className="metric-value animated-counter" data-target="542">0</div>
          <div className="metric-label">Vs. 363 Three-Year Goal</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>+49% above goal</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">FY25 Direct Support</div>
          <div className="metric-value animated-counter" data-target="330" data-suffix="+">0+</div>
          <div className="metric-label">Individuals · This Year</div>
          <div className="metric-sublabel">Across all programs</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Spirits PREP Alumni</div>
          <div className="metric-value animated-counter" data-target="72" data-suffix="+">0+</div>
          <div className="metric-label">Mid-Career Professionals</div>
          <div className="metric-sublabel">25+ completed in 2024</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Internship Alumni</div>
          <div className="metric-value animated-counter" data-target="45" data-suffix="+">0+</div>
          <div className="metric-label">Summer Program · 2025</div>
          <div className="metric-sublabel">Students placed in industry</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>
      </div>

      {/* Donut chart + callouts */}
      <div className="grid-2">
        {/* Doughnut chart */}
        <div className="card">
          <div className="card-title">FY25 Talent Mix — 330 Individuals</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
            <div style={{ position: 'relative', width: 170, height: 170, flexShrink: 0 }}>
              <canvas ref={chartRef} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {TALENT_MIX.map((p, i) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: DONUT_COLORS[i], flexShrink: 0, display: 'inline-block',
                  }} />
                  <div>
                    <div style={{ fontSize: 12, color: '#F2EDE4', lineHeight: 1.3 }}>{p.name}</div>
                    <div style={{ fontSize: 11, color: '#5A554F' }}>{p.count}+ · {p.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="source-tag" style={{ marginTop: 14 }}>Pronghorn 2025 Impact Report</div>
        </div>

        {/* Right callout column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Mentorship */}
          <div className="card border-l-accent">
            <div className="card-title">Mentorship Hours</div>
            <p style={{ fontSize: 36, fontWeight: 300, color: '#F2EDE4', lineHeight: 1.1, marginBottom: 8 }}>2×</p>
            <p style={{ fontSize: 13, color: '#8C8479', lineHeight: 1.5, marginBottom: 10 }}>
              Year-over-year increase in mentorship hours delivered across all Pronghorn programs.
            </p>
            <span className="pill pill--green">YoY Growth</span>
            <div className="source-tag" style={{ marginTop: 8 }}>Pronghorn 2025 Impact Report</div>
          </div>

          {/* Named placement */}
          <div className="card border-l-accent" style={{ flex: 1 }}>
            <div className="card-title">Named Placement — Spirits PREP</div>
            <p style={{ fontSize: 14, fontWeight: 400, color: '#F2EDE4', lineHeight: 1.4, marginBottom: 4 }}>
              Derren Chapman
            </p>
            <p style={{ fontSize: 12, color: '#8C8479', marginBottom: 10 }}>
              Spirits PREP alumni · Placed at Southern Glazer's · WSET Level 2 with Merit
            </p>
            <span className="pill pill--green">Verified Placement</span>
            <div className="source-tag" style={{ marginTop: 8 }}>Pronghorn 2025 Impact Report</div>
          </div>
        </div>
      </div>
    </div>
  )

  /* ── Details ────────────────────────────────────────────────────── */
  return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Talent Pipeline</p>
      <p className="section-subheader">Program-level breakdown and career stage detail.</p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Programs — Active &amp; Verified</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Program</th>
              <th>Career Stage</th>
              <th>Output</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              { program: 'Spirits PREP',      stage: 'Mid-Career',  output: '72+ total · 25+ in 2024',           status: 'Active'    },
              { program: 'Summer Internship', stage: 'Early Career', output: '45+ in 2025 cohort',               status: 'Active'    },
              { program: 'Mentorship Network',stage: 'All Stages',   output: '2× hours year-over-year',          status: 'Expanding' },
              { program: 'Named Placements',  stage: 'Mid-Career',   output: "Southern Glazer's · WSET L2 Merit", status: 'Ongoing'   },
            ].map(row => (
              <tr key={row.program}>
                <td>{row.program}</td>
                <td style={{ color: '#5A554F' }}>{row.stage}</td>
                <td>{row.output}</td>
                <td><span className="pill pill--green">{row.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn 2025 Impact Report · All figures verified</div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Goal Progress — 3-Year Commitment</div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Trained &amp; hired vs 363 goal</span>
              <span style={{ fontSize: 12, color: '#8ED44A', fontWeight: 500 }}>149%</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill progress-fill--cream"
                style={{ width: barsReady ? '100%' : '0%', transition: 'width 2.5s cubic-bezier(0.16,1,0.3,1)' }}
              />
            </div>
            <div style={{ fontSize: 11, color: '#5A554F', marginTop: 6 }}>542 achieved · 363 target · Goal exceeded</div>
          </div>
          <div style={{ marginBottom: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>FY25 direct support (330+)</span>
              <span style={{ fontSize: 12, color: '#8C8479', fontWeight: 400 }}>330+</span>
            </div>
            <div className="progress-track">
              <div
                className="progress-fill progress-fill--muted"
                style={{ width: barsReady ? '85%' : '0%', transition: 'width 2.5s cubic-bezier(0.16,1,0.3,1) 80ms' }}
              />
            </div>
          </div>
          <span className="pill pill--green">Goal Exceeded</span>
          <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn 2025 Impact Report</div>
        </div>

        <div className="card">
          <div className="card-title">Spirits PREP — Mid-Career Pipeline</div>
          <div className="metric-value animated-counter" data-target="72" data-suffix="+" style={{ fontSize: 40 }}>0+</div>
          <div className="metric-label">Mid-Career Professionals Completed</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>25+ in 2024 alone</div>
          <div style={{ marginTop: 20 }}>
            <div style={{ fontSize: 12, color: '#8C8479', marginBottom: 8 }}>Featured alumni</div>
            <div style={{ fontSize: 14, color: '#F2EDE4', marginBottom: 4 }}>Derren Chapman</div>
            <div style={{ fontSize: 12, color: '#5A554F', lineHeight: 1.5 }}>
              Southern Glazer's · WSET Level 2 with Merit
            </div>
          </div>
          <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn 2025 Impact Report</div>
        </div>
      </div>
    </div>
  )
}
