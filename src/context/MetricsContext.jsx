import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { getPublicMetrics, toggleLike, trackView } from '../api/client.js'

const MetricsContext = createContext(null)

function getVisitorId() {
  try {
    let id = localStorage.getItem('portfolio_visitor_id')
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `v-${Date.now()}-${Math.random().toString(36).slice(2)}`
      localStorage.setItem('portfolio_visitor_id', id)
    }
    return id
  } catch {
    return `v-${Date.now()}-${Math.random().toString(36).slice(2)}`
  }
}

const emptyMetrics = {
  site: { views: 0, uniqueVisitors: 0, likes: 0, liked: false },
  projects: {},
}

export function MetricsProvider({ children }) {
  const visitorId = useMemo(getVisitorId, [])
  const [metrics, setMetrics] = useState(emptyMetrics)
  const trackedViews = useRef(new Set())

  useEffect(() => {
    let alive = true
    getPublicMetrics(visitorId)
      .then((data) => {
        if (alive) setMetrics(data)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [visitorId])

  const track = useCallback(
    async (projectId) => {
      const key = projectId || 'site'
      if (trackedViews.current.has(key)) return
      trackedViews.current.add(key)
      try {
        const data = await trackView({
          visitorId,
          projectId: projectId || undefined,
          path: window.location.pathname,
        })
        setMetrics(data)
      } catch {
        // Analytics should never break the page.
      }
    },
    [visitorId]
  )

  // Track one site view when the portfolio mounts.
  useEffect(() => {
    track()
  }, [track])

  const like = useCallback(
    async (targetType, targetId) => {
      try {
        const result = await toggleLike({ visitorId, targetType, targetId })
        setMetrics((current) => {
          if (targetType === 'site') {
            return {
              ...current,
              site: { ...current.site, liked: result.liked, likes: result.likes },
            }
          }
          const existing = current.projects?.[targetId] || {
            views: 0,
            uniqueVisitors: 0,
            likes: 0,
            liked: false,
          }
          return {
            ...current,
            projects: {
              ...current.projects,
              [targetId]: { ...existing, liked: result.liked, likes: result.likes },
            },
          }
        })
      } catch {
        // Ignore failed likes.
      }
    },
    [visitorId]
  )

  return (
    <MetricsContext.Provider value={{ ...metrics, track, like, visitorId }}>
      {children}
    </MetricsContext.Provider>
  )
}

export function useMetrics() {
  const ctx = useContext(MetricsContext)
  if (!ctx) throw new Error('useMetrics must be used inside MetricsProvider')
  return ctx
}
