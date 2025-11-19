import { useEffect, useRef, useState } from 'react'

// Gentle flute ambience with user controls
export default function AudioAmbience() {
  const audioRef = useRef(null)
  const [enabled, setEnabled] = useState(false)
  const [volume, setVolume] = useState(0.2)

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.volume = volume
    if (enabled) {
      const play = async () => {
        try { await audioRef.current.play() } catch {}
      }
      play()
    } else {
      audioRef.current.pause()
    }
  }, [enabled, volume])

  return (
    <div className="fixed bottom-4 right-4 z-20">
      <div className="rounded-2xl backdrop-blur bg-white/10 border border-white/20 shadow-lg p-3 flex items-center gap-3">
        <button
          onClick={() => setEnabled(v => !v)}
          className={`px-3 py-1.5 rounded-lg text-sm font-medium ${enabled ? 'bg-sky-500/30 text-white' : 'bg-white/10 text-sky-100'}`}
        >
          {enabled ? 'Pause Flute' : 'Play Flute'}
        </button>
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-28 accent-sky-400"
          aria-label="Volume"
        />
      </div>
      <audio
        ref={audioRef}
        loop
        preload="auto"
        // Public domain bamboo flute sample from Wikimedia Commons
        src="https://upload.wikimedia.org/wikipedia/commons/2/21/Bansuri_Or_Bamboo_Flute.ogg"
      />
    </div>
  )
}
