import { motion } from 'framer-motion'

function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* ethereal glow */}
      <div className="absolute -inset-32 pointer-events-none opacity-60" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(147,197,253,0.18),transparent_60%)]" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 pt-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sky-100 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
            Inspired by the teachings of Bhagavad-gita (by Srila Prabhupada)
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white">
            Krishna GPT
          </h1>
          <p className="mt-4 text-sky-100/90 text-lg sm:text-xl leading-relaxed">
            Ask your doubts as Arjuna, and receive guidance in the compassionate voice of Sri Krishna.
          </p>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            src="https://upload.wikimedia.org/wikipedia/commons/4/4d/Krishna_and_Arjuna.jpg"
            alt="Sri Krishna with Arjuna"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover ring-4 ring-white/30 shadow-lg shadow-sky-900/40"
          />
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-left max-w-md"
          >
            <p className="text-sky-100/90">
              "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will certainly be opulence, victory, extraordinary power, and morality." (Gita 18.78)
            </p>
          </motion.div>
        </div>
      </div>

      {/* floating peacock feathers */}
      <div className="pointer-events-none" aria-hidden>
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-sky-200/70"
            initial={{ opacity: 0, y: 20, rotate: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: [-10, -30 - i * 6, -60 - i * 8, -90 - i * 10], rotate: [0, 8, -6, 12] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.6 }}
            style={{ left: `${(i * 11) % 100}%`, top: `${30 + (i * 7) % 40}%` }}
          >
            <span className="inline-block select-none text-3xl">🪶</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Hero
