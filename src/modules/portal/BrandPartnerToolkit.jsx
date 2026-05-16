import { useState, useEffect, useRef } from 'react'
import HomeButton from '../../components/HomeButton'
import UserNotes        from '../../components/UserNotes'
import GeneratedOutputs from '../../components/GeneratedOutputs'
import '../../index.css'
import SynthesisPanel from '../../components/SynthesisPanel'
import QuickActions   from '../../components/QuickActions'
import AIAction       from '../../components/AIAction'
import Greeting       from '../../components/Greeting'

const MODULE_COLOR = '#2A5C4A'

function slugify(str) {
  return (str || 'default-brand').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'default-brand'
}

/* ── CampaignModal ───────────────────────────────────────────────────── */
function CampaignModal({ brandId, onSave, onClose }) {
  const [form, setForm]   = useState({ name: '', startDate: '', endDate: '', theme: '', toneDirection: '', keyMessages: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState(null)
  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSave = async () => {
    if (!form.name.trim()) { setError('Campaign name is required'); return }
    setSaving(true); setError(null)
    try {
      const res  = await fetch('/.netlify/functions/campaign-save', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          brandId,
          name:              form.name,
          activeDates:       { start: form.startDate, end: form.endDate },
          theme:             form.theme,
          toneDirection:     form.toneDirection,
          keyMessages:       form.keyMessages,
          referenceAssetKeys: [],
        }),
      })
      const data = await res.json()
      if (data.success) {
        onSave({ campaignId: data.campaignId, brandId, name: form.name, activeDates: { start: form.startDate, end: form.endDate }, theme: form.theme, toneDirection: form.toneDirection, keyMessages: form.keyMessages, referenceAssetKeys: [] })
      } else {
        setError('Failed to save campaign')
      }
    } catch {
      setError('Network error — check connection')
    }
    setSaving(false)
  }

  const field = (label, key, type = 'input', placeholder = '') => (
    <div style={{ marginBottom: 14 }}>
      <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>{label}</label>
      {type === 'textarea'
        ? <textarea className="dual-panel__textarea" rows={2} placeholder={placeholder} value={form[key]} onChange={e => update(key, e.target.value)} />
        : <input className="dual-panel__input" type={type === 'date' ? 'date' : 'text'} placeholder={placeholder} value={form[key]} onChange={e => update(key, e.target.value)} />
      }
    </div>
  )

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,9,8,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: '#181510', border: '1px solid rgba(242,237,228,0.12)', borderRadius: 12, padding: 32, width: 520, maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ fontFamily: 'DM Sans', fontSize: 15, fontWeight: 500, color: '#F2EDE4', marginBottom: 6 }}>New Campaign</div>
        <div style={{ fontSize: 12, color: '#5A554F', marginBottom: 24 }}>Campaign context feeds into every asset generated in this session.</div>

        {field('Campaign Name *', 'name', 'input', 'e.g., Summer Ritual Campaign')}
        <div style={{ display: 'flex', gap: 12, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Start Date</label>
            <input className="dual-panel__input" type="date" value={form.startDate} onChange={e => update('startDate', e.target.value)} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>End Date</label>
            <input className="dual-panel__input" type="date" value={form.endDate} onChange={e => update('endDate', e.target.value)} />
          </div>
        </div>
        {field('Theme & Creative Concept', 'theme', 'textarea', 'What is this campaign about visually and emotionally...')}
        {field('Tone Direction', 'toneDirection', 'textarea', 'How should this campaign feel — what overrides the base brand tone...')}
        {field('Key Messages Already in Market', 'keyMessages', 'textarea', 'What messages are already running that new assets should stay consistent with...')}

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: 'block', fontSize: 11, color: '#5A554F', marginBottom: 4 }}>Reference Assets</label>
          <div style={{ padding: '10px 14px', background: 'rgba(242,237,228,0.03)', border: '1px dashed rgba(242,237,228,0.12)', borderRadius: 6, fontSize: 11, color: '#5A554F', textAlign: 'center' }}>
            Reference asset upload available in Asset Studio after campaign is created
          </div>
        </div>

        {error && <div style={{ color: '#F4725A', fontSize: 12, marginBottom: 12 }}>{error}</div>}

        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 18px', background: 'transparent', border: '1px solid rgba(242,237,228,0.14)', borderRadius: 6, color: '#8C8479', fontFamily: 'DM Sans', fontSize: 12, cursor: 'pointer' }}>Cancel</button>
          <button onClick={handleSave} disabled={saving} style={{ padding: '8px 20px', background: saving ? 'rgba(42,92,74,0.4)' : '#2A5C4A', border: 'none', borderRadius: 6, color: '#F2EDE4', fontFamily: 'DM Sans', fontSize: 12, cursor: saving ? 'default' : 'pointer' }}>
            {saving ? 'Saving...' : 'Create Campaign'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── CampaignSelector ───────────────────────────────────────────────── */
function CampaignSelector({ campaigns, selectedCampaign, onSelect, onNewCampaign, loading }) {
  return (
    <div className="card" style={{ marginBottom: 20 }}>
      <div className="card-title" style={{ marginBottom: 8 }}>Campaign</div>
      {loading ? (
        <div style={{ fontSize: 12, color: '#5A554F' }}>Loading campaigns...</div>
      ) : (
        <select
          className="dual-panel__select"
          value={selectedCampaign?.campaignId || 'none'}
          onChange={e => {
            const val = e.target.value
            if (val === 'new')  { onNewCampaign(); return }
            if (val === 'none') { onSelect(null); return }
            onSelect(campaigns.find(c => c.campaignId === val) || null)
          }}
        >
          <option value="new">+ Start new campaign</option>
          <option value="none">— No campaign (use brand defaults only)</option>
          {campaigns.map(c => (
            <option key={c.campaignId} value={c.campaignId}>{c.name}</option>
          ))}
        </select>
      )}
      {selectedCampaign && (
        <div style={{ marginTop: 10, padding: '8px 12px', background: 'rgba(42,92,74,0.08)', border: '1px solid rgba(42,92,74,0.20)', borderRadius: 6 }}>
          <div style={{ fontSize: 11, color: '#6BD4B0', fontWeight: 500, marginBottom: 4 }}>{selectedCampaign.name}</div>
          {selectedCampaign.theme && <div style={{ fontSize: 11, color: '#5A554F', lineHeight: 1.5 }}>{selectedCampaign.theme}</div>}
          {selectedCampaign.toneDirection && <div style={{ fontSize: 11, color: '#5A554F', marginTop: 4 }}>Tone: {selectedCampaign.toneDirection}</div>}
        </div>
      )}
    </div>
  )
}

const SECTIONS = [
  { id: 'profile',     label: 'Brand Profile'           },
  { id: 'studio',      label: 'Asset Studio'            },
  { id: 'library',     label: 'Asset Library'           },
  { id: 'calendar',    label: 'Content Calendar'        },
  { id: 'performance', label: 'Performance Intelligence' },
  { id: 'learning',    label: 'Learning Center'         },
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

/* ── Base64 helpers ──────────────────────────────────────────────────── */
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}
function blobToBase64(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload  = () => resolve(reader.result.split(',')[1])
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

/* ── StepFlowIndicator ───────────────────────────────────────────────── */
function StepFlowIndicator({ steps }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 20 }}>
      {steps.map((step, i) => {
        const isComplete = step.state === 'complete'
        const isActive   = step.state === 'active'
        const color       = isComplete ? '#6BD4B0' : isActive ? '#F2EDE4' : '#3A3733'
        const circleBg    = isComplete ? 'rgba(42,92,74,0.35)' : isActive ? 'rgba(242,237,228,0.10)' : 'rgba(242,237,228,0.03)'
        const circleBdr   = isComplete ? '#4A9C7A' : isActive ? 'rgba(242,237,228,0.25)' : 'rgba(242,237,228,0.07)'
        return (
          <div key={step.label} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, flexShrink: 0 }} title={step.tooltip || ''}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: circleBg, border: `1px solid ${circleBdr}` }}>
                {isComplete
                  ? <svg width="10" height="10" viewBox="0 0 10 10"><polyline points="1.5,5 4,7.5 8.5,2.5" stroke="#6BD4B0" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  : step.state === 'locked'
                    ? <svg width="9" height="10" viewBox="0 0 9 10" fill="none"><rect x="1" y="4.5" width="7" height="5" rx="1" stroke="#3A3733" strokeWidth="1.2"/><path d="M2.5 4.5V3a2 2 0 0 1 4 0v1.5" stroke="#3A3733" strokeWidth="1.2" strokeLinecap="round"/></svg>
                    : <span style={{ fontSize: 9, color, fontFamily: 'DM Sans', fontWeight: 500 }}>{i + 1}</span>
                }
              </div>
              <span style={{ fontSize: 9, color, letterSpacing: '0.05em', whiteSpace: 'nowrap', textAlign: 'center', lineHeight: 1.3 }}>{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div style={{ flex: 1, height: 1, background: 'rgba(242,237,228,0.07)', margin: '0 6px', marginBottom: 18 }} />
            )}
          </div>
        )
      })}
    </div>
  )
}

