import { useState, useEffect } from 'react'
import HomeButton from '../../components/HomeButton'
import UserNotes        from '../../components/UserNotes'
import GeneratedOutputs from '../../components/GeneratedOutputs'
import '../../index.css'
import SynthesisPanel from '../../components/SynthesisPanel'
import QuickActions   from '../../components/QuickActions'
import AIAction       from '../../components/AIAction'
import Greeting       from '../../components/Greeting'

const MODULE_COLOR = '#2A5C4A'

const SECTIONS = [
  { id: 'profile',      label: 'Brand Profile'          },
  { id: 'studio',       label: 'Asset Studio'           },
  { id: 'calendar',     label: 'Content Calendar'       },
  { id: 'performance',  label: 'Performance Intelligence'},
  { id: 'learning',     label: 'Learning Center'        },
]

/* ── Brand Profile completeness calculation ─────────────────────────── */
const PROFILE_FIELDS = [
  { key: 'brandName',      label: 'Brand Name' },
  { key: 'category',       label: 'Spirit Category' },
  { key: 'founderName',    label: 'Founder Name' },
  { key: 'founderStory',   label: 'Founder Story' },
  { key: 'brandOrigin',    label: 'Brand Origin' },
  { key: 'targetAudience', label: 'Target Audience' },
  { key: 'signatureServe', label: 'Signature Serve' },
  { key: 'primaryMarket',  label: 'Primary Market' },
  { key: 'distributors',   label: 'Distributors' },
  { key: 'retailAuth',     label: 'Retail Auth' },
  { key: 'socialHandles',  label: 'Social Handles' },
  { key: 'websiteUrl',     label: 'Website URL' },
  { key: 'bestAsset',      label: 'Best Asset' },
  { key: 'voiceTone',      label: 'Voice & Tone' },
]

function calcCompleteness(profile) {
  const filled = PROFILE_FIELDS.filter(f => profile[f.key]?.trim?.()).length
  return Math.round((filled / PROFILE_FIELDS.length) * 100)
}

function getMissingFields(profile) {
  return PROFILE_FIELDS.filter(f => !profile[f.key]?.trim?.()).map(f => f.label)
}

