import { useEffect, useState } from 'react'
import { getProfile, updateProfile, uploadImage } from '../../api/client.js'
import {
  AddButton,
  Card,
  ListControls,
  Message,
  PageHeader,
  SaveButton,
  TextArea,
  TextInput,
  Toggle,
  inputClass,
  moveItem,
  smallInputClass,
} from './AdminUI.jsx'

const emptySocial = { platform: '', label: '', url: '', icon: '', order: 0, visible: true }
const emptyCard = { title: '', description: '', icon: '', tags: [], order: 0, visible: true }

export default function ProfileEditor() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tone, setTone] = useState('success')

  useEffect(() => {
    getProfile()
      .then((profile) => setForm(profile))
      .catch(() => setMsg('Could not load profile'))
  }, [])

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const updateSocial = (index, key, value) => {
    const list = [...(form.socialLinks || [])]
    list[index] = { ...list[index], [key]: value }
    set('socialLinks', list)
  }
  const addSocial = () =>
    set('socialLinks', [...(form.socialLinks || []), { ...emptySocial, order: form.socialLinks?.length || 0 }])
  const removeSocial = (index) =>
    set('socialLinks', form.socialLinks.filter((_, i) => i !== index))
  const reorderSocial = (index, direction) => {
    const list = moveItem(form.socialLinks, index, direction).map((item, order) => ({ ...item, order }))
    set('socialLinks', list)
  }

  const updateCard = (index, key, value) => {
    const list = [...(form.aboutCards || [])]
    list[index] = { ...list[index], [key]: value }
    set('aboutCards', list)
  }
  const addCard = () =>
    set('aboutCards', [...(form.aboutCards || []), { ...emptyCard, order: form.aboutCards?.length || 0 }])
  const removeCard = (index) =>
    set('aboutCards', form.aboutCards.filter((_, i) => i !== index))
  const reorderCard = (index, direction) => {
    const list = moveItem(form.aboutCards, index, direction).map((item, order) => ({ ...item, order }))
    set('aboutCards', list)
  }

  const uploadTo = async (file, apply) => {
    try {
      const { url } = await uploadImage(file)
      apply(url)
    } catch {
      setMsg('Upload failed')
      setTone('error')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const saved = await updateProfile(form)
      setForm(saved)
      setMsg('Profile saved!')
      setTone('success')
    } catch {
      setMsg('Error saving profile')
      setTone('error')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <p className="admin-loading">Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <PageHeader
        eyebrow="Identity"
        title="Profile & Links"
        description="Bio, resume, contact details, social links and about cards."
      />
      <Message message={msg} tone={tone} />

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Basic Info</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Name" value={form.name || ''} onChange={(e) => set('name', e.target.value)} />
          <TextInput label="Title" value={form.title || ''} onChange={(e) => set('title', e.target.value)} />
          <TextInput label="Email" value={form.email || ''} onChange={(e) => set('email', e.target.value)} />
          <TextInput label="Phone" value={form.phone || ''} onChange={(e) => set('phone', e.target.value)} />
          <TextInput label="Location" value={form.location || ''} onChange={(e) => set('location', e.target.value)} />
          <TextInput label="Resume Button Label" value={form.resumeLabel || ''} onChange={(e) => set('resumeLabel', e.target.value)} />
          <TextInput label="Resume URL" className="col-span-2" value={form.resumeUrl || ''} onChange={(e) => set('resumeUrl', e.target.value)} />
          <TextArea label="Hero Bio" className="col-span-2" rows={3} value={form.bio || ''} onChange={(e) => set('bio', e.target.value)} />
          <TextArea label="About Paragraph" className="col-span-2" rows={3} value={form.aboutParagraph || ''} onChange={(e) => set('aboutParagraph', e.target.value)} />
          <TextArea label="Footer Quote" className="col-span-2" rows={3} value={form.quote || ''} onChange={(e) => set('quote', e.target.value)} />
        </div>
      </Card>

      <Card className="mb-6">
        <div className="admin-form-section-head">
          <h2 className="admin-form-section-title">Social & External Links</h2>
          <AddButton onClick={addSocial}>Add Link</AddButton>
        </div>
        <div className="space-y-3">
          {(form.socialLinks || []).map((link, index) => (
            <div key={`${link.platform}-${index}`} className="admin-subcard">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Platform Key</label>
                  <input className={smallInputClass} value={link.platform || ''} onChange={(e) => updateSocial(index, 'platform', e.target.value)} placeholder="github" />
                </div>
                <div>
                  <label className="admin-label">Label</label>
                  <input className={smallInputClass} value={link.label || ''} onChange={(e) => updateSocial(index, 'label', e.target.value)} placeholder="GitHub" />
                </div>
                <div className="col-span-2">
                  <label className="admin-label">URL</label>
                  <input className={smallInputClass} value={link.url || ''} onChange={(e) => updateSocial(index, 'url', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Icon URL</label>
                  <input className={smallInputClass} value={link.icon || ''} onChange={(e) => updateSocial(index, 'icon', e.target.value)} />
                  <input type="file" accept="image/*" className="admin-file mt-2" onChange={(e) => e.target.files?.[0] && uploadTo(e.target.files[0], (url) => updateSocial(index, 'icon', url))} />
                </div>
                <div className="flex items-end justify-between gap-2 pb-1">
                  <Toggle label="Show on site" checked={link.visible !== false} onChange={(value) => updateSocial(index, 'visible', value)} />
                  <ListControls
                    onUp={() => reorderSocial(index, -1)}
                    onDown={() => reorderSocial(index, 1)}
                    onRemove={() => removeSocial(index)}
                    canUp={index > 0}
                    canDown={index < form.socialLinks.length - 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <div className="admin-form-section-head">
          <h2 className="admin-form-section-title">About Cards</h2>
          <AddButton onClick={addCard}>Add Card</AddButton>
        </div>
        <div className="space-y-3">
          {(form.aboutCards || []).map((card, index) => (
            <div key={`${card.title}-${index}`} className="admin-subcard">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="admin-label">Title</label>
                  <input className={smallInputClass} value={card.title || ''} onChange={(e) => updateCard(index, 'title', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Tags (comma separated)</label>
                  <input className={smallInputClass} value={(card.tags || []).join(', ')} onChange={(e) => updateCard(index, 'tags', e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean))} />
                </div>
                <div className="col-span-2">
                  <label className="admin-label">Description</label>
                  <input className={smallInputClass} value={card.description || ''} onChange={(e) => updateCard(index, 'description', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Icon URL</label>
                  <input className={smallInputClass} value={card.icon || ''} onChange={(e) => updateCard(index, 'icon', e.target.value)} />
                  <input type="file" accept="image/*" className="admin-file mt-2" onChange={(e) => e.target.files?.[0] && uploadTo(e.target.files[0], (url) => updateCard(index, 'icon', url))} />
                </div>
                <div className="flex items-end justify-between gap-2 pb-1">
                  <Toggle label="Show on site" checked={card.visible !== false} onChange={(value) => updateCard(index, 'visible', value)} />
                  <ListControls
                    onUp={() => reorderCard(index, -1)}
                    onDown={() => reorderCard(index, 1)}
                    onRemove={() => removeCard(index)}
                    canUp={index > 0}
                    canDown={index < form.aboutCards.length - 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SaveButton saving={saving}>Save Profile</SaveButton>
    </form>
  )
}
