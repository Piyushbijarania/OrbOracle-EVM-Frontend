"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Database, Shield, Zap, Cpu, Layers, Globe, Activity } from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"
import { StructureFlowBackground } from "@/src/shaders/structure-flow/StructureFlowBackground"
import { useState, useEffect } from "react"

// Dynamic scrolling log terminal for the hero section
function QueryTerminalConsole() {
  const [logs, setLogs] = useState<Array<{ id: number; time: string; text: string; type: "ok" | "proof" | "sync" }>>([])

  useEffect(() => {
    // Initial logs seed (composition / validation consensus events)
    const initial = [
      { id: 1, time: getTimestamp(18), text: "Engine listening for new blocks", type: "sync" as const },
      { id: 2, time: getTimestamp(16), text: "ECDSA consensus signatures active", type: "proof" as const },
      { id: 3, time: getTimestamp(14), text: "Oracle contract instance loaded", type: "ok" as const },
      { id: 4, time: getTimestamp(12), text: "Feed updated: ETH/USD", type: "sync" as const },
      { id: 5, time: getTimestamp(10), text: "7/9 sources reached consensus", type: "proof" as const },
      { id: 6, time: getTimestamp(8), text: "Validated price: $2,504.12", type: "ok" as const },
      { id: 7, time: getTimestamp(6), text: "Broadcasting price payload to Base", type: "sync" as const },
      { id: 8, time: getTimestamp(4), text: "8/9 sources reached consensus", type: "proof" as const },
      { id: 9, time: getTimestamp(2), text: "Validated price: $2,506.45", type: "ok" as const },
      { id: 10, time: getTimestamp(0), text: "Oracle response finalized", type: "ok" as const }
    ]
    setLogs(initial)

    const logPool = [
      { text: "Composing BTC/USD × ETH/USD", type: "sync" as const },
      { text: "Oracle response finalized", type: "ok" as const },
      { text: "Feed updated: SOL/USD", type: "sync" as const },
      { text: "Consensus signatures verified: 0x9a3f...d41b", type: "proof" as const },
      { text: "Broadcasting price payload to Base", type: "sync" as const },
      { text: "Composed price index calculated", type: "ok" as const },
      { text: "Broadcasting price payload to Arbitrum", type: "sync" as const },
      { text: "8/9 sources reached consensus", type: "proof" as const },
      { text: "Validated price: $60,120.45", type: "ok" as const }
    ]

    let counter = 11
    const interval = setInterval(() => {
      const entry = logPool[Math.floor(Math.random() * logPool.length)]
      setLogs(prev => {
        const nextLogs = [...prev, { id: counter++, time: getTimestamp(0), text: entry.text, type: entry.type }]
        if (nextLogs.length > 10) nextLogs.shift()
        return nextLogs
      })
    }, 1800)

    return () => clearInterval(interval)
  }, [])

  function getTimestamp(offsetSeconds = 0) {
    const date = new Date(Date.now() - offsetSeconds * 1000)
    return date.toLocaleTimeString(undefined, { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <div className="relative w-full aspect-[4/3] max-[400px]:aspect-auto max-[400px]:min-h-[240px] max-w-[450px] bg-white/5 border border-white/10 rounded-[2rem] p-1.5 shadow-2xl backdrop-blur-md flex flex-col transition-all duration-500 hover:border-primary/20">
      <div className="flex-grow bg-zinc-950/95 rounded-[calc(2rem-0.5rem)] p-3.5 sm:p-5 flex flex-col justify-between overflow-hidden border border-white/5 font-mono text-[9px] sm:text-[10.5px]">
        
        {/* Console Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2 mb-2 sm:pb-2.5 sm:mb-2.5 text-[8px] sm:text-[9px] uppercase tracking-widest text-primary font-semibold">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>query-sync console v1.0.8</span>
          </div>
          <span className="text-muted-foreground">online</span>
        </div>
        
        {/* Terminal Logs Stack */}
        <div className="flex-grow flex flex-col space-y-1.5 sm:space-y-2 overflow-hidden justify-end min-h-0">
          {logs.map(log => (
            <div key={log.id} className="flex items-start space-x-1.5 sm:space-x-2 shrink-0">
              <span className="text-muted-foreground flex-shrink-0">[{log.time}]</span>
              <span className={`flex-shrink-0 ${
                log.type === "ok" ? "text-emerald-400" :
                log.type === "proof" ? "text-primary font-semibold" :
                "text-cyan-400"
              }`}>
                {log.type === "ok" ? "[OK]" : log.type === "proof" ? "[PROOF]" : "[SYNC]"}
              </span>
              <span className="text-white truncate">{log.text}</span>
            </div>
          ))}
        </div>

        {/* Console Footer */}
        <div className="flex items-center justify-between border-t border-white/5 pt-2 mt-2 sm:pt-2.5 sm:mt-2.5 text-[7.5px] sm:text-[8.5px] text-muted-foreground uppercase tracking-wider">
          <span>Block: #20594328</span>
          <span>Gas: 12 Gwei</span>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  // Interactive Composed Oracle Calculator State
  const [feedA, setFeedA] = useState<"ETH" | "SOL">("ETH")
  const [feedB, setFeedB] = useState<"BTC" | "EUR">("BTC")
  const [operation, setOperation] = useState<"*" | "/">("/")
  const [calculatedValue, setCalculatedValue] = useState<string>("0.0417")
  const [glow, setGlow] = useState(false)

  const feedPrices = {
    ETH: 2500,
    SOL: 150,
    BTC: 60000,
    EUR: 1.08
  }

  // Recalculate Mock Composed Oracle Price
  useEffect(() => {
    const priceA = feedPrices[feedA]
    const priceB = feedPrices[feedB]
    let result = 0
    if (operation === "*") {
      result = priceA * priceB
    } else {
      result = priceA / priceB
    }

    // Format output beautifully
    if (result < 0.1) {
      setCalculatedValue(result.toFixed(4))
    } else if (result > 1000) {
      setCalculatedValue(result.toLocaleString(undefined, { maximumFractionDigits: 2 }))
    } else {
      setCalculatedValue(result.toFixed(2))
    }

    // Trigger visual pulse animation on update
    setGlow(true)
    const timer = setTimeout(() => setGlow(false), 800)
    return () => clearTimeout(timer)
  }, [feedA, feedB, operation])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white relative">
      {/* High-End Ambient Particle Backdrop */}
      <ParticleBackground />

      {/* Floating Header Navigation */}
      <Navigation />

      {/* Hero Wrapper (Full Width) */}
      <div className="relative w-full overflow-visible">
        {/* Full-Screen Immersive Three.js Particle Node Flow Backdrop */}
        <div className="absolute inset-x-0 top-[45dvh] w-full h-[150dvh] z-0 pointer-events-none opacity-80">
          <StructureFlowBackground speed={0.8} pointSize={0.07} opacity={0.8} maskStart={0} maskSolid={0} />
        </div>

        {/* Hero Section (Asymmetrical Split Layout) */}
        <section className="relative min-h-[100dvh] flex items-center justify-center pt-24 md:pt-16 px-4 md:px-8 max-w-7xl mx-auto z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Hero Left Column (Symmetric Copy & CTAs) */}
          <div className="lg:col-span-7 flex flex-col text-left space-y-6">
            
            {/* Micro Eyebrow Badge (Single Page Eyebrow Limit) */}
            <div className="inline-flex items-center space-x-2">
              <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
                ORBORACLE // SECURE ORACLE LAYER
              </span>
            </div>

            {/* H1 Display Typography */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight leading-[1.08] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Decentralized Truth <br className="hidden sm:inline" />
              for the <span className="text-primary font-semibold">Decentralized Web</span>
            </h1>

            {/* Tight Subtext (Max 20 Words constraint, brightened and wrapped in localized dark fade block for high contrast) */}
            <div className="relative w-full max-w-[55ch]">
              <p className="text-lg text-zinc-200 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] relative z-10">
                Deploy, compose, and query high-integrity price feeds with cryptographic proofs and sub-second updates across EVM networks.
              </p>
              <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-r from-background via-background/60 to-transparent blur-md rounded-2xl z-0 pointer-events-none" />
            </div>

            {/* CTAs with Button-in-Button Trailing Icon (Translucent Glassmorphism) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="h-14 rounded-full pl-6 pr-2 bg-white/10 border border-white/15 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] group flex items-center justify-between shadow-xl"
              >
                <Link href="/create">
                  <span className="font-medium tracking-wide">Deploy Custom Oracle</span>
                  <span className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                    <ArrowRight className="h-4 w-4 stroke-[1.5] text-white" />
                  </span>
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg" 
                className="h-14 rounded-full px-8 bg-white/5 border border-white/20 hover:bg-white/10 hover:border-white/45 text-white transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] shadow-lg shadow-black/20 group flex items-center gap-2"
              >
                <Link href="/explorer" className="flex items-center gap-2">
                  <span>Explore Active Feeds</span>
                  <span className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-300">
                    <ArrowRight className="h-3 w-3 stroke-[1.5] text-white" />
                  </span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero Right Column (Scrolling Real-Time Query Terminal) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <QueryTerminalConsole />
          </div>

          </div>
        </section>
      </div>

      {/* Integration Partner Ribbon */}
      <section className="py-12 border-y border-white/5 bg-zinc-950/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-6">
            SECURED FEED INTEGRATIONS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16 opacity-30 hover:opacity-60 transition-opacity duration-500">
            <div className="flex items-center space-x-2 text-white">
              <span className="font-mono font-bold tracking-tight text-sm uppercase">UNISWAP</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-mono font-bold tracking-tight text-sm uppercase">AAVE</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-mono font-bold tracking-tight text-sm uppercase">CHAINLINK</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-mono font-bold tracking-tight text-sm uppercase">MAKER</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-mono font-bold tracking-tight text-sm uppercase">BASE</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <span className="font-mono font-bold tracking-tight text-sm uppercase">ARBITRUM</span>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Bento Grid Section */}
      <section className="py-24 md:py-32 px-4 md:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Engineered for Absolute Integrity
          </h2>
          <p className="text-muted-foreground text-lg">
            A secure foundation of composable price feeds designed to withstand network congestion, exploits, and volatile market anomalies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Bento Cell 1 (Col Span 2: Interactive Composed Oracle Graph) */}
          <div className="md:col-span-2 group bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 transition-all duration-500 hover:border-primary/20 backdrop-blur-md">
            <div className="h-full bg-zinc-950/40 backdrop-blur-[2px] rounded-[calc(2.5rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 flex flex-col justify-between space-y-8">
              
              <div>
                <span className="text-[10px] tracking-widest font-mono text-primary uppercase font-semibold">FEATURES // COMPOSE</span>
                <h3 className="text-2xl font-medium tracking-tight mt-2 mb-3">Adaptive Composability</h3>
                <p className="text-muted-foreground leading-relaxed max-w-[55ch] text-sm md:text-base">
                  Link any two price indices mathematically to instantly create synthetic price sources or relative currency pairs. Click below to try it live:
                </p>
              </div>

              {/* Interactive Node Canvas Graph with glowing connectors */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 items-center bg-black/40 rounded-2xl p-6 border border-white/5 relative overflow-hidden">
                
                {/* Visual connecting grid lines on desktop */}
                <div className="hidden sm:block absolute left-[30%] right-[30%] top-1/2 -translate-y-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                
                {/* Node A (Feed A Selector) */}
                <div className="flex flex-col space-y-2 p-4 rounded-xl bg-zinc-900 border border-white/5 relative z-10">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Feed Source A</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFeedA("ETH")}
                      className={`h-9 px-3.5 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedA === "ETH" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      ETH ($2.5k)
                    </button>
                    <button 
                      onClick={() => setFeedA("SOL")}
                      className={`h-9 px-3.5 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedA === "SOL" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      SOL ($150)
                    </button>
                  </div>
                </div>

                {/* Operator selector Node */}
                <div className="flex flex-col items-center justify-center p-3 relative z-10">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider mb-2">OPERATOR</span>
                  <div className="inline-flex rounded-lg bg-zinc-900 p-1 border border-white/5">
                    <button 
                      onClick={() => setOperation("/")}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-mono font-bold transition-all cursor-pointer ${operation === "/" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}
                    >
                      /
                    </button>
                    <button 
                      onClick={() => setOperation("*")}
                      className={`w-8 h-8 flex items-center justify-center rounded text-sm font-mono font-bold transition-all cursor-pointer ${operation === "*" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}
                    >
                      ×
                    </button>
                  </div>
                </div>

                {/* Node B (Feed B Selector) */}
                <div className="flex flex-col space-y-2 p-4 rounded-xl bg-zinc-900 border border-white/5 relative z-10">
                  <span className="text-[9px] font-mono text-muted-foreground uppercase tracking-wider">Feed Source B</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setFeedB("BTC")}
                      className={`h-9 px-3.5 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedB === "BTC" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      BTC ($60k)
                    </button>
                    <button 
                      onClick={() => setFeedB("EUR")}
                      className={`h-9 px-3.5 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedB === "EUR" ? "bg-white text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
                    >
                      EUR ($1.08)
                    </button>
                  </div>
                </div>

                {/* Result Block overlay */}
                <div className="col-span-1 sm:col-span-3 mt-4 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs text-muted-foreground uppercase">Composed Price:</span>
                    <span className={`font-mono text-base font-semibold text-primary transition-all duration-500 ${glow ? "scale-110 text-white" : ""}`}>
                      {feedA} {operation === "/" ? "÷" : "×"} {feedB}
                    </span>
                  </div>
                  <div className={`mt-2 sm:mt-0 font-mono text-xl text-emerald-400 font-bold bg-emerald-500/10 px-4 py-1.5 rounded-lg border border-emerald-500/20 transition-all duration-300 ${glow ? "scale-105 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : ""}`}>
                    {calculatedValue} <span className="text-xs text-muted-foreground font-normal">{operation === "/" ? feedB : "USD"}</span>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bento Cell 2 (Col Span 1: Multi-Signature Security) */}
          <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 transition-all duration-500 hover:border-primary/20 backdrop-blur-md">
            <div className="h-full bg-zinc-950/40 backdrop-blur-[2px] rounded-[calc(2.5rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6 text-primary stroke-[1.2]" />
                </div>
                <h3 className="text-xl font-medium tracking-tight mb-2">Cryptographic Uptime</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  Every data update requires multi-signature validation and cryptographic proofs, completely neutralizing flash-loan vector manipulation.
                </p>
              </div>

              {/* Dynamic validation log box to fill empty space */}
              <div className="bg-black/30 border border-white/5 rounded-xl p-4 font-mono text-[9px] text-zinc-500 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/5 pb-1.5 mb-1.5 text-primary text-[8px] uppercase tracking-wider font-semibold">
                  <span>proof-engine v1.2</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <div className="flex justify-between">
                  <span>[M_ROOT_SYNC]</span>
                  <span className="text-emerald-400">✓ SYNCED</span>
                </div>
                <div className="flex justify-between">
                  <span>[CONSENSUS_Q]</span>
                  <span className="text-emerald-400">✓ 92.4% OK</span>
                </div>
                <div className="flex justify-between">
                  <span>[ECDSA_SIG]</span>
                  <span className="text-emerald-400">✓ VERIFIED</span>
                </div>
                <div className="text-[7.5px] text-zinc-600 truncate mt-1 pt-1.5 border-t border-white/5">
                  HASH: 0x8af92e...3e281
                </div>
              </div>
            </div>
          </div>

          {/* Bento Cell 3 (Col Span 1: Sub-Second Latency) */}
          <div className="group bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 transition-all duration-500 hover:border-primary/20 backdrop-blur-md">
            <div className="h-full bg-zinc-950/40 backdrop-blur-[2px] rounded-[calc(2.5rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 flex flex-col justify-between">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-primary stroke-[1.2]" />
              </div>
              <div>
                <h3 className="text-xl font-medium tracking-tight mb-2">Sub-Second Updates</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Dynamic gossiping architecture ensures updates are securely distributed instantly to connected client protocols.
                </p>
              </div>
            </div>
          </div>

          {/* Bento Cell 4 (Col Span 2: Cross-chain Native) */}
          <div className="md:col-span-2 group bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 transition-all duration-500 hover:border-primary/20 backdrop-blur-md">
            <div className="h-full bg-zinc-950/40 backdrop-blur-[2px] rounded-[calc(2.5rem-0.5rem)] p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 flex flex-col justify-between md:flex-row md:items-center gap-6">
              <div className="space-y-4 max-w-[45ch]">
                <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary stroke-[1.2]" />
                </div>
                <h3 className="text-xl font-medium tracking-tight">Cross-Chain Execution</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Deploy contract oracles once and seamlessly query feeds across all major EVM networks including Base, Arbitrum, Polygon, and Ethereum Mainnet.
                </p>
              </div>
              
              {/* Dynamic visual representation of cross-chain node sync */}
              <div className="bg-black/30 rounded-xl p-4 border border-white/5 flex flex-col space-y-2 flex-grow max-w-[280px]">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Source Hub</span>
                  <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-[10px]">SYNCED</span>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between bg-zinc-900 px-3 py-1.5 rounded border border-white/5">
                    <span className="font-mono text-[11px] text-white">Base Network</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex items-center justify-between bg-zinc-900 px-3 py-1.5 rounded border border-white/5">
                    <span className="font-mono text-[11px] text-white">Arbitrum One</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                  <div className="flex items-center justify-between bg-zinc-900 px-3 py-1.5 rounded border border-white/5">
                    <span className="font-mono text-[11px] text-white">Polygon zkEVM</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Live System Stats Section */}
      <section className="py-24 md:py-32 border-t border-white/5 bg-zinc-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            
            {/* Stat 1 */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Active Oracles</span>
              <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                1,247
              </div>
              <span className="text-xs text-muted-foreground">Fully Decentralized</span>
            </div>

            {/* Stat 2 */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Value Secured</span>
              <div className="text-4xl md:text-5xl font-semibold tracking-tight text-primary transition-transform duration-300 group-hover:scale-105">
                $2.4B+
              </div>
              <span className="text-xs text-muted-foreground">USD Denominated TVL</span>
            </div>

            {/* Stat 3 */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Uptime Ratio</span>
              <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                99.99%
              </div>
              <span className="text-xs text-muted-foreground">Zero Interruption</span>
            </div>

            {/* Stat 4 */}
            <div className="flex flex-col items-center text-center space-y-2 group">
              <span className="font-mono text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Chains Active</span>
              <div className="text-4xl md:text-5xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                50+
              </div>
              <span className="text-xs text-muted-foreground">Multichain Connected</span>
            </div>

          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 px-4 md:px-8 max-w-5xl mx-auto relative overflow-hidden">
        
        {/* Double-Bezel Border Frame enclosing CTA */}
        <div className="bg-white/5 border border-white/10 rounded-[3rem] p-2 shadow-2xl backdrop-blur-md relative z-10 text-center">
          <div className="bg-zinc-950/40 backdrop-blur-[2px] rounded-[calc(3rem-0.5rem)] py-16 px-6 sm:px-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5 flex flex-col items-center space-y-6">
            
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-white">
              Ready to build the future?
            </h2>
            
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed max-w-[50ch] text-center">
              Connect your wallet, configure your weights, and deploy custom price feeds in seconds.
            </p>

            <Button 
              asChild 
              size="lg" 
              className="h-14 rounded-full pl-6 pr-2 bg-white text-black hover:bg-zinc-200 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] group flex items-center justify-between space-x-4"
            >
              <Link href="/create">
                <span className="font-medium tracking-wide">Deploy Your First Oracle</span>
                <span className="w-10 h-10 rounded-full bg-black/5 dark:bg-black/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                  <ArrowRight className="h-4 w-4 stroke-[1.5]" />
                </span>
              </Link>
            </Button>

          </div>
        </div>

      </section>
    </div>
  )
}
