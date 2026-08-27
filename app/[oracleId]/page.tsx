import { notFound } from 'next/navigation'
import InteractionClient from './InteractionClient'
import { Suspense } from 'react'
import ParticleBackground from "@/components/ParticleBackground"

export async function generateStaticParams() {
  return [{ oracleId: 'o' }]
}

export default function OraclePage() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white relative bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#8b5cf606,transparent),linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]">
      {/* High-End Ambient Particle Backdrop */}
      <ParticleBackground />

      {/* Blueprint Radar Coordinates */}
      <div className="absolute left-10 top-48 font-mono text-[8px] tracking-wider text-white/5 select-none pointer-events-none space-y-1">
        <div>SYS_LATENCY: 12MS</div>
        <div>QUERY_STAT: LISTENING</div>
        <div>SIGNATURES: VERIFIED</div>
      </div>

      <div className="absolute right-10 top-[40vh] font-mono text-[8px] tracking-wider text-white/5 select-none pointer-events-none space-y-1 text-right">
        <div>GRID_COORD: 47.92 // 18.04</div>
        <div>INDEX_RATE: SYNCED</div>
        <div>EVM_STATE: ACTIVE</div>
      </div>

      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground font-mono text-xs uppercase tracking-widest">
            Loading Contract State...
          </div>
        </div>
      }>
        <InteractionClient />
      </Suspense>
    </div>
  )
}
