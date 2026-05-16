import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../../index.css'
import AIAction from '../../components/AIAction'
import BrandSelector from '../../components/BrandSelector'
import QuickActions from '../../components/QuickActions'
import SynthesisPanel from '../../components/SynthesisPanel'
import Greeting from '../../components/Greeting'
import HomeButton from '../../components/HomeButton'
import UserNotes         from '../../components/UserNotes'
import GeneratedOutputs  from '../../components/GeneratedOutputs'
import { useUser } from '../../context/UserContext'

const MODULE_COLOR = '#8A4A1B'

const SECTIONS = [
  { id: 'audience',  label: 'Audience Targeting' },
  { id: 'content',   label: 'Content Strategy' },
  { id: 'assets',    label: 'Asset Generation' },
  { id: 'trade',     label: 'Trade Activation' },
]

const EXPLAINER = 'A repeatable, AI-assisted brand activation system — example: Bayab Gin. Designed to template across every brand in the Pronghorn portfolio. One operator. Forty-plus brands.'

/* ── Section 1: Audience Targeting ─────────────────────────────────── */
function AudienceSection() {
  const CLUSTERS = [
    {
      name:    'Place-Coded Premium Explorers',
      age:     '28–42',
      income:  '$85K–$140K',
      profile: 'Urban and inner-ring suburban professionals. Seek spirits that signal worldliness without ostentation. Gin as a category choice communicates sophistication. Discovery-oriented — will try new expressions based on provenance and narrative.',
      channels: ['On-premise craft bars', 'Specialty bottle shops', 'Instagram / editorial content'],
      index:    'High'
    },
    {
      name:    'Bartender-Led Craft Seekers',
      age:     '25–38',
      income:  '$55K–$95K',
      profile: 'Trust the bartender as curator. Discovery happens at the bar — not in a feed. Motivated by originality and story. African-grown botanicals register as genuinely novel. Repeat purchase driven by bartender advocacy and loyalty.',
      channels: ['Craft cocktail bars', 'Mixologist-driven events', 'Bartender ambassador programs'],
      index:    'Very High'
    },
    {
      name:    'Aesthetic Social Curators',
      age:     '24–36',
      income:  '$60K–$110K',
      profile: 'Purchase decisions shaped by visual identity and cultural alignment. Gin as a signal of taste and identity. Bayab\'s African heritage and design language provide authentic visual distinction. Strong UGC potential if brand aesthetic resonates.',
      channels: ['Instagram', 'TikTok', 'Lifestyle press and cultural media'],
      index:    'High'
    },
  ]

  const COMPETITORS = [
    { brand: 'Hendrick\'s', positioning: 'Eccentric British premium', strength: 'Awareness & trial', gap: 'No cultural narrative' },
    { brand: 'Tanqueray',   positioning: 'Classic London Dry authority', strength: 'Distribution depth', gap: 'No differentiated story' },
    { brand: 'Bombay',      positioning: 'Mass-premium global',          strength: 'Chain authorization', gap: 'Category genericness' },
    { brand: 'Uncle Val\'s',positioning: 'Botanical storytelling',       strength: 'On-premise craft bars', gap: 'Limited scale' },
    { brand: 'Bayab',       positioning: 'African-grown terroir & heritage', strength: 'Authentic provenance', gap: 'Distribution — Phase 1' },
  ]

  return (
    <div className="content-area">
      <SynthesisPanel moduleId="module02" />
      <p className="section-header">Audience Targeting</p>
      <p className="module-explainer">{EXPLAINER}</p>
      <p className="section-subheader">Three validated cluster profiles — competitive landscape and north star positioning for Bayab Gin market entry.</p>

      <div style={{ marginBottom: 24 }}>
        <div className="card-title" style={{ marginBottom: 16 }}>Three Audience Clusters</div>
        <div className="grid-3">
          {CLUSTERS.map((c, i) => (
            <div key={c.name} className="card border-l-accent">
              <div className="card-title">{c.name}</div>
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Age</div>
                  <div style={{ fontSize: 13, color: '#F2EDE4' }}>{c.age}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Income</div>
                  <div style={{ fontSize: 13, color: '#F2EDE4' }}>{c.income}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Priority</div>
                  <div style={{ fontSize: 13, color: '#8ED44A' }}>{c.index}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6, marginBottom: 12 }}>{c.profile}</p>
              <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Key channels</div>
              {c.channels.map(ch => (
                <div key={ch} style={{ fontSize: 12, color: '#8C8479', marginBottom: 2 }}>· {ch}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Competitive Landscape</div>
        <table className="data-table">
          <thead><tr><th>Brand</th><th>Positioning</th><th>Strength</th><th>Category Gap</th></tr></thead>
          <tbody>
            {COMPETITORS.map(row => (
              <tr key={row.brand}>
                <td style={{ color: row.brand === 'Bayab' ? '#F4725A' : '#F2EDE4', fontWeight: row.brand === 'Bayab' ? 500 : 400 }}>{row.brand}</td>
                <td>{row.positioning}</td>
                <td style={{ color: '#8C8479' }}>{row.strength}</td>
                <td style={{ color: '#5A554F' }}>{row.gap}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 12 }}>Component 1 — Audience Targeting · Bayab Brand Activation System</div>
      </div>

      <div className="card border-l-accent">
        <div className="card-title">North Star Insight</div>
        <p style={{ fontSize: 18, fontWeight: 300, color: '#F2EDE4', lineHeight: 1.5, marginBottom: 10 }}>
          "Bayab is the only gin in the US market with a verifiable African terroir story — and no other brand is telling it."
        </p>
        <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6 }}>
          The competitive white space is authentic provenance with cultural substance. Every activation decision should chain back to this positioning anchor.
        </p>
      </div>

      <AIAction
        actionType="activationBrief"
        label="Generate Activation Brief"
        moduleContext="Brand Activation System — Audience Targeting"
        buildUserInput={() => 'Generate a comprehensive activation brief for Bayab Gin based on the three audience clusters, competitive landscape, and north star positioning.'}
        buildContext={() => ({ brand: 'Bayab Gin', module: 'Brand Activation System', section: 'Audience Targeting' })}
      />
    </div>
  )
}

/* ── Section 2: Content Strategy ───────────────────────────────────── */
function ContentSection() {
  const PILLARS = [
    {
      name:    'The Ritual',
      tagline: 'How Bayab is meant to be experienced',
      desc:    'Serve rituals, cocktail builds, and sensory moments that communicate premium intentionality. Positions Bayab as a craft object worthy of consideration — not a commodity pour.',
      formats: ['How-to video (15–30s)', 'Cocktail photography', 'Bartender reels'],
    },
    {
      name:    'The Source',
      tagline: 'Where Bayab comes from and why it matters',
      desc:    'African-grown botanicals, terroir specificity, and provenance storytelling. Differentiates Bayab from every other gin in the category — no competitor can replicate this story.',
      formats: ['Documentary-style long-form', 'Static origin photography', 'Founder story content'],
    },
    {
      name:    'The Co-Sign',
      tagline: 'Who stands behind Bayab',
      desc:    'Bartender advocacy, sommelier endorsements, and cultural figure alignment. Third-party credibility accelerates trial among craft-seeking audiences who distrust brand-native content.',
      formats: ['Bartender takeovers', 'Expert review clips', 'Event documentation'],
    },
    {
      name:    'The Occasion',
      tagline: 'When and where Bayab belongs',
      desc:    'Cultural moments, seasonal occasions, and social contexts where Bayab is the correct choice. Builds mental availability without relying on direct product promotion.',
      formats: ['Occasion-triggered posts', 'Cultural calendar content', 'Lifestyle photography'],
    },
  ]

  const PLATFORM = [
    { platform: 'Instagram', role: 'Primary brand canvas', priority: 'Core', cadence: 'Daily story / 4× weekly grid' },
    { platform: 'TikTok',    role: 'Discovery & ritual content', priority: 'Core', cadence: '3× weekly' },
    { platform: 'LinkedIn',  role: 'Trade & partner audience', priority: 'Secondary', cadence: '2× weekly' },
    { platform: 'YouTube',   role: 'Long-form provenance content', priority: 'Investment', cadence: 'Monthly' },
  ]

  const VOICE = [
    { dimension: 'Tone',        spec: 'Assured — never loud. Confidence without announcement.' },
    { dimension: 'Register',    spec: 'Educated but not academic. Speaks to the informed drinker.' },
    { dimension: 'Perspective', spec: 'First-person plural. Bayab is a we — brand and community.' },
    { dimension: 'Prohibition', spec: 'No superlatives. No "best" or "finest." Let the story do the work.' },
    { dimension: 'Authenticity',spec: 'Africa is not a backdrop. It is the point. Name places. Name people.' },
  ]

  return (
    <div className="content-area">
      <p className="section-header">Content Strategy</p>
      <p className="section-subheader">Four content pillars, platform strategy, and the voice guide that governs all Bayab brand communications.</p>

      <div style={{ marginBottom: 24 }}>
        <div className="card-title" style={{ marginBottom: 16 }}>Four Content Pillars</div>
        <div className="grid-2">
          {PILLARS.map(p => (
            <div key={p.name} className="card border-l-accent">
              <div className="card-title">{p.name}</div>
              <div style={{ fontSize: 13, fontStyle: 'italic', color: '#F2EDE4', marginBottom: 10 }}>"{p.tagline}"</div>
              <p style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
              <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>Formats</div>
              {p.formats.map(f => (
                <div key={f} style={{ fontSize: 12, color: '#5A554F', marginBottom: 2 }}>· {f}</div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Platform Strategy</div>
          <table className="data-table">
            <thead><tr><th>Platform</th><th>Role</th><th>Priority</th><th>Cadence</th></tr></thead>
            <tbody>
              {PLATFORM.map(row => (
                <tr key={row.platform}>
                  <td>{row.platform}</td>
                  <td style={{ color: '#8C8479' }}>{row.role}</td>
                  <td><span className={`pill ${row.priority === 'Core' ? 'pill--green' : row.priority === 'Secondary' ? 'pill--amber' : 'pill--gray'}`}>{row.priority}</span></td>
                  <td style={{ color: '#5A554F', fontSize: 12 }}>{row.cadence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card">
          <div className="card-title">Voice &amp; Tone Guide</div>
          {VOICE.map(row => (
            <div key={row.dimension} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(242,237,228,0.06)' }}>
              <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>{row.dimension}</div>
              <div style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.5 }}>{row.spec}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">30-Day Content Calendar — Phase 1 Overview</div>
        <div className="grid-3">
          {[
            { week: 'Week 1', theme: 'Origin & Source', focus: 'Botanical provenance. African terroir. Founding story launch.' },
            { week: 'Week 2', theme: 'The Ritual', focus: 'Signature serve reveals. Bartender collaborations. How-to content.' },
            { week: 'Week 3', theme: 'The Co-Sign', focus: 'Trade press amplification. Bartender testimonials. Expert endorsement.' },
            { week: 'Week 4', theme: 'The Occasion', focus: 'Lifestyle placement. Cultural moment alignment. Community content.' },
          ].map(w => (
            <div key={w.week} style={{ padding: '12px 0', borderBottom: '1px solid rgba(242,237,228,0.06)' }}>
              <div style={{ fontSize: 11, color: '#F4725A', marginBottom: 4, fontWeight: 500 }}>{w.week}</div>
              <div style={{ fontSize: 13, color: '#F2EDE4', marginBottom: 6 }}>{w.theme}</div>
              <div style={{ fontSize: 12, color: '#5A554F', lineHeight: 1.5 }}>{w.focus}</div>
            </div>
          ))}
        </div>
        <div className="source-tag" style={{ marginTop: 12 }}>Component 2 — Content Strategy · Bayab Brand Activation System</div>
      </div>

      <AIAction
        actionType="contentCalendar"
        label="Generate Content Calendar"
        moduleContext="Brand Activation System — Content Strategy"
        buildUserInput={() => 'Generate a detailed 30-day content calendar for Bayab Gin across all four content pillars — The Ritual, The Source, The Co-Sign, and The Occasion — with platform-specific recommendations.'}
        buildContext={() => ({ brand: 'Bayab Gin', module: 'Brand Activation System', section: 'Content Strategy' })}
      />
    </div>
  )
}

/* ── Section 3: Asset Generation ───────────────────────────────────── */
function AssetsSection() {
  const [expandedPrompt, setExpandedPrompt] = useState(null)

  const FORMATS = [
    { platform: 'Instagram Grid',   dims: '1080 × 1080 px', ratio: '1:1',   safe: '4:5 safe zone', notes: 'Primary brand canvas' },
    { platform: 'Instagram Story',  dims: '1080 × 1920 px', ratio: '9:16',  safe: 'Center 60%', notes: 'CTA in bottom third' },
    { platform: 'Instagram Reel',   dims: '1080 × 1920 px', ratio: '9:16',  safe: 'Keep text above 15%', notes: '15–90s' },
    { platform: 'TikTok',           dims: '1080 × 1920 px', ratio: '9:16',  safe: 'Center 70%', notes: 'Hook in first 2s' },
    { platform: 'LinkedIn Post',    dims: '1200 × 628 px',  ratio: '1.91:1',safe: 'Full frame', notes: 'Trade/partner content' },
    { platform: 'YouTube Thumb',    dims: '1280 × 720 px',  ratio: '16:9',  safe: 'Center 80%', notes: 'Long-form trailers' },
  ]

  const SERVES = [
    { name: 'The Bayab & Tonic',  profile: 'The entry ritual. Simple. Perfect. Showcases the gin.', garnish: 'Baobab slice, fresh thyme', glass: 'Copa / balloon' },
    { name: 'The Baobab Sour',    profile: 'Citrus-forward. Visually striking. Bartender showcase.', garnish: 'Dehydrated lime, egg white foam', glass: 'Coupe' },
    { name: 'The Savanna Martini',profile: 'Spirit-forward. For the confident gin drinker.', garnish: 'Lemon twist, olive', glass: 'Martini / Nick & Nora' },
    { name: 'The Cape Negroni',   profile: 'Seasonal. Amber color story. Premium occasion.', garnish: 'Orange peel, expressed', glass: 'Rocks / crystal' },
  ]

  const PROMPTS = [
    { label: 'Product hero — light',  prompt: 'Studio photograph of Bayab Gin bottle, white seamless background, single dramatic side light, shadows soft and controlled, label fully legible, premium spirits photography style, no props' },
    { label: 'Origin / terroir',      prompt: 'Wide-angle photograph of African savanna at golden hour, baobab trees in foreground, warm amber light, cinematic composition, no people, evocative of provenance and place' },
    { label: 'Serve ritual',          prompt: 'Overhead flat-lay of Bayab & Tonic cocktail in copa glass on dark stone surface, botanical garnish, moody lighting, editorial food photography, minimal props' },
    { label: 'Bartender portrait',    prompt: 'Portrait of skilled bartender crafting cocktail behind bar, warm backlight, shallow depth of field, focused hands and bottle, craft spirits setting, editorial style' },
    { label: 'Social story frame',    prompt: 'Vertical 9:16 format lifestyle image, Bayab Gin bottle as secondary element, primary subject is the experience and setting, text-safe center zone, dark atmospheric tone' },
  ]

  return (
    <div className="content-area">
      <p className="section-header">Asset Generation</p>
      <p className="section-subheader">Format specification library, signature serve cards, and AI prompt library for consistent creative production.</p>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-title">Format Specification Library</div>
        <table className="data-table">
          <thead><tr><th>Platform</th><th>Dimensions</th><th>Ratio</th><th>Safe Zone</th><th>Notes</th></tr></thead>
          <tbody>
            {FORMATS.map(row => (
              <tr key={row.platform}>
                <td>{row.platform}</td>
                <td style={{ color: '#8C8479', fontFamily: 'monospace', fontSize: 12 }}>{row.dims}</td>
                <td style={{ color: '#5A554F' }}>{row.ratio}</td>
                <td style={{ color: '#5A554F', fontSize: 12 }}>{row.safe}</td>
                <td style={{ color: '#5A554F', fontSize: 12 }}>{row.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="source-tag" style={{ marginTop: 12 }}>Component 3 — Asset Generation · Bayab Brand Activation System</div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div className="card-title" style={{ marginBottom: 16 }}>Signature Serve Cards</div>
        <div className="grid-2">
          {SERVES.map(s => (
            <div key={s.name} className="card border-l-accent">
              <div className="card-title">{s.name}</div>
              <p style={{ fontSize: 13, color: '#F2EDE4', lineHeight: 1.5, marginBottom: 10 }}>{s.profile}</p>
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Garnish</div>
                  <div style={{ fontSize: 12, color: '#8C8479' }}>{s.garnish}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Glass</div>
                  <div style={{ fontSize: 12, color: '#8C8479' }}>{s.glass}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="card-title">AI Prompt Library — click to expand</div>
        {PROMPTS.map((p, i) => (
          <div key={p.label} style={{ borderBottom: '1px solid rgba(242,237,228,0.06)', marginBottom: 0 }}>
            <button
              onClick={() => setExpandedPrompt(expandedPrompt === i ? null : i)}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                padding: '12px 0', color: '#F2EDE4', fontSize: 13, textAlign: 'left',
              }}
            >
              <span>{p.label}</span>
              <span style={{ color: '#5A554F', fontSize: 16 }}>{expandedPrompt === i ? '−' : '+'}</span>
            </button>
            {expandedPrompt === i && (
              <div style={{
                fontSize: 12, color: '#8C8479', lineHeight: 1.6, padding: '4px 0 14px',
                fontFamily: 'monospace', background: 'rgba(242,237,228,0.03)',
                borderRadius: 4, padding: '10px 12px', marginBottom: 12,
              }}>
                {p.prompt}
              </div>
            )}
          </div>
        ))}
        <div className="source-tag" style={{ marginTop: 12 }}>Component 3 — Asset Generation · Bayab Brand Activation System</div>
      </div>
    </div>
  )
}

/* ── Section 4: Trade Activation ───────────────────────────────────── */
function TradeSection() {
  const [selectedMarket, setSelectedMarket] = useState('Atlanta, GA')
  const CALENDAR = [
    {
      phase: 'Days 1–30',
      label: 'Market Entry',
      tracks: [
        { track: 'On-Premise',  actions: ['Target 8–12 key craft cocktail bars per market', 'Bartender education sessions (Bayab story + serve protocol)', 'Seed bottle placements with activation support'] },
        { track: 'Off-Premise', actions: ['Distributor sell-in presentations', 'Chain authorization paperwork — Tier 1 targets', 'Shelf placement negotiation and POS material delivery'] },
        { track: 'Digital',     actions: ['Launch Instagram and TikTok with Week 1 origin content', 'Begin influencer bartender outreach', 'Press release to trade publications (Beverage Media, SevenFifty)'] },
      ],
    },
    {
      phase: 'Days 31–60',
      label: 'Activation Depth',
      tracks: [
        { track: 'On-Premise',  actions: ['Cocktail menu placements (2–3 signatures per account)', 'Bartender ambassador program launch (5 initial ambassadors)', 'Account-specific promotional events'] },
        { track: 'Off-Premise', actions: ['Chain authorization follow-up and confirmation', 'Consumer sampling events (authorized markets)', 'End-cap negotiation — premium spirits section'] },
        { track: 'Digital',     actions: ['Bartender co-sign content launches', 'UGC campaign seeding', 'Trade press feature follow-through'] },
      ],
    },
    {
      phase: 'Days 61–90',
      label: 'Velocity & Repeat',
      tracks: [
        { track: 'On-Premise',  actions: ['Reorder rates and velocity audit', 'Expand ambassador network (target 15)', 'Document and film best-performing bartender stories'] },
        { track: 'Off-Premise', actions: ['Depletion data review with distributor', 'Chain velocity assessment — reorder or exit signals', 'Phase 2 planning: new market identification'] },
        { track: 'Digital',     actions: ['90-day content performance analysis', 'Paid amplification of top-performing organic content', 'Audience growth and engagement report'] },
      ],
    },
  ]

  const KPIS = [
    { metric: 'On-premise accounts secured',    target: '15–20', period: '90 days' },
    { metric: 'Chain authorizations',           target: '3–5',   period: '90 days' },
    { metric: 'Bartender ambassadors',          target: '15+',   period: '90 days' },
    { metric: 'Depletion velocity (on-premise)',target: '2+ cases/acct/mo', period: 'By Day 90' },
    { metric: 'Instagram followers',            target: '+2,500', period: '90 days' },
    { metric: 'Earned media placements',        target: '3+',    period: '90 days' },
  ]

  return (
    <div className="content-area">
      <p className="section-header">Trade Activation</p>
      <p className="section-subheader">90-day phased calendar across three tracks — on-premise, off-premise, and digital. Bartender toolkit and KPI framework.</p>

      {CALENDAR.map(phase => (
        <div key={phase.phase} className="card" style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 16 }}>
            <div className="card-title" style={{ marginBottom: 0 }}>{phase.phase}</div>
            <div style={{ fontSize: 12, color: '#F4725A' }}>{phase.label}</div>
          </div>
          <div className="grid-3">
            {phase.tracks.map(t => (
              <div key={t.track}>
                <div style={{ fontSize: 10, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{t.track}</div>
                {t.actions.map((a, i) => (
                  <div key={i} style={{ fontSize: 12, color: '#8C8479', lineHeight: 1.5, marginBottom: 6, paddingLeft: 10, borderLeft: '1px solid rgba(242,237,228,0.08)' }}>{a}</div>
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Bartender Education Toolkit</div>
          {[
            { item: 'Brand Story Card', desc: 'One-page origin narrative — African botanicals, Bayab founding, mission context' },
            { item: 'Botanical Profile Sheet', desc: 'Sensory notes, botanical sourcing, food pairing guide' },
            { item: 'Signature Serve Protocol', desc: 'Step-by-step build for four signature cocktails with photography' },
            { item: 'Digital Ambassador Kit', desc: 'Brand-approved content guidelines, caption templates, hashtag list' },
          ].map(t => (
            <div key={t.item} style={{ marginBottom: 12, paddingBottom: 12, borderBottom: '1px solid rgba(242,237,228,0.06)' }}>
              <div style={{ fontSize: 12, color: '#F2EDE4', marginBottom: 4 }}>{t.item}</div>
              <div style={{ fontSize: 11, color: '#5A554F', lineHeight: 1.5 }}>{t.desc}</div>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">KPI Framework — 90-Day Targets</div>
          <table className="data-table">
            <thead><tr><th>Metric</th><th>Target</th><th>Period</th></tr></thead>
            <tbody>
              {KPIS.map(row => (
                <tr key={row.metric}>
                  <td>{row.metric}</td>
                  <td style={{ color: '#8ED44A', fontWeight: 500 }}>{row.target}</td>
                  <td style={{ color: '#5A554F', fontSize: 12 }}>{row.period}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="source-tag" style={{ marginTop: 12 }}>Component 4 — Trade Activation · Bayab Brand Activation System</div>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-title" style={{ marginBottom: 12 }}>Generate Trade Brief</div>
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, color: '#5A554F', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 6 }}>Market</label>
          <select
            value={selectedMarket}
            onChange={e => setSelectedMarket(e.target.value)}
            style={{
              background: '#1A1916', border: '1px solid rgba(242,237,228,0.18)',
              borderRadius: 4, color: '#F2EDE4', fontSize: 13, padding: '6px 10px', width: '100%',
            }}
          >
            {['Atlanta, GA','Austin, TX','Chicago, IL','Dallas, TX','Denver, CO','Houston, TX','Los Angeles, CA','Miami, FL','Nashville, TN','New York, NY','Philadelphia, PA','Washington, D.C.'].map(m => (
              <option key={m} value={m} style={{ background: '#1A1916', color: '#F2EDE4' }}>{m}</option>
            ))}
          </select>
        </div>
        <AIAction
          actionType="tradeBrief"
          label="Generate Trade Brief"
          moduleContext="Brand Activation System — Trade Activation"
          buildUserInput={() => `Generate a trade activation brief for Bayab Gin entering the ${selectedMarket} market. Cover distributor strategy, on-premise targets, off-premise channels, and 90-day execution priorities.`}
          buildContext={() => ({ brand: 'Bayab Gin', market: selectedMarket, module: 'Brand Activation System', section: 'Trade Activation' })}
          buttonStyle={{ marginTop: 0 }}
        />
      </div>
    </div>
  )
}

/* ── Module shell ───────────────────────────────────────────────────── */
export default function BrandActivation() {
  const [activeSection, setActiveSection] = useState('audience')
  const [entered, setEntered]   = useState(false)
  const [leaving, setLeaving]   = useState(false)
  const { selectedBrand } = useUser()

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 20)
    return () => clearTimeout(t)
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'audience': return <AudienceSection />
      case 'content':  return <ContentSection />
      case 'assets':   return <AssetsSection />
      case 'trade':    return <TradeSection />
      default:         return <AudienceSection />
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
        opacity: (leaving || !entered) ? 0 : 1,
        transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
      }}
    >
      {/* Left panel */}
      <div className="left-panel">
        <div className="left-panel__bg" style={{ backgroundImage: "url('/pronghorn_bg.jpg')" }} />
        <div className="left-panel__overlay" />
        <div className="left-panel__content">
          <HomeButton setLeaving={setLeaving} />
          <div className="panel-logo-gap" />
          <Greeting />
          <div className="panel-module-name">Brand Activation System</div>

          <nav className="panel-nav">
            {SECTIONS.map(s => (
              <button
                key={s.id}
                className={`panel-nav__item${activeSection === s.id ? ' panel-nav__item--active' : ''}`}
                onClick={() => setActiveSection(s.id)}
                style={activeSection === s.id ? { color: MODULE_COLOR, borderLeftColor: MODULE_COLOR } : {}}
              >
                <span className="panel-nav__num">0{SECTIONS.indexOf(s) + 1}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </nav>

          <UserNotes moduleId="module02" />
          <QuickActions moduleContext="Brand Activation System" moduleColor={MODULE_COLOR} />
          <GeneratedOutputs />
        </div>
      </div>

      {/* Right panel */}
      <div className="right-panel" style={{ overflow: 'hidden' }}>
        <BrandSelector />
        {selectedBrand !== 'Bayab Gin' && (
          <div className="brand-activation__context-banner">
            This module is built for Bayab Gin. Outputs for <strong>{selectedBrand}</strong> are directional — full activation profiles are available in the&nbsp;
            <Link to="/brand-partner" className="brand-activation__banner-link">Brand Partner Toolkit →</Link>
          </div>
        )}
        {renderSection()}
      </div>
    </div>
  )
}
