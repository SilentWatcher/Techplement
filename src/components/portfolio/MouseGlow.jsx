import { useRef, useCallback, useEffect } from 'react'
import { useTheme } from '../../context/ThemeContext.jsx'

export default function MouseGlow() {
  const containerRef = useRef(null)
  const glowRef = useRef(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const onMove = useCallback((e) => {
    const container = containerRef.current
    const glow = glowRef.current
    if (!container || !glow) return

    const rect = container.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    glow.style.opacity = '1'
    glow.style.background = isDark
      ? `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,70,85,0.15), rgba(124,58,237,0.06) 40%, transparent 70%)`
      : `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,70,85,0.10), rgba(124,58,237,0.04) 40%, transparent 70%)`
  }, [isDark])

  const onLeave = useCallback(() => {
    const glow = glowRef.current
    if (glow) glow.style.opacity = '0'
  }, [])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
    }
  }, [onMove, onLeave])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden">
      {/* Base ambient */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at 50% 0%, rgba(255,70,85,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(124,58,237,0.05) 0%, transparent 50%)'
            : 'radial-gradient(ellipse at 50% 0%, rgba(255,70,85,0.05) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(124,58,237,0.03) 0%, transparent 50%)',
        }}
      />
      {/* Mouse-following glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{ opacity: 0 }}
      />
    </div>
  )
}
