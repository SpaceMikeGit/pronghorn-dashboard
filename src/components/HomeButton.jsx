import { useNavigate } from 'react-router-dom'

/* Shared home button + logo used by every module left panel.
   Includes the Pronghorn logo (clickable) and the Suite Home button.
   Pass setLeaving (state setter) so the module plays its slide-out
   transition before navigate fires. */
export default function HomeButton({ setLeaving }) {
  const navigate = useNavigate()

  const goHome = () => {
    if (setLeaving) {
      setLeaving(true)
      setTimeout(() => navigate('/'), 360)
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <button className="panel-home-btn" onClick={goHome} aria-label="Return to portal">
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M2.5 5.5V12.5H5.5V9H8.5V12.5H11.5V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Suite Home</span>
      </button>
      <div className="panel-logo-wrap" onClick={goHome} style={{ cursor: 'pointer' }}>
        <img src="/pronghorn-logo-white.png" alt="Pronghorn" className="panel-logo" />
      </div>
    </>
  )
}
