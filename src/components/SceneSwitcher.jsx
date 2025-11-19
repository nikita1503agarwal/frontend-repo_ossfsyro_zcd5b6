import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SafeImage from './SafeImage'

const scenes = [
  {
    src: 'https://images.unsplash.com/photo-1760292422134-859a50fd8d00?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPbiUyMHRoZSUyMGNoYXJpb3QlMkMlMjBndWlkYW5jZXxlbnwwfDB8fHwxNzYzNTg4NDA5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    caption: 'On the chariot, guidance begins.'
  },
  {
    src: 'https://images.unsplash.com/photo-1760292422134-859a50fd8d00?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxPbiUyMHRoZSUyMGNoYXJpb3QlMkMlMjBndWlkYW5jZXxlbnwwfDB8fHwxNzYzNTg4NDA5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    caption: 'Doubt turns to clarity.'
  },
  {
    src: 'https://images.unsplash.com/photo-1668268815939-f422f5c1d088?ixid=M3w3OTkxMTl8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NjM1ODg0MTB8&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80',
    caption: 'The Lord directs, the devotee acts.'
  }
]

export default function SceneSwitcher() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % scenes.length), 6000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative mt-12 max-w-4xl mx-auto">
      <div className="relative rounded-2xl overflow-hidden ring-4 ring-white/20 shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6 }}
          >
            <SafeImage src={scenes[index].src} alt={scenes[index].caption} className="w-full h-64 sm:h-80 object-cover" />
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="text-center text-sky-100/80 text-sm mt-2">{scenes[index].caption}</p>
    </div>
  )
}