/* ── Section 2: Asset Studio ────────────────────────────────────────── */
function AssetStudio({ profile, campaigns, selectedCampaign, onSelectCampaign, onNewCampaign, loadingCampaigns }) {
  const [pillar,        setPillar]        = useState('The Ritual')
  const [platform,      setPlatform]      = useState('Instagram')
  const [refPreview,    setRefPreview]    = useState(null)
  const [refR2Key,      setRefR2Key]      = useState(null)
  const [uploadingRef,  setUploadingRef]  = useState(false)
  const [generatedImage, setGeneratedImage] = useState(null)
  const [generating,    setGenerating]    = useState(false)
  const [progress,      setProgress]      = useState(0)
  const [genError,      setGenError]      = useState(null)
  const [savingToLib,   setSavingToLib]   = useState(false)
  const [savedToLib,    setSavedToLib]    = useState(false)
  const [showPicker,        setShowPicker]        = useState(false)
  const [pickerAssets,      setPickerAssets]      = useState([])
  const [loadingPicker,     setLoadingPicker]     = useState(false)
  const [caption,           setCaption]           = useState(null)
  const [generatingCaption, setGeneratingCaption] = useState(false)
  const [captionError,      setCaptionError]      = useState(null)
  const fileInputRef = useRef(null)
  const progressRef  = useRef(null)

  const profileReady = calcCompleteness(profile) >= 40
  const brandId      = slugify(profile.brandName)

  const buildPrompt = () => [
    profile.brandName ? `${profile.brandName} premium spirits` : 'premium spirits',
    profile.category  || '',
    `brand photo for ${platform}, ${pillar} content pillar`,
    selectedCampaign?.theme         ? `Campaign: ${selectedCampaign.theme}` : '',
    selectedCampaign?.toneDirection ? `Tone: ${selectedCampaign.toneDirection}` : '',
    profile.signatureServe          ? `Feature: ${profile.signatureServe}` : '',
    'Cinematic spirits photography, dark moody background, warm amber tones, high-end commercial quality, no text on image',
  ].filter(Boolean).join('. ')

  const startProgress = () => {
    setProgress(0)
    let p = 0
    progressRef.current = setInterval(() => { p += (84 - p) * 0.035; setProgress(Math.min(p, 84)) }, 500)
  }
  const stopProgress = (final = 100) => {
    if (progressRef.current) { clearInterval(progressRef.current); progressRef.current = null }
    setProgress(final)
  }
  useEffect(() => () => { if (progressRef.current) clearInterval(progressRef.current) }, [])

  const handleRefUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setRefPreview(URL.createObjectURL(file))
    setUploadingRef(true)
    try {
      const b64 = await fileToBase64(file)
      const res = await fetch('/.netlify/functions/asset-upload', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBase64: b64, filename: file.name, contentType: file.type, brandId, campaignId: selectedCampaign?.campaignId }),
      })
      const data = await res.json()
      if (data.key) setRefR2Key(data.key)
    } catch {}
    setUploadingRef(false)
  }

  const pollForImage = async (requestId, prompt) => {
    const deadline = Date.now() + 110000
    while (Date.now() < deadline) {
      await new Promise(r => setTimeout(r, 3000))
      try {
        const res  = await fetch(`/.netlify/functions/generate-image?requestId=${requestId}`)
        const data = await res.json()
        if (data.imageUrl) { stopProgress(100); setGeneratedImage({ url: data.imageUrl, prompt, requestId }); return }
      } catch {}
    }
    stopProgress(0); setGenError('Generation timed out. Try again.')
  }

  const handleGenerate = async () => {
    if (!profileReady || generating) return
    setGenerating(true); setGenError(null); setSavedToLib(false); setGeneratedImage(null); setCaption(null); setCaptionError(null)
    startProgress()
    const prompt = buildPrompt()
    try {
      const res  = await fetch('/.netlify/functions/generate-image', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, width: 1024, height: 1024, brandId, campaignId: selectedCampaign?.campaignId }),
      })
      const data = await res.json()
      if (res.status === 200 && data.imageUrl) {
        stopProgress(100); setGeneratedImage({ url: data.imageUrl, prompt, requestId: data.requestId })
      } else if (res.status === 202 && data.requestId) {
        await pollForImage(data.requestId, prompt)
      } else {
        throw new Error(data.error || 'Generation failed')
      }
    } catch (err) { stopProgress(0); setGenError(err.message) }
    setGenerating(false)
  }

  const handleDownload = () => {
    if (!generatedImage?.url) return
    const a = document.createElement('a')
    a.href = generatedImage.url; a.download = `pronghorn-asset-${Date.now()}.jpg`; a.target = '_blank'; a.click()
  }

  const handleCopyPrompt = () => {
    if (generatedImage?.prompt) navigator.clipboard.writeText(generatedImage.prompt).catch(() => {})
  }

  const handleGenerateCaption = async () => {
    if (!generatedImage || generatingCaption) return
    setGeneratingCaption(true); setCaptionError(null)
    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) { setCaptionError('VITE_ANTHROPIC_API_KEY not configured'); setGeneratingCaption(false); return }

    const pillarDesc = {
      'The Ritual':  'product in context — how it fits into moments, serves, and occasions',
      'The Source':  'provenance and heritage — what makes this spirit distinctive at origin',
      'The Co-Sign': 'social proof — bartenders, media, community advocates',
      'The Occasion':'moment-based content — events, seasons, cultural moments',
    }[pillar] || pillar

    const promptLines = [
      `Write a social media caption for ${platform} for ${profile.brandName}${profile.category ? `, a ${profile.category} brand` : ''}.`,
      '',
      `Content pillar: ${pillar} — ${pillarDesc}`,
      selectedCampaign              ? `Active campaign: ${selectedCampaign.name}` : null,
      selectedCampaign?.theme       ? `Campaign theme: ${selectedCampaign.theme}` : null,
      selectedCampaign?.toneDirection ? `Tone direction: ${selectedCampaign.toneDirection}` : null,
      selectedCampaign?.keyMessages   ? `Key messages already in market: ${selectedCampaign.keyMessages}` : null,
      profile.targetAudience        ? `Target audience: ${profile.targetAudience}` : null,
      profile.signatureServe        ? `Signature serve: ${profile.signatureServe}` : null,
      profile.voiceTone             ? `Brand voice: ${profile.voiceTone}` : null,
      '',
      `The image was generated with this prompt: ${generatedImage.prompt}`,
      '',
      `Write one caption for this image. ${['Instagram','TikTok','Facebook'].includes(platform) ? 'Include 3–5 relevant hashtags at the end.' : 'No hashtags.'} Keep it authentic — no generic spirits marketing language. Respond with the caption text only, no preamble.`,
    ].filter(l => l !== null).join('\n')

    try {
      const res  = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key':                            apiKey,
          'anthropic-version':                    '2023-06-01',
          'anthropic-dangerous-direct-browser-access': 'true',
          'content-type':                         'application/json',
        },
        body: JSON.stringify({
          model:      'claude-haiku-4-5-20251001',
          max_tokens: 300,
          messages:   [{ role: 'user', content: promptLines }],
        }),
      })
      const data = await res.json()
      if (data.content?.[0]?.text) {
        setCaption(data.content[0].text.trim())
      } else {
        setCaptionError(data.error?.message || 'Caption generation failed')
      }
    } catch (err) {
      setCaptionError(err.message)
    }
    setGeneratingCaption(false)
  }

  const openPicker = async () => {
    setShowPicker(true)
    setLoadingPicker(true)
    try {
      const res  = await fetch(`/.netlify/functions/asset-list?brandId=${brandId}`)
      const data = await res.json()
      setPickerAssets(Array.isArray(data) ? data : [])
    } catch {}
    setLoadingPicker(false)
  }

  const handleSaveToLibrary = async () => {
    if (!generatedImage?.url || savingToLib) return
    setSavingToLib(true)
    try {
      const imgRes = await fetch(generatedImage.url)
      const blob   = await imgRes.blob()
      const b64    = await blobToBase64(blob)
      await fetch('/.netlify/functions/asset-upload', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fileBase64: b64, filename: `generated-${Date.now()}.jpg`, contentType: 'image/jpeg', brandId, campaignId: selectedCampaign?.campaignId, caption: caption || undefined }),
      })
      setSavedToLib(true)
    } catch {}
    setSavingToLib(false)
  }

  const steps = [
    { label: 'Brand Profile',   state: profileReady    ? 'complete' : 'active',   tooltip: profileReady ? '' : 'Complete Brand Profile to at least 40%' },
    { label: 'Reference Image', state: refPreview      ? 'complete' : profileReady ? 'active' : 'locked', tooltip: !profileReady ? 'Complete Brand Profile first' : 'Optional — upload a reference photo' },
    { label: 'Generate Image',  state: generatedImage  ? 'complete' : profileReady ? 'active' : 'locked', tooltip: !profileReady ? 'Complete Brand Profile first' : 'Click Generate Image to create an asset' },
    { label: 'Generate Video',  state: 'locked', tooltip: 'Coming in next release' },
  ]

  const actionBtn = (label, onClick, disabled = false, active = false) => (
    <button onClick={onClick} disabled={disabled} style={{
      padding: '8px 14px', background: active ? 'rgba(42,92,74,0.30)' : 'rgba(242,237,228,0.05)',
      border: `1px solid ${active ? '#4A9C7A' : 'rgba(242,237,228,0.12)'}`,
      borderRadius: 6, color: active ? '#6BD4B0' : '#F2EDE4',
      fontFamily: 'DM Sans', fontSize: 11, cursor: disabled ? 'default' : 'pointer', whiteSpace: 'nowrap',
    }}>{label}</button>
  )

  return (
    <div className="content-area" style={{ display: 'flex', flexDirection: 'column' }}>
      <p className="section-header" style={{ marginBottom: 6 }}>Asset Studio</p>
      <StepFlowIndicator steps={steps} />

      <div style={{ display: 'flex', gap: 20 }}>

        {/* ── Left column — controls ────────────────────────────────── */}
        <div style={{ width: 256, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>

          {/* Brand Profile mini-summary */}
          <div className="card" style={{ padding: '10px 12px' }}>
            <div className="card-title" style={{ fontSize: 10, marginBottom: 6 }}>Brand Profile</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ flex: 1, height: 3, background: 'rgba(242,237,228,0.08)', borderRadius: 2 }}>
                <div style={{ width: `${calcCompleteness(profile)}%`, height: '100%', background: profileReady ? '#2A5C4A' : '#F4725A', borderRadius: 2, transition: 'width 300ms' }} />
              </div>
              <span style={{ fontSize: 10, color: profileReady ? '#6BD4B0' : '#F4725A', flexShrink: 0 }}>{calcCompleteness(profile)}%</span>
            </div>
            {!profileReady && <div style={{ fontSize: 10, color: '#F4725A' }}>Complete to 40% to enable generation</div>}
            {profile.brandName && <div style={{ fontSize: 10, color: '#5A554F' }}>{profile.brandName}{profile.category ? ` · ${profile.category}` : ''}</div>}
          </div>

          {/* Campaign selector */}
          <CampaignSelector campaigns={campaigns} selectedCampaign={selectedCampaign} onSelect={onSelectCampaign} onNewCampaign={onNewCampaign} loading={loadingCampaigns} />

          {/* Content pillar */}
          <div className="card" style={{ padding: '10px 12px' }}>
            <div className="card-title" style={{ fontSize: 10, marginBottom: 8 }}>Content Pillar</div>
            {['The Ritual','The Source','The Co-Sign','The Occasion'].map(p => (
              <button key={p} onClick={() => setPillar(p)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', marginBottom: 4,
                background: pillar === p ? 'rgba(42,92,74,0.18)' : 'rgba(242,237,228,0.03)',
                border: `1px solid ${pillar === p ? 'rgba(42,92,74,0.45)' : 'rgba(242,237,228,0.07)'}`,
                borderRadius: 5, color: pillar === p ? '#6BD4B0' : '#5A554F', fontFamily: 'DM Sans', fontSize: 11, cursor: 'pointer',
              }}>{p}</button>
            ))}
          </div>

          {/* Platform */}
          <div className="card" style={{ padding: '10px 12px' }}>
            <div className="card-title" style={{ fontSize: 10, marginBottom: 8 }}>Platform</div>
            {['Instagram','TikTok','LinkedIn','Twitter / X','Facebook'].map(p => (
              <button key={p} onClick={() => setPlatform(p)} style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '7px 10px', marginBottom: 4,
                background: platform === p ? 'rgba(42,92,74,0.18)' : 'rgba(242,237,228,0.03)',
                border: `1px solid ${platform === p ? 'rgba(42,92,74,0.45)' : 'rgba(242,237,228,0.07)'}`,
                borderRadius: 5, color: platform === p ? '#6BD4B0' : '#5A554F', fontFamily: 'DM Sans', fontSize: 11, cursor: 'pointer',
              }}>{p}</button>
            ))}
          </div>

          {/* Reference image upload */}
          <div className="card" style={{ padding: '10px 12px' }}>
            <div className="card-title" style={{ fontSize: 10, marginBottom: 8 }}>Reference Image</div>
            {refPreview ? (
              <div style={{ position: 'relative' }}>
                <img src={refPreview} alt="reference" style={{ width: '100%', borderRadius: 4, display: 'block' }} />
                {uploadingRef && <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,9,8,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, color: '#F2EDE4', borderRadius: 4 }}>Uploading...</div>}
                <button onClick={() => { setRefPreview(null); setRefR2Key(null) }} style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(10,9,8,0.80)', border: 'none', borderRadius: '50%', width: 18, height: 18, color: '#F2EDE4', fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>×</button>
              </div>
            ) : (
              <>
                <div onClick={() => fileInputRef.current?.click()} onMouseEnter={e => e.currentTarget.style.borderColor='rgba(242,237,228,0.25)'} onMouseLeave={e => e.currentTarget.style.borderColor='rgba(242,237,228,0.12)'}
                  style={{ padding: '12px 10px', border: '1px dashed rgba(242,237,228,0.12)', borderRadius: 5, textAlign: 'center', cursor: 'pointer', marginBottom: 6, transition: 'border-color 150ms' }}>
                  <div style={{ fontSize: 10, color: '#5A554F', lineHeight: 1.6 }}>Upload reference photo<br /><span style={{ color: '#3A3733' }}>Optional — informs style</span></div>
                </div>
                <button onClick={openPicker} style={{ width: '100%', padding: '7px 0', background: 'rgba(242,237,228,0.04)', border: '1px solid rgba(242,237,228,0.08)', borderRadius: 5, color: '#8C8479', fontFamily: 'DM Sans', fontSize: 11, cursor: 'pointer' }}>
                  Use from Library
                </button>
              </>
            )}
            <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleRefUpload} />
          </div>

          {/* Generate Image */}
          <button onClick={handleGenerate} disabled={!profileReady || generating}
            title={!profileReady ? 'Complete Brand Profile to 40% to generate' : 'Generate image with Flux Pro via FAL.ai'}
            style={{ width: '100%', padding: '10px 0', borderRadius: 6, border: 'none', fontFamily: 'DM Sans', fontSize: 12, cursor: !profileReady || generating ? 'default' : 'pointer', background: generating ? 'rgba(42,92,74,0.4)' : profileReady ? '#2A5C4A' : 'rgba(242,237,228,0.05)', color: profileReady ? '#F2EDE4' : '#3A3733', transition: 'background 150ms' }}>
            {generating ? 'Generating...' : 'Generate Image'}
          </button>

          {/* Progress bar under generate button */}
          {(generating || (progress > 0 && progress < 100)) && !genError && (
            <div style={{ height: 3, background: 'rgba(242,237,228,0.08)', borderRadius: 2, overflow: 'hidden', marginTop: -4 }}>
              <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#2A5C4A,#6BD4B0)', borderRadius: 2, transition: 'width 400ms ease-out' }} />
            </div>
          )}

          {/* Coming Soon — Video */}
          <button disabled title="Video generation coming in next release"
            style={{ width: '100%', padding: '10px 0', borderRadius: 6, background: 'rgba(242,237,228,0.02)', border: '1px solid rgba(242,237,228,0.06)', color: '#3A3733', fontFamily: 'DM Sans', fontSize: 11, cursor: 'default' }}>
            Generate Video — Coming Soon
          </button>

        </div>

        {/* ── Right column — output ─────────────────────────────────── */}
        <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>

          {genError && (
            <div style={{ padding: '10px 14px', background: 'rgba(244,114,90,0.08)', border: '1px solid rgba(244,114,90,0.20)', borderRadius: 8, marginBottom: 16, fontSize: 12, color: '#F4725A' }}>{genError}</div>
          )}

          {/* Empty state */}
          {!generatedImage && !generating && !genError && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10, opacity: 0.35, textAlign: 'center', minHeight: 300 }}>
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><rect x="2" y="7" width="36" height="26" rx="3" stroke="#F2EDE4" strokeWidth="1.2"/><circle cx="13" cy="16" r="3.5" stroke="#F2EDE4" strokeWidth="1.2"/><path d="M2 29l9-7 7 6 6-5 14 10" stroke="#F2EDE4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <div style={{ fontSize: 12, color: '#F2EDE4', fontFamily: 'DM Sans' }}>Configure settings, then generate your first asset</div>
              <div style={{ fontSize: 11, color: '#5A554F', maxWidth: 260 }}>Select a content pillar and platform, then click Generate Image</div>
            </div>
          )}

          {/* Generating state */}
          {generating && !generatedImage && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 300 }}>
              <div style={{ width: '100%', maxWidth: 340, height: 4, background: 'rgba(242,237,228,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg,#2A5C4A,#6BD4B0)', borderRadius: 2, transition: 'width 400ms ease-out' }} />
              </div>
              <div style={{ fontSize: 12, color: '#5A554F' }}>Generating image via Flux Pro — FAL.ai</div>
              <div style={{ fontSize: 10, color: '#3A3733' }}>Typically 10–30 seconds</div>
            </div>
          )}

          {/* Generated output */}
          {generatedImage && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <img src={generatedImage.url} alt="Generated asset" style={{ width: '100%', maxWidth: 540, borderRadius: 8, display: 'block' }} />

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {actionBtn(savingToLib ? 'Saving...' : savedToLib ? '✓ Saved to Library' : 'Save to Library', handleSaveToLibrary, savingToLib || savedToLib, savedToLib)}
                {actionBtn('Download', handleDownload)}
                {actionBtn('Copy Prompt', handleCopyPrompt)}
                {actionBtn(generatingCaption ? 'Writing...' : caption ? 'Regenerate Caption' : 'Generate Caption', handleGenerateCaption, generatingCaption)}
                {actionBtn('Generate Variation', () => { setGeneratedImage(null); setSavedToLib(false); setCaption(null); setTimeout(handleGenerate, 50) }, generating)}
              </div>

              <div style={{ padding: '10px 12px', background: 'rgba(242,237,228,0.03)', border: '1px solid rgba(242,237,228,0.07)', borderRadius: 6, fontSize: 10, color: '#5A554F', lineHeight: 1.7 }}>
                <span style={{ color: '#3A3733' }}>Prompt: </span>{generatedImage.prompt}
              </div>

              {captionError && (
                <div style={{ padding: '8px 12px', background: 'rgba(244,114,90,0.08)', border: '1px solid rgba(244,114,90,0.20)', borderRadius: 6, fontSize: 11, color: '#F4725A' }}>{captionError}</div>
              )}

              {caption && (
                <div style={{ padding: '14px 16px', background: 'rgba(42,92,74,0.07)', border: '1px solid rgba(42,92,74,0.22)', borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                    <span style={{ fontSize: 10, color: '#6BD4B0', fontWeight: 500, letterSpacing: '0.05em' }}>CAPTION</span>
                    <button onClick={() => navigator.clipboard.writeText(caption).catch(() => {})}
                      style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(107,212,176,0.25)', borderRadius: 4, color: '#6BD4B0', fontFamily: 'DM Sans', fontSize: 10, cursor: 'pointer' }}>
                      Copy
                    </button>
                  </div>
                  <div style={{ fontSize: 13, color: '#F2EDE4', lineHeight: 1.75, whiteSpace: 'pre-wrap' }}>{caption}</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Library Picker Modal ─────────────────────────────────── */}
      {showPicker && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(10,9,8,0.88)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ background: '#181510', border: '1px solid rgba(242,237,228,0.12)', borderRadius: 12, padding: 28, width: 680, maxWidth: '100%', maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
              <div style={{ fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500, color: '#F2EDE4' }}>Select from Library</div>
              <button onClick={() => setShowPicker(false)} style={{ background: 'none', border: 'none', color: '#5A554F', fontSize: 18, cursor: 'pointer', padding: '0 4px', lineHeight: 1 }}>×</button>
            </div>
            {loadingPicker ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#5A554F', fontSize: 12 }}>Loading assets...</div>
            ) : pickerAssets.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 40, color: '#5A554F', fontSize: 12 }}>No assets in library yet. Save generated images first.</div>
            ) : (
              <div style={{ overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {pickerAssets.map(asset => (
                  <div key={asset.key} onClick={() => { setRefPreview(asset.url); setRefR2Key(asset.key); setShowPicker(false) }}
                    style={{ cursor: 'pointer', borderRadius: 6, overflow: 'hidden', border: '1px solid rgba(242,237,228,0.08)', transition: 'border-color 150ms' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(107,212,176,0.40)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(242,237,228,0.08)'}>
                    <img src={asset.url} alt="" style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', display: 'block' }} />
                    <div style={{ padding: '6px 8px', background: 'rgba(242,237,228,0.03)' }}>
                      <div style={{ fontSize: 10, color: '#5A554F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {asset.key.split('/').pop()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/* ── Section 3: Asset Library ────────────────────────────────────────── */
function AssetLibrary({ profile, campaigns, selectedCampaign, onSelectCampaign }) {
  const [assets,      setAssets]      = useState([])
  const [loading,     setLoading]     = useState(false)
  const [filter,      setFilter]      = useState('all')
  const [deleting,    setDeleting]    = useState(null)

  const brandId = slugify(profile.brandName)

  useEffect(() => {
    if (!profile.brandName) return
    setLoading(true)
    const params = new URLSearchParams({ brandId })
    if (filter !== 'all') params.append('campaignId', filter)
    fetch(`/.netlify/functions/asset-list?${params}`)
      .then(r => r.json())
      .then(data => { setAssets(Array.isArray(data) ? data : []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [profile.brandName, filter])

  const handleDelete = async (key) => {
    if (!window.confirm('Delete this asset? This cannot be undone.')) return
    setDeleting(key)
    try {
      await fetch('/.netlify/functions/asset-delete', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key }),
      })
      setAssets(prev => prev.filter(a => a.key !== key))
    } catch {}
    setDeleting(null)
  }

  const totalBytes = assets.reduce((s, a) => s + (a.size || 0), 0)
  const fmtSize = b => b < 1048576 ? `${(b / 1024).toFixed(0)} KB` : `${(b / 1048576).toFixed(1)} MB`
  const fmtDate = s => { try { return new Date(s).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) } catch { return '' } }

  return (
    <div className="content-area">
      <p className="section-header" style={{ marginBottom: 6 }}>Asset Library</p>

      {/* Storage indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20, padding: '10px 14px', background: 'rgba(242,237,228,0.03)', border: '1px solid rgba(242,237,228,0.07)', borderRadius: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <span style={{ fontSize: 11, color: '#5A554F' }}>Stored assets</span>
            <span style={{ fontSize: 11, color: '#8C8479' }}>{assets.length} file{assets.length !== 1 ? 's' : ''} · {fmtSize(totalBytes)}</span>
          </div>
          <div style={{ height: 2, background: 'rgba(242,237,228,0.07)', borderRadius: 1 }}>
            <div style={{ width: `${Math.min((totalBytes / (100 * 1048576)) * 100, 100)}%`, height: '100%', background: '#2A5C4A', borderRadius: 1 }} />
          </div>
        </div>
      </div>

      {/* Campaign filter */}
      {campaigns.length > 0 && (
        <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
          {[{ campaignId: 'all', name: 'All Assets' }, ...campaigns].map(c => (
            <button key={c.campaignId} onClick={() => setFilter(c.campaignId)}
              style={{ padding: '5px 12px', background: filter === c.campaignId ? 'rgba(42,92,74,0.18)' : 'rgba(242,237,228,0.04)', border: `1px solid ${filter === c.campaignId ? 'rgba(42,92,74,0.45)' : 'rgba(242,237,228,0.08)'}`, borderRadius: 5, color: filter === c.campaignId ? '#6BD4B0' : '#5A554F', fontFamily: 'DM Sans', fontSize: 11, cursor: 'pointer' }}>
              {c.name}
            </button>
          ))}
        </div>
      )}

      {!profile.brandName ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#5A554F', fontSize: 12 }}>
          Enter a Brand Name in Brand Profile to load your library.
        </div>
      ) : loading ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#5A554F', fontSize: 12 }}>Loading assets...</div>
      ) : assets.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px' }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" style={{ opacity: 0.25, marginBottom: 12 }}><rect x="2" y="7" width="36" height="26" rx="3" stroke="#F2EDE4" strokeWidth="1.2"/><circle cx="13" cy="16" r="3.5" stroke="#F2EDE4" strokeWidth="1.2"/><path d="M2 29l9-7 7 6 6-5 14 10" stroke="#F2EDE4" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{ fontSize: 12, color: '#5A554F' }}>No assets yet. Generate and save images from Asset Studio.</div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
          {assets.map(asset => (
            <div key={asset.key} style={{ borderRadius: 8, overflow: 'hidden', border: '1px solid rgba(242,237,228,0.08)', background: 'rgba(242,237,228,0.02)' }}>
              <div style={{ position: 'relative', aspectRatio: '1', overflow: 'hidden', background: '#0E0D0B' }}>
                <img src={asset.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  onError={e => { e.currentTarget.style.display = 'none' }} />
              </div>
              <div style={{ padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#5A554F', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: 6 }}>
                  {asset.key.split('/').pop()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, color: '#3A3733' }}>{fmtDate(asset.lastModified)} · {fmtSize(asset.size || 0)}</span>
                  <button onClick={() => handleDelete(asset.key)} disabled={deleting === asset.key}
                    style={{ padding: '3px 7px', background: 'transparent', border: '1px solid rgba(244,114,90,0.20)', borderRadius: 4, color: deleting === asset.key ? '#3A3733' : '#8C8479', fontFamily: 'DM Sans', fontSize: 10, cursor: deleting === asset.key ? 'default' : 'pointer', transition: 'color 150ms, border-color 150ms' }}
                    onMouseEnter={e => { if (deleting !== asset.key) { e.currentTarget.style.color = '#F4725A'; e.currentTarget.style.borderColor = 'rgba(244,114,90,0.50)' } }}
                    onMouseLeave={e => { e.currentTarget.style.color = '#8C8479'; e.currentTarget.style.borderColor = 'rgba(244,114,90,0.20)' }}>
                    {deleting === asset.key ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ── Section 4: Content Calendar ────────────────────────────────────── */
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

  /* Campaign state */
  const [campaigns,        setCampaigns]        = useState([])
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [campaignModal,    setCampaignModal]     = useState(false)
  const [loadingCampaigns, setLoadingCampaigns] = useState(false)

  const brandId = slugify(profile.brandName)

  /* Fetch campaigns whenever brandName changes */
  useEffect(() => {
    if (!profile.brandName) return
    setLoadingCampaigns(true)
    fetch(`/.netlify/functions/campaign-list?brandId=${brandId}`)
      .then(r => r.json())
      .then(data => { setCampaigns(Array.isArray(data) ? data : []); setLoadingCampaigns(false) })
      .catch(() => setLoadingCampaigns(false))
  }, [profile.brandName])

  const handleCampaignSaved = (campaign) => {
    setCampaigns(prev => [campaign, ...prev])
    setSelectedCampaign(campaign)
    setCampaignModal(false)
  }

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
        {section === 'studio'      && (
          <AssetStudio
            profile={profile}
            campaigns={campaigns}
            selectedCampaign={selectedCampaign}
            onSelectCampaign={setSelectedCampaign}
            onNewCampaign={() => setCampaignModal(true)}
            loadingCampaigns={loadingCampaigns}
          />
        )}
        {section === 'library'     && (
          <AssetLibrary
            profile={profile}
            campaigns={campaigns}
            selectedCampaign={selectedCampaign}
            onSelectCampaign={setSelectedCampaign}
          />
        )}
        {section === 'calendar'    && <ContentCalendar profile={profile} />}
        {section === 'performance' && <PerformanceIntelligence profile={profile} />}
        {section === 'learning'    && <LearningCenter />}
      </div>

      {campaignModal && (
        <CampaignModal
          brandId={brandId}
          onSave={handleCampaignSaved}
          onClose={() => setCampaignModal(false)}
        />
      )}
    </div>
  )
}
