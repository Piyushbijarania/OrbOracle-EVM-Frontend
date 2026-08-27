"use client"

import { Navigation } from "@/components/navigation"
import CreateOracleIntegrated from "@/components/createOracle"
import ParticleBackground from "@/components/ParticleBackground"

export default function CreatePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white relative bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#8b5cf606,transparent),linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]">
      {/* High-End Ambient Particle Backdrop */}
      <ParticleBackground />

      {/* Blueprint Radar Coordinates */}
      <div className="absolute left-10 top-48 font-mono text-[8px] tracking-wider text-white/5 select-none pointer-events-none space-y-1">
        <div>SYS_LATENCY: 12MS</div>
        <div>COMPILE_STAT: COMPILED</div>
        <div>CONTRACTS: SYNCED</div>
      </div>

      <div className="absolute right-10 top-[40vh] font-mono text-[8px] tracking-wider text-white/5 select-none pointer-events-none space-y-1 text-right">
        <div>DEPLOY_GAS: 18.04 // GWEI</div>
        <div>EVM_STATUS: LISTENING</div>
        <div>SIGNATURES: READY</div>
      </div>

      <Navigation />

      <div className="container mx-auto px-4 pt-36 pb-24 relative z-10">
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
              DEPLOY // ON-CHAIN
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight text-white">
            Create Custom Oracle
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Deploy a new on‑chain Oracle contract by providing details for base feeds or composed mathematical indices.
          </p>
        </div>
        
        <CreateOracleIntegrated />
      </div>
    </div>
  )
}
