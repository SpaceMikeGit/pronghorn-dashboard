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
  PIPELINE_OVERVIEW, PIPELINE_STAGES, PROGRAM_PERFORMANCE,
  EMPLOYER_PARTNERS, SAMPLE_ROLES
} from '../../data/pipelineData'

const MODULE_COLOR = '#5C1A6B'
const MODULE_ID    = 'module04'

const SECTIONS = [
  { id: 'overview',   label: 'Pipeline Overview'     },
  { id: 'matching',   label: 'Candidate Matching'    },
  { id: 'employers',  label: 'Employer Relationships'},
  { id: 'programs',   label: 'Program Performance'   },
]

/* ── Section 1: Pipeline Overview ──────────────────────────────────── */
function PipelineOverview() {
  const pct          = Math.round((PIPELINE_OVERVIEW.placementsAllTime / PIPELINE_OVERVIEW.targetPlacements) * 100)
  const containerRef = useRef(null)
  useCounterAnimation('tp-overview', true, containerRef)

  return (
    <div className="content-area" ref={containerRef}>
      <SynthesisPanel moduleId="module04" />
      <p className="section-header">Pipeline Overview</p>
      <p className="module-explainer">
        AI-enabled candidate matching and pipeline management for Pronghorn's 1,800-role placement commitment — the infrastructure behind the mission's most public promise.
      </p>
      <p className="section-subheader">
        Current placement status, stage distribution, and mission scoreboard.
      </p>

      <div className="grid-4" style={{ marginBottom: 20 }}>
        <div className="card card--hero">
          <div className="card-title">Careers Accelerated</div>
          <div className="metric-value animated-counter" data-target={PIPELINE_OVERVIEW.placementsAllTime} data-locale="true">0</div>
          <div className="metric-label">Of 1,800 placement goal</div>
          <div className="metric-sublabel" style={{ color: '#8ED44A' }}>74% complete · Year 5 of 10</div>
          <div className="source-tag">Pronghorn 2025 Impact Report</div>
        </div>
        <div className="card">
          <div className="card-title">Placements YTD</div>
          <div className="metric-value animated-counter" data-target={PIPELINE_OVERVIEW.placementsYTD} style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">FY25 · On pace for 152 annual</div>
          <div className="source-tag">Program enrollment records</div>
        </div>
        <div className="card">
          <div className="card-title">Active Pipeline</div>
          <div className="metric-value animated-counter" data-target={PIPELINE_OVERVIEW.totalInPipeline} style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">Candidates across all stages</div>
          <div className="source-tag">Talent operations data</div>
        </div>
        <div className="card">
          <div className="card-title">Open Roles</div>
          <div className="metric-value animated-counter" data-target={PIPELINE_OVERVIEW.openRoles} style={{ fontSize: 40 }}>0</div>
          <div className="metric-label">Across {PIPELINE_OVERVIEW.activeEmployers} employer partners</div>
          <div className="source-tag">DISCUS partner network</div>
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
                <div className="progress-fill progress-fill--cream"
                  style={{ width: `${s.pct}%` }} />
              </div>
            </div>
          ))}
          <div className="source-tag" style={{ marginTop: 8 }}>Talent pipeline · Illustrative</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="card">
            <div className="card-title">Mission Pace — 10-Year Goal</div>
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>Placements toward 1,800 goal</span>
                <span style={{ fontSize: 12, color: '#8ED44A' }}>{pct}%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--cream"
                  style={{ width: `${pct}%`, transition: 'width 2s ease-out' }} />
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 12, color: '#8C8479' }}>Timeline elapsed (Yr 5 of 10)</span>
                <span style={{ fontSize: 12, color: '#8C8479' }}>50%</span>
              </div>
              <div className="progress-track">
                <div className="progress-fill progress-fill--muted" style={{ width: '50%' }} />
              </div>
            </div>
            <div className="source-tag" style={{ marginTop: 10 }}>24-point lead over linear pace</div>
          </div>

          <div className="card border-l-accent">
            <div className="card-title">Required Monthly Rate</div>
            <div className="metric-value" style={{ fontSize: 40 }}>
              {PIPELINE_OVERVIEW.placementPaceMonthly}
            </div>
            <div className="metric-label">Placements/month to hit goal</div>
            <div className="metric-sublabel">Down from 15/month original pace</div>
            <div className="source-tag" style={{ marginTop: 8 }}>Independent analysis</div>
          </div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 0 }}>
        <div className="card-title" style={{ marginBottom: 12 }}>Generate Pipeline Report</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          200-word executive briefing — placement pace, program performance, bottlenecks, recommended priority action.
        </p>
        <AIAction
          actionType="pipelineReport"
          label="Generate Pipeline Report"
          moduleContext="Talent Pipeline Tool"
          buildContext={() => ({ ...PIPELINE_OVERVIEW, stages: PIPELINE_STAGES, programs: PROGRAM_PERFORMANCE })}
        />
      </div>
    </div>
  )
}

