import { createContext, useContext, useState, useCallback } from 'react'

const UserContext = createContext(null)

export function UserProvider({ children }) {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem('pronghorn_user_profile')
      return saved ? JSON.parse(saved) : null
    } catch { return null }
  })

  const [demoUser, setDemoUser] = useState('toni') // demo mode active user
  const [demoMode, setDemoMode] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState('Bayab Gin')

  const saveProfile = useCallback((data) => {
    const p = { ...data, completedAt: new Date().toISOString() }
    setProfile(p)
    try { localStorage.setItem('pronghorn_user_profile', JSON.stringify(p)) } catch {}
  }, [])

  const clearProfile = useCallback(() => {
    setProfile(null)
    try { localStorage.removeItem('pronghorn_user_profile') } catch {}
  }, [])

  return (
    <UserContext.Provider value={{
      profile, saveProfile, clearProfile,
      demoUser, setDemoUser,
      demoMode, setDemoMode,
      selectedBrand, setSelectedBrand,
    }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUser must be used within UserProvider')
  return ctx
}
