import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portal               from './Portal'
import Dashboard            from './Dashboard'
import BrandActivation      from './modules/portal/BrandActivation'
import PortfolioHealth      from './modules/portal/PortfolioHealth'
import TalentPipeline       from './modules/portal/TalentPipeline'
import DealScreening        from './modules/portal/DealScreening'
import BrandPartnerToolkit  from './modules/portal/BrandPartnerToolkit'
import OnboardingFlow       from './components/OnboardingFlow'
import { UserProvider }     from './context/UserContext'
import { ViewerProvider }   from './context/ViewerContext'
import MobileRedirect       from './components/MobileRedirect'

export default function App() {
  return (
    <ViewerProvider>
    <UserProvider>
      <MobileRedirect />
      <BrowserRouter>
        <OnboardingFlow />
        <Routes>
          <Route path="/"                 element={<Portal />} />
          <Route path="/dashboard"        element={<Dashboard />} />
          <Route path="/brand-activation" element={<BrandActivation />} />
          <Route path="/portfolio-health" element={<PortfolioHealth />} />
          <Route path="/talent-pipeline"  element={<TalentPipeline />} />
          <Route path="/deal-screening"   element={<DealScreening />} />
          <Route path="/brand-partner"    element={<BrandPartnerToolkit />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
    </ViewerProvider>
  )
}
