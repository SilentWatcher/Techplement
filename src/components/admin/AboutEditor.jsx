import { useEffect, useState } from 'react'
import { getSettings, updateSettings, uploadImage } from '../../api/client.js'
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
  inputClass,
  moveItem,
  smallInputClass,
} from './AdminUI.jsx'

const emptyCommand = { command: '', output: '' }

export default function AboutEditor() {
  const [about, setAbout] = useState(null)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState('')
  const [tone, setTone] = useState('success')

  useEffect(() => {
    getSettings()
      .then((settings) => setAbout(settings.about || {}))
      .catch(() => setMsg('Could not load about section'))
  }, [])

  const set = (key, value) => setAbout((current) => ({ ...current, [key]: value }))

  const handleUpload = async (file) => {
    try {
      const { url } = await uploadImage(file)
      set('image', url)
    } catch {
      setMsg('Upload failed')
      setTone('error')
    }
  }

  const updateCommand = (index, key, value) => {
    const list = [...(about.commands || [])]
    list[index] = { ...list[index], [key]: value }
    set('commands', list)
  }
  const addCommand = () =>
    set('commands', [...(about.commands || []), { ...emptyCommand }])
  const removeCommand = (index) =>
    set('commands', (about.commands || []).filter((_, i) => i !== index))
  const reorderCommand = (index, direction) => {
    const list = moveItem(about.commands || [], index, direction)
    set('commands', list)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMsg('')
    try {
      const saved = await updateSettings({ about })
      setAbout(saved.about)
      setMsg('About section saved!')
      setTone('success')
    } catch {
      setMsg('Error saving about section')
      setTone('error')
    } finally {
      setSaving(false)
    }
  }

  if (!about) return <p className="admin-loading">Loading...</p>

  return (
    <form onSubmit={handleSubmit} className="max-w-5xl">
      <PageHeader
        eyebrow="Content"
        title="About Section"
        description="Narrative, profile card, HUD labels, terminal commands and portrait."
      />
      <Message message={msg} tone={tone} />

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Section Labels</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Badge" value={about.badge || ''} onChange={(e) => set('badge', e.target.value)} />
          <TextInput label="Title" value={about.title || ''} onChange={(e) => set('title', e.target.value)} />
          <TextInput label="HUD Label — Left" value={about.hudLeft || ''} onChange={(e) => set('hudLeft', e.target.value)} />
          <TextInput label="HUD Label — Right" value={about.hudRight || ''} onChange={(e) => set('hudRight', e.target.value)} />
          <TextInput label="Terminal Path" value={about.terminalPath || ''} onChange={(e) => set('terminalPath', e.target.value)} />
          <TextInput label="Status" value={about.status || ''} onChange={(e) => set('status', e.target.value)} />
          <TextInput label="Clearance" value={about.clearance || ''} onChange={(e) => set('clearance', e.target.value)} />
          <TextInput label="Availability" value={about.availability || ''} onChange={(e) => set('availability', e.target.value)} />
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">About Image</h2>
        <Field label="Image URL">
          <input className={inputClass} value={about.image || ''} onChange={(e) => set('image', e.target.value)} />
          <input type="file" accept="image/*" className="admin-file mt-2" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} />
        </Field>
        {about.image && <img src={about.image} alt="About preview" className="admin-image-preview" />}
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Narrative</h2>
        <div className="grid grid-cols-1 gap-4">
          <TextArea label="Focus Text" rows={3} value={about.focusText || ''} onChange={(e) => set('focusText', e.target.value)} />
        </div>
      </Card>

      <Card className="mb-6">
        <div className="admin-form-section-head">
          <h2 className="admin-form-section-title">Terminal Commands</h2>
          <AddButton onClick={addCommand}>Add Command</AddButton>
        </div>
        <p className="admin-hint mb-3">Commands are shown as clickable chips. Output animates when clicked.</p>
        <div className="space-y-3">
          {(about.commands || []).map((cmd, index) => (
            <div key={`${cmd.command}-${index}`} className="admin-subcard">
              <div className="grid grid-cols-1 gap-3">
                <div>
                  <label className="admin-label">Command</label>
                  <input className={smallInputClass} value={cmd.command || ''} onChange={(e) => updateCommand(index, 'command', e.target.value)} placeholder="whoami" />
                </div>
                <div>
                  <label className="admin-label">Output</label>
                  <textarea className={smallInputClass} rows={3} value={cmd.output || ''} onChange={(e) => updateCommand(index, 'output', e.target.value)} />
                </div>
                <div className="flex items-end justify-end gap-2 pb-1">
                  <ListControls
                    onUp={() => reorderCommand(index, -1)}
                    onDown={() => reorderCommand(index, 1)}
                    onRemove={() => removeCommand(index)}
                    canUp={index > 0}
                    canDown={index < (about.commands || []).length - 1}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-6">
        <h2 className="admin-form-section-title">Legacy Prompts (optional)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TextInput label="Prompt 1" value={about.prompts?.[0] || ''} onChange={(e) => set('prompts', [e.target.value, about.prompts?.[1] || ''])} />
          <TextInput label="Prompt 2" value={about.prompts?.[1] || ''} onChange={(e) => set('prompts', [about.prompts?.[0] || '', e.target.value])} />
        </div>
      </Card>

      <SaveButton saving={saving}>Save About</SaveButton>
    </form>
  )
}
