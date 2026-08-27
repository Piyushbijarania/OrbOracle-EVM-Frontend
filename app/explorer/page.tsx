"use client"

import { useState, useMemo } from "react"
import { Navigation } from "@/components/navigation"
import { OracleCard } from "@/components/oracle-card"
import { Input } from "@/components/ui/input"
import { useOracles } from "@/hooks/useOracles"
import { Search, Loader2 } from "lucide-react"
import ParticleBackground from "@/components/ParticleBackground"

export default function ExplorerPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState<"all" | "base" | "composed">("all")
  const { oracles, loading, error } = useOracles()

  const filteredOracles = useMemo(() => {
    return oracles.filter((oracle) => {
      const matchesSearch =
        oracle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        oracle.description.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesFilter =
        filterType === "all" ||
        (filterType === "base" && !oracle.isComposed) ||
        (filterType === "composed" && oracle.isComposed)

      return matchesSearch && matchesFilter && oracle.status === "active"
    })
  }, [oracles, searchQuery, filterType])

  return (
    <div className="min-h-screen bg-background font-sans text-foreground overflow-x-hidden selection:bg-primary/30 selection:text-white relative bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,#8b5cf606,transparent),linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]">
      {/* High-End Ambient Particle Backdrop */}
      <ParticleBackground />

      {/* Blueprint Radar Coordinates */}
      <div className="absolute left-10 top-48 font-mono text-[8px] tracking-wider text-white/5 select-none pointer-events-none space-y-1">
        <div>SYS_LATENCY: 12MS</div>
        <div>NODE_STATUS: ACTIVE</div>
        <div>INDEX_FEEDS: VERIFIED</div>
      </div>

      <div className="absolute right-10 top-[40vh] font-mono text-[8px] tracking-wider text-white/5 select-none pointer-events-none space-y-1 text-right">
        <div>GRID_COORD: 47.92 // 18.04</div>
        <div>CONSENSUS: 100%</div>
        <div>COMPOSER: READY</div>
      </div>

      <Navigation />

      <div className="container mx-auto px-6 pt-36 pb-24 relative z-10">
        {/* Header */}
        <div className="mb-12 text-center space-y-4">
          <div className="inline-flex items-center space-x-2">
            <span className="px-3 py-1 text-[10px] tracking-[0.2em] font-mono font-medium uppercase rounded-full bg-white/5 border border-white/10 text-primary">
              EXPLORER // REGISTRY
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-medium tracking-tight leading-tight text-white">
            Active Oracle Registry
          </h1>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto leading-relaxed">
            Query cryptographic price feeds, sync signatures, and monitor active oracles verified on‑chain.
          </p>
        </div>

        {/* Premium Capsule Search Bar */}
        <div className="mb-16 max-w-xl mx-auto">
          <div className="relative group bg-white/5 border border-white/10 rounded-full p-1.5 flex items-center transition-all duration-300 focus-within:border-primary/30 backdrop-blur-md">
            <Search className="h-4 w-4 text-muted-foreground ml-4 mr-1 opacity-55" />
            <Input
              placeholder="Search oracles by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-white font-mono text-xs placeholder:text-muted-foreground/60 h-10 w-full"
            />
          </div>
        </div>

        {/* Feed Type Filter Pills */}
        <div className="flex justify-center gap-3 mb-16 font-mono text-[9px] tracking-[0.15em] uppercase font-semibold">
          {(["all", "base", "composed"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`h-9 px-6 rounded-full border transition-all duration-300 ${
                filterType === type
                  ? "bg-white text-black border-white shadow-md"
                  : "bg-white/5 text-muted-foreground border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {type} feeds
            </button>
          ))}
        </div>

        {/* Oracle Grid */}
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
            <Loader2 className="h-10 w-10 animate-spin text-primary stroke-[1.5]" />
            <p className="text-sm font-mono tracking-wider text-muted-foreground uppercase">
              Querying consensus network...
            </p>
          </div>
        ) : error ? (
          <div className="text-center py-20 max-w-md mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 backdrop-blur-md">
            <div className="bg-zinc-950/40 rounded-[calc(2.5rem-0.5rem)] p-8 border border-white/5 space-y-4">
              <Search className="h-10 w-10 mx-auto text-red-500 opacity-60" />
              <h3 className="text-lg font-medium text-white">Consensus Error</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {error}
              </p>
              <p className="text-[11px] font-mono text-muted-foreground/60 border-t border-white/5 pt-4">
                Ensure you are connected to the correct EVM network and the Oracle Factory is deployed.
              </p>
            </div>
          </div>
        ) : filteredOracles.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {filteredOracles.map((oracle) => (
              <OracleCard key={oracle.id} oracle={oracle} />
            ))}
          </div>
        ) : oracles.length === 0 ? (
          <div className="text-center py-20 max-w-md mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 backdrop-blur-md">
            <div className="bg-zinc-950/40 rounded-[calc(2.5rem-0.5rem)] p-8 border border-white/5 space-y-4">
              <Search className="h-10 w-10 mx-auto opacity-30 text-white" />
              <h3 className="text-lg font-medium text-white">No active feeds</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Be the first to create and deploy an oracle index on this network!
              </p>
              <div className="pt-2">
                <a
                  href="/create"
                  className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-full bg-white text-black font-mono text-[10px] font-bold tracking-wider hover:bg-zinc-200 transition-all duration-300"
                >
                  <span>Deploy Oracle</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 max-w-md mx-auto bg-white/5 border border-white/10 rounded-[2.5rem] p-1.5 backdrop-blur-md">
            <div className="bg-zinc-950/40 rounded-[calc(2.5rem-0.5rem)] p-8 border border-white/5 space-y-4">
              <Search className="h-10 w-10 mx-auto opacity-30 text-white" />
              <h3 className="text-lg font-medium text-white">No matches found</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                No active oracles matched "{searchQuery}"
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setSearchQuery("")}
                  className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 font-mono text-[10px] font-bold tracking-wider hover:bg-white/10 transition-all duration-300 text-white"
                >
                  Clear search query
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
