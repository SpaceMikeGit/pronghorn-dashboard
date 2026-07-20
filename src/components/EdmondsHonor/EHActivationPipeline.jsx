import { useState, useEffect } from 'react'
import EHSidebar from './EHSidebar'
import { EH_ACTIVATIONS } from '../../data/edmondsHonorMarketingOS'

const STAGES = ['Concept', 'Approved', 'In Production', 'Live', 'Recap Complete', 'Learnings Added']

const STATUS_COLOR = {
  'Concept':          { bg: 'rgba(165,141,101,0.12)', text: 'var(--eh-text-muted)',    border: 'rgba(165,141,101,0.2)' },
  'Approved':         { bg: 'rgba(127,163,91,0.12)',  text: 'var(--eh-success)',        border: 'rgba(127,163,91,0.2)' },
  'In Production':    { bg: 'rgba(190,102,33,0.12)',  text: 'var(--eh-bourbon)',        border: 'rgba(190,102,33,0.2)' },
  'Live':             { bg: 'rgba(201,164,93,0.14)',  text: 'var(--eh-gold)',           border: 'rgba(201,164,93,0.25)' },
  'Recap Complete':   { bg: 'rgba(127,163,91,0.10)',  text: 'var(--eh-success)',        border: 'rgba(127,163,91,0.15)' },
  'Learnings Added':  { bg: 'rgba(127,163,91,0.18)',  text: 'var(--eh-success)',        border: 'rgba(127,163,91,0.25)' },
}

function StatusPill({ status }) {
  const c = STATUS_COLOR[status] || STATUS_COLOR['Concept']
  return (
    <span style={{
      fontSize: 10, letterSpacing: '0.06em', textTransform: 'uppercase',
      background: c.bg, color: c.text, border: `1px solid ${c.border}`,
      borderRadius: 20, padding: '3px 10px', whiteSpace: 'nowrap',
    }}>
      {status}
    </span>
  )
}

function ActivationCard({ activation }) {
  const [generating, setGenerating] = useState(false)
  const [brief, setBrief]           = useState(null)
  const [briefError, setBriefError] = useState(null)
  const [copied, setCopied]         = useState(false)

  const handleGenerateBrief = async () => {
    if (generating) return
    setGenerating(true); setBriefError(null); setBrief(null)

    const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
    if (!apiKey) {
      setBriefError('VITE_ANTHROPIC_API_KEY not configured')
      setGenerating(false)
      return
    }

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key':                                  apiKey,
          'anthropic-version':                          '2023-06-01',
          'anthropic-dangerous-direct-browser-access':  'true',
          'content-type':                               'application/json',
        },
        body: JSON.stringify({
          model:      'claude-haiku-4-5-20251001',
          max_tokens: 1000,
          messages: [{
            role: 'user',
            content: `You are a premium spirits brand marketing strategist. Generate a concise activation brief for the following activation. Format it as a professional internal document with sections: Objective, Audience, Experience Design, Content Capture Plan, Success Metrics, and Day-Of Checklist. Keep it sharp and operational — this is for an internal marketing team, not a consumer audience.

Activation details:
Name: ${activation.name}
Market: ${activation.market}
Type: ${activation.type}
Strategic objective: ${activation.objective}
Partner: ${activation.partner}
Budget: ${activation.budget}
Success metrics: ${activation.successMetrics}

Brand context: Edmond's Honor is an ultra-premium American whiskey — Black-owned, luxury-positioned, built around craft, quiet confidence, and earned occasions. The brand voice is restrained, executive, and culturally credible. Not loud. Not flashy.`,
          }],
        }),
      })

      if (!res.ok) {
        const t = await res.text()
        throw new Error(`API error (${res.status}): ${t.slice(0, 200)}`)
      }

      const data = await res.json()
      setBrief(data.content?.[0]?.text || 'No content returned.')
    } catch (err) {
      setBriefError('Brief generation failed — ' + err.message)
    }

    setGenerating(false)
  }

  const handleCopy = () => {
    if (!brief) return
    navigator.clipboard.writeText(brief).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div style={{
      background: 'var(--eh-card)', border: '1px solid var(--eh-border)',
      borderRadius: 10, padding: '22px 24px', marginBottom: 12,
    }}>
      {/* Card header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--eh-paper)', marginBottom: 5 }}>
            {activation.name}
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, color: 'var(--eh-text-muted)' }}>{activation.market}</span>
            <span style={{ fontSize: 11, color: 'rgba(201,164,93,0.4)' }}>·</span>
            <span style={{ fontSize: 11, color: 'var(--eh-text-muted)' }}>{activation.type}</span>
            <span style={{ fontSize: 11, color: 'rgba(201,164,93,0.4)' }}>·</span>
            <span style={{ fontSize: 11, color: 'var(--eh-text-muted)' }}>{activation.budget}</span>
          </div>
        </div>
        <StatusPill status={activation.status} />
      </div>

      {/* Details grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: 16 }}>
        {[
          ['Partner',         activation.partner],
          ['Objective',       activation.objective],
          ['Success Metrics', activation.successMetrics],
          ['Next Action',     activation.nextAction],
        ].map(([label, value]) => (
          <div key={label}>
            <div style={{ fontSize: 9, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-text-muted)', marginBottom: 3 }}>{label}</div>
            <div style={{ fontSize: 12, color: 'var(--eh-text-secondary)', lineHeight: 1.4 }}>{value}</div>
          </div>
        ))}
      </div>

      {/* Gold rule */}
      <div style={{ borderTop: '1px solid rgba(201,164,93,0.12)', marginBottom: 16 }} />

      {/* Generate brief button */}
      <button
        onClick={handleGenerateBrief}
        disabled={generating}
        style={{
          background: generating ? 'rgba(201,164,93,0.08)' : 'rgba(201,164,93,0.12)',
          border: '1px solid rgba(201,164,93,0.25)',
          borderRadius: 6, padding: '9px 18px',
          color: generating ? 'var(--eh-text-muted)' : 'var(--eh-gold)',
          fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase',
          cursor: generating ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s',
        }}
        onMouseEnter={e => { if (!generating) { e.currentTarget.style.background = 'rgba(201,164,93,0.2)'; e.currentTarget.style.borderColor = 'var(--eh-gold)' } }}
        onMouseLeave={e => { if (!generating) { e.currentTarget.style.background = 'rgba(201,164,93,0.12)'; e.currentTarget.style.borderColor = 'rgba(201,164,93,0.25)' } }}
      >
        {generating ? 'Generating brief...' : 'Generate Activation Brief'}
      </button>

      {/* Brief output */}
      {brief && (
        <div style={{ marginTop: 16 }}>
          <div style={{
            background: '#0C0A07', border: '1px solid rgba(201,164,93,0.2)',
            borderLeft: '3px solid var(--eh-gold)',
            borderRadius: 8, padding: '20px 22px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--eh-gold)' }}>
                Generated Activation Brief
              </div>
              <button
                onClick={handleCopy}
                style={{
                  background: 'none', border: '1px solid rgba(201,164,93,0.2)',
                  borderRadius: 4, padding: '4px 10px',
                  color: copied ? 'var(--eh-success)' : 'var(--eh-text-muted)',
                  fontSize: 10, letterSpacing: '0.06em', cursor: 'pointer',
                  transition: 'color 0.2s',
                }}
              >
                {copied ? 'Copied' : 'Copy Brief'}
              </button>
            </div>
            <pre style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12, lineHeight: 1.8, color: 'var(--eh-text-secondary)',
              whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0,
            }}>
              {brief}
            </pre>
          </div>
        </div>
      )}

      {briefError && (
        <div style={{ marginTop: 12, fontSize: 11, color: 'var(--eh-danger)' }}>
          {briefError}
        </div>
      )}
    </div>
  )
}

