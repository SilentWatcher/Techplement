import { useState } from 'react'
import { createTech, updateTech, uploadImage } from '../../api/client.js'
import { Card, Field, SaveButton, TextInput, Toggle, inputClass } from './AdminUI.jsx'

const empty = {
  name: '',
  iconKey: '',
  iconUrl: '',
  category: 'Frontend',
  type: 'Library',
  glow: 'cyan',
  tier: 'primary',
  order: 0,
  visible: true,
}

const glows = ['white', 'cyan', 'yellow', 'red', 'green', 'purple', 'blue']

export default function TechForm({ tech, onDone }) {
  const [form, setForm] = useState(tech || { ...empty })
  const [saving, setSaving] = useState(false)
  const editing = !!tech

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const handleUpload = async (file) => {
    try {
      const { url } = await uploadImage(file)
      set('iconUrl', url)
    } catch {
      alert('Upload failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updateTech(tech._id, form)
      else await createTech(form)
      onDone()
    } catch {
      alert('Error saving tech item')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6 max-w-4xl">
      <Card>
        <div className="admin-card-head">
          <div>
            <h2 className="admin-card-title">{editing ? 'Edit Tech Item' : 'New Tech Item'}</h2>
            <p className="admin-card-sub">Name, icon, category and display tier.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
          <TextInput label="Icon Key (optional)" value={form.iconKey || ''} onChange={(e) => set('iconKey', e.target.value)} placeholder="react" />
          <Field label="Icon URL" className="md:col-span-2">
            <input className={inputClass} value={form.iconUrl || ''} onChange={(e) => set('iconUrl', e.target.value)} />
            <input type="file" accept="image/*" className="admin-file mt-2" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
            {form.iconUrl && <img src={form.iconUrl} alt="" className="admin-image-preview admin-image-preview--sm" />}
          </Field>
          <TextInput label="Category" value={form.category || ''} onChange={(e) => set('category', e.target.value)} />
          <TextInput label="Type" value={form.type || ''} onChange={(e) => set('type', e.target.value)} />
          <Field label="Glow">
            <select className={inputClass} value={form.glow} onChange={(e) => set('glow', e.target.value)}>
              {glows.map((glow) => <option key={glow} value={glow}>{glow}</option>)}
            </select>
          </Field>
          <Field label="Tier">
            <select className={inputClass} value={form.tier} onChange={(e) => set('tier', e.target.value)}>
              <option value="primary">primary</option>
              <option value="secondary">secondary</option>
              <option value="other">other</option>
            </select>
          </Field>
          <TextInput label="Order" type="number" value={form.order ?? 0} onChange={(e) => set('order', Number(e.target.value))} />
          <div className="flex items-end pb-2">
            <Toggle label="Visible on site" checked={form.visible !== false} onChange={(value) => set('visible', value)} />
          </div>
        </div>

        <div className="admin-form-actions">
          <SaveButton saving={saving}>{editing ? 'Update' : 'Create'}</SaveButton>
          <button type="button" onClick={onDone} className="admin-btn admin-btn--ghost">Cancel</button>
        </div>
      </Card>
    </form>
  )
}
