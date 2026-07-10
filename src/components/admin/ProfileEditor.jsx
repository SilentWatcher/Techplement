import { useState, useEffect } from 'react'
import { getProfile, updateProfile, uploadImage } from '../../api/client.js'

const emptyCard = { title: '', description: '', icon: '' }

export default function ProfileEditor() {
  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')

  useEffect(() => {
    getProfile().then((p) =>
      setForm({
        name: p.name || '',
        email: p.email || '',
        aboutParagraph: p.aboutParagraph || '',
        quote: p.quote || '',
        resumeUrl: p.resumeUrl || '',
        socialLinks: p.socialLinks || { github: '', linkedin: '', instagram: '', twitter: '' },
        aboutCards: p.aboutCards?.length ? p.aboutCards : [emptyCard],
        techStacks: p.techStacks?.length ? p.techStacks : [emptyCard],
      })
    )
  }, [])

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const handleSocial = (key, val) => set('socialLinks', { ...form.socialLinks, [key]: val })
  const handleArray = (field, index, key, val) => {
    const arr = [...form[field]]
    arr[index] = { ...arr[index], [key]: val }
    set(field, arr)
  }
  const addItem = (field) => set(field, [...form[field], { ...emptyCard }])
  const removeItem = (field, index) => {
    const arr = form[field].filter((_, i) => i !== index)
    set(field, arr.length ? arr : [emptyCard])
  }
  const handleImageUpload = async (field, index, file) => {
    try {
      const { url } = await uploadImage(file)
      handleArray(field, index, 'icon', url)
    } catch {
      alert('Upload failed')
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      await updateProfile(form)
      setMsg('Saved!')
    } catch {
      setMsg('Error saving')
    } finally {
      setSaving(false)
    }
  }

  if (!form) return <p className="font-oxygen text-gray-600 dark:text-gray-400">Loading...</p>

  const inputClass =
    'w-full border rounded-lg px-3 py-2 font-oxygen text-sm bg-white dark:bg-[#1a1a24] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <h1 className="font-signika text-3xl font-bold mb-6 text-gray-900 dark:text-white">Edit Profile</h1>
      {msg && <p className="mb-4 text-sm font-oxygen text-green-600 dark:text-green-400">{msg}</p>}

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
          <input className={inputClass} value={form.name} onChange={(e) => set('name', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
          <input className={inputClass} value={form.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">About Paragraph</label>
          <textarea className={inputClass} rows={3} value={form.aboutParagraph} onChange={(e) => set('aboutParagraph', e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Quote</label>
          <textarea className={inputClass} rows={2} value={form.quote} onChange={(e) => set('quote', e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Resume URL</label>
          <input className={inputClass} value={form.resumeUrl} onChange={(e) => set('resumeUrl', e.target.value)} />
        </div>
      </div>

      <h2 className="font-signika text-xl font-semibold mb-3 text-gray-900 dark:text-white">Social Links</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {Object.entries(form.socialLinks).map(([key, val]) => (
          <div key={key}>
            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300 capitalize">{key}</label>
            <input className={inputClass} value={val} onChange={(e) => handleSocial(key, e.target.value)} placeholder={`https://${key}.com/...`} />
          </div>
        ))}
      </div>

      <ArrayEditor
        label="About Cards"
        items={form.aboutCards}
        onAdd={() => addItem('aboutCards')}
        onRemove={(i) => removeItem('aboutCards', i)}
        onChange={(i, k, v) => handleArray('aboutCards', i, k, v)}
        onImageUpload={(i, f) => handleImageUpload('aboutCards', i, f)}
      />

      <ArrayEditor
        label="Tech Stacks"
        items={form.techStacks}
        onAdd={() => addItem('techStacks')}
        onRemove={(i) => removeItem('techStacks', i)}
        onChange={(i, k, v) => handleArray('techStacks', i, k, v)}
        onImageUpload={(i, f) => handleImageUpload('techStacks', i, f)}
      />

      <button
        type="submit"
        disabled={saving}
        className="bg-gray-900 dark:bg-violet-600 text-white px-6 py-3 rounded-lg font-signika font-semibold hover:bg-gray-800 dark:hover:bg-violet-500 disabled:opacity-50 transition-colors"
      >
        {saving ? 'Saving...' : 'Save Profile'}
      </button>
    </form>
  )
}

function ArrayEditor({ label, items, onChange, onAdd, onRemove, onImageUpload }) {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-signika text-xl font-semibold text-gray-900 dark:text-white">{label}</h2>
        <button type="button" onClick={onAdd} className="text-sm bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
          + Add
        </button>
      </div>
      {items.map((item, i) => (
        <div key={i} className="border border-gray-200 dark:border-white/10 p-4 rounded-xl mb-3 relative bg-white dark:bg-[#12121a] transition-colors">
          <button type="button" onClick={() => onRemove(i)} className="absolute top-3 right-3 text-red-500 text-sm hover:text-red-400">
            ✕
          </button>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Title</label>
              <input className="w-full border rounded-lg px-2 py-1 text-sm bg-white dark:bg-[#1a1a24] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white" value={item.title} onChange={(e) => onChange(i, 'title', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Description</label>
              <input className="w-full border rounded-lg px-2 py-1 text-sm bg-white dark:bg-[#1a1a24] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white" value={item.description} onChange={(e) => onChange(i, 'description', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Icon URL</label>
              <input className="w-full border rounded-lg px-2 py-1 text-sm bg-white dark:bg-[#1a1a24] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white" value={item.icon} onChange={(e) => onChange(i, 'icon', e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Upload Icon</label>
              <input type="file" accept="image/*" onChange={(e) => e.target.files[0] && onImageUpload(i, e.target.files[0])} className="text-sm text-gray-600 dark:text-gray-400" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
