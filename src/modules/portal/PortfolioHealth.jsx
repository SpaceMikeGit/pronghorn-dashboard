import { useState, useEffect, useRef } from 'react'
import '../../index.css'
import AIAction from '../../components/AIAction'
import BrandSelector from '../../components/BrandSelector'
import QuickActions from '../../components/QuickActions'
import SynthesisPanel from '../../components/SynthesisPanel'
import Greeting from '../../components/Greeting'
import HomeButton from '../../components/HomeButton'
import UserNotes        from '../../components/UserNotes'
import GeneratedOutputs from '../../components/GeneratedOutputs'
import { useCounterAnimation } from '../../hooks/useCounterAnimation'

const MODULE_COLOR = '#1A3A6B'

const SECTIONS = [
  { id: 'velocity',   label: 'Depletion & Velocity' },
  { id: 'sku',        label: 'SKU Performance' },
  { id: 'chain',      label: 'Chain Authorization' },
  { id: 'exit',       label: 'Exit Readiness' },
]

const EXPLAINER = 'A portfolio health data layer for active Pronghorn brands — velocity signals, SKU-level distributor performance, chain authorization status, and exit-readiness scoring. Data is illustrative framework; live integration pending distributor API access.'

/* ── Section 1: Depletion & Velocity ───────────────────────────────── */
function VelocitySection() {
  const containerRef = useRef(null)
  useCounterAnimation('ph-velocity', true, containerRef)
  const BRANDS = [
    { name: 'Bayab Gin',            category: 'Spirits',    velocity: 4.2, trend: '+0.8', status: 'Accelerating', pill: 'pill--green' },
    { name: "Edmond's Honor",       category: 'Bourbon',    velocity: 3.9, trend: '+1.1', status: 'Accelerating', pill: 'pill--green' },
    { name: 'Harlem Brewing Co.',   category: 'Beer',       velocity: 3.4, trend: '+0.4', status: 'Stable',       pill: 'pill--green' },
    { name: 'McBride Sisters',      category: 'Wine',       velocity: 3.1, trend: '+0.2', status: 'Stable',       pill: 'pill--green' },
    { name: 'Brough Brothers',      category: 'Bourbon',    velocity: 2.8, trend: '−0.1', status: 'Stable',       pill: 'pill--green' },
    { name: 'Ten To One Rum',       category: 'Rum',        velocity: 2.5, trend: '+0.5', status: 'Building',     pill: 'pill--amber' },
    { name: 'Abisola Whiskey',      category: 'Whiskey',    velocity: 4.7, trend: '+0.3', status: 'Leading',      pill: 'pill--green' },
    { name: 'Mezcal Vago (rep.)',   category: 'Mezcal',     velocity: 2.1, trend: '−0.3', status: 'Watch',        pill: 'pill--red'   },
    { name: 'Port City Brewing',    category: 'Beer',       velocity: 2.9, trend: '0.0',  status: 'Stable',       pill: 'pill--green' },
    { name: 'Definitions (rep.)',   category: 'Vodka',      velocity: 1.8, trend: '−0.5', status: 'Concern',      pill: 'pill--red'   },
  ]

  return (
    <div className="content-area" ref={containerRef}>
      <SynthesisPanel moduleId="module03" />
      <p className="section-header">Depletion & Velocity</p>
      <p className="module-explainer">{EXPLAINER}</p>
      <p className="section-subheader">
        Portfolio brands ranked by 90-day velocity (cases/door/month). Representative illustrative data — not sourced from live distributor feeds.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title" style={{ marginBottom: 4 }}>Velocity Index — 10 Representative Brands · 90-Day Rolling</div>
        <div className="source-tag" style={{ marginBottom: 16 }}>Illustrative framework · Pending live distributor API integration</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>Category</th>
              <th>Velocity (cases/door/mo)</th>
              <th>90-Day Trend</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {BRANDS.map(b => (
              <tr key={b.name}>
                <td style={{ fontWeight: 400, color: '#F2EDE4' }}>{b.name}</td>
                <td>{b.category}</td>
                <td style={{ fontFamily: 'monospace', fontSize: 13 }}>{b.velocity.toFixed(1)}</td>
                <td style={{ color: b.trend.startsWith('+') ? '#8ED44A' : b.trend.startsWith('−') ? '#F4725A' : '#8C8479' }}>{b.trend}</td>
                <td><span className={`pill ${b.pill}`}>{b.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-title">Portfolio Average</div>
          <div className="metric-value animated-counter" data-target="3.1" data-decimals="1" style={{ fontSize: 36 }}>0.0</div>
          <div className="metric-label">Cases/door/month</div>
          <div className="metric-sublabel">Across tracked brands</div>
        </div>
        <div className="card card--hero">
          <div className="card-title">Accelerating Brands</div>
          <div className="metric-value animated-counter" data-target="6" style={{ fontSize: 36 }}>0</div>
          <div className="metric-label">Of 10 tracked · Positive 90-day trend</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>60% positive momentum</div>
        </div>
        <div className="card">
          <div className="card-title">Watch List</div>
          <div className="metric-value animated-counter" data-target="2" style={{ fontSize: 36 }}>0</div>
          <div className="metric-label">Brands with declining velocity</div>
          <div className="metric-sublabel" style={{ color: '#F4725A' }}>Requires distributor review</div>
        </div>
      </div>

      <AIAction
        actionType="portfolioPulse"
        label="Generate Portfolio Pulse Report"
        moduleContext="Portfolio Health Data Layer — Depletion & Velocity"
        buildUserInput={() => 'Generate a portfolio velocity pulse report analyzing the 10 tracked brands, highlighting accelerating brands, watch list items, and recommended priority actions for the next 30 days.'}
        buildContext={() => ({ module: 'Portfolio Health', section: 'Depletion & Velocity' })}
      />
    </div>
  )
}

/* ── Section 2: SKU Performance ────────────────────────────────────── */
function SkuSection() {
  const SKUS = [
    { brand: 'Bayab Gin',          sku: 'London Dry 750ml',    distributor: 'Southern Glazers', state: 'TX', velocity: 'High',   auth: 'Authorized', pill: 'pill--green' },
    { brand: 'Bayab Gin',          sku: 'London Dry 1L',       distributor: 'RNDC',             state: 'IL', velocity: 'Medium', auth: 'Authorized', pill: 'pill--green' },
    { brand: "Edmond's Honor",     sku: 'Straight Bourbon 750',distributor: 'Breakthru Bev.',   state: 'NY', velocity: 'High',   auth: 'Authorized', pill: 'pill--green' },
    { brand: "Edmond's Honor",     sku: 'Straight Bourbon 375',distributor: 'RNDC',             state: 'CA', velocity: 'Low',    auth: 'Pending',    pill: 'pill--amber' },
    { brand: 'Harlem Brewing',     sku: 'Sugar Hill Golden',   distributor: 'Manhattan Beer',   state: 'NY', velocity: 'High',   auth: 'Authorized', pill: 'pill--green' },
    { brand: 'McBride Sisters',    sku: 'Brut NV 750ml',       distributor: 'Southern Glazers', state: 'CA', velocity: 'Medium', auth: 'Authorized', pill: 'pill--green' },
    { brand: 'Ten To One Rum',     sku: 'White Rum 750ml',     distributor: 'Wirtz Bev.',       state: 'IL', velocity: 'Low',    auth: 'Pending',    pill: 'pill--amber' },
    { brand: 'Brough Brothers',    sku: 'Triple Cask 750ml',   distributor: 'Glazers of TX',    state: 'TX', velocity: 'Medium', auth: 'Authorized', pill: 'pill--green' },
    { brand: 'Abisola Whiskey',    sku: 'Single Malt 750ml',   distributor: 'RNDC',             state: 'TN', velocity: 'V.High', auth: 'Authorized', pill: 'pill--green' },
    { brand: 'Definitions (rep.)', sku: 'Classic Vodka 750ml', distributor: 'Southern Glazers', state: 'FL', velocity: 'Low',    auth: 'At Risk',    pill: 'pill--red'  },
  ]

  return (
    <div className="content-area">
      <p className="section-header">SKU Performance</p>
      <p className="section-subheader">
        Distributor-level SKU velocity and authorization status. Illustrative framework — representative data only.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title" style={{ marginBottom: 4 }}>SKU Performance Matrix — Distributor Level</div>
        <div className="source-tag" style={{ marginBottom: 16 }}>Illustrative framework · Pending live distributor API integration</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th>SKU</th>
              <th>Distributor</th>
              <th>State</th>
              <th>Velocity</th>
              <th>Auth Status</th>
            </tr>
          </thead>
          <tbody>
            {SKUS.map((s, i) => (
              <tr key={i}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{s.brand}</td>
                <td style={{ fontSize: 11 }}>{s.sku}</td>
                <td style={{ fontSize: 11 }}>{s.distributor}</td>
                <td>{s.state}</td>
                <td style={{ color: s.velocity === 'V.High' || s.velocity === 'High' ? '#8ED44A' : s.velocity === 'Low' ? '#F4725A' : '#8C8479' }}>{s.velocity}</td>
                <td><span className={`pill ${s.pill}`}>{s.auth}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card border-l-accent">
          <div className="card-title">Authorization Health</div>
          <div style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Fully authorized SKUs</span>
              <span style={{ fontSize: 12, color: '#8ED44A' }}>70%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill progress-fill--cream" style={{ width: '70%' }} />
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontSize: 12, color: '#8C8479' }}>Pending / at risk</span>
              <span style={{ fontSize: 12, color: '#F4725A' }}>30%</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill progress-fill--muted" style={{ width: '30%' }} />
            </div>
          </div>
          <div className="source-tag" style={{ marginTop: 12 }}>Illustrative · Live pull pending</div>
        </div>
        <div className="card">
          <div className="card-title">Priority Actions</div>
          {[
            { action: "Edmond's Honor 375ml — CA auth follow-up", urgency: 'Medium' },
            { action: "Ten To One — IL distributor activation",   urgency: 'Medium' },
            { action: "Definitions — FL velocity rescue plan",    urgency: 'High'   },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
              <span style={{ fontSize: 12, color: '#8C8479', flex: 1, lineHeight: 1.5 }}>{a.action}</span>
              <span className={`pill ${a.urgency === 'High' ? 'pill--red' : 'pill--amber'}`} style={{ marginLeft: 10, flexShrink: 0 }}>{a.urgency}</span>
            </div>
          ))}
        </div>
      </div>

      <AIAction
        actionType="distributorBrief"
        label="Generate Distributor Brief"
        moduleContext="Portfolio Health Data Layer — SKU Performance"
        buildUserInput={() => 'Generate a distributor-facing brief summarizing SKU authorization status, velocity signals by distributor, and recommended priority actions for the next review cycle.'}
        buildContext={() => ({ module: 'Portfolio Health', section: 'SKU Performance' })}
      />
    </div>
  )
}

/* ── Section 3: Chain Authorization ────────────────────────────────── */
function ChainSection() {
  const containerRef = useRef(null)
  useCounterAnimation('ph-chain', true, containerRef)
  const STATES = [
    { state: 'Texas',        chains: 'Total Wine, HEB, Spec\'s',      brands: 8, status: 'Active',   pill: 'pill--green' },
    { state: 'New York',     chains: 'Total Wine, Astor Wines',       brands: 6, status: 'Active',   pill: 'pill--green' },
    { state: 'California',   chains: 'Total Wine, BevMo, Trader Joe', brands: 7, status: 'Active',   pill: 'pill--green' },
    { state: 'Illinois',     chains: 'Binny\'s, Total Wine',          brands: 4, status: 'Building', pill: 'pill--amber' },
    { state: 'Tennessee',    chains: 'Total Wine, ABC Fine Wine',     brands: 3, status: 'Building', pill: 'pill--amber' },
    { state: 'Florida',      chains: 'Total Wine, ABC Fine Wine',     brands: 5, status: 'Active',   pill: 'pill--green' },
    { state: 'Georgia',      chains: 'Total Wine, Kroger',            brands: 2, status: 'Pending',  pill: 'pill--amber' },
    { state: 'North Carolina',chains: 'ABC Stores (state)',           brands: 1, status: 'Pending',  pill: 'pill--amber' },
  ]

  return (
    <div className="content-area" ref={containerRef}>
      <p className="section-header">Chain Authorization</p>
      <p className="section-subheader">
        State-by-state chain retail authorization status across the portfolio. Illustrative framework.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title" style={{ marginBottom: 4 }}>Chain Retail Authorization — State View</div>
        <div className="source-tag" style={{ marginBottom: 16 }}>Illustrative framework · Pending live distributor API integration</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>State</th>
              <th>Key Chains</th>
              <th>Brands Present</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {STATES.map(s => (
              <tr key={s.state}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{s.state}</td>
                <td style={{ fontSize: 11 }}>{s.chains}</td>
                <td style={{ fontFamily: 'monospace' }}>{s.brands}</td>
                <td><span className={`pill ${s.pill}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="card-title">Active States</div>
          <div className="metric-value animated-counter" data-target="4" style={{ fontSize: 36 }}>0</div>
          <div className="metric-label">Full chain authorization</div>
        </div>
        <div className="card card--hero">
          <div className="card-title">Brands in Chain Retail</div>
          <div className="metric-value animated-counter" data-target="36" style={{ fontSize: 36 }}>0</div>
          <div className="metric-label">Authorizations across 8 states</div>
        </div>
        <div className="card">
          <div className="card-title">Pending Expansion</div>
          <div className="metric-value animated-counter" data-target="4" style={{ fontSize: 36 }}>0</div>
          <div className="metric-label">States in active build-out</div>
        </div>
      </div>
    </div>
  )
}

/* ── Section 4: Exit Readiness ──────────────────────────────────────── */
function ExitSection() {
  const MATRIX = [
    { brand: 'Abisola Whiskey',    velocity: 5, distribution: 5, revenue: 5, team: 5, composite: 20, signal: 'Exit Ready',    pill: 'pill--green' },
    { brand: "Edmond's Honor",     velocity: 4, distribution: 4, revenue: 4, team: 4, composite: 16, signal: 'Near Ready',    pill: 'pill--green' },
    { brand: 'McBride Sisters',    velocity: 4, distribution: 4, revenue: 3, team: 4, composite: 15, signal: 'Near Ready',    pill: 'pill--green' },
    { brand: 'Harlem Brewing',     velocity: 3, distribution: 4, revenue: 3, team: 3, composite: 13, signal: 'Building',      pill: 'pill--amber' },
    { brand: 'Bayab Gin',          velocity: 4, distribution: 2, revenue: 3, team: 4, composite: 13, signal: 'Building',      pill: 'pill--amber' },
    { brand: 'Brough Brothers',    velocity: 3, distribution: 3, revenue: 3, team: 3, composite: 12, signal: 'Building',      pill: 'pill--amber' },
    { brand: 'Ten To One Rum',     velocity: 2, distribution: 3, revenue: 2, team: 3, composite: 10, signal: 'Early',         pill: 'pill--amber' },
    { brand: 'Definitions (rep.)', velocity: 1, distribution: 2, revenue: 1, team: 2, composite: 6,  signal: 'Needs Support', pill: 'pill--red'   },
  ]

  return (
    <div className="content-area">
      <p className="section-header">Exit Readiness</p>
      <p className="section-subheader">
        Brand signal matrix — 4-factor scoring framework across velocity, distribution depth, revenue trajectory, and team maturity. Composite score out of 20.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title" style={{ marginBottom: 4 }}>Exit Readiness Matrix — Portfolio Brands</div>
        <div className="source-tag" style={{ marginBottom: 16 }}>Illustrative scoring framework · Confidence flags stripped · Not sourced from audited financials</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Brand</th>
              <th style={{ textAlign: 'center' }}>Velocity</th>
              <th style={{ textAlign: 'center' }}>Distribution</th>
              <th style={{ textAlign: 'center' }}>Revenue</th>
              <th style={{ textAlign: 'center' }}>Team</th>
              <th style={{ textAlign: 'center' }}>Score /20</th>
              <th>Signal</th>
            </tr>
          </thead>
          <tbody>
            {MATRIX.map(b => (
              <tr key={b.brand}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{b.brand}</td>
                <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{b.velocity}</td>
                <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{b.distribution}</td>
                <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{b.revenue}</td>
                <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{b.team}</td>
                <td style={{ textAlign: 'center', fontFamily: 'monospace', fontWeight: 500, color: '#F2EDE4' }}>{b.composite}</td>
                <td><span className={`pill ${b.pill}`}>{b.signal}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <div className="card border-l-accent">
          <div className="card-title">Scoring Methodology</div>
          {[
            ['Velocity', '1–5 · Cases/door/month vs category benchmark'],
            ['Distribution', '1–5 · State footprint depth and chain auth status'],
            ['Revenue', '1–5 · Year-over-year trajectory and margin signal'],
            ['Team', '1–5 · Founder bandwidth, operator depth, advisor quality'],
          ].map(([dim, note]) => (
            <div key={dim} style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 12, color: '#F2EDE4', marginBottom: 2 }}>{dim}</div>
              <div style={{ fontSize: 11, color: '#5A554F' }}>{note}</div>
            </div>
          ))}
          <div className="source-tag" style={{ marginTop: 8 }}>Framework — not audited</div>
        </div>
        <div className="card">
          <div className="card-title">Readiness Distribution</div>
          <p className="module-explainer" style={{ marginBottom: 14 }}>
            Distribution of portfolio brands across exit-readiness tiers — illustrative scoring only. In a connected deployment, this reflects audited financials and live distributor data.
          </p>
          {[
            { label: 'Exit Ready / Near Ready', count: 3, pct: '38%', color: '#8ED44A' },
            { label: 'Building',                count: 3, pct: '38%', color: '#F2EDE4' },
            { label: 'Early / Needs Support',   count: 2, pct: '24%', color: '#F4725A' },
          ].map(r => (
            <div key={r.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>{r.label}</span>
                <span style={{ fontSize: 12, color: r.color }}>{r.pct}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--cream" style={{ width: r.pct, background: r.color, opacity: 0.7 }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <AIAction
        actionType="exitReadyBrands"
        label="Generate Exit Readiness Report"
        moduleContext="Portfolio Health Data Layer — Exit Readiness"
        buildUserInput={() => 'Generate an exit readiness report for the Pronghorn portfolio — identify the top candidates for exit, summarize their composite scores, and provide a narrative assessment of their readiness for M&A or strategic transaction.'}
        buildContext={() => ({ module: 'Portfolio Health', section: 'Exit Readiness' })}
      />
    </div>
  )
}

/* ── Shell ──────────────────────────────────────────────────────────── */
export default function PortfolioHealth() {
  const [section, setSection]   = useState('velocity')
  const [entered, setEntered]   = useState(false)
  const [leaving, setLeaving]   = useState(false)
  const [viewMode, setViewMode] = useState('portfolio')

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 20)
    return () => clearTimeout(t)
  }, [])

  return (
    <div
      className="dashboard-shell"
      style={{
        transform:  leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
        opacity:    (leaving || !entered) ? 0 : 1,
        transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
        display: 'flex',
        width: '100%',
        height: '100vh',
      }}
    >
      {/* Left panel */}
      <div className="left-panel">
        <div className="left-panel__bg" />
        <div className="left-panel__overlay" />
        <div className="left-panel__content">
          <HomeButton setLeaving={setLeaving} />
          <div className="panel-logo-gap" />
          <Greeting />
          <div className="panel-module-name">Portfolio Health Data Layer</div>

          <nav className="panel-nav">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`panel-nav__item${section === s.id ? ' panel-nav__item--active' : ''}`}
                style={section === s.id ? { color: MODULE_COLOR === '#1A3A6B' ? '#6B8FD4' : undefined } : {}}
                onClick={() => setSection(s.id)}
              >
                <span className="panel-nav__num">{String(SECTIONS.findIndex(x => x.id === s.id) + 1).padStart(2, '0')}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>

          <UserNotes moduleId="module03" />
          <QuickActions moduleContext="Portfolio Health Data Layer" moduleColor="#6B8FD4" />
          <GeneratedOutputs />
        </div>
      </div>

      {/* Right panel */}
      <div className="right-panel">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', borderBottom: '1px solid rgba(242,237,228,0.08)', flexShrink: 0 }}>
          <div className="sub-nav" style={{ border: 'none', padding: 0 }}>
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`sub-nav__tab${section === s.id ? ' sub-nav__tab--active' : ''}`}
                style={section === s.id ? { borderBottomColor: '#6B8FD4', color: '#F2EDE4' } : {}}
                onClick={() => setSection(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4, flexShrink: 0, marginLeft: 16 }}>
            {['portfolio', 'category', 'brand'].map(mode => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                style={{
                  background: viewMode === mode ? 'rgba(107,143,212,0.18)' : 'transparent',
                  border: `1px solid ${viewMode === mode ? '#6B8FD4' : 'rgba(242,237,228,0.12)'}`,
                  borderRadius: 4, color: viewMode === mode ? '#F2EDE4' : '#5A554F',
                  fontSize: 11, padding: '4px 10px', cursor: 'pointer',
                  textTransform: 'capitalize', letterSpacing: '0.04em',
                  transition: 'all 180ms ease',
                }}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'brand' && (
          <div style={{ padding: '8px 32px 0', borderBottom: '1px solid rgba(242,237,228,0.06)' }}>
            <BrandSelector />
          </div>
        )}

        {section === 'velocity' && <VelocitySection />}
        {section === 'sku'      && <SkuSection />}
        {section === 'chain'    && <ChainSection />}
        {section === 'exit'     && <ExitSection />}
      </div>
    </div>
  )
}
