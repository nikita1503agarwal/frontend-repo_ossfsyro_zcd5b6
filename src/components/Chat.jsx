import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from './SafeImage'

const backend = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function Chat() {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      role: 'krishna',
      content:
        'Dear Arjuna, ask without hesitation. As the sun dispels darkness, knowledge dissolves confusion.',
      image_url:
        'https://upload.wikimedia.org/wikipedia/commons/1/17/Krishna_with_flute.jpg',
      verse: 'man-manā bhava mad-bhakto (Gita 9.34)'
    }
  ])

  const listRef = useRef(null)

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const ask = async () => {
    const question = input.trim()
    if (!question) return
    setInput('')
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', content: question }])

    try {
      const res = await fetch(`${backend}/api/ask`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      })
      if (!res.ok) throw new Error('Request failed')
      const data = await res.json()
      setMessages(prev => [
        ...prev,
        {
          role: 'krishna',
          content: data.answer,
          image_url: data.image_url,
          verse: data.reference,
          chapter: data.chapter
        }
      ])
    } catch (e) {
      setMessages(prev => [
        ...prev,
        { role: 'krishna', content: 'My dear Arjuna, an obstacle has arisen. Try again in a moment with a steady heart.' }
      ])
    } finally {
      setLoading(false)
    }
  }

  const onKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      ask()
    }
  }

  return (
    <div className="relative max-w-4xl mx-auto mt-12">
      {/* animated border */}
      <div className="relative rounded-3xl p-[1px] bg-gradient-to-r from-sky-400 via-fuchsia-400 to-violet-400">
        <div className="bg-slate-900/60 rounded-3xl overflow-hidden shadow-2xl backdrop-blur">
          {/* header ribbon */}
          <div className="relative py-3 px-5 bg-gradient-to-r from-sky-500/10 via-fuchsia-500/10 to-violet-500/10 border-b border-white/10">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.2),transparent_60%)]" />
            <p className="relative z-10 text-center text-sky-100/90 text-sm">Speak, O Arjuna. I am here.</p>
          </div>

          <div ref={listRef} className="h-[56vh] overflow-y-auto p-6 space-y-6">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-11 h-11 rounded-full shrink-0 ring-2 ${m.role === 'user' ? 'ring-rose-300' : 'ring-sky-300'} overflow-hidden`}> 
                    <SafeImage
                      src={m.role === 'user' ? 'https://i.pravatar.cc/100?img=12' : 'https://upload.wikimedia.org/wikipedia/commons/1/17/Krishna_with_flute.jpg'}
                      alt={m.role}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`max-w-xl ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {m.image_url && (
                      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                        <SafeImage
                          src={m.image_url}
                          alt="illustration"
                          className="rounded-lg mb-2 shadow-lg shadow-sky-900/40 border border-white/20"
                        />
                      </motion.div>
                    )}
                    <div className={`inline-block px-4 py-3 rounded-2xl text-sky-50 relative overflow-hidden ${
                      m.role === 'user'
                        ? 'bg-gradient-to-br from-rose-500/30 to-pink-500/20 border border-rose-300/30'
                        : 'bg-gradient-to-br from-sky-500/25 to-violet-500/20 border border-sky-300/30'
                    }`}>
                      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_-10%,rgba(255,255,255,0.15),transparent_60%)]" />
                      <p className="leading-relaxed whitespace-pre-wrap relative z-10">{m.content}</p>
                    </div>
                    {(m.verse || m.chapter) && (
                      <p className="mt-2 text-xs text-sky-200/80">{m.verse ? m.verse : ''} {m.chapter ? `(Chapter ${m.chapter})` : ''}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex items-center gap-3 text-sky-200">
                <span className="w-2 h-2 bg-sky-300 rounded-full animate-bounce [animation-delay:-0.2s]" />
                <span className="w-2 h-2 bg-sky-300 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-sky-300 rounded-full animate-bounce [animation-delay:0.2s]" />
              </div>
            )}
          </div>

          <div className="p-4 border-t border-white/10 bg-gradient-to-t from-slate-900/60 to-transparent">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKey}
                rows={2}
                placeholder="O Krishna, I am bewildered... guide me."
                className="flex-1 resize-none rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sky-50 placeholder:text-sky-200/60 focus:outline-none focus:ring-2 focus:ring-fuchsia-400/50"
              />
              <button
                onClick={ask}
                disabled={loading}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-fuchsia-500 hover:from-sky-400 hover:to-fuchsia-400 active:from-sky-600 active:to-fuchsia-600 text-white font-semibold shadow-lg shadow-sky-900/30 disabled:opacity-50"
              >
                Ask
              </button>
            </div>
            <p className="text-[11px] text-sky-200/70 mt-2">
              Answers are drawn from the themes and verses of the Bhagavad-gita as presented by Srila Prabhupada.
            </p>
          </div>
        </div>
      </div>

      {/* floating orbs around the chat */}
      <div className="pointer-events-none" aria-hidden>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-24 h-24 rounded-full blur-3xl opacity-20 ${i % 2 ? 'bg-sky-400' : 'bg-fuchsia-400'}`}
            style={{
              top: `${10 + (i * 8) % 60}%`,
              left: `${(i * 13) % 80}%`,
              filter: 'blur(40px)'
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default Chat
