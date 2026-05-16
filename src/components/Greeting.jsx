import { useViewer } from '../context/ViewerContext'

function getGreeting(name) {
  const h = new Date().getHours()
  const period = h < 12 ? 'morning' : h < 17 ? 'afternoon' : 'evening'
  return name ? `Good ${period}, ${name}.` : `Good ${period}.`
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

/* variant="panel"  — left-panel placement (default)
   variant="portal" — portal landing page placement */
export default function Greeting({ variant = 'panel' }) {
  const name = useViewer()

  if (variant === 'portal') {
    return (
      <div className="portal-greeting">
        <div className="portal-greeting__text">{getGreeting(name)}</div>
        <div className="portal-greeting__date">{formatDate()}</div>
      </div>
    )
  }

  return (
    <div className="panel-greeting-wrap">
      <div className="panel-greeting">{getGreeting(name)}</div>
      <div className="panel-date">{formatDate()}</div>
    </div>
  )
}
