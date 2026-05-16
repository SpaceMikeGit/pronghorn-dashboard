import { useState, useEffect } from 'react'
import { useUser } from '../context/UserContext'
import { PORTFOLIO_BRANDS } from '../data/portfolioBrands'

const QUESTIONS = [
  {
    id:          'primaryFocus',
    question:    "What's your primary focus this week?",
    placeholder: 'e.g., Diageo milestone prep, portfolio health review, candidate matching...',
    type:        'text',
  },
  {
    id:          'activeBrands',
    question:    "Which brands are you most actively working with right now?",
    placeholder: 'e.g., Bayab Gin, Humano Tequila, Ten To One...',
    type:        'text',
  },
  {
    id:          'visibilityGap',
    question:    "What's the one thing you wish you had more visibility into?",
    placeholder: 'Open field — anything goes.',
    type:        'text',
  },
  {
    id:          'briefingFormat',
    question:    "What does a useful Monday morning briefing look like for you?",
    placeholder: 'e.g., Top 3 actions, key metrics at a glance, one narrative paragraph...',
    type:        'text',
  },
  {
    id:          'decisionBottleneck',
    question:    "What's the decision you make most often that takes longer than it should?",
    placeholder: 'The answer to this shapes which AI actions surface first for you.',
    type:        'text',
  },
]

export default function OnboardingFlow() {
  const { profile, saveProfile } = useUser()
  const [show, setShow] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [role, setRole] = useState('')

  useEffect(() => {
    const dismissed = localStorage.getItem('pronghorn_onboarding_dismissed')
    if (!profile && !dismissed) {
      const t = setTimeout(() => setShow(true), 600)
      return () => clearTimeout(t)
    }
  }, [profile])

  const dismiss = () => {
    localStorage.setItem('pronghorn_onboarding_dismissed', '1')
    setShow(false)
  }

  const next = () => {
    if (step < QUESTIONS.length - 1) {
      setStep(s => s + 1)
    } else {
      saveProfile({ name, role, ...answers })
      setShow(false)
    }
  }

  const updateAnswer = (val) => {
    setAnswers(a => ({ ...a, [QUESTIONS[step].id]: val }))
  }

  const currentAnswer = answers[QUESTIONS[step]?.id] || ''
  const canAdvance = step === 0 ? name.trim().length > 0 : currentAnswer.trim().length > 0

  if (!show) return null

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        {/* Header */}
        <div className="onboarding-header">
          <img src="/pronghorn-logo-white.png" alt="Pronghorn" className="onboarding-logo" />
          <button className="onboarding-skip" onClick={dismiss}>Skip for now</button>
        </div>

        <div className="onboarding-body">
          {step === 0 && (
            <div className="onboarding-intro">
              <div className="onboarding-suite-name">Pronghorn Intelligence Suite</div>
              <p className="onboarding-intro-text">
                Two quick questions before we start, then five more to personalize your experience.
              </p>
              <div className="onboarding-field">
                <label className="onboarding-label">Your name</label>
                <input
                  className="onboarding-input"
                  type="text"
                  placeholder="First and last name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && name.trim() && setStep(s => s)}
                  autoFocus
                />
              </div>
              <div className="onboarding-field">
                <label className="onboarding-label">Your role at Pronghorn</label>
                <input
                  className="onboarding-input"
                  type="text"
                  placeholder="e.g., VP Business Operations & Finance"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && next()}
                />
              </div>
            </div>
          )}

          {step > 0 && (
            <>
              <div className="onboarding-progress">
                {QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`onboarding-progress__dot${i < step ? ' onboarding-progress__dot--done' : i === step ? ' onboarding-progress__dot--active' : ''}`}
                  />
                ))}
              </div>
              <div className="onboarding-question">{QUESTIONS[step].question}</div>
              <textarea
                className="onboarding-textarea"
                placeholder={QUESTIONS[step].placeholder}
                value={currentAnswer}
                onChange={e => updateAnswer(e.target.value)}
                rows={3}
                autoFocus
              />
            </>
          )}
        </div>

        <div className="onboarding-footer">
          {step > 0 && (
            <button className="onboarding-back" onClick={() => setStep(s => s - 1)}>
              Back
            </button>
          )}
          <button
            className={`onboarding-next${canAdvance ? '' : ' onboarding-next--disabled'}`}
            onClick={canAdvance ? next : undefined}
          >
            {step === QUESTIONS.length - 1 ? 'Enter the Suite' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  )
}
