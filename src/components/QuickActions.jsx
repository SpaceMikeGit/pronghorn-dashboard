// REQUIRES: Active Anthropic API connection · Env: VITE_ANTHROPIC_API_KEY
// Cross-module quick actions — generates via AI, requires active connection

import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import AIAction from './AIAction'

const ACTIVE_ACTIONS = [
  {
    id:          'weeklyBriefing',
    label:       'Generate Weekly Briefing Package',
    actionType:  'portfolioPulse',
    description: 'Compiled executive briefing — mission performance, portfolio highlights, brand activation status, pipeline update, deal flow summary.',
  },
  {
    id:          'meetingPrep',
    label:       'Generate Meeting Prep',
    actionType:  'boardSummary',
    description: 'Targeted talking points for your meeting type.',
    hasDropdown: true,
    dropdownOptions: ['Diageo Review', 'Board Meeting', 'Distributor Conversation', 'Founder Call', 'Press Interview', 'Business Development'],
  },
  {
    id:          'investorUpdate',
    label:       'Generate Investor Update',
    actionType:  'missionNarrative',
    description: 'External-facing investor-ready summary paragraph.',
  },
]

const LOCKED_ACTIONS = [
  {
    id:    'founderOnboarding',
    label: 'Generate Founder Onboarding Brief',
    note:  'Requires Module 04 with live data.',
  },
  {
    id:    'annualImpact',
    label: 'Generate Annual Impact Summary',
    note:  'Requires all modules with live data.',
  },
]

/* ── QuickActions flyout ────────────────────────────────────────────── */
export default function QuickActions({ moduleContext }) {
  const [open,         setOpen]         = useState(false)
  const [activeAction, setActiveAction] = useState(null)
  const [meetingType,  setMeetingType]  = useState('Diageo Review')
  const [flyoutPos,    setFlyoutPos]    = useState({ left: 0, bottom: 0 })
  const triggerRef = useRef(null)
  const flyoutRef  = useRef(null)

  const openFlyout = () => {
    if (!open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect()
      setFlyoutPos({ left: r.right + 8, bottom: window.innerHeight - r.bottom })
    }
    setOpen(o => !o)
  }

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      const inFlyout  = flyoutRef.current  && flyoutRef.current.contains(e.target)
      const inTrigger = triggerRef.current && triggerRef.current.contains(e.target)
      if (!inFlyout && !inTrigger) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const flyout = open && createPortal(
    <div
      ref={flyoutRef}
      className="quick-actions__flyout"
      style={{ position: 'fixed', left: flyoutPos.left, bottom: flyoutPos.bottom, top: 'auto' }}
    >
      <div className="quick-actions__flyout-header">Quick Actions</div>

      {ACTIVE_ACTIONS.map(action => (
        <div key={action.id} className="quick-actions__action">
          {action.hasDropdown && activeAction === action.id && (
            <select
              className="quick-actions__select"
              value={meetingType}
              onChange={e => setMeetingType(e.target.value)}
            >
              {action.dropdownOptions.map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          )}
          <button
            className="quick-actions__action-btn"
            onClick={() => setActiveAction(activeAction === action.id ? null : action.id)}
          >
            {action.label}
          </button>
          {activeAction === action.id && (
            <div style={{ marginTop: 8 }}>
              <AIAction
                actionType={action.actionType}
                label="Generate"
                moduleContext={moduleContext}
                buildUserInput={() => action.hasDropdown ? { meetingType } : {}}
                buildContext={() => ({ module: moduleContext, meetingType: action.hasDropdown ? meetingType : undefined })}
                buttonStyle={{ width: '100%', justifyContent: 'center' }}
              />
            </div>
          )}
        </div>
      ))}

      <div className="quick-actions__locked-divider" />

      {LOCKED_ACTIONS.map(action => (
        <div key={action.id} className="quick-actions__action quick-actions__action--locked">
          <div className="quick-actions__locked-label">{action.label}</div>
          <div className="quick-actions__locked-note">Available in connected deployment</div>
        </div>
      ))}
    </div>,
    document.body
  )

  return (
    <div className="quick-actions">
      <div className="quick-actions__divider" />
      <button
        ref={triggerRef}
        className={`panel-nav__item quick-actions__trigger${open ? ' panel-nav__item--active' : ''}`}
        onClick={openFlyout}
      >
        <span className="panel-nav__num">
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M6 1L7.2 4.3H10.8L8 6.3L9.2 9.6L6 7.6L2.8 9.6L4 6.3L1.2 4.3H4.8L6 1Z"
              fill="currentColor" />
          </svg>
        </span>
        <span>Quick Actions</span>
      </button>
      {flyout}
    </div>
  )
}
