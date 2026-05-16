/* Shown on viewports < 768 px — intentional design decision, not a fallback */
export default function MobileRedirect() {
  return (
    <div className="mobile-redirect" aria-hidden="true">
      <img src="/pronghorn-logo-white.png" alt="Pronghorn" className="mobile-redirect__logo" />
      <div className="mobile-redirect__suite">PRONGHORN INTELLIGENCE SUITE</div>
      <div className="mobile-redirect__tagline">Portfolio intelligence. Built for scale.</div>
      <p className="mobile-redirect__msg">
        This platform is optimized for desktop browsers.<br />
        Please access from a laptop or desktop computer for the full experience.
      </p>
    </div>
  )
}