export default function EHActivationPipeline() {
  const [leaving, setLeaving] = useState(false)
  const [entered, setEntered] = useState(false)
  const [activeStage, setActiveStage] = useState(null)

  useEffect(() => { const t = setTimeout(() => setEntered(true), 20); return () => clearTimeout(t) }, [])

  const filtered = activeStage
    ? EH_ACTIVATIONS.filter(a => a.status === activeStage)
    : EH_ACTIVATIONS

  return (
    <div style={{
      display: 'flex', width: '100%', height: '100vh',
      transform: leaving ? 'translateX(60px)' : entered ? 'translateX(0)' : 'translateX(60px)',
      opacity: (leaving || !entered) ? 0 : 1,
      transition: 'transform 360ms ease-in-out, opacity 360ms ease-in-out',
    }}>
      <EHSidebar setLeaving={setLeaving} />

      <div style={{ flex: 1, background: 'var(--eh-bg)', overflowY: 'auto', padding: '36px 40px' }}>
        <div style={{ marginBottom: 6 }}>
          <div style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--eh-gold)', marginBottom: 8 }}>Module 02</div>
          <h1 style={{ fontSize: 22, fontWeight: 300, color: 'var(--eh-paper)', letterSpacing: '0.04em', marginBottom: 6 }}>
            Activation Pipeline
          </h1>
          <p style={{ fontSize: 12, color: 'var(--eh-text-muted)' }}>
            Events, tastings, partnerships, and field execution from concept to recap.
          </p>
        </div>

        <div style={{ borderBottom: '1px solid rgba(201,164,93,0.2)', margin: '24px 0' }} />

        {/* Stage filter tabs */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 24, flexWrap: 'wrap' }}>
          <button
            onClick={() => setActiveStage(null)}
            style={{
              background: activeStage === null ? 'rgba(201,164,93,0.14)' : 'transparent',
              border: `1px solid ${activeStage === null ? 'var(--eh-gold)' : 'var(--eh-border)'}`,
              borderRadius: 20, padding: '6px 14px',
              color: activeStage === null ? 'var(--eh-gold)' : 'var(--eh-text-muted)',
              fontSize: 11, letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            All
          </button>
          {STAGES.map(s => (
            <button
              key={s}
              onClick={() => setActiveStage(activeStage === s ? null : s)}
              style={{
                background: activeStage === s ? 'rgba(201,164,93,0.14)' : 'transparent',
                border: `1px solid ${activeStage === s ? 'var(--eh-gold)' : 'var(--eh-border)'}`,
                borderRadius: 20, padding: '6px 14px',
                color: activeStage === s ? 'var(--eh-gold)' : 'var(--eh-text-muted)',
                fontSize: 11, letterSpacing: '0.04em', cursor: 'pointer', transition: 'all 0.2s',
              }}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Activation cards */}
        {filtered.map(a => <ActivationCard key={a.id} activation={a} />)}

        <div style={{ marginTop: 24, fontSize: 10, color: 'var(--eh-text-muted)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
          Illustrative prototype data only
        </div>
      </div>
    </div>
  )
}
