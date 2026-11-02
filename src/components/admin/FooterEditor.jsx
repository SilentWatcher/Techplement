import { useEffect, useState } from 'react'
import { getSettings, updateSettings } from '../../api/client.js'
import { Card, Message, PageHeader, SaveButton, TextArea, TextInput } from './AdminUI.jsx'

export default function FooterEditor() {
  const [footer, setFooter] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tone, setTone] = useState('success')

  useEffect(() => {
    getSettings()
      .then((settings) => setFooter(settings.footer || {}))
      .catch(() => setMsg('Could not load footer content'))
  }, [])

  const set = (key, value) => setFooter((current) => ({ ...current, [key]: value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const saved = await updateSettings({ footer })
      setFooter(saved.footer)
      setMsg('Footer saved!')
      setTone('success')
    } catch {
      setMsg('Error saving footer')
      setTone('error')
    } finally {
      setSaving(false)
    }
  }

  if (!footer) return <p className="admin-loading">Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <PageHeader
        eyebrow="Content"
        title="Footer & Contact"
        description="Contact call-to-action, email labels and footer credits."
      />
      <Message message={msg} tone={tone} />

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Contact Copy</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Section Label" value={footer.contactLabel || ''} onChange={(e) => set('contactLabel', e.target.value)} />
          <TextInput label="Heading" value={footer.heading || ''} onChange={(e) => set('heading', e.target.value)} />
          <TextInput label="Quote Label" value={footer.quoteLabel || ''} onChange={(e) => set('quoteLabel', e.target.value)} />
          <TextInput label="Email Label" value={footer.emailLabel || ''} onChange={(e) => set('emailLabel', e.target.value)} />
          <TextInput label="Follow Label" value={footer.followLabel || ''} onChange={(e) => set('followLabel', e.target.value)} />
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Bottom Bar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextArea label="Copyright Text" rows={2} value={footer.copyright || ''} onChange={(e) => set('copyright', e.target.value)} />
          <TextArea label="Credit Text" rows={2} value={footer.credit || ''} onChange={(e) => set('credit', e.target.value)} />
        </div>
      </Card>

      <SaveButton saving={saving}>Save Footer</SaveButton>
    </form>
  )
}
