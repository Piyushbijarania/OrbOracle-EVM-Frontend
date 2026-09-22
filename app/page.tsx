"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"
import { ArrowRight, Shield, Zap, TrendingUp, CheckCircle2, ChevronDown, Sliders } from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"
import { StructureFlowBackground } from "@/src/shaders/structure-flow/StructureFlowBackground"
import { useState, useEffect, useRef } from "react"

// Subtle Scroll Reveal Animation Wrapper (Linear / Ente Style)
function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up"
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: "up" | "none"
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(el)
        }
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px"
      }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const transformClass = direction === "up" 
    ? (isVisible ? "opacity-100 translate-y-0 filter-none" : "opacity-0 translate-y-8")
    : (isVisible ? "opacity-100" : "opacity-0")

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${transformClass} ${className}`}
    >
      {children}
    </div>
  )
}

// Interactive Time-Decayed Weight Calculator
function ProtocolMathSimulator() {
  const [elapsedMinutes, setElapsedMinutes] = useState<number>(30)
  const initialWeight = 1000
  const halfLifeMinutes = 60 // 3600s half-life

  // Calculate real decay factor: 0.5 ^ (elapsed / halfLife)
  const decayFactor = Math.pow(0.5, elapsedMinutes / halfLifeMinutes)
  const currentWeight = initialWeight * decayFactor

  return (
    <div className="w-full max-w-[480px] bg-zinc-950/80 border border-zinc-800/80 rounded-[2.5rem] p-1.5 shadow-2xl backdrop-blur-md flex flex-col transition-all duration-500 hover:border-zinc-700">
      <div className="bg-black/80 rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-7 flex flex-col justify-between border border-zinc-900 font-mono text-xs space-y-5">
        
        {/* Card Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Voting Weight Decay Reader
            </span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary uppercase tracking-widest font-mono">
            Half-Life: 1h
          </span>
        </div>

        {/* Real-time Math State */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex flex-col space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Initial Weight</span>
            <span className="text-sm sm:text-base font-bold text-white">{initialWeight.toLocaleString()} Tokens</span>
          </div>
          <div className="p-3 bg-black/40 rounded-xl border border-white/5 flex flex-col space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Decay Rate</span>
            <span className="text-sm sm:text-base font-bold text-primary">50% per 60 min</span>
          </div>
        </div>

        {/* Interactive Elapsed Time Slider */}
        <div className="space-y-2 pt-1">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-zinc-300 font-medium">Time Since Last Report:</span>
            <span className="text-primary font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
              {elapsedMinutes} min ({Math.round(elapsedMinutes * 60)}s)
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={180}
            step={5}
            value={elapsedMinutes}
            onChange={(e) => setElapsedMinutes(Number(e.target.value))}
            className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-[9px] text-muted-foreground">
            <span>0m (100%)</span>
            <span>60m (50%)</span>
            <span>120m (25%)</span>
            <span>180m (12.5%)</span>
          </div>
        </div>

        {/* Interactive Output Metrics */}
        <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 space-y-2.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground text-[10.5px]">Active Consensus Influence:</span>
            <span className="font-bold text-primary text-sm">{currentWeight.toFixed(1)} <span className="text-xs font-normal text-zinc-400">({(decayFactor * 100).toFixed(1)}%)</span></span>
          </div>
          <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary/60 to-primary h-full transition-all duration-300 rounded-full"
              style={{ width: `${decayFactor * 100}%` }}
            />
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-white/5 text-[10px]">
            <span className="text-muted-foreground">Protocol Recency Status:</span>
            <span className={`font-semibold ${elapsedMinutes < 60 ? 'text-primary' : elapsedMinutes < 120 ? 'text-yellow-400' : 'text-zinc-400'}`}>
              {elapsedMinutes < 60 ? 'Fresh & High Impact' : elapsedMinutes < 120 ? 'Aging (Update Due)' : 'Stale Weight'}
            </span>
          </div>
        </div>

        {/* Footer info note */}
        <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-1">
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-primary" />
            Deterministic On-Chain Math
          </span>
          <span className="font-mono text-zinc-400">Fixed-Point WAD</span>
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

  // Interactive Value Range Simulator State
  const [sampleSize, setSampleSize] = useState<number>(20)
  const basePrice = 2500
  const spreadPercent = (sampleSize * 0.12).toFixed(2)
  const minRange = (basePrice * (1 - Number(spreadPercent) / 100)).toFixed(2)
  const maxRange = (basePrice * (1 + Number(spreadPercent) / 100)).toFixed(2)

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

    if (result < 0.1) {
      setCalculatedValue(result.toFixed(4))
    } else if (result > 1000) {
      setCalculatedValue(result.toLocaleString(undefined, { maximumFractionDigits: 2 }))
    } else {
      setCalculatedValue(result.toFixed(2))
    }

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
        {/* Full-Screen Immersive Three.js Particle Node Flow Backdrop (Submerging into the strip) */}
        <div 
          className="absolute inset-x-0 top-[45dvh] w-full h-[150dvh] z-0 pointer-events-none opacity-80"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.2) 54%, transparent 58%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 46%, rgba(0,0,0,0.65) 50%, rgba(0,0,0,0.2) 54%, transparent 58%)'
          }}
        >
          <StructureFlowBackground speed={0.8} pointSize={0.07} opacity={0.8} maskStart={0} maskSolid={0} />
        </div>

        {/* Clean, Premium Hero Section */}
        <section className="relative min-h-[88dvh] sm:min-h-[92dvh] flex items-center justify-center pt-28 sm:pt-36 md:pt-32 pb-8 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto space-y-5 sm:space-y-6">

            {/* H1 Display Typography */}
            <ScrollReveal delay={100}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.1] sm:leading-[1.08] text-balance drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                <span className="text-primary font-semibold">Decentralized Truth</span> <br className="hidden sm:inline" />
                for the <span className="text-white">Decentralized Web</span>
              </h1>
            </ScrollReveal>

            {/* Subtext */}
            <ScrollReveal delay={200}>
              <p className="text-base sm:text-lg md:text-xl text-zinc-200 leading-relaxed max-w-[65ch] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] px-2 sm:px-0">
                Deploy, compose, and query high-integrity price feeds with cryptographic proofs and sub-second updates across EVM networks.
              </p>
            </ScrollReveal>

            {/* CTAs with Button-in-Button Trailing Icon */}
            <ScrollReveal delay={300} className="w-full sm:w-auto">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 pt-2 sm:pt-4 w-full">
                <Button 
                  asChild 
                  size="lg" 
                  className="w-full sm:w-auto h-13 sm:h-14 rounded-full pl-6 pr-2 bg-white/10 border border-white/15 backdrop-blur-md text-white hover:bg-white/15 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] group flex items-center justify-between shadow-xl"
                >
                  <Link href="/create">
                    <span className="font-medium tracking-wide text-xs sm:text-sm">Deploy Custom Oracle</span>
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                      <ArrowRight className="h-4 w-4 stroke-[1.5] text-white" />
                    </span>
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto h-13 sm:h-14 rounded-full pl-6 pr-2 bg-white/5 border border-white/15 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/25 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] group flex items-center justify-between shadow-xl"
                >
                  <Link href="/explorer">
                    <span className="font-medium tracking-wide text-xs sm:text-sm">Explore Active Feeds</span>
                    <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                      <ArrowRight className="h-4 w-4 stroke-[1.5] text-white" />
                    </span>
                  </Link>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Protocol Architecture & Verified Specs Ribbon (Disappearing Horizon Effect) */}
        <section 
          className="relative z-10 w-full py-8 sm:py-12 border-b border-white/5 bg-black/40 backdrop-blur-2xl mt-[8dvh] sm:mt-[12dvh] md:mt-[15dvh] mb-[8dvh] sm:mb-[12dvh] md:mb-[16dvh] shadow-[0_-25px_50px_rgba(0,0,0,0.85),0_25px_50px_rgba(0,0,0,0.95)]"
          style={{
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)'
          }}
        >
          {/* Top Ingress Shadow - softens particles as they plunge behind the strip */}
          <div className="absolute -top-16 inset-x-0 h-16 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

          {/* Internal Submersion Depth Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/90 pointer-events-none" />

          {/* Bottom Complete Fade Barrier */}
          <div className="absolute -bottom-16 inset-x-0 h-16 bg-gradient-to-b from-black/90 to-transparent pointer-events-none" />

          <ScrollReveal delay={100}>
            <div className="max-w-7xl mx-auto px-4 relative z-10">
              <p className="text-center font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground uppercase mb-5 sm:mb-6">
                PROTOCOL SPECIFICATIONS & ARCHITECTURE
              </p>
              <div className="grid grid-cols-2 md:flex md:flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-14 opacity-75 hover:opacity-100 transition-opacity duration-500 text-[11px] sm:text-xs font-mono text-white text-center">
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-mono font-bold tracking-tight text-xs sm:text-sm uppercase">100% ON-CHAIN MATH</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-mono font-bold tracking-tight text-xs sm:text-sm uppercase">18 DECIMALS (WAD)</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-mono font-bold tracking-tight text-xs sm:text-sm uppercase">OPENZEPPELIN CONTRACTS</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <span className="font-mono font-bold tracking-tight text-xs sm:text-sm uppercase">EVM RUNTIME READY</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      </div>

      {/* Core Protocol Capabilities (Spacious, Clean Ente-Style Architecture) */}
      <section className="py-20 sm:py-28 md:py-36 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal delay={100}>
          <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20 space-y-3 sm:space-y-4">
            <div className="inline-flex items-center space-x-2">
              <span className="px-3 sm:px-3.5 py-1 text-[10px] sm:text-[11px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
                ARCHITECTURE & CAPABILITIES
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              Built for Cryptographic Truth
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-2 sm:px-0">
              A modular framework of composable price feeds designed to withstand network congestion, exploits, and volatile market anomalies.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-8 sm:space-y-10">

          {/* Feature 1: Adaptive Composability (Spacious 2-Column Showcase) */}
          <ScrollReveal delay={150}>
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 md:p-3 shadow-2xl backdrop-blur-md">
              <div className="bg-black/80 rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.75rem)] p-5 sm:p-8 lg:p-12 border border-zinc-900 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                
                {/* Left Column: Descriptive Editorial Text */}
                <div className="lg:col-span-6 space-y-5 sm:space-y-6">
                  <span className="text-[10px] sm:text-[11px] tracking-widest font-mono text-primary uppercase font-semibold">
                    01 // COMPOSITION
                  </span>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-medium tracking-tight text-white leading-tight">
                    Combine Any Two Price Feeds
                  </h3>
                  <p className="text-zinc-300 leading-relaxed text-sm sm:text-base">
                    Multiply or divide any two active price feeds directly on-chain to create custom pairs, cross-asset rates, or synthetic pricing with zero delay.
                  </p>

                  <div className="space-y-2.5 sm:space-y-3 pt-2 font-mono text-xs text-muted-foreground">
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>Standard 18 decimals fixed-point precision (<span className="text-white">WAD = 1e18</span>)</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>Instant, gas-free price reading via view functions</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span>Permissionless creation with no central approvals needed</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Interactive Live Calculator */}
                <div className="lg:col-span-6">
                  <div className="bg-zinc-950 rounded-2xl p-4 sm:p-6 md:p-8 border border-zinc-800/80 space-y-5 sm:space-y-6 shadow-xl">
                    
                    <div className="border-b border-white/5 pb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        Live Price Pair Calculator
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 items-center">
                      
                      {/* Node A (Feed A Selector) */}
                      <div className="flex flex-col space-y-2 p-3 sm:p-3.5 rounded-xl bg-zinc-900 border border-white/5">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Feed Source A</span>
                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => setFeedA("ETH")}
                            className={`flex-1 h-9 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedA === "ETH" ? "bg-white text-black font-semibold shadow" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`}
                          >
                            ETH
                          </button>
                          <button 
                            onClick={() => setFeedA("SOL")}
                            className={`flex-1 h-9 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedA === "SOL" ? "bg-white text-black font-semibold shadow" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`}
                          >
                            SOL
                          </button>
                        </div>
                      </div>

                      {/* Operator selector Node */}
                      <div className="flex flex-col items-center justify-center p-1 sm:p-2">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider mb-1.5">Operator</span>
                        <div className="inline-flex rounded-lg bg-zinc-900 p-1 border border-white/5">
                          <button 
                            onClick={() => setOperation("/")}
                            className={`w-9 h-8 flex items-center justify-center rounded text-sm font-mono font-bold transition-all cursor-pointer ${operation === "/" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}
                          >
                            /
                          </button>
                          <button 
                            onClick={() => setOperation("*")}
                            className={`w-9 h-8 flex items-center justify-center rounded text-sm font-mono font-bold transition-all cursor-pointer ${operation === "*" ? "bg-primary text-white" : "text-muted-foreground hover:text-white"}`}
                          >
                            ×
                          </button>
                        </div>
                      </div>

                      {/* Node B (Feed B Selector) */}
                      <div className="flex flex-col space-y-2 p-3 sm:p-3.5 rounded-xl bg-zinc-900 border border-white/5">
                        <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Feed Source B</span>
                        <div className="flex gap-1.5">
                          <button 
                            onClick={() => setFeedB("BTC")}
                            className={`flex-1 h-9 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedB === "BTC" ? "bg-white text-black font-semibold shadow" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`}
                          >
                            BTC
                          </button>
                          <button 
                            onClick={() => setFeedB("EUR")}
                            className={`flex-1 h-9 text-xs rounded-lg font-mono font-medium transition-all cursor-pointer ${feedB === "EUR" ? "bg-white text-black font-semibold shadow" : "bg-white/5 text-zinc-300 hover:bg-white/10"}`}
                          >
                            EUR
                          </button>
                        </div>
                      </div>

                    </div>

                    {/* Computed Price Output Card */}
                    <div className="p-3.5 sm:p-4 bg-black/60 rounded-xl border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-xs text-muted-foreground uppercase">Formula:</span>
                        <span className="font-mono text-sm font-semibold text-white">
                          {feedA} {operation === "/" ? "÷" : "×"} {feedB}
                        </span>
                      </div>
                      <div className={`font-mono text-base sm:text-lg text-primary font-bold bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 transition-all duration-300 ${glow ? "scale-105 shadow-[0_0_20px_rgba(59,130,246,0.25)]" : ""}`}>
                        {calculatedValue} <span className="text-xs text-muted-foreground font-normal">{operation === "/" ? feedB : "USD"}</span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </ScrollReveal>

          {/* Two-Column Spacious Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* Feature 2: Flash-Loan Resistance & Uncertainty Bounds */}
            <ScrollReveal delay={100}>
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl backdrop-blur-md h-full">
                <div className="h-full bg-black/80 rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 lg:p-10 border border-zinc-900 flex flex-col justify-between space-y-6 sm:space-y-8">
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                      <Sliders className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] tracking-widest font-mono text-primary uppercase font-semibold">
                      02 // RESILIENCE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                      Flash-Loan Immunity & Bounds
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                      Exposes real-time value uncertainty ranges alongside current prices. Dynamic min/max bounds filter out anomalous single-transaction spikes and sandwich attack vectors.
                    </p>
                  </div>

                  <div className="bg-zinc-950 rounded-xl p-4 sm:p-5 border border-zinc-800/80 font-mono text-xs space-y-2.5">
                    <div className="flex justify-between text-muted-foreground pb-2 border-b border-white/5 text-[11px] sm:text-xs">
                      <span>SECURITY CRITERIA</span>
                      <span className="text-white font-medium">SPECIFICATION</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-xs gap-2">
                      <span className="text-zinc-400">Deviation Bounds</span>
                      <span className="text-white font-semibold text-right">Min / Max History Envelope</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-xs gap-2">
                      <span className="text-zinc-400">Execution Mode</span>
                      <span className="text-primary font-semibold text-right">Pure View (Zero Mutation)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-xs gap-2">
                      <span className="text-zinc-400">Precision Standard</span>
                      <span className="text-white font-semibold text-right">18 Decimals (WAD)</span>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

            {/* Feature 3: Decentralized Stake Governance */}
            <ScrollReveal delay={200}>
              <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl backdrop-blur-md h-full">
                <div className="h-full bg-black/80 rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 lg:p-10 border border-zinc-900 flex flex-col justify-between space-y-6 sm:space-y-8">
                  
                  <div className="space-y-3 sm:space-y-4">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-primary">
                      <Shield className="h-5 w-5 sm:h-6 sm:w-6 stroke-[1.5]" />
                    </div>
                    <span className="text-[10px] sm:text-[11px] tracking-widest font-mono text-primary uppercase font-semibold">
                      03 // GOVERNANCE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                      Decentralized Stake Governance
                    </h3>
                    <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                      Staked token holders govern oracle integrity by voting to whitelist trustworthy reporters or blacklist malicious submitters via configurable quorum thresholds and locking periods.
                    </p>
                  </div>

                  <div className="bg-zinc-950 rounded-xl p-4 sm:p-5 border border-zinc-800/80 font-mono text-xs space-y-2.5">
                    <div className="flex justify-between text-muted-foreground pb-2 border-b border-white/5 text-[11px] sm:text-xs">
                      <span>GOVERNANCE ACTION</span>
                      <span className="text-white font-medium">MECHANISM</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-xs gap-2">
                      <span className="text-zinc-400">Reporter Whitelist</span>
                      <span className="text-white font-semibold text-right">Staked Weight Voting</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-xs gap-2">
                      <span className="text-zinc-400">Reporter Blacklist</span>
                      <span className="text-primary font-semibold text-right">Quorum Threshold (Q)</span>
                    </div>
                    <div className="flex justify-between items-center text-[11px] sm:text-xs gap-2">
                      <span className="text-zinc-400">Lockup Periods</span>
                      <span className="text-white font-semibold text-right">Deposit & Withdrawal Locks</span>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>

          </div>

          {/* Feature 4: Sub-Second Latency (Spacious Horizontal Pillar) */}
          <ScrollReveal delay={150}>
            <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 sm:p-2 shadow-2xl backdrop-blur-md">
              <div className="bg-black/80 rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.5rem)] p-6 sm:p-8 lg:p-10 border border-zinc-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="h-5 w-5 text-primary stroke-[1.5]" />
                    <span className="text-[10px] sm:text-[11px] tracking-widest font-mono text-primary uppercase font-semibold">
                      04 // EXECUTION SPEED
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-white">
                    Sub-Second State Finality
                  </h3>
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                    Deterministic on-chain calculations ensure submitted prices and interval ranges are updated in the same block without multi-block delays or off-chain dependency bottlenecks.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:flex gap-3 sm:gap-4 shrink-0 font-mono text-xs w-full md:w-auto">
                  <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col min-w-0 sm:min-w-[130px] text-center sm:text-left">
                    <span className="text-[10px] text-muted-foreground uppercase">Latency</span>
                    <span className="text-sm font-bold text-white">Single Block</span>
                  </div>
                  <div className="p-3.5 bg-zinc-950 rounded-xl border border-zinc-800 flex flex-col min-w-0 sm:min-w-[130px] text-center sm:text-left">
                    <span className="text-[10px] text-muted-foreground uppercase">Gas Profiling</span>
                    <span className="text-sm font-bold text-primary">Constant O(1)</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>

      </section>

      {/* Value Ranges Section (Exact requested content) */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Explanatory Copy */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center space-x-2">
                <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
                  PROTOCOL FEATURE // VALUE RANGES
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mt-3 sm:mt-4">
                Value Ranges
              </h2>

              <div className="space-y-3.5 sm:space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed mt-4 sm:mt-6">
                <p>
                  Orb Oracle exposes a current value together with a minimum and maximum value. This range helps represent uncertainty around the reported value.
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Many real world values are not best represented as one exact number. Exchange rates can have a spread, and measured values can have uncertainty. Because of this, the oracle provides the value range directly instead of requiring each consumer to calculate it separately.
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  Current Orb oracles estimate this range from recent sampled history. The sample size is configured inside the oracle, while the shared interface keeps the range read functions parameter free.
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed italic">
                  Orb oracles may expose history for transparency and composed oracle logic, but history access is not required by the shared oracle interface.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Range Visualizer */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <ScrollReveal delay={200} className="w-full flex justify-center">
              <div className="w-full max-w-[480px] bg-zinc-950/80 border border-zinc-800/80 rounded-[2rem] sm:rounded-[2.5rem] p-1.5 shadow-2xl backdrop-blur-md">
                <div className="bg-black/80 rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(2.5rem-0.5rem)] p-5 sm:p-7 border border-zinc-900 font-mono text-xs space-y-5 sm:space-y-6">
                  
                  <div className="flex items-center justify-between border-b border-white/5 pb-3">
                    <span className="text-white font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
                      Value Range Reader
                    </span>
                    <span className="text-[10px] text-primary bg-primary/10 px-2 py-0.5 rounded border border-primary/20">
                      ETH / USD
                    </span>
                  </div>

                  {/* Sample Size Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-muted-foreground">Sample Size:</span>
                      <span className="text-primary font-bold">{sampleSize} samples</span>
                    </div>
                    <input
                      type="range"
                      min={5}
                      max={50}
                      step={1}
                      value={sampleSize}
                      onChange={(e) => setSampleSize(Number(e.target.value))}
                      className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Range Bar Indicator */}
                  <div className="p-3.5 sm:p-4 bg-black/40 rounded-xl border border-white/5 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <div className="text-left">
                        <span className="text-[9px] text-muted-foreground uppercase block">Min Value</span>
                        <span className="font-bold text-white">${minRange}</span>
                      </div>
                      <div className="text-center">
                        <span className="text-[9px] text-muted-foreground uppercase block">Current Value</span>
                        <span className="font-bold text-primary text-sm">${basePrice.toFixed(2)}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[9px] text-muted-foreground uppercase block">Max Value</span>
                        <span className="font-bold text-white">${maxRange}</span>
                      </div>
                    </div>

                    <div className="relative w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                      <div className="absolute inset-y-0 bg-gradient-to-r from-primary/40 via-primary/80 to-primary w-full" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md border-2 border-black" />
                    </div>

                    <div className="flex justify-between text-[10px] text-muted-foreground pt-1">
                      <span>Uncertainty Spread:</span>
                      <span className="text-primary font-semibold">±{spreadPercent}%</span>
                    </div>
                  </div>

                </div>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Real Protocol Architectural Guarantees (Stats Ticker) */}
      <section className="py-16 sm:py-24 md:py-32 border-t border-white/5 bg-zinc-950/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 md:gap-12">
            
            <ScrollReveal delay={100}>
              <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 group">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Precision</span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                  18 (WAD)
                </div>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Fixed-Point Normalization</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={180}>
              <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 group">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Decay Curve</span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-primary transition-transform duration-300 group-hover:scale-105">
                  Continuous
                </div>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Exponential Half-Life</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={260}>
              <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 group">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Execution</span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                  100%
                </div>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Pure EVM Bytecode</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={340}>
              <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2 group">
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] text-muted-foreground uppercase">Deployment</span>
                <div className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-white transition-transform duration-300 group-hover:scale-105">
                  Open
                </div>
                <span className="text-[11px] sm:text-xs text-muted-foreground">Permissionless Factories</span>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* Time-Decayed Consensus Section */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
          
          {/* Left Column: Explanatory Copy */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <ScrollReveal delay={100}>
              <div className="inline-flex items-center space-x-2">
                <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
                  PROTOCOL FEATURE // TIME DECAY
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white mt-3 sm:mt-4">
                Time-Decayed Consensus
              </h2>

              <div className="space-y-3.5 sm:space-y-4 text-zinc-300 text-sm sm:text-base leading-relaxed mt-4 sm:mt-6">
                <p>
                  In decentralized finance, fresh price observations are critical. When a reporter submits a new price to Orb Oracle, their voting influence starts at full strength (100%).
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  As time passes without a new update, that report's influence smoothly and continuously fades according to the oracle's configured half-life (for example, losing 50% of its voting power every hour).
                </p>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  This built-in time decay ensures that fresh, recent submissions naturally carry far more weight than older ones. It prevents stale data from distorting market valuations and eliminates the need for expensive off-chain maintenance bots.
                </p>
                <p className="text-muted-foreground text-xs leading-relaxed italic">
                  All decay computations execute purely in on-chain EVM bytecode using fixed-point arithmetic, providing deterministic guarantees and constant gas usage.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Interactive Weight Decay Visualizer */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <ScrollReveal delay={200} className="w-full flex justify-center">
              <ProtocolMathSimulator />
            </ScrollReveal>
          </div>

        </div>
      </section>

      {/* Frequently Asked Questions Section (Ente Minimalist Accordion) */}
      <section className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto border-t border-white/5">
        <ScrollReveal delay={100}>
          <div className="text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
            <div className="inline-flex items-center space-x-2">
              <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
                KNOWLEDGE BASE // FAQ
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-xs sm:text-sm max-w-lg mx-auto leading-relaxed px-2 sm:px-0">
              Everything you need to know about the Orb Oracle protocol architecture and on-chain mechanics.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="space-y-3 sm:space-y-4">
            {[
              {
                q: "How does Orb Oracle differ from Chainlink or Pyth?",
                a: "Traditional oracles rely on off-chain validator networks, third-party push keepers, or centralized aggregators that incur continuous gas overhead. Orb Oracle executes 100% on-chain with deterministic time-decayed consensus, permissionless factory deployments, and parameter-free pure view execution."
              },
              {
                q: "How does continuous time-decay protect against manipulation?",
                a: "When a reporter submits a price observation, their voting power starts at 100%. As time passes without a fresh update, their weight continuously fades according to the oracle's half-life setting. Fresh reports automatically dominate old ones, making flash-loan or stale-price attacks economically unviable."
              },
              {
                q: "Can any ERC-20 token be used for reporter staking and governance?",
                a: "Yes. When deploying an oracle via the factory, the creator designates a weightToken. Staked token holders govern oracle integrity by voting to whitelist trustworthy reporters or blacklist malicious submitters once the quorum threshold (Q) is reached."
              },
              {
                q: "What are Value Ranges and why are they important for DeFi protocols?",
                a: "Rather than exposing only a single static price point, Orb Oracle exposes a current value together with minimum and maximum bounds based on recent sampled history. This allows lending protocols and DEXs to measure market uncertainty and avoid false liquidations during flash volatility."
              },
              {
                q: "How does mathematical feed composition work without extra gas?",
                a: "Composed Oracles link two existing price feeds (Feed A and Feed B) through on-chain arithmetic (multiplication or division, with optional inversion). Because composition reads directly from the parent feeds without storing duplicate state, gas costs remain constant (O(1))."
              }
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-zinc-950/80 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20 open:bg-zinc-950 open:border-white/20"
                {...(idx === 0 ? { open: true } : {})}
              >
                <summary className="w-full p-4 sm:p-6 text-left flex items-center justify-between gap-3 sm:gap-4 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-medium text-sm sm:text-base md:text-lg text-slate-100 tracking-tight group-hover:text-white transition-colors">
                    {faq.q}
                  </span>
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 shrink-0 transition-all duration-300 group-open:rotate-180 group-open:text-white group-open:bg-white/10">
                    <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </div>
                </summary>

                <div className="px-4 sm:px-6 pb-5 sm:pb-6 text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed border-t border-white/5 pt-3.5 sm:pt-4 animate-fadeIn">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </ScrollReveal>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-8 max-w-5xl mx-auto relative overflow-hidden">
        <ScrollReveal delay={100}>
          <div className="bg-zinc-950/80 border border-zinc-800/80 rounded-[2rem] sm:rounded-[3rem] p-1.5 sm:p-2 shadow-2xl backdrop-blur-md relative z-10 text-center">
            <div className="bg-black/80 backdrop-blur-md rounded-[calc(2rem-0.375rem)] sm:rounded-[calc(3rem-0.5rem)] py-12 sm:py-16 px-4 sm:px-12 border border-zinc-900 flex flex-col items-center space-y-5 sm:space-y-6">
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium tracking-tight text-white">
                Ready to build the future?
              </h2>
              
              <p className="text-muted-foreground text-xs sm:text-sm md:text-base leading-relaxed max-w-[50ch] text-center px-2 sm:px-0">
                Connect your wallet, configure your weights, and deploy custom price feeds in seconds.
              </p>

              <Button 
                asChild 
                size="lg" 
                className="w-full sm:w-auto h-13 sm:h-14 rounded-full pl-6 pr-2 bg-white text-black hover:bg-zinc-200 transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] active:scale-[0.98] group flex items-center justify-between space-x-4 shadow-xl"
              >
                <Link href="/create">
                  <span className="font-medium tracking-wide text-xs sm:text-sm">Deploy Your First Oracle</span>
                  <span className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/5 flex items-center justify-center group-hover:translate-x-1 group-hover:-translate-y-[1px] transition-transform duration-300">
                    <ArrowRight className="h-4 w-4 stroke-[1.5]" />
                  </span>
                </Link>
              </Button>

            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  )
}
