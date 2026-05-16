/* ── Static data ──────────────────────────────────────────────────── */
const MATURITY_STAGES = [
  { id: 'early',    label: 'Early-Tactical',     note: 'CURRENT POSITION', current: true  },
  { id: 'tactical', label: 'Tactical-Strategic',  note: '2026 industry benchmark', current: false },
  { id: 'strategic',label: 'Strategic-Embedded',  note: '2028+ horizon',            current: false },
]

const ROADMAP = [
  {
    title:   'Portfolio health data layer',
    desc:    'Consolidated NielsenIQ/Circana depletion data, distributor SKU velocity, and chain authorization status across 39 brands.',
    unlocks: 'Diageo milestone readiness, exit-timing signal, portfolio triage.',
  },
  {
    title:   'AI-enabled candidate matching',
    desc:    "The 1,800-role commitment and three-tier career ladder are public promises. Candidate-matching infrastructure to deliver them at speed is not yet built.",
    unlocks: 'Pipeline velocity, DISCUS commitment delivery, career ladder credibility.',
  },
  {
    title:   'Deal-screening tooling',
    desc:    'Screening inbound founders for investment readiness without an AI layer is a quality and speed bottleneck.',
    unlocks: 'Deal quality, founder experience, growth-stage pipeline efficiency.',
  },
  {
    title:   'Brand activation system',
    desc:    'Repeatable AI-assisted system for every portfolio brand — audience mapping, activation calendar, retail strategy, monthly KPI review. Force-multiplier for a lean HQ across 39 brands.',
    unlocks: 'DCG/ARI results at portfolio scale, not just one brand.',
  },
  {
    title:   'Investor-grade impact reporting',
    desc:    'Auditable KPI reporting that survives Diageo milestone conversations, third-party scrutiny, and the current DEI-hostile legal climate.',
    unlocks: 'Narrative durability, Fund II case, audit readiness.',
  },
]

