import { useState, useEffect, useRef } from 'react'
import '../../index.css'
import SynthesisPanel from '../../components/SynthesisPanel'
import QuickActions   from '../../components/QuickActions'
import AIAction       from '../../components/AIAction'
import Greeting       from '../../components/Greeting'
import HomeButton     from '../../components/HomeButton'
import UserNotes         from '../../components/UserNotes'
import GeneratedOutputs  from '../../components/GeneratedOutputs'
import { useCounterAnimation } from '../../hooks/useCounterAnimation'
import {
  SCORING_DIMENSIONS, PIPELINE_STAGES, SAMPLE_APPLICATIONS, DILIGENCE_LIBRARY
} from '../../data/dealData'

const MODULE_COLOR = '#6B3A1A'

const SECTIONS = [
  { id: 'overview',   label: 'Pipeline Overview'     },
  { id: 'screening',  label: 'Application Screening' },
  { id: 'library',    label: 'Due Diligence Library' },
  { id: 'icprep',     label: 'IC Prep'               },
]

/* ── Section 1: Pipeline Overview ──────────────────────────────────── */
function PipelineOverview() {
  const containerRef = useRef(null)
  useCounterAnimation('ds-overview', true, containerRef)
  const totalApps = PIPELINE_STAGES.reduce((s, p) => s + p.count, 0)

  return (
    <div className="content-area" ref={containerRef}>
      <SynthesisPanel moduleId="module05" />
      <p className="section-header">Pipeline Overview</p>
      <p className="module-explainer">
        AI-augmented due diligence for inbound founder applications — built to screen at the volume Pronghorn encounters without sacrificing deal quality or speed.
      </p>
      <p className="section-subheader">
        Inbound applications by stage, volume, and conversion rates. Illustrative data.
      </p>

      <div className="grid-3" style={{ marginBottom: 20 }}>
        <div className="card card--hero">
          <div className="card-title">Active Applications</div>
          <div className="metric-value animated-counter" data-target={totalApps} style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">Across all pipeline stages</div>
          <div className="source-tag">Illustrative</div>
        </div>
        <div className="card">
          <div className="card-title">IC-Ready Brands</div>
          <div className="metric-value animated-counter" data-target="6" style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">Score 65+ · Deep diligence threshold</div>
        </div>
        <div className="card">
          <div className="card-title">Investments Closed</div>
          <div className="metric-value animated-counter" data-target="3" style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">YTD · From current pipeline</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Pipeline Stage Distribution</div>
          {PIPELINE_STAGES.map(s => (
            <div key={s.stage} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>{s.stage}</span>
                <span style={{ fontSize: 12, color: '#F2EDE4' }}>{s.count}</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--cream" style={{ width: `${s.pct * 2.5}%` }} />
              </div>
            </div>
          ))}
          <div className="source-tag" style={{ marginTop: 8 }}>Illustrative · Pending live integration</div>
        </div>

        <div className="card">
          <div className="card-title">Current Applications — Scored</div>
          <table className="data-table">
            <thead>
              <tr><th>Brand</th><th>Category</th><th>Score</th><th>Recommendation</th></tr>
            </thead>
            <tbody>
              {SAMPLE_APPLICATIONS.map(a => (
                <tr key={a.name}>
                  <td style={{ color: '#F2EDE4', fontWeight: 400, fontSize: 11 }}>{a.name}</td>
                  <td style={{ fontSize: 10 }}>{a.category}</td>
                  <td style={{ fontFamily: 'monospace', color: a.score >= 65 ? '#8ED44A' : a.score >= 40 ? '#8C8479' : '#F4725A' }}>
                    {a.score}
                  </td>
                  <td><span className={`pill ${a.pill}`} style={{ fontSize: 9 }}>{a.rec.split(' — ')[0]}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Section 2: Application Screening ──────────────────────────────── */
function ApplicationScreening() {
  const [form, setForm] = useState({
    brandName: '', category: '', founderName: '', yearsExperience: '',
    industryRelationships: '', executionProof: '',
    positioning: '', culturalAuth: '', narrativeStrength: '',
    categoryGrowth: '', whiteSpace: '', distributionOpp: '',
    revenueTrajectory: '', distributionVelocity: '', footprint: '',
    supplyChain: '', productionCapacity: '', teamDepth: '',
    blackOwnership: '', communityImpact: '',
  })

  const [completenessFlag, setCompletenessFlag] = useState('')

  const requiredFields = ['brandName','category','founderName','positioning','revenueTrajectory','blackOwnership']

  const checkCompleteness = () => {
    const missing = requiredFields.filter(f => !form[f]).map(f => f.replace(/([A-Z])/g, ' $1').toLowerCase())
    if (missing.length > 0) {
      setCompletenessFlag(`Missing: ${missing.join(', ')} — completing these fields will improve assessment confidence.`)
    } else {
      setCompletenessFlag('')
    }
  }

  const update = (field, val) => setForm(f => ({ ...f, [field]: val }))

  return (
    <div className="content-area">
      <p className="section-header">Application Screening</p>
      <p className="section-subheader">
        Structured input form + AI assessment output. Fields map to the six scoring dimensions.
        Deep diligence threshold: 65+. IC threshold: 80+.
      </p>
      <p className="module-explainer">
        Complete the form below to generate an AI-powered diligence score. Scoring is illustrative — in a connected deployment this integrates with Pronghorn's live founder application portal.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <form className="screening-form" onSubmit={e => e.preventDefault()}>
          <div className="screening-form__section">
            <div className="screening-form__section-label">Brand Basics</div>
            <div className="screening-form__grid">
              <div className="screening-form__field">
                <label>Brand Name *</label>
                <input className="screening-form__input" placeholder="e.g., Solstice Rum Co."
                  value={form.brandName} onChange={e => update('brandName', e.target.value)} />
              </div>
              <div className="screening-form__field">
                <label>Spirit Category *</label>
                <select className="screening-form__select"
                  value={form.category} onChange={e => update('category', e.target.value)}>
                  <option value="">Select...</option>
                  {['Rum','Whiskey & Bourbon','Tequila & Mezcal','Gin','Vodka','Brandy & Cognac','Distilleries & Other'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className="screening-form__field">
                <label>Founder Name *</label>
                <input className="screening-form__input" placeholder="Full name"
                  value={form.founderName} onChange={e => update('founderName', e.target.value)} />
              </div>
              <div className="screening-form__field">
                <label>Years Industry Experience</label>
                <input className="screening-form__input" type="number" placeholder="e.g., 8"
                  value={form.yearsExperience} onChange={e => update('yearsExperience', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="screening-form__section">
            <div className="screening-form__section-label">Founder Readiness (25%)</div>
            <div className="screening-form__grid">
              <div className="screening-form__field">
                <label>Industry Relationships</label>
                <textarea className="screening-form__textarea" rows={2}
                  placeholder="Distributor, retail, or industry contacts..."
                  value={form.industryRelationships} onChange={e => update('industryRelationships', e.target.value)} />
              </div>
              <div className="screening-form__field">
                <label>Execution Proof</label>
                <textarea className="screening-form__textarea" rows={2}
                  placeholder="Prior launches, business built, milestones hit..."
                  value={form.executionProof} onChange={e => update('executionProof', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="screening-form__section">
            <div className="screening-form__section-label">Brand Differentiation (20%)</div>
            <div className="screening-form__grid">
              <div className="screening-form__field">
                <label>Category Positioning *</label>
                <textarea className="screening-form__textarea" rows={2}
                  placeholder="How it's positioned in the category..."
                  value={form.positioning} onChange={e => update('positioning', e.target.value)} />
              </div>
              <div className="screening-form__field">
                <label>Cultural Authenticity</label>
                <textarea className="screening-form__textarea" rows={2}
                  placeholder="Heritage, story, authentic differentiation..."
                  value={form.culturalAuth} onChange={e => update('culturalAuth', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="screening-form__section">
            <div className="screening-form__section-label">Commercial Traction (20%)</div>
            <div className="screening-form__grid">
              <div className="screening-form__field">
                <label>Revenue Trajectory *</label>
                <textarea className="screening-form__textarea" rows={2}
                  placeholder="Last 12–24 months revenue, trend direction..."
                  value={form.revenueTrajectory} onChange={e => update('revenueTrajectory', e.target.value)} />
              </div>
              <div className="screening-form__field">
                <label>Distribution Footprint</label>
                <textarea className="screening-form__textarea" rows={2}
                  placeholder="States, accounts, distributors, chain auth..."
                  value={form.footprint} onChange={e => update('footprint', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="screening-form__section">
            <div className="screening-form__section-label">Mission Alignment (10%)</div>
            <div className="screening-form__grid">
              <div className="screening-form__field">
                <label>Black Ownership & Leadership *</label>
                <input className="screening-form__input"
                  placeholder="Ownership structure, leadership team..."
                  value={form.blackOwnership} onChange={e => update('blackOwnership', e.target.value)} />
              </div>
              <div className="screening-form__field">
                <label>Community Impact</label>
                <input className="screening-form__input"
                  placeholder="Community connection, impact narrative..."
                  value={form.communityImpact} onChange={e => update('communityImpact', e.target.value)} />
              </div>
            </div>
          </div>
        </form>

        {completenessFlag && (
          <div className="screening-form__completeness" style={{ marginBottom: 12 }}>
            ⚠ {completenessFlag}
          </div>
        )}

        <AIAction
          actionType="screeningAssessment"
          label="Run Screening Assessment"
          moduleContext="Deal Screening Tool"
          buildUserInput={() => { checkCompleteness(); return form }}
          buildContext={() => ({ form, dimensions: SCORING_DIMENSIONS })}
        />
      </div>

      {/* Scoring framework reference */}
      <div className="card">
        <div className="card-title">Investment Readiness Scoring Framework</div>
        <table className="data-table">
          <thead><tr><th>Dimension</th><th>Weight</th><th>What It Measures</th></tr></thead>
          <tbody>
            {SCORING_DIMENSIONS.map(d => (
              <tr key={d.id}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{d.label}</td>
                <td style={{ fontFamily: 'monospace', color: '#F4725A' }}>{d.weight}%</td>
                <td style={{ fontSize: 11 }}>{d.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 10 }}>
          Deep diligence: 65+ &nbsp;·&nbsp; IC presentation: 80+ &nbsp;·&nbsp; Thresholds configurable
        </div>
      </div>
    </div>
  )
}

/* ── Section 3: Due Diligence Library ──────────────────────────────── */
function DiligenceLibrary() {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [externalNotes,    setExternalNotes]    = useState('')

  return (
    <div className="content-area">
      <p className="section-header">Due Diligence Library</p>
      <p className="section-subheader">
        Completed diligence frameworks by category. Gets more useful over time — every brief stored here sharpens future evaluations.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Category Brief Library</div>
        <table className="data-table">
          <thead>
            <tr><th>Category</th><th>Brief Date</th><th>Top Brands</th><th>Key White Space</th></tr>
          </thead>
          <tbody>
            {DILIGENCE_LIBRARY.map(d => (
              <tr key={d.category}
                style={{ cursor: 'pointer', background: selectedCategory === d.category ? 'rgba(244,114,90,0.05)' : '' }}
                onClick={() => setSelectedCategory(d.category)}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{d.category}</td>
                <td style={{ fontSize: 11 }}>{d.briefDate}</td>
                <td style={{ fontSize: 11 }}>{d.topBrands}</td>
                <td style={{ fontSize: 11 }}>{d.whiteSpace}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 10 }}>Illustrative · Library grows with each category brief generated</div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Generate Category Brief</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          Current competitive landscape, white space analysis, M&A activity, distribution dynamics, strategic questions.
          {selectedCategory && <span style={{ color: '#F4725A' }}> Selected: {selectedCategory}</span>}
        </p>
        <div style={{ marginBottom: 12 }}>
          <select className="screening-form__select" style={{ width: 'auto' }}
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}>
            <option value="">Select a category...</option>
            {['Rum','Whiskey & Bourbon','Tequila & Mezcal','Gin','Vodka','Brandy & Cognac'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: 'block', fontSize: 11, color: '#8C8479', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            External Research Notes
          </label>
          <textarea
            className="screening-form__textarea"
            rows={3}
            placeholder="Paste in any external research, recent news, or analyst reports for this category..."
            value={externalNotes}
            onChange={e => setExternalNotes(e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <AIAction
          actionType="categoryBrief"
          label="Generate Category Brief"
          moduleContext="Deal Screening Tool"
          buildUserInput={() => ({ category: selectedCategory, externalNotes })}
          buildContext={() => ({ category: selectedCategory, library: DILIGENCE_LIBRARY, externalNotes })}
        />
      </div>
    </div>
  )
}

/* ── Section 4: IC Prep ─────────────────────────────────────────────── */
function ICPrep() {
  const [brand, setBrand] = useState('')
  const [assessment, setAssessment] = useState('')
  const [notes, setNotes] = useState('')

  return (
    <div className="content-area">
      <p className="section-header">IC Prep</p>
      <p className="section-subheader">
        Investment committee brief generation — structured IC brief for advancing applications.
        Pulls from completed screening assessment and additional diligence notes.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">IC Brief Generator</div>
        <div style={{ marginBottom: 14 }}>
          <label className="dual-panel__label" style={{ display: 'block', marginBottom: 6 }}>Brand Name</label>
          <input className="screening-form__input" style={{ maxWidth: 320 }}
            placeholder="Brand advancing to IC..."
            value={brand} onChange={e => setBrand(e.target.value)} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="dual-panel__label" style={{ display: 'block', marginBottom: 6 }}>Screening Assessment Summary</label>
          <textarea className="screening-form__textarea" rows={4}
            placeholder="Paste or summarize the screening assessment output — scores, key findings, recommendation..."
            value={assessment} onChange={e => setAssessment(e.target.value)} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label className="dual-panel__label" style={{ display: 'block', marginBottom: 6 }}>Additional Diligence Notes</label>
          <textarea className="screening-form__textarea" rows={4}
            placeholder="Founder call notes, third-party references, market visits, additional financial data..."
            value={notes} onChange={e => setNotes(e.target.value)} />
        </div>
        <AIAction
          actionType="icBrief"
          label="Generate IC Brief"
          moduleContext="Deal Screening Tool"
          buildUserInput={() => ({ brand, assessment, notes })}
          buildContext={() => ({ brand, assessment, notes })}
        />
      </div>

      <div className="card">
        <div className="card-title">IC Brief Structure — What Gets Generated</div>
        {[
          ['Executive Summary',            'One paragraph — what this brand is and why it matters'],
          ['Brand Overview',               'One paragraph — product, market position, founder'],
          ['Investment Thesis',            'One paragraph — the specific Pronghorn case for investment'],
          ['Risk Factors & Mitigants',     'Three risks, each with a specific mitigant'],
          ['Comparable Portfolio Brands',  'Two Pronghorn brands at a similar stage when invested'],
          ['Recommended Deal Structure',   'Investment type, amount range, board representation, key terms'],
          ['Questions to Pressure-Test',   'Five specific questions the IC should ask'],
        ].map(([title, desc]) => (
          <div key={title} style={{ marginBottom: 12 }}>
            <div style={{ fontSize: 12, color: '#F2EDE4', marginBottom: 2 }}>{title}</div>
            <div style={{ fontSize: 11, color: '#5A554F' }}>{desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Shell ──────────────────────────────────────────────────────────── */
export default function DealScreening() {
  const [section, setSection] = useState('overview')
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)

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
        display: 'flex', width: '100%', height: '100vh',
      }}
    >
      <div className="left-panel">
        <div className="left-panel__bg" />
        <div className="left-panel__overlay" />
        <div className="left-panel__content">
          <HomeButton setLeaving={setLeaving} />
          <div className="panel-logo-gap" />
          <Greeting />
          <div className="panel-module-name">Deal Screening Tool</div>
          <nav className="panel-nav">
            {SECTIONS.map((s, i) => (
              <button key={s.id}
                className={`panel-nav__item${section === s.id ? ' panel-nav__item--active' : ''}`}
                onClick={() => setSection(s.id)}>
                <span className="panel-nav__num">{String(i+1).padStart(2,'0')}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>
          <UserNotes moduleId="module05" />
          <QuickActions moduleContext="Deal Screening Tool" />
          <GeneratedOutputs />
        </div>
      </div>

      <div className="right-panel">
        <div className="sub-nav">
          {SECTIONS.map(s => (
            <button key={s.id}
              className={`sub-nav__tab${section === s.id ? ' sub-nav__tab--active' : ''}`}
              style={section === s.id ? { borderBottomColor: MODULE_COLOR, color: '#F2EDE4' } : {}}
              onClick={() => setSection(s.id)}>
              {s.label}
            </button>
          ))}
        </div>
        {section === 'overview'  && <PipelineOverview />}
        {section === 'screening' && <ApplicationScreening />}
        {section === 'library'   && <DiligenceLibrary />}
        {section === 'icprep'    && <ICPrep />}
      </div>
    </div>
  )
}
