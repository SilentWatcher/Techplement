import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { getContent } from '../api/client.js'
import {
  defaultProfile,
  defaultProjects,
  defaultSiteSettings,
  defaultTech,
} from '../../shared/contentDefaults.js'

const ContentContext = createContext(null)

const fallbackContent = {
  schemaVersion: 1,
  settings: defaultSiteSettings,
  profile: defaultProfile,
  projects: defaultProjects.map((project, index) => ({
    ...project,
    _id: project.slug || `fallback-project-${index}`,
  })),
  tech: defaultTech,
}

export function ContentProvider({ children }) {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)

  const refresh = useCallback(async () => {
    try {
      const data = await getContent()
      setContent(data)
      setOffline(false)
    } catch {
      setContent((current) => current || fallbackContent)
      setOffline(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  return (
    <ContentContext.Provider value={{ content, loading, offline, refresh }}>
      {children}
    </ContentContext.Provider>
  )
}

export function useContent() {
  const ctx = useContext(ContentContext)
  if (!ctx) throw new Error('useContent must be used inside ContentProvider')
  return ctx
}