/* ── Section 2: Candidate Matching ─────────────────────────────────── */
function CandidateMatching() {
  const [role, setRole] = useState({ employer: '', title: '', location: '', category: '', requirements: '' })
  const [candidate, setCandidate] = useState({ background: '', programs: '', targetRole: '', geography: '' })
  const [completenessFlag, setCompletenessFlag] = useState('')

  const checkCompleteness = () => {
    const missing = []
    if (!role.employer)    missing.push('employer name')
    if (!role.title)       missing.push('role title')
    if (!candidate.background) missing.push('candidate background')
    if (!candidate.targetRole) missing.push('target role type')
    if (missing.length > 0) {
      setCompletenessFlag(`Missing: ${missing.join(', ')} — adding these will improve match accuracy.`)
      return false
    }
    setCompletenessFlag('')
    return true
  }

  return (
    <div className="content-area">
      <p className="section-header">Candidate Matching</p>
      <p className="section-subheader">
        Dual-panel AI matching interface — enter a role on the left and a candidate profile on the right.
      </p>
      <p className="module-explainer">
        Enter an open role and a candidate profile to generate an AI-powered fit assessment. Both panels use illustrative data — in a connected deployment, this pulls live from your ATS and the DISCUS employer network.
      </p>

      <div className="dual-panel">
        {/* Role input */}
        <div className="card">
          <div className="dual-panel__label">Role Requirements</div>
          <div className="dual-panel__field">
            <label>Employer</label>
            <input className="dual-panel__input" placeholder="e.g., Beam Suntory"
              value={role.employer} onChange={e => setRole(r => ({ ...r, employer: e.target.value }))} />
          </div>
          <div className="dual-panel__field">
            <label>Role Title</label>
            <input className="dual-panel__input" placeholder="e.g., Brand Activation Manager"
              value={role.title} onChange={e => setRole(r => ({ ...r, title: e.target.value }))} />
          </div>
          <div className="dual-panel__field">
            <label>Location</label>
            <input className="dual-panel__input" placeholder="e.g., New York, NY"
              value={role.location} onChange={e => setRole(r => ({ ...r, location: e.target.value }))} />
          </div>
          <div className="dual-panel__field">
            <label>Spirits Category Focus</label>
            <select className="dual-panel__select"
              value={role.category} onChange={e => setRole(r => ({ ...r, category: e.target.value }))}>
              <option value="">Select category...</option>
              {['Whiskey & Bourbon','Tequila & Mezcal','Gin','Rum','Vodka','Brandy & Cognac','All categories'].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="dual-panel__field">
            <label>Key Requirements</label>
            <textarea className="dual-panel__textarea" rows={3}
              placeholder="Experience requirements, skills, preferred background..."
              value={role.requirements} onChange={e => setRole(r => ({ ...r, requirements: e.target.value }))} />
          </div>
        </div>

        {/* Candidate input */}
        <div className="card">
          <div className="dual-panel__label">Candidate Profile</div>
          <div className="dual-panel__field">
            <label>Professional Background</label>
            <textarea className="dual-panel__textarea" rows={3}
              placeholder="Prior experience, industry, key roles..."
              value={candidate.background} onChange={e => setCandidate(c => ({ ...c, background: e.target.value }))} />
          </div>
          <div className="dual-panel__field">
            <label>Program Completion</label>
            <select className="dual-panel__select"
              value={candidate.programs} onChange={e => setCandidate(c => ({ ...c, programs: e.target.value }))}>
              <option value="">Select program...</option>
              {['Spirits Academy','PREP','HBCU Lab','Spirit Forward','Multiple programs','No program — direct pipeline'].map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
          <div className="dual-panel__field">
            <label>Target Role Type</label>
            <input className="dual-panel__input"
              placeholder="e.g., Brand marketing, on-premise sales, distributor..."
              value={candidate.targetRole} onChange={e => setCandidate(c => ({ ...c, targetRole: e.target.value }))} />
          </div>
          <div className="dual-panel__field">
            <label>Geographic Flexibility</label>
            <input className="dual-panel__input"
              placeholder="e.g., Open to relocation, New York only, remote..."
              value={candidate.geography} onChange={e => setCandidate(c => ({ ...c, geography: e.target.value }))} />
          </div>
        </div>
      </div>

      {completenessFlag && (
        <div className="screening-form__completeness" style={{ marginBottom: 12 }}>
          ⚠ {completenessFlag}
        </div>
      )}

      <div className="card">
        <div className="card-title" style={{ marginBottom: 12 }}>Match Assessment</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          Match score (0–100), three-paragraph rationale, recommended placement timeline, and employer introduction talking points.
        </p>
        <AIAction
          actionType="candidateMatch"
          label="Generate Match"
          moduleContext="Talent Pipeline Tool"
          buildUserInput={() => {
            checkCompleteness()
            return { role, candidate }
          }}
          buildContext={() => ({ role, candidate })}
        />
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-title">Open Roles — Priority Matches Needed</div>
        <table className="data-table">
          <thead>
            <tr><th>Employer</th><th>Role</th><th>Location</th><th>Category</th><th>Days Open</th></tr>
          </thead>
          <tbody>
            {SAMPLE_ROLES.map((r, i) => (
              <tr key={i}>
                <td style={{ color: '#F2EDE4' }}>{r.employer}</td>
                <td style={{ fontSize: 11 }}>{r.title}</td>
                <td>{r.location}</td>
                <td>{r.category}</td>
                <td style={{ color: r.daysOpen > 25 ? '#F4725A' : '#8C8479' }}>{r.daysOpen}d</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 10 }}>Illustrative · Pending live HRIS integration</div>
      </div>
    </div>
  )
}

/* ── Section 3: Employer Relationships ─────────────────────────────── */
function EmployerRelationships() {
  const [selectedEmployer, setSelectedEmployer] = useState('')

  return (
    <div className="content-area">
      <p className="section-header">Employer Relationships</p>
      <p className="section-subheader">
        DISCUS partner network — commitment tracking and relationship depth across {EMPLOYER_PARTNERS.length} active employers.
      </p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">DISCUS Partner Network</div>
        <div className="source-tag" style={{ marginBottom: 12 }}>Illustrative · Pending live HRIS integration</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Employer</th><th>Tier</th><th>Open Roles</th>
              <th>Total Placements</th><th>Status</th>
            </tr>
          </thead>
          <tbody>
            {EMPLOYER_PARTNERS.map(e => (
              <tr key={e.name}
                style={{ cursor: 'pointer', background: selectedEmployer === e.name ? 'rgba(244,114,90,0.05)' : '' }}
                onClick={() => setSelectedEmployer(e.name)}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{e.name}</td>
                <td>
                  <span className={`pill ${e.tier === 'Anchor' ? 'pill--green' : e.tier === 'Premier' ? 'pill--green' : 'pill--amber'}`}>
                    {e.tier}
                  </span>
                </td>
                <td style={{ fontFamily: 'monospace' }}>{e.openRoles}</td>
                <td style={{ fontFamily: 'monospace' }}>{e.totalPlacements}</td>
                <td><span className="pill pill--green">{e.commitment}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Generate Employer Pitch</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          Tailored one-page pitch for re-engaging or deepening a specific employer relationship.
          {selectedEmployer && <span style={{ color: '#F4725A' }}> Selected: {selectedEmployer}</span>}
        </p>
        {!selectedEmployer && (
          <p style={{ fontSize: 11, color: '#3A3733', marginBottom: 10 }}>
            Click an employer in the table above to pre-select, or enter a name below.
          </p>
        )}
        <AIAction
          actionType="employerPitch"
          label="Generate Employer Pitch"
          moduleContext="Talent Pipeline Tool"
          buildUserInput={() => ({
            employer: selectedEmployer || 'the selected employer',
            partner: EMPLOYER_PARTNERS.find(e => e.name === selectedEmployer),
          })}
          buildContext={() => ({ employer: selectedEmployer })}
        />
      </div>
    </div>
  )
}

/* ── Section 4: Program Performance ────────────────────────────────── */
function ProgramPerformance() {
  return (
    <div className="content-area">
      <p className="section-header">Program Performance</p>
      <p className="section-subheader">
        Spirits Academy, PREP, HBCU Lab, and Spirit Forward — enrollment, graduation, and placement rates.
      </p>

      <div className="grid-4" style={{ marginBottom: 20 }}>
        {PROGRAM_PERFORMANCE.map(p => (
          <div key={p.program} className="card">
            <div className="card-title">{p.program}</div>
            <div className="metric-value" style={{ fontSize: 36 }}>{p.rate}</div>
            <div className="metric-label">Placement rate</div>
            <div className="metric-sublabel" style={{ color: p.trend === 'Accelerating' ? '#8ED44A' : '#8C8479' }}>
              {p.trend}
            </div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Program Detail — Enrollment, Graduation & Placement</div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Program</th><th>Enrolled</th><th>Graduates</th>
              <th>Placements</th><th>Rate</th><th>Trend</th>
            </tr>
          </thead>
          <tbody>
            {PROGRAM_PERFORMANCE.map(p => (
              <tr key={p.program}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{p.program}</td>
                <td style={{ fontFamily: 'monospace' }}>{p.enrolled}</td>
                <td style={{ fontFamily: 'monospace' }}>{p.graduates}</td>
                <td style={{ fontFamily: 'monospace' }}>{p.placements}</td>
                <td style={{ color: '#8ED44A', fontFamily: 'monospace' }}>{p.rate}</td>
                <td>
                  <span className={`pill ${p.trend === 'Accelerating' ? 'pill--green' : p.trend === 'Improving' ? 'pill--green' : 'pill--amber'}`}>
                    {p.trend}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 10 }}>Program enrollment records · Illustrative</div>
      </div>

      <div className="card border-l-accent">
        <div className="card-title">Spirit Forward — Breakout Signal</div>
        <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Placement Rate</div>
            <div style={{ fontSize: 28, color: '#8ED44A', fontWeight: 300 }}>92%</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trend</div>
            <div style={{ fontSize: 28, color: '#8ED44A', fontWeight: 300 }}>↑ 2×</div>
          </div>
        </div>
        <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6 }}>
          Spirit Forward placement velocity has doubled in 18 months. The program producing the most board-ready narrative for Diageo conversations isn't the headline number — it's this acceleration. Spirit Forward is now Pronghorn's highest-efficacy placement vehicle.
        </p>
        <div className="source-tag" style={{ marginTop: 10 }}>Pronghorn 2025 Impact Report</div>
      </div>
    </div>
  )
}

/* ── Shell ──────────────────────────────────────────────────────────── */
export default function TalentPipeline() {
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
      {/* Left panel */}
      <div className="left-panel">
        <div className="left-panel__bg" />
        <div className="left-panel__overlay" />
        <div className="left-panel__content">
          <HomeButton setLeaving={setLeaving} />
          <div className="panel-logo-gap" />
          <Greeting />
          <div className="panel-module-name">Talent Pipeline Tool</div>
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
          <UserNotes moduleId="module04" />
          <QuickActions moduleContext="Talent Pipeline Tool" />
          <GeneratedOutputs />
        </div>
      </div>

      {/* Right panel */}
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
        {section === 'matching'  && <CandidateMatching />}
        {section === 'employers' && <EmployerRelationships />}
        {section === 'programs'  && <ProgramPerformance />}
      </div>
    </div>
  )
}
