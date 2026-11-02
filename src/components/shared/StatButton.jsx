export default function StatButton({
  icon = 'eye',
  count = 0,
  active = false,
  onClick,
  title,
  className = '',
}) {
  const Tag = onClick ? 'button' : 'span'
  return (
    <Tag
      type={onClick ? 'button' : undefined}
      onClick={onClick}
      title={title || (icon === 'eye' ? 'Views' : 'Likes')}
      aria-label={title || (icon === 'eye' ? 'Views' : 'Likes')}
      className={`metric-chip ${active ? 'metric-chip--active' : ''} ${
        onClick ? 'metric-chip--button' : ''
      } ${className}`}
    >
      {icon === 'eye' ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M2.25 12s3.5-6.75 9.75-6.75S21.75 12 21.75 12 18.25 18.75 12 18.75 2.25 12 2.25 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
          <path d="M12 20.25s-7.5-4.5-7.5-10.125A4.125 4.125 0 0 1 12 7.5a4.125 4.125 0 0 1 7.5 2.625C19.5 15.75 12 20.25 12 20.25Z" />
        </svg>
      )}
      <span>{count}</span>
    </Tag>
  )
}
