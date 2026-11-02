import { useState } from 'react'
import { createProject, updateProject, uploadImage } from '../../api/client.js'
import {
  AddButton,
  Card,
  Field,
  ListControls,
  SaveButton,
  TextArea,
  TextInput,
  Toggle,
  inputClass,
  moveItem,
  smallInputClass,
} from './AdminUI.jsx'

const empty = {
  title: '',
  slug: '',
  description: '',
  tag: '',
  image: '',
  imageAlt: '',
  links: [],
  techStack: [],
  status: 'live',
  featured: false,
  ispublished: true,
  bgColor: '#dbd6d6',
  order: 0,
}

export default function ProjectForm({ project, onDone }) {
  const [form, setForm] = useState(project || { ...empty })
  const [saving, setSaving] = useState(false)
  const editing = !!project

  const set = (key, value) => setForm((current) => ({ ...current, [key]: value }))

  const updateLink = (index, key, value) => {
    const links = [...(form.links || [])]
    links[index] = { ...links[index], [key]: value }
    set('links', links)
  }
  const addLink = () => {
    const types = ['live', 'source', 'custom']
    set('links', [
      ...(form.links || []),
      {
        label: 'Live',
        url: '',
        type: types[Math.min(form.links?.length || 0, 2)],
        order: form.links?.length || 0,
        visible: true,
      },
    ])
  }
  const removeLink = (index) => set('links', form.links.filter((_, i) => i !== index))
  const reorderLink = (index, direction) => {
    const links = moveItem(form.links, index, direction).map((link, order) => ({ ...link, order }))
    set('links', links)
  }

  const handleImage = async (file) => {
    try {
      const { url } = await uploadImage(file)
      set('image', url)
    } catch {
      alert('Upload failed')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (editing) await updateProject(project._id, form)
      else await createProject(form)
      onDone()
    } catch {
      alert('Error saving project')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <Card className="max-w-5xl">
        <div className="admin-card-head">
          <div>
            <h2 className="admin-card-title">{editing ? 'Edit Project' : 'New Project'}</h2>
            <p className="admin-card-sub">All fields publish to the live site content API.</p>
          </div>
          <span className="admin-badge admin-badge--neutral">{editing ? 'Editing' : 'Draft'}</span>
        </div>

        <p className="admin-form-section-title">Core Details</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Title" value={form.title || ''} onChange={(e) => set('title', e.target.value)} required />
          <TextInput label="Slug (auto if blank)" value={form.slug || ''} onChange={(e) => set('slug', e.target.value)} />
          <TextArea label="Description" className="md:col-span-2" rows={2} value={form.description || ''} onChange={(e) => set('description', e.target.value)} />
          <TextInput label="Tag / Category" value={form.tag || ''} onChange={(e) => set('tag', e.target.value)} />
          <TextInput label="Order" type="number" value={form.order ?? 0} onChange={(e) => set('order', Number(e.target.value))} />

          <Field label="Status">
            <select className={inputClass} value={form.status || 'live'} onChange={(e) => set('status', e.target.value)}>
              <option value="live">Live</option>
              <option value="coming-soon">Coming Soon</option>
              <option value="archived">Archived</option>
            </select>
          </Field>
          <Field label="Background Color">
            <div className="flex gap-2 items-center">
              <input type="color" className="admin-input admin-color" value={form.bgColor || '#dbd6d6'} onChange={(e) => set('bgColor', e.target.value)} />
              <span className="admin-hint mt-0">{form.bgColor}</span>
            </div>
          </Field>

          <div className="md:col-span-2 flex flex-wrap gap-6 admin-toggle-row">
            <Toggle label="Published" checked={form.ispublished !== false} onChange={(value) => set('ispublished', value)} />
            <Toggle label="Featured" checked={form.featured === true} onChange={(value) => set('featured', value)} />
          </div>

          <TextInput label="Image URL" className="md:col-span-2" value={form.image || ''} onChange={(e) => set('image', e.target.value)} />
          <TextInput label="Image Alt Text" className="md:col-span-2" value={form.imageAlt || ''} onChange={(e) => set('imageAlt', e.target.value)} />
          <Field label="Upload Image" className="md:col-span-2">
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleImage(e.target.files[0])} className="admin-file" />
            {form.image && <img src={form.image} alt="preview" className="admin-image-preview" />}
          </Field>

          <TextInput
            label="Tech Stack (comma separated)"
            className="md:col-span-2"
            value={(form.techStack || []).join(', ')}
            onChange={(e) => set('techStack', e.target.value.split(',').map((item) => item.trim()).filter(Boolean))}
          />
        </div>

        <div className="admin-form-section">
          <div className="admin-form-section-head">
            <div>
              <p className="admin-form-section-title">External Links</p>
              <p className="admin-card-sub">Live, GitHub, Figma, Play Store, Case Study — any label works.</p>
            </div>
            <AddButton onClick={addLink}>Add Link</AddButton>
          </div>

          <div className="space-y-3">
            {(form.links || []).map((link, index) => (
              <div key={`${link.label}-${index}`} className="admin-subcard">
                <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr_0.8fr_auto] gap-2 md:items-end">
                  <div>
                    <label className="admin-label">Label</label>
                    <input className={smallInputClass} value={link.label || ''} onChange={(e) => updateLink(index, 'label', e.target.value)} placeholder="Live, GitHub, Figma" />
                  </div>
                  <div>
                    <label className="admin-label">URL</label>
                    <input className={smallInputClass} value={link.url || ''} onChange={(e) => updateLink(index, 'url', e.target.value)} placeholder="https://..." />
                  </div>
                  <div>
                    <label className="admin-label">Type</label>
                    <select className={smallInputClass} value={link.type || 'custom'} onChange={(e) => updateLink(index, 'type', e.target.value)}>
                      <option value="live">Live</option>
                      <option value="source">Source</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <ListControls
                    onUp={() => reorderLink(index, -1)}
                    onDown={() => reorderLink(index, 1)}
                    onRemove={() => removeLink(index)}
                    canUp={index > 0}
                    canDown={index < form.links.length - 1}
                  />
                </div>
                <div className="mt-2">
                  <Toggle label="Show this link" checked={link.visible !== false} onChange={(value) => updateLink(index, 'visible', value)} />
                </div>
              </div>
            ))}
            {(form.links || []).length === 0 && <p className="admin-empty-inline">No external links yet.</p>}
          </div>
        </div>

        <div className="admin-form-actions">
          <SaveButton saving={saving}>{editing ? 'Update Project' : 'Create Project'}</SaveButton>
          <button type="button" onClick={onDone} className="admin-btn admin-btn--ghost">Cancel</button>
        </div>
      </Card>
    </form>
  )
}
