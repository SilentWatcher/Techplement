export const inputClass = 'admin-input'

export const smallInputClass = 'admin-input admin-input--sm'

export function PageHeader({ eyebrow = 'Admin Console', title, description, actions }) {
  return (
    <div className="admin-page-head">
      <div>
        <p className="admin-eyebrow">{eyebrow}</p>
        <h1 className="admin-page-title">{title}</h1>
        {description && <p className="admin-page-sub">{description}</p>}
      </div>
      {actions && <div className="admin-page-actions">{actions}</div>}
    </div>
  )
}

export function Field({ label, children, className = '', hint }) {
  return (
    <div className={className}>
      <label className="admin-label">{label}</label>
      {children}
      {hint && <p className="admin-hint">{hint}</p>}
    </div>
  )
}

export function TextInput({ label, className = '', ...props }) {
  return (
    <Field label={label} className={className}>
      <input className={inputClass} {...props} />
    </Field>
  )
}

export function TextArea({ label, className = '', rows = 3, ...props }) {
  return (
    <Field label={label} className={className}>
      <textarea className={inputClass} rows={rows} {...props} />
    </Field>
  )
}

export function Toggle({ label, checked, onChange, className = '' }) {
  return (
    <label className={`admin-toggle ${className}`}>
      <input
        type="checkbox"
        checked={!!checked}
        onChange={(e) => onChange(e.target.checked)}
        className="admin-toggle-input"
      />
      <span className="admin-toggle-track">
        <span className="admin-toggle-thumb" />
      </span>
      {label && <span className="admin-toggle-label">{label}</span>}
    </label>
  )
}

export function SaveButton({ saving, children, className = '' }) {
  return (
    <button type="submit" disabled={saving} className={`admin-btn admin-btn--primary ${className}`}>
      {saving ? 'Saving...' : children || 'Save'}
    </button>
  )
}

export function Message({ message, tone = 'success' }) {
  if (!message) return null
  return <div className={`admin-alert admin-alert--${tone}`}>{message}</div>
}

export function Card({ children, className = '', title, description, actions }) {
  return (
    <div className={`admin-card p-5 ${className}`}>
      {(title || actions) && (
        <div className="admin-card-head">
          <div>
            {title && <h2 className="admin-card-title">{title}</h2>}
            {description && <p className="admin-card-sub">{description}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  )
}

export function ListControls({ onUp, onDown, onRemove, canUp = true, canDown = true }) {
  return (
    <div className="flex items-center gap-1">
      <button type="button" onClick={onUp} disabled={!canUp} className="admin-icon-btn admin-icon-btn--xs" title="Move up">
        ↑
      </button>
      <button type="button" onClick={onDown} disabled={!canDown} className="admin-icon-btn admin-icon-btn--xs" title="Move down">
        ↓
      </button>
      <button type="button" onClick={onRemove} className="admin-icon-btn admin-icon-btn--xs admin-icon-btn--danger" title="Remove">
        ✕
      </button>
    </div>
  )
}

export function AddButton({ children, onClick, className = '' }) {
  return (
    <button type="button" onClick={onClick} className={`admin-btn admin-btn--ghost admin-btn--sm ${className}`}>
      + {children}
    </button>
  )
}

export function UploadField({ label, value, onChange, accept = 'image/*' }) {
  return (
    <Field label={label}>
      <input className={inputClass} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="Image URL" />
      <input
        type="file"
        accept={accept}
        className="admin-file mt-2"
        onChange={(e) => e.target.files?.[0] && onChange(e.target.files[0])}
      />
    </Field>
  )
}

export function Badge({ children, tone = 'neutral' }) {
  return <span className={`admin-badge admin-badge--${tone}`}>{children}</span>
}

export function moveItem(list, index, direction) {
  const next = [...list]
  const target = index + direction
  if (target < 0 || target >= next.length) return list
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}
