import { useState } from 'react'
import { createProject, updateProject, uploadImage } from '../../api/client.js'

const empty = {
  title: '',
  description: '',
  tag: '',
  image: '',
  liveUrl: '',
  sourceCodeUrl: '',
  bgColor: '#dbd6d6',
  comingSoon: false,
  order: 0,
}

export default function ProjectForm({ project, onDone }) {
  const [form, setForm] = useState(project || { ...empty })
  const [saving, setSaving] = useState(false)
  const editing = !!project

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }))

  const handleImage = async (e) => {
    const file = e.target.files[0]
    if (!file) return
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

  const inputClass =
    'w-full border rounded-lg px-3 py-2 font-oxygen text-sm bg-white dark:bg-[#1a1a24] border-gray-300 dark:border-white/10 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500 transition-colors'

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-[#12121a] p-6 rounded-xl border border-gray-200 dark:border-white/5 shadow-sm max-w-xl transition-colors">
      <h2 className="font-signika text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        {editing ? 'Edit Project' : 'New Project'}
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Title</label>
          <input className={inputClass} value={form.title} onChange={(e) => set('title', e.target.value)} required />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Description</label>
          <input className={inputClass} value={form.description} onChange={(e) => set('description', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Tag</label>
          <input className={inputClass} value={form.tag} onChange={(e) => set('tag', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Order</label>
          <input type="number" className={inputClass} value={form.order} onChange={(e) => set('order', Number(e.target.value))} />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Background Color</label>
          <div className="flex gap-2 items-center">
            <input type="color" className="h-10 w-16 border rounded cursor-pointer bg-white dark:bg-[#1a1a24]" value={form.bgColor} onChange={(e) => set('bgColor', e.target.value)} />
            <span className="text-xs font-oxygen text-gray-500 dark:text-gray-400">{form.bgColor}</span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Live URL</label>
          <input className={inputClass} value={form.liveUrl} onChange={(e) => set('liveUrl', e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Source Code URL</label>
          <input className={inputClass} value={form.sourceCodeUrl} onChange={(e) => set('sourceCodeUrl', e.target.value)} />
        </div>
        <div className="col-span-2">
          <label className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <input type="checkbox" checked={form.comingSoon} onChange={(e) => set('comingSoon', e.target.checked)} className="rounded" />
            Coming Soon
          </label>
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Image URL</label>
          <input className={inputClass} value={form.image} onChange={(e) => set('image', e.target.value)} placeholder="Or upload below" />
        </div>
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Upload Image</label>
          <input type="file" accept="image/*" onChange={handleImage} className="text-sm text-gray-600 dark:text-gray-400" />
          {form.image && <img src={form.image} alt="preview" className="mt-2 h-20 object-contain rounded border border-gray-200 dark:border-white/10" />}
        </div>
      </div>
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-gray-900 dark:bg-violet-600 text-white px-5 py-2 rounded-lg font-signika font-semibold hover:bg-gray-800 dark:hover:bg-violet-500 disabled:opacity-50 transition-colors">
          {saving ? 'Saving...' : editing ? 'Update' : 'Create'}
        </button>
        <button type="button" onClick={onDone} className="bg-gray-200 dark:bg-white/10 text-gray-700 dark:text-gray-300 px-5 py-2 rounded-lg font-signika font-semibold hover:bg-gray-300 dark:hover:bg-white/20 transition-colors">
          Cancel
        </button>
      </div>
    </form>
  )
}
