import { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '../../api/client.js'
import { Card, Message, PageHeader, SaveButton, TextArea, TextInput } from './AdminUI.jsx'

const toList = (value) =>
  String(value || '')
    .split(/[\n,]/)
    .map((item) => item.trim())
    .filter(Boolean)

const fromList = (value) => (Array.isArray(value) ? value.join(', ') : '')

export default function HeroEditor() {
  const [hero, setHero] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tone, setTone] = useState('success')

  useEffect(() => {
    getSettings()
      .then((settings) => setHero(settings.hero || {}))
      .catch(() => setMsg('Could not load hero content'))
  }, [])

  const set = (key, value) => setHero((current) => ({ ...current, [key]: value }))
  const setNested = (key, nestedKey, value) =>
    setHero((current) => ({ ...current, [key]: { ...(current?.[key] || {}), [nestedKey]: value } }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const saved = await updateSettings({ hero })
      setHero(saved.hero)
      setMsg('Hero section saved!')
      setTone('success')
    } catch {
      setMsg('Error saving hero section')
      setTone('error')
    } finally {
      setSaving(false)
    }
  }

  if (!hero) return <p className="admin-loading">Loading...</p>

  const statusLabels = hero.statusLabels || []

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <PageHeader
        eyebrow="Content"
        title="Hero Section"
        description="Status labels, developer role, headlines, rotating word and calls to action."
      />
      <Message message={msg} tone={tone} />

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Status & Role</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Status Label 1"
            value={statusLabels[0] || ''}
            onChange={(e) => set('statusLabels', [e.target.value, statusLabels[1] || ''])}
          />
          <TextInput
            label="Status Label 2"
            value={statusLabels[1] || ''}
            onChange={(e) => set('statusLabels', [statusLabels[0] || '', e.target.value])}
          />
          <TextInput
            label="Developer Role"
            value={hero.role || ''}
            onChange={(e) => set('role', e.target.value)}
          />
          <TextArea
            label="Rotating Words (comma or new line separated)"
            className="col-span-2"
            rows={2}
            value={fromList(hero.rotatingWords)}
            onChange={(e) => set('rotatingWords', toList(e.target.value))}
          />
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Headlines & Copy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput
            label="Primary Headline"
            value={hero.headline || ''}
            onChange={(e) => set('headline', e.target.value)}
          />
          <TextInput
            label="Pink Accent Phrase"
            value={hero.headlineAccent || ''}
            onChange={(e) => set('headlineAccent', e.target.value)}
          />
          <TextInput
            label="Secondary Headline"
            className="col-span-2"
            value={hero.secondaryHeadline || ''}
            onChange={(e) => set('secondaryHeadline', e.target.value)}
          />
          <TextArea
            label="Description"
            className="col-span-2"
            rows={4}
            value={hero.description || ''}
            onChange={(e) => set('description', e.target.value)}
          />
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Buttons & Labels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Primary Button Label" value={hero.primaryCta?.label || ''} onChange={(e) => setNested('primaryCta', 'label', e.target.value)} />
          <TextInput label="Primary Button Link" value={hero.primaryCta?.href || ''} onChange={(e) => setNested('primaryCta', 'href', e.target.value)} />
          <TextInput label="Secondary Button Label" value={hero.secondaryCta?.label || ''} onChange={(e) => setNested('secondaryCta', 'label', e.target.value)} />
          <TextInput label="Secondary Button Link (blank uses resume URL)" value={hero.secondaryCta?.href || ''} onChange={(e) => setNested('secondaryCta', 'href', e.target.value)} />
          <TextInput label="Social Label" value={hero.socialLabel || ''} onChange={(e) => set('socialLabel', e.target.value)} />
          <TextInput label="Scroll Label" value={hero.scrollLabel || ''} onChange={(e) => set('scrollLabel', e.target.value)} />
        </div>
      </Card>

      <SaveButton saving={saving}>Save Hero</SaveButton>
    </form>
  )
}
