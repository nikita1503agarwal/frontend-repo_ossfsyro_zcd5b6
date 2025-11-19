import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

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
          verse: data.reference
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
    <div className="relative max-w-3xl mx-auto mt-12">
      <div className="bg-white/5 border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-sky-900/30 backdrop-blur">
        <div ref={listRef} className="h-[52vh] overflow-y-auto p-6 space-y-6">
          {messages.map((m, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-11 h-11 rounded-full shrink-0 ring-2 ${m.role === 'user' ? 'ring-rose-300' : 'ring-sky-300'} overflow-hidden`}> 
                <img
                  src={m.role === 'user' ? 'https://i.pravatar.cc/100?img=12' : 'https://upload.wikimedia.org/wikipedia/commons/1/17/Krishna_with_flute.jpg'}
                  alt={m.role}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`max-w-xl ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                {m.image_url && (
                  <img
                    src={m.image_url}
                    alt="illustration"
                    className="rounded-lg mb-2 shadow-lg shadow-sky-900/40 border border-white/20"
                  />
                )}
                <div className={`inline-block px-4 py-3 rounded-2xl text-sky-50 ${
                  m.role === 'user'
                    ? 'bg-rose-500/20 border border-rose-300/30'
                    : 'bg-sky-500/15 border border-sky-300/30'
                }`}> 
                  <p className="leading-relaxed whitespace-pre-wrap">{m.content}</p>
                </div>
                {m.verse && (
                  <p className="mt-2 text-xs text-sky-200/80">{m.verse}</p>
                )}
              </div>
            </motion.div>
          ))}
          {loading && (
            <div className="flex items-center gap-3 text-sky-200">
              <span className="w-2 h-2 bg-sky-300 rounded-full animate-bounce [animation-delay:-0.2s]" />
              <span className="w-2 h-2 bg-sky-300 rounded-full animate-bounce" />
              <span className="w-2 h-2 bg-sky-300 rounded-full animate-bounce [animation-delay:0.2s]" />
            </div>
          )}
        </div>

        <div className="p-4 border-t border-white/10 bg-gradient-to-t from-slate-900/50 to-transparent">
          <div className="flex gap-3">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKey}
              rows={2}
              placeholder="O Krishna, I am bewildered... guide me."
              className="flex-1 resize-none rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sky-50 placeholder:text-sky-200/60 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
            />
            <button
              onClick={ask}
              disabled={loading}
              className="px-5 py-3 rounded-xl bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-white font-semibold shadow-lg shadow-sky-900/30 disabled:opacity-50"
            >
              Ask
            </button>
          </div>
          <p className="text-[11px] text-sky-200/60 mt-2">
            Answers are drawn from the themes and verses of the Bhagavad-gita as presented by Srila Prabhupada.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Chat
