
import { useState } from 'react'
import { analyzeImage } from './services/gemini'
import Scanner from './components/Scanner'
import MonsterCard from './components/MonsterCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Scan, Zap, ShieldAlert, Cpu } from 'lucide-react'

function App() {
  const [scanning, setScanning] = useState(false);
  const [monsterData, setMonsterData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (msg) => {
    setLogs(prev => [...prev.slice(-4), `> ${msg}`]);
  };

  const handleScan = async (file, previewUrl) => {
    setScanning(true);
    setError(null);
    setImagePreview(previewUrl);
    setMonsterData(null);
    setLogs([]);
    addLog("INITIATING QUANTUM SCAN...");

    try {
      addLog("VALIDATING BIO-METRICS...");
      // Validation happens inside analyzeImage now
      const data = await analyzeImage(file);
      addLog("DECRYPTING MONSTER DNA...");
      setTimeout(() => {
        setMonsterData(data);
        addLog("ENTITY MANIFESTED.");
      }, 800);
    } catch (err) {
      if (err.name === "SecurityError") {
        setError(`SECURITY BREACH: ${err.message}`);
        addLog(`[ERR] ${err.code}`);
      } else {
        setError("NEURAL LINK FAILED. CHECK API CONNECTION.");
        console.error(err);
      }
    } finally {
      setScanning(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-500 font-mono tracking-wider selection:bg-green-900/50 overflow-hidden relative">

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,100,0.1)_0%,_transparent_70%)]"></div>
        <div className="absolute top-0 left-0 w-full h-[1px] bg-green-900/30 animate-scanline"></div>
      </div>

      <header className="relative z-10 p-6 flex items-center justify-between border-b border-green-900/50 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border-2 border-green-500 rounded-full flex items-center justify-center animate-pulse">
            <Cpu size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-widest text-green-500 glitch-text" data-text="SNAP BATTLERS">
              SNAP BATTLERS
            </h1>
            <div className="text-[10px] text-green-800">SYS.VER.2.0.26 // SECURE_MODE: ON</div>
          </div>
        </div>
      </header>

      <main className="relative z-10 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-start justify-center h-[calc(100vh-100px)]">

        {/* Left Panel: Scanner */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <AnimatePresence mode="wait">
            {!monsterData ? (
              <motion.div
                key="scanner"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                className="relative"
              >
                <Scanner onScan={handleScan} scanning={scanning} />

                {/* Terminal Logs */}
                <div className="mt-4 p-4 border border-green-900/50 bg-black/80 rounded font-mono text-xs h-32 overflow-hidden flex flex-col justify-end">
                  {logs.map((log, i) => (
                    <div key={i} className="text-green-400/80">{log}</div>
                  ))}
                  {scanning && <div className="animate-pulse">_</div>}
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-full gap-4"
              >
                <button
                  onClick={() => {
                    setMonsterData(null);
                    setImagePreview(null);
                    setLogs([]);
                  }}
                  className="px-8 py-4 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all font-bold uppercase tracking-[0.2em] relative overflow-hidden group"
                >
                  <span className="relative z-10">RE-INITIALIZE SCAN</span>
                  <div className="absolute inset-0 bg-green-500/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </button>
                <div className="text-xs text-green-800 text-center max-w-xs">
                  WARNING: ENTITY MANIFESTATION CONSUMES NEURAL BANDWIDTH. PROCEED WITH CAUTION.
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel: Data / Card */}
        <div className="w-full md:w-1/2 flex items-center justify-center min-h-[400px]">
          <AnimatePresence>
            {monsterData && (
              <MonsterCard data={monsterData} image={imagePreview} />
            )}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 border-2 border-red-500 bg-red-900/20 text-red-500 font-bold text-center glow-red"
              >
                <ShieldAlert size={48} className="mx-auto mb-4" />
                {error}
              </motion.div>
            )}
            {!monsterData && !error && !scanning && (
              <div className="text-green-900/30 text-6xl font-black opacity-20 rotate-12 select-none">
                NO DATA
              </div>
            )}
          </AnimatePresence>
        </div>

      </main>

      {/* Decorative Corners */}
      <div className="fixed top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-green-900/30 rounded-tl-3xl pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-green-900/30 rounded-br-3xl pointer-events-none"></div>

    </div>
  )
}

export default App
