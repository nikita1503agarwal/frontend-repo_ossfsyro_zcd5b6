import { motion } from 'framer-motion'
import SafeImage from './SafeImage'

function Hero() {
  return (
    <div className="relative overflow-hidden">
      {/* ethereal glow */}
      <div className="absolute -inset-32 pointer-events-none opacity-70" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(147,197,253,0.18),transparent_60%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 pt-12 sm:pt-16 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1 text-sky-100 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-sky-300 animate-pulse" />
            Inspired by the teachings of Bhagavad-gita (by Srila Prabhupada)
          </div>
          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(14,165,233,0.3)]">
            Krishna GPT
          </h1>
          <p className="mt-4 text-sky-100/90 text-lg sm:text-xl leading-relaxed">
            Ask your doubts as Arjuna, and receive guidance in the compassionate voice of Sri Krishna.
          </p>
        </motion.div>

        {/* chariot scene with parallax */}
        <div className="mt-10 grid lg:grid-cols-2 items-center gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <SafeImage
              src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Krishna_and_Arjuna_in_chariot.jpg"
              alt="Sri Krishna guiding Arjuna on the chariot"
              className="w-full h-64 sm:h-80 object-cover rounded-2xl ring-4 ring-white/20 shadow-xl shadow-sky-900/40"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-left max-w-xl mx-auto"
          >
            <p className="text-sky-100/90">
              "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will certainly be opulence, victory, extraordinary power, and morality." (Gita 18.78)
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                'https://upload.wikimedia.org/wikipedia/commons/4/4d/Krishna_and_Arjuna.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/1/17/Krishna_with_flute.jpg',
                'https://upload.wikimedia.org/wikipedia/commons/4/42/Krishna_with_Arjuna.jpg',
              ].map((src, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05 }}>
                  <SafeImage
                    src={src}
                    alt="Krishna and Arjuna"
                    className="h-24 sm:h-28 w-full object-cover rounded-xl ring-2 ring-white/20 shadow-lg shadow-sky-900/40"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* floating peacock feathers */}
      <div className="pointer-events-none" aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
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
