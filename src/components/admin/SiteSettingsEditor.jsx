import { useEffect, useState } from 'react'
import { getSettings, updateSettings, uploadImage } from '../../api/client.js'
import { designOptions } from '../../content/designs.js'
import {
  AddButton,
  Card,
  Field,
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

export default function SiteSettingsEditor() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tone, setTone] = useState('success')

  useEffect(() => {
    getSettings().then(setForm).catch(() => setMsg('Could not load settings'))
  }, [])

  const setSection = (key, value) => setForm((current) => ({ ...current, [key]: value }))
  const setNested = (section, key, value) =>
    setForm((current) => ({ ...current, [section]: { ...current[section], [key]: value } }))

  const setNav = (links) => setSection('nav', { ...form.nav, links })
  const updateNav = (index, key, value) => {
    const links = [...form.nav.links]
    links[index] = { ...links[index], [key]: value }
    setNav(links)
  }
  const addNav = () =>
    setNav([...(form.nav?.links || []), { label: 'New link', href: '#', order: form.nav?.links?.length || 0, visible: true }])
  const removeNav = (index) => setNav(form.nav.links.filter((_, i) => i !== index))
  const reorderNav = (index, direction) => {
    const links = moveItem(form.nav.links, index, direction).map((link, order) => ({ ...link, order }))
    setNav(links)
  }

  const handleUpload = async (field, file) => {
    try {
      const { url } = await uploadImage(file)
      setNested('brand', field, url)
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
      const saved = await updateSettings({
        designId: form.designId,
        brand: form.brand,
        seo: form.seo,
        nav: form.nav,
      })
      setForm(saved)
      setMsg('Site settings saved!')
      setTone('success')
    } catch {
      setMsg('Error saving settings')
      setTone('error')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <p className="admin-loading">Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <PageHeader
        eyebrow="Configuration"
        title="Site Settings"
        description="Brand identity, active design, SEO metadata and navigation."
      />
      <Message message={msg} tone={tone} />

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Brand & Design</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Site / Owner Name" value={form.brand?.name || ''} onChange={(e) => setNested('brand', 'name', e.target.value)} />
          <TextInput label="Logo Text" value={form.brand?.logoText || ''} onChange={(e) => setNested('brand', 'logoText', e.target.value)} />
          <Field label="Logo Image" className="col-span-2">
            <input className={inputClass} value={form.brand?.logoImage || ''} onChange={(e) => setNested('brand', 'logoImage', e.target.value)} placeholder="/assets/navbar/vikas.png" />
            <input type="file" accept="image/*" className="admin-file mt-2" onChange={(e) => e.target.files?.[0] && handleUpload('logoImage', e.target.files[0])} />
          </Field>
          <Field label="Active Design" className="col-span-2">
            <select className={inputClass} value={form.designId || 'project-1'} onChange={(e) => setSection('designId', e.target.value)}>
              {designOptions().map((design) => (
                <option key={design.id} value={design.id}>{design.name}</option>
              ))}
            </select>
            <p className="admin-hint">
              Future redesigns can be added as project-2, project-3, and switched here.
            </p>
          </Field>
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">SEO</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Page Title" value={form.seo?.title || ''} onChange={(e) => setNested('seo', 'title', e.target.value)} />
          <TextInput label="Keywords" value={form.seo?.keywords || ''} onChange={(e) => setNested('seo', 'keywords', e.target.value)} />
          <TextArea label="Meta Description" className="col-span-2" rows={2} value={form.seo?.description || ''} onChange={(e) => setNested('seo', 'description', e.target.value)} />
          <TextInput label="Social Share Image URL" value={form.seo?.ogImage || ''} onChange={(e) => setNested('seo', 'ogImage', e.target.value)} />
          <TextInput label="Favicon URL" value={form.seo?.favicon || ''} onChange={(e) => setNested('seo', 'favicon', e.target.value)} />
        </div>
      </Card>

      <Card className="mb-6">
        <div className="admin-form-section-head">
          <h2 className="admin-form-section-title">Navigation Links</h2>
          <AddButton onClick={addNav}>Add Link</AddButton>
        </div>
        <div className="space-y-3">
          {(form.nav?.links || []).map((link, index) => (
            <div key={`${link.label}-${index}`} className="admin-subcard">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto_auto] gap-2 md:items-end">
                <div>
                  <label className="admin-label">Label</label>
                  <input className={smallInputClass} value={link.label} onChange={(e) => updateNav(index, 'label', e.target.value)} />
                </div>
                <div>
                  <label className="admin-label">Link / Section</label>
                  <input className={smallInputClass} value={link.href} onChange={(e) => updateNav(index, 'href', e.target.value)} />
                </div>
                <Toggle label="Show" checked={link.visible !== false} onChange={(value) => updateNav(index, 'visible', value)} className="pb-2" />
                <ListControls
                  onUp={() => reorderNav(index, -1)}
                  onDown={() => reorderNav(index, 1)}
                  onRemove={() => removeNav(index)}
                  canUp={index > 0}
                  canDown={index < form.nav.links.length - 1}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <SaveButton saving={saving}>Save Site Settings</SaveButton>
    </form>
  )
}
