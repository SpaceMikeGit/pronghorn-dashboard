import { createContext, useContext, useMemo } from 'react'

const ViewerContext = createContext(null)

function resolveViewer() {
  const params = new URLSearchParams(window.location.search)
  const v = params.get('viewer')
  if (v === 'toni') return 'Toni'
  if (v === 'dia')  return 'Dia'
  return null
}

export function ViewerProvider({ children }) {
  const name = useMemo(resolveViewer, [])
  return <ViewerContext.Provider value={name}>{children}</ViewerContext.Provider>
}

export function useViewer() {
  return useContext(ViewerContext)
}