/* ── Section 1: Brand Profile ───────────────────────────────────────── */
function BrandProfile({ profile, setProfile }) {
  const completeness = calcCompleteness(profile)
  const missing      = getMissingFields(profile)
  const update = (field, val) => setProfile(p => ({ ...p, [field]: val }))

  return (
    <div className="content-area">
      <SynthesisPanel moduleId="module06" />
      <p className="section-header">Brand Profile</p>
      <p className="module-explainer">
        An AI-powered brand production system for Pronghorn portfolio brands — audience targeting, content strategy, asset generation, and performance intelligence in one platform, configured to each brand's specific identity and market.
      </p>
      <p className="section-subheader">
        Your brand profile is the foundation for every AI output in this toolkit. The more complete it is, the more accurate the outputs.
      </p>

      {/* Completeness indicator */}
      <div className="completeness-bar">
        <div className="completeness-bar__header">
          <span className="completeness-bar__label">Profile Completeness</span>
          <span className="completeness-bar__pct">{completeness}%</span>
        </div>
        <div className="completeness-bar__track">
          <div className="completeness-bar__fill" style={{ width: `${completeness}%` }} />
        </div>
        <div className="completeness-bar__note">
          {completeness < 40 ? (
            <>
              <span>Complete at least 40% to unlock AI generation. Still needed: </span>
              <span style={{ color: '#F4725A' }}>{missing.slice(0, 5).join(', ')}{missing.length > 5 ? ` + ${missing.length - 5} more` : ''}.</span>
            </>
          ) : completeness < 70 ? (
            <>
              <span>Good start — outputs include a thin-data notation. To reach 70%, add: </span>
              <span style={{ color: '#F4725A' }}>{missing.join(', ') || 'all fields complete'}.</span>
            </>
          ) : completeness < 90 ? (
            <>
              <span>Strong profile. Remaining fields for full-confidence outputs: </span>
              <span style={{ color: '#8ED44A' }}>{missing.join(', ') || 'none'}.</span>
            </>
          ) : (
            <span style={{ color: '#8ED44A' }}>Profile complete — all AI outputs generate at full confidence.</span>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-title">Brand Basics</div>
          {[
            { field: 'brandName',    label: 'Brand Name',           placeholder: 'e.g., Bayab Gin' },
            { field: 'category',     label: 'Spirit Category',      placeholder: 'e.g., Gin, Bourbon, Rum...' },
            { field: 'founderName',  label: 'Founder Name',         placeholder: 'Full name' },
          ].map(({ field, label, placeholder }) => (
            <div key={field} style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>{label}</label>
              <input className="dual-panel__input"
                placeholder={placeholder}
                value={profile[field] || ''}
                onChange={e => update(field, e.target.value)} />
            </div>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Brand Story</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>
              What's the one thing you wish more people knew about your brand?
            </label>
            <textarea className="dual-panel__textarea" rows={3}
              placeholder="This seeds your Source pillar content and brand story assets..."
              value={profile.founderStory || ''}
              onChange={e => update('founderStory', e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Brand Origin</label>
            <textarea className="dual-panel__textarea" rows={3}
              placeholder="Where did this brand come from? The provenance story..."
              value={profile.brandOrigin || ''}
              onChange={e => update('brandOrigin', e.target.value)} />
          </div>
        </div>

        <div className="card">
          <div className="card-title">Audience & Serve</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>
              Who's your customer when they're at their best?
            </label>
            <textarea className="dual-panel__textarea" rows={2}
              placeholder="What are they doing, where are they, what are they celebrating..."
              value={profile.targetAudience || ''}
              onChange={e => update('targetAudience', e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Signature Serve</label>
            <textarea className="dual-panel__textarea" rows={2}
              placeholder="The serve that represents your product most honestly — recipe and occasion..."
              value={profile.signatureServe || ''}
              onChange={e => update('signatureServe', e.target.value)} />
          </div>
        </div>

        <div className="card">
          <div className="card-title">Distribution & Market</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Priority Market</label>
            <select className="dual-panel__select"
              value={profile.primaryMarket || ''}
              onChange={e => update('primaryMarket', e.target.value)}>
              <option value="">Select market...</option>
              {['New York','Chicago','Los Angeles','Atlanta','Florida','Texas','National'].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Current Distributors</label>
            <input className="dual-panel__input"
              placeholder="e.g., Southern Glazers, RNDC..."
              value={profile.distributors || ''}
              onChange={e => update('distributors', e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Chain Authorization</label>
            <input className="dual-panel__input"
              placeholder="e.g., Total Wine, BevMo, Target..."
              value={profile.retailAuth || ''}
              onChange={e => update('retailAuth', e.target.value)} />
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Section 2: Asset Studio ────────────────────────────────────────── */
function AssetStudio({ profile }) {
  const [pillar, setPillar]     = useState('The Ritual')
  const [platforms, setPlatforms] = useState(['Instagram'])

  const completeness = calcCompleteness(profile)
  const notEnough = completeness < 40

  const togglePlatform = (p) => {
    setPlatforms(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p])
  }

  return (
    <div className="content-area">
      <p className="section-header">Asset Studio</p>
      <p className="section-subheader">
        Generate platform-ready assets from your brand profile. Select a content pillar and platform set.
      </p>

      {notEnough && (
        <div style={{ padding: '12px 16px', background: 'rgba(244,114,90,0.08)', border: '1px solid rgba(244,114,90,0.20)', borderRadius: 8, marginBottom: 20, fontSize: 12, color: '#F4725A' }}>
          Complete your Brand Profile to at least 40% before generating assets. Current: {completeness}%.
        </div>
      )}

      <div className="grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-title">Content Pillar</div>
          {['The Ritual','The Source','The Co-Sign','The Occasion'].map(p => (
            <button key={p}
              onClick={() => setPillar(p)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '9px 12px', marginBottom: 6,
                background: pillar === p ? 'rgba(42,92,74,0.15)' : 'rgba(242,237,228,0.03)',
                border: `1px solid ${pillar === p ? 'rgba(42,92,74,0.40)' : 'rgba(242,237,228,0.07)'}`,
                borderRadius: 6, color: pillar === p ? '#6BD4B0' : '#8C8479',
                fontFamily: 'DM Sans, sans-serif', fontSize: 12, cursor: 'pointer',
              }}>
              {p}
            </button>
          ))}
        </div>

        <div className="card">
          <div className="card-title">Platform Set</div>
          {['Instagram','TikTok','LinkedIn','Twitter / X','Facebook'].map(p => (
            <button key={p}
              onClick={() => togglePlatform(p)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '9px 12px', marginBottom: 6,
                background: platforms.includes(p) ? 'rgba(42,92,74,0.12)' : 'rgba(242,237,228,0.03)',
                border: `1px solid ${platforms.includes(p) ? 'rgba(42,92,74,0.35)' : 'rgba(242,237,228,0.07)'}`,
                borderRadius: 6, color: platforms.includes(p) ? '#6BD4B0' : '#8C8479',
                fontFamily: 'DM Sans, sans-serif', fontSize: 12, cursor: 'pointer',
              }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title" style={{ marginBottom: 8 }}>Generate Full Asset Package</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          Art direction brief, video/Reel concept, caption with hashtag framework, and variation. Everything needed to brief a creative partner.
        </p>
        <AIAction
          actionType="assetPackage"
          label="Generate Full Asset Package"
          moduleContext="Brand Partner Toolkit"
          buildUserInput={() => ({ brand: profile.brandName, pillar, platform: platforms.join(', '), founderDetails: profile })}
          buildContext={() => ({ profile, pillar, platforms })}
        />
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Generate Brand Story Assets</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          5-part carousel or short video series telling your brand's origin story — built from your own words in your brand profile.
        </p>
        <AIAction
          actionType="brandStory"
          label="Generate Brand Story"
          moduleContext="Brand Partner Toolkit"
          buildUserInput={() => ({ brand: profile.brandName, founderDetails: profile, platform: platforms[0] })}
          buildContext={() => ({ profile })}
        />
      </div>
    </div>
  )
}

/* ── Section 3: Content Calendar ────────────────────────────────────── */
function ContentCalendar({ profile }) {
  return (
    <div className="content-area">
      <p className="section-header">Content Calendar</p>
      <p className="section-subheader">
        30-day content planning linked to your four pillars. Generate a full calendar or trade activation content.
      </p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">30-Day Pillar Framework</div>
        <table className="data-table">
          <thead><tr><th>Pillar</th><th>Content Direction</th><th>Recommended Frequency</th></tr></thead>
          <tbody>
            {[
              ['The Ritual',  'Product in context — how it fits into moments, serves, occasions',         '8 posts/month'],
              ['The Source',  'Provenance and heritage — what makes this spirit distinctive at origin',   '6 posts/month'],
              ['The Co-Sign', 'Social proof and partnership — bartenders, media, community advocates',    '4 posts/month'],
              ['The Occasion','Moment-based content — events, seasons, cultural moments',                 '2 posts/month'],
            ].map(([pillar, dir, freq]) => (
              <tr key={pillar}>
                <td style={{ color: '#F2EDE4', fontWeight: 400 }}>{pillar}</td>
                <td style={{ fontSize: 11 }}>{dir}</td>
                <td style={{ fontSize: 11, color: '#8C8479' }}>{freq}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title" style={{ marginBottom: 8 }}>Generate 30-Day Content Calendar</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          20-post calendar using the four-pillar framework — pillar, audience cluster, platform, format, and post direction for each slot.
        </p>
        <AIAction
          actionType="contentCalendar"
          label="Generate Content Calendar"
          moduleContext="Brand Partner Toolkit"
          buildUserInput={() => ({ brand: profile.brandName || 'the selected brand' })}
          buildContext={() => ({ profile })}
        />
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Generate Trade Package</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          Complete on-premise trade package — bartender one-pager, sell sheet, menu card insert, QR digital version.
        </p>
        <AIAction
          actionType="tradePackage"
          label="Generate Trade Package"
          moduleContext="Brand Partner Toolkit"
          buildUserInput={() => ({
            brand: profile.brandName,
            market: profile.primaryMarket || 'priority market',
          })}
          buildContext={() => ({ profile })}
        />
      </div>
    </div>
  )
}

/* ── Section 4: Performance Intelligence ────────────────────────────── */
function PerformanceIntelligence({ profile }) {
  const [perfData, setPerfData] = useState({
    topPost: '', topPostReach: '', topPostEngagement: '',
    worstPost: '', worstReason: '',
    overallReach: '', overallEngagement: '', newFollowers: '',
  })
  const update = (f, v) => setPerfData(p => ({ ...p, [f]: v }))

  return (
    <div className="content-area">
      <p className="section-header">Performance Intelligence</p>
      <p className="section-subheader">
        Enter last 30 days of performance data and get a plain-language insight report with three specific recommendations.
      </p>

      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-title">30-Day Performance Data</div>
        <div className="screening-form__grid">
          <div className="screening-form__field">
            <label>Top Performing Post</label>
            <input className="screening-form__input" placeholder="Brief description or topic"
              value={perfData.topPost} onChange={e => update('topPost', e.target.value)} />
          </div>
          <div className="screening-form__field">
            <label>Top Post Reach</label>
            <input className="screening-form__input" type="number" placeholder="e.g., 4200"
              value={perfData.topPostReach} onChange={e => update('topPostReach', e.target.value)} />
          </div>
          <div className="screening-form__field">
            <label>Top Post Engagement Rate</label>
            <input className="screening-form__input" placeholder="e.g., 6.2%"
              value={perfData.topPostEngagement} onChange={e => update('topPostEngagement', e.target.value)} />
          </div>
          <div className="screening-form__field">
            <label>Overall Month Reach</label>
            <input className="screening-form__input" type="number" placeholder="Total impressions"
              value={perfData.overallReach} onChange={e => update('overallReach', e.target.value)} />
          </div>
          <div className="screening-form__field">
            <label>Overall Engagement Rate</label>
            <input className="screening-form__input" placeholder="e.g., 3.8%"
              value={perfData.overallEngagement} onChange={e => update('overallEngagement', e.target.value)} />
          </div>
          <div className="screening-form__field">
            <label>New Followers</label>
            <input className="screening-form__input" type="number" placeholder="Net new this month"
              value={perfData.newFollowers} onChange={e => update('newFollowers', e.target.value)} />
          </div>
          <div className="screening-form__field" style={{ gridColumn: '1 / -1' }}>
            <label>Underperforming Content — Why (your take)</label>
            <textarea className="screening-form__textarea" rows={2}
              placeholder="What didn't land and what do you think is behind it..."
              value={perfData.worstReason} onChange={e => update('worstReason', e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-title" style={{ marginBottom: 8 }}>Generate Performance Insight Report</div>
        <p style={{ fontSize: 12, color: '#5A554F', marginBottom: 12 }}>
          What worked, what didn't, the pattern behind it, and three specific recommendations for next 30 days. Plain language — a founder without a marketing background can act on it immediately.
        </p>
        <AIAction
          actionType="performanceInsight"
          label="Generate Insight Report"
          moduleContext="Brand Partner Toolkit"
          buildUserInput={() => ({
            brand: profile.brandName,
            performanceData: perfData,
          })}
          buildContext={() => ({ profile, perfData })}
        />
      </div>
    </div>
  )
}

/* ── Section 5: Learning Center ─────────────────────────────────────── */
function LearningCenter() {
  const GUIDES = [
    { title: 'Building Your Distribution Story',       category: 'Trade',    time: '8 min', description: 'How to frame your brand for a first distributor conversation — what they care about, what to lead with, what to leave behind.' },
    { title: 'The Four-Pillar Content Framework',       category: 'Content',  time: '6 min', description: 'Why each pillar exists, how they work together, and how to build a content calendar that builds equity over time rather than just filling slots.' },
    { title: 'On-Premise Activation Fundamentals',     category: 'Trade',    time: '10 min',description: 'The mechanics of a successful on-premise launch — from account selection to bartender education to measuring whether it worked.' },
    { title: 'Reading Your Performance Data',          category: 'Analytics',time: '5 min', description: 'The three metrics that actually matter, the ones that feel important but aren\'t, and how to tell the difference between a channel problem and a content problem.' },
    { title: 'How to Brief a Creative Partner',        category: 'Content',  time: '7 min', description: 'What a good creative brief includes and how to communicate your brand clearly enough that an outside partner can produce assets that feel like yours.' },
    { title: 'Chain Retail Authorization — The Path',  category: 'Trade',    time: '12 min',description: 'How chain retail authorization works state by state, what the buyer conversation requires, and what velocity data you need before you walk in the door.' },
    { title: 'Your Brand Voice Guide',                 category: 'Content',  time: '4 min', description: 'The three-word voice framework and how to apply it consistently across platforms, partners, and channels — even when you\'re not the one writing it.' },
  ]

  const categories = [...new Set(GUIDES.map(g => g.category))]
  const [active, setActive] = useState('All')

  const shown = active === 'All' ? GUIDES : GUIDES.filter(g => g.category === active)

  return (
    <div className="content-area">
      <p className="section-header">Learning Center</p>
      <p className="section-subheader">
        Brand-specific capability building guides — written for founders, not agencies.
      </p>

      <div style={{ display: 'flex', gap: 6, marginBottom: 20 }}>
        {['All', ...categories].map(cat => (
          <button key={cat}
            onClick={() => setActive(cat)}
            style={{
              padding: '5px 14px',
              background: active === cat ? 'rgba(42,92,74,0.15)' : 'rgba(242,237,228,0.04)',
              border: `1px solid ${active === cat ? 'rgba(42,92,74,0.40)' : 'rgba(242,237,228,0.08)'}`,
              borderRadius: 5, color: active === cat ? '#6BD4B0' : '#5A554F',
              fontFamily: 'DM Sans, sans-serif', fontSize: 11, cursor: 'pointer',
            }}>
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {shown.map(g => (
          <div key={g.title} className="card" style={{ cursor: 'pointer', transition: 'background 150ms' }}
            onMouseEnter={e => e.currentTarget.style.background = '#201E1A'}
            onMouseLeave={e => e.currentTarget.style.background = ''}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div className="card-title" style={{ margin: 0 }}>{g.title}</div>
              <div style={{ display: 'flex', gap: 8, flexShrink: 0, marginLeft: 12 }}>
                <span className="pill pill--amber">{g.category}</span>
                <span style={{ fontSize: 10, color: '#5A554F' }}>{g.time}</span>
              </div>
            </div>
            <p style={{ fontSize: 12, color: '#5A554F', lineHeight: 1.6 }}>{g.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ── Shell ──────────────────────────────────────────────────────────── */
export default function BrandPartnerToolkit() {
  const [section, setSection] = useState('profile')
  const [entered, setEntered] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [profile, setProfile] = useState({})

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
          <div className="panel-module-name">Brand Partner Toolkit</div>
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
          <UserNotes moduleId="module06" />
          <QuickActions moduleContext="Brand Partner Toolkit" />
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
        {section === 'profile'     && <BrandProfile profile={profile} setProfile={setProfile} />}
        {section === 'studio'      && <AssetStudio profile={profile} />}
        {section === 'calendar'    && <ContentCalendar profile={profile} />}
        {section === 'performance' && <PerformanceIntelligence profile={profile} />}
        {section === 'learning'    && <LearningCenter />}
      </div>
    </div>
  )
}
