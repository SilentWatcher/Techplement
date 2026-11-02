import { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '../../api/client.js'
import { Card, Message, PageHeader, SaveButton, TextArea, TextInput } from './AdminUI.jsx'

export default function SectionsEditor() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tone, setTone] = useState('success')

  useEffect(() => {
    getSettings()
      .then((settings) => setForm({ tech: settings.tech || {}, projects: settings.projects || {} }))
      .catch(() => setMsg('Could not load section content'))
  }, [])

  const set = (section, key, value) =>
    setForm((current) => ({ ...current, [section]: { ...current[section], [key]: value } }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const saved = await updateSettings({ tech: form.tech, projects: form.projects })
      setForm({ tech: saved.tech, projects: saved.projects })
      setMsg('Section content saved!')
      setTone('success')
    } catch {
      setMsg('Error saving section content')
      setTone('error')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <p className="admin-loading">Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <PageHeader
        eyebrow="Content"
        title="Section Content"
        description="Headings, labels and helper copy for the Tech and Projects sections."
      />
      <Message message={msg} tone={tone} />

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Tech Stack Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="System Label" value={form.tech.systemLabel || ''} onChange={(e) => set('tech', 'systemLabel', e.target.value)} />
          <TextInput label="Title" value={form.tech.title || ''} onChange={(e) => set('tech', 'title', e.target.value)} />
          <TextInput label="HUD Label — Left" value={form.tech.hudLeft || ''} onChange={(e) => set('tech', 'hudLeft', e.target.value)} />
          <TextInput label="HUD Label — Right" value={form.tech.hudRight || ''} onChange={(e) => set('tech', 'hudRight', e.target.value)} />
          <TextArea label="Subtitle" className="col-span-2" rows={2} value={form.tech.subtitle || ''} onChange={(e) => set('tech', 'subtitle', e.target.value)} />
          <TextArea label="Bottom Bar Text" className="col-span-2" rows={2} value={form.tech.footerBar || ''} onChange={(e) => set('tech', 'footerBar', e.target.value)} />
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Projects Section</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Badge" value={form.projects.badge || ''} onChange={(e) => set('projects', 'badge', e.target.value)} />
          <TextInput label="Title" value={form.projects.title || ''} onChange={(e) => set('projects', 'title', e.target.value)} />
          <TextInput label="Subtitle Template" className="col-span-2" value={form.projects.subtitleTemplate || ''} onChange={(e) => set('projects', 'subtitleTemplate', e.target.value)} />
          <TextInput label="Empty State Text" value={form.projects.emptyText || ''} onChange={(e) => set('projects', 'emptyText', e.target.value)} />
          <TextInput label="Live Label" value={form.projects.liveLabel || ''} onChange={(e) => set('projects', 'liveLabel', e.target.value)} />
          <TextInput label="Coming Soon Label" value={form.projects.comingSoonLabel || ''} onChange={(e) => set('projects', 'comingSoonLabel', e.target.value)} />
          <TextInput label="Launch Button Label" value={form.projects.launchLabel || ''} onChange={(e) => set('projects', 'launchLabel', e.target.value)} />
          <TextInput label="Code Button Label" value={form.projects.codeLabel || ''} onChange={(e) => set('projects', 'codeLabel', e.target.value)} />
          <TextInput label="Tech Label" value={form.projects.techLabel || ''} onChange={(e) => set('projects', 'techLabel', e.target.value)} />
          <TextInput label="Inspect Label" value={form.projects.inspectLabel || ''} onChange={(e) => set('projects', 'inspectLabel', e.target.value)} />
        </div>
        <p className="admin-hint">
          Use {'{count}'} inside the subtitle template to show the number of visible projects.
        </p>
      </Card>

      <SaveButton saving={saving}>Save Section Content</SaveButton>
    </form>
  )
}
