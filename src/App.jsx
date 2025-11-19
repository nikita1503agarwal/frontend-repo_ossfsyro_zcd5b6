import Hero from './components/Hero'
import Chat from './components/Chat'
import Features from './components/Features'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-sky-50">
      {/* gentle starry sky */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_10%,rgba(125,211,252,0.08),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(191,219,254,0.08),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(125,211,252,0.06),transparent_40%)]" />

      <header className="relative z-10 max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/flame-icon.svg" className="w-9 h-9 drop-shadow" alt="icon" />
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

      <footer className="relative z-10 py-10 text-center text-sky-100/70 text-sm">
        With devotion to Sri Krishna. May these words inspire remembrance and service.
      </footer>
    </div>
  )
}

export default App
