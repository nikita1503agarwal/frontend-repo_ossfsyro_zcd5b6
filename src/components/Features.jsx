import { motion } from 'framer-motion'
import { Star, Heart, BookOpen } from 'lucide-react'

function Features() {
  const items = [
    {
      icon: <BookOpen className="w-5 h-5" />, 
      title: 'Guidance from Gita',
      desc: 'Responses echo the message of the Bhagavad-gita with gentle clarity.'
    },
    {
      icon: <Heart className="w-5 h-5" />, 
      title: 'Devotional Tone',
      desc: 'Addressed with affection—Krishna to Arjuna—cultivating bhakti and trust.'
    },
    {
      icon: <Star className="w-5 h-5" />, 
      title: 'Visual Connection',
      desc: 'Beautiful depictions of Sri Krishna to inspire remembrance and devotion.'
    },
  ]

  return (
    <div className="max-w-5xl mx-auto px-6 mt-20 grid sm:grid-cols-3 gap-6">
      {items.map((it, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-white/5 border border-white/15 rounded-2xl p-6 text-sky-50 backdrop-blur shadow-xl shadow-sky-900/30"
        >
          <div className="w-10 h-10 rounded-full bg-sky-400/20 border border-sky-300/30 flex items-center justify-center text-sky-100">
            {it.icon}
          </div>
          <h3 className="mt-4 font-semibold text-white">{it.title}</h3>
          <p className="mt-1 text-sky-100/80 text-sm">{it.desc}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default Features
