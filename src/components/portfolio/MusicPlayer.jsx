import { useState } from 'react'

const VIDEO_ID = 'h7MYJghRWt0'

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false)

  const toggle = () => setPlaying((p) => !p)

  const handleKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggle()
    }
  }

  const src = `https://www.youtube.com/embed/${VIDEO_ID}?autoplay=${playing ? 1 : 0}&controls=0&disablekb=1&fs=0&modestbranding=1&rel=0&loop=1&playlist=${VIDEO_ID}`

  return (
    <div className="music-player" aria-label="Background music player">
      <div
        className={`music-disk ${playing ? 'is-spinning' : ''}`}
        onClick={toggle}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        <div className="music-disk__vinyl" aria-hidden="true" />
        <div className="music-disk__label" aria-hidden="true">
          {playing ? '❚❚' : '▶'}
        </div>
      </div>
      <span className="music-player__tooltip">
        {playing ? 'Playing track' : 'Play track'}
      </span>
      <iframe
        className="music-player__iframe"
        src={src}
        title="Die For You ft. Grabbitz // Official Music Video // VALORANT Champions 2021"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </div>
  )
}