/* ── Component ────────────────────────────────────────────────────── */
export default function AIModule({ activeTab }) {

  /* ── Overview ───────────────────────────────────────────────────── */
  if (activeTab === 'overview') return (
    <div className="content-area">
      <p className="section-header">AI &amp; Infrastructure</p>
      <p className="section-subheader">
        Pronghorn's own 2025 Impact Report names Tech + AI, Systems, and Partners as explicit acceleration priorities — the next phase of the build. This module maps what that infrastructure looks like when fully realized.
      </p>

      {/* ── Maturity track ──────────────────────────────────────────── */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Operational Maturity Assessment</div>
        <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
          {MATURITY_STAGES.map((stage, i) => (
            <div key={stage.id} style={{
              flex: 1,
              padding: '14px 18px',
              background:    stage.current ? 'rgba(244,114,90,0.10)' : 'rgba(242,237,228,0.03)',
              border:        stage.current ? '1px solid rgba(244,114,90,0.38)' : '1px solid rgba(242,237,228,0.07)',
              borderLeft:    i > 0 ? 'none' : undefined,
              borderRadius:  i === 0 ? '6px 0 0 6px' : i === MATURITY_STAGES.length - 1 ? '0 6px 6px 0' : 0,
            }}>
              <div style={{
                fontSize: 13, fontWeight: 500, marginBottom: 5,
                color: stage.current ? '#F4725A' : '#8C8479',
              }}>
                {stage.label}
              </div>
              <div style={{
                fontSize: 11, letterSpacing: '0.05em',
                color: stage.current ? '#F4725A' : '#5A554F',
              }}>
                {stage.current ? '▶ ' : ''}{stage.note}
              </div>
            </div>
          ))}
        </div>
        <div className="source-tag">Pronghorn 2025 Impact Report · Acceleration Priorities section</div>
      </div>

      {/* ── Two-column content ───────────────────────────────────────── */}
      <div className="grid-2">

        {/* Left — What exists today */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 600, color: '#5A554F',
            letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            What exists today
          </div>

          {/* DCG / ARI card — amber highlight */}
          <div className="card" style={{
            marginBottom: 12,
            border: '1px solid rgba(251,191,36,0.22)',
            background: 'rgba(251,191,36,0.03)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
              <div>
                <div className="card-title">DCG / Audience Resonance Index</div>
                <div style={{ fontSize: 12, color: '#8C8479', marginTop: 2 }}>Edmond's Honor — first-party brand</div>
              </div>
              <span style={{
                fontSize: 10, padding: '4px 9px', borderRadius: 20, flexShrink: 0,
                background: 'rgba(251,191,36,0.14)', color: '#FBB024',
                border: '1px solid rgba(251,191,36,0.30)', lineHeight: 1.4, textAlign: 'center',
              }}>
                Digiday Award<br />Best AI Tool 2025
              </span>
            </div>

            <div style={{ display: 'flex', gap: 24, marginBottom: 12 }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 300, color: '#F2EDE4', lineHeight: 1 }}>3.2×</div>
                <div style={{ fontSize: 10, color: '#8C8479', marginTop: 4 }}>mid-funnel volume</div>
                <div style={{ fontSize: 10, color: '#5A554F' }}>above forecast</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 300, color: '#F2EDE4', lineHeight: 1 }}>6×</div>
                <div style={{ fontSize: 10, color: '#8C8479', marginTop: 4 }}>dwell time</div>
                <div style={{ fontSize: 10, color: '#5A554F' }}>premium placements</div>
              </div>
            </div>

            <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.55, marginBottom: 10 }}>
              Vendor-delivered AI marketing platform applied to one first-party brand.
            </p>
            <p style={{ fontSize: 12, color: '#F2EDE4', lineHeight: 1.55, fontStyle: 'italic', marginBottom: 10 }}>
              "The proof of what's possible — the question is what it looks like at portfolio scale."
            </p>
            <div className="source-tag">DCG/Pronghorn press release · December 2025</div>
          </div>

          {/* Generative AI Intern card */}
          <div className="card">
            <div className="card-title">Generative AI Intern</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span className="pill pill--green">Active Posting</span>
              <span style={{ fontSize: 11, color: '#5A554F' }}>HQ role · Rippling ATS</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              {['Custom GPT development', 'Prompt engineering', 'AI-assisted content creation'].map(item => (
                <div key={item} style={{ fontSize: 12, color: '#8C8479', marginBottom: 4, display: 'flex', gap: 6 }}>
                  <span style={{ color: '#5A554F', flexShrink: 0 }}>·</span>
                  {item}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#F2EDE4', lineHeight: 1.55, fontStyle: 'italic', marginBottom: 10 }}>
              "An active signal that AI exploration is being formalized at the organizational level."
            </p>
            <div className="source-tag">Pronghorn Careers via Rippling ATS — confirmed HQ role</div>
          </div>
        </div>

        {/* Right — Infrastructure roadmap */}
        <div>
          <div style={{
            fontSize: 10, fontWeight: 600, color: '#5A554F',
            letterSpacing: '0.10em', textTransform: 'uppercase', marginBottom: 12,
          }}>
            Infrastructure roadmap — what gets built next
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {ROADMAP.map(item => (
              <div key={item.title} className="card border-l-accent" style={{ padding: '12px 14px' }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: '#F2EDE4', marginBottom: 5 }}>{item.title}</div>
                <p style={{ fontSize: 11, color: '#8C8479', lineHeight: 1.55, marginBottom: 7 }}>{item.desc}</p>
                <div style={{ fontSize: 11, color: '#5A554F' }}>
                  <span style={{ color: '#F4725A' }}>Unlocks: </span>{item.unlocks}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )

  /* ── Details ────────────────────────────────────────────────────── */
  return (
    <div className="content-area">
      <p className="section-header">AI &amp; Infrastructure</p>
      <p className="section-subheader">Source attribution and independent gap analysis.</p>

      {/* Source attribution */}
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">Source Attribution — Acceleration Priorities</div>
        <p style={{ fontSize: 13, color: '#F2EDE4', lineHeight: 1.65, marginBottom: 10 }}>
          Tech + AI | Systems | Partners — Pronghorn's stated acceleration priorities, 2025 Impact Report. The infrastructure roadmap above maps directly to these three pillars.
        </p>
        <p style={{ fontSize: 13, color: '#8C8479', lineHeight: 1.65, marginBottom: 0 }}>
          The 2025 Impact Report names these priorities as the <em>next phase of the build</em> — not as existing deployed infrastructure. Each pillar represents an area where investment is being directed, not a capability already operating at scale.
        </p>
        <div className="source-tag" style={{ marginTop: 12 }}>Pronghorn 2025 Impact Report · Acceleration Priorities section</div>
      </div>

      {/* Maturity gap */}
      <div className="card" style={{
        marginBottom: 0,
        border: '1px solid rgba(244,114,90,0.20)',
        background: 'rgba(244,114,90,0.03)',
      }}>
        <div className="card-title">Maturity Gap — Independent Analysis</div>
        <p style={{ fontSize: 13, color: '#F2EDE4', lineHeight: 1.65, marginBottom: 12 }}>
          Gap of approximately 2–3 years versus where a $200M-commitment, multi-brand-portfolio, mission-critical-talent-placement platform should be operating at 2026 best practice.
        </p>
        <p style={{ fontSize: 13, color: '#8C8479', lineHeight: 1.65, marginBottom: 0 }}>
          The expanded public commitments on the May 2026 site update have widened, not narrowed, the distance between what Pronghorn is publicly promising and what its current infrastructure can deliver.
        </p>
        <div className="source-tag" style={{ marginTop: 12 }}>Independent analysis</div>
      </div>

    </div>
  )
}
