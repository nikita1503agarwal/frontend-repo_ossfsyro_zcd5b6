import Hero from './components/Hero'
import Chat from './components/Chat'
import Features from './components/Features'

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden text-sky-50">
      {/* animated multicolor gradient backdrop */}
      <div className="absolute -inset-0 -z-10">
        <div className="absolute inset-0 bg-[conic-gradient(at_20%_10%,#0ea5e9_0deg,#a78bfa_120deg,#f472b6_240deg,#0ea5e9_360deg)] opacity-30 animate-[spin_30s_linear_infinite]" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/85 to-slate-950" />
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(125,211,252,0.10),transparent_45%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.12),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(236,72,153,0.10),transparent_45%)]" />
      </div>

      {/* soft particles */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className={`absolute w-1.5 h-1.5 rounded-full blur-[1px] opacity-60 ${i % 3 === 0 ? 'bg-sky-300' : i % 3 === 1 ? 'bg-pink-300' : 'bg-violet-300'}`}
            style={{
              top: `${(i * 11) % 100}%`,
              left: `${(i * 17) % 100}%`,
              animation: `floaty ${10 + (i % 6)}s ease-in-out ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes floaty { 0%,100%{ transform: translateY(0) } 50%{ transform: translateY(-16px) } }
      `}</style>

      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="https://images.unsplash.com/photo-1611262588024-d12430b98920?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxpY29ufGVufDB8MHx8fDE3NjM1ODc5NDR8MA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" className="w-9 h-9 rounded-full ring-2 ring-sky-300/50 shadow shadow-sky-900/50 object-cover" alt="icon" />
          <div>
            <p className="text-xs text-sky-200/80">Bhagavad-gita Companion</p>
            <h2 className="text-lg font-bold">Krishna GPT</h2>
          </div>
        </div>
        <a href="/test" className="text-xs text-sky-200 hover:text-white underline/30">System Test</a>
      </header>

      <main className="relative z-10 pb-24">
        <Hero />
        <Chat />
        <Features />
      </main>

      <footer className="relative z-10 py-10 text-center text-sky-100/80 text-sm">
        With devotion to Sri Krishna. May these words inspire remembrance and service.
      </footer>
    </div>
  )
}

export default App
