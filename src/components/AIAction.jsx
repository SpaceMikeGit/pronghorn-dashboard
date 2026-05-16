import { useState } from 'react'
import { callClaudeAPI } from '../userIntelligence'
import { useUser } from '../context/UserContext'
import { saveOutput } from './GeneratedOutputs'

/* REQUIRES: Active Anthropic API connection · Env: VITE_ANTHROPIC_API_KEY
   Generates via AI — outputs are live Claude API calls, not pre-written content */

/* ── Reusable AI action button + output display ──────────────────────── */
export default function AIAction({
  actionType,
  label,
  moduleContext,
  buildUserInput,  // fn() → user input object
  buildContext,    // fn() → context object for prompt
  buttonStyle,
}) {
  const { profile, selectedBrand } = useUser()
  const [status,  setStatus]  = useState('idle')   // idle | loading | done | error
  const [output,  setOutput]  = useState('')
  const [expanded,setExpanded]= useState(true)

  const brandData = { name: selectedBrand }

  const run = async () => {
    setStatus('loading')
    setOutput('')
    setExpanded(true)
    try {
      const userInput = buildUserInput ? buildUserInput() : {}
      const context   = buildContext   ? buildContext()   : {}
      const text = await callClaudeAPI(
        actionType, userInput, context, profile, brandData, moduleContext
      )
      setOutput(text)
      setStatus('done')
    } catch (err) {
      console.error('[AIAction]', err)
      setOutput('Unable to generate output — check your API connection and try again.')
      setStatus('error')
    }
  }

  return (
    <div className="ai-action">
      <button
        className={`ai-action__btn${status === 'loading' ? ' ai-action__btn--loading' : ''}`}
        onClick={run}
        disabled={status === 'loading'}
        style={buttonStyle}
      >
        {status === 'loading' ? (
          <>
            <span className="ai-action__spinner" />
            Generating...
          </>
        ) : (
          <>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
              <path d="M7 1L8.5 5.5H13L9.5 8L11 12.5L7 10L3 12.5L4.5 8L1 5.5H5.5L7 1Z"
                fill="currentColor" />
            </svg>
            {label}
          </>
        )}
      </button>

      {status !== 'loading' && (
        <div className="ai-action__connection-note">Generates via AI — requires active connection</div>
      )}

      {(status === 'done' || status === 'error') && output && (
        <div className={`ai-action__output${status === 'error' ? ' ai-action__output--error' : ''}`}>
          <div className="ai-action__output-header">
            <span className="ai-action__output-label">
              {status === 'error' ? 'Error' : 'Generated Output'}
            </span>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                className="ai-action__output-copy"
                onClick={() => navigator.clipboard?.writeText(output)}
                title="Copy to clipboard"
              >
                Copy
              </button>
              <button
                className="ai-action__output-toggle"
                onClick={() => setExpanded(e => !e)}
              >
                {expanded ? '▲' : '▼'}
              </button>
            </div>
          </div>
          {expanded && (
            <div className="ai-action__output-text">{output}</div>
          )}
          {status === 'done' && expanded && (
            <div className="ai-action__output-actions">
              <button
                className="ai-action__output-action-btn"
                onClick={() => saveOutput(label, output)}
              >
                Save to Session
              </button>
              <button
                className="ai-action__output-action-btn"
                onClick={() => {
                  const blob = new Blob([`${label}\n\n${output}`], { type: 'text/plain' })
                  const url  = URL.createObjectURL(blob)
                  const a    = document.createElement('a')
                  a.href = url
                  a.download = `${label.replace(/\s+/g,'-').toLowerCase()}.txt`
                  a.click()
                  URL.revokeObjectURL(url)
                }}
              >
                Export
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
