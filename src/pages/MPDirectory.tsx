import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Search, Filter, MapPin, CheckCircle2, Users, ChevronDown, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MPProfileCard from "@/components/MPProfileCard";
import { allMPs, REGIONS, PARTIES, partyStats } from "@/data/ugandaData";
import type { Region, Party } from "@/data/ugandaData";

export default function MPDirectory() {
  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region | "All">("All");
  const [selectedParty, setSelectedParty] = useState<Party | "All">("All");
  const [selectedType, setSelectedType] = useState<string>("All");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = allMPs.filter(mp => {
    const matchSearch = search === "" ||
      mp.name.toLowerCase().includes(search.toLowerCase()) ||
      mp.constituency.toLowerCase().includes(search.toLowerCase()) ||
      mp.district.toLowerCase().includes(search.toLowerCase());
    const matchRegion = selectedRegion === "All" || mp.region === selectedRegion;
    const matchParty = selectedParty === "All" || mp.party === selectedParty;
    const matchType = selectedType === "All" || mp.type === selectedType;
    return matchSearch && matchRegion && matchParty && matchType;
  });

  const types = ["All", "Directly Elected", "Woman Representative", "UPDF", "Youth", "Workers", "PWD"];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-8 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            🏛️ 10th Parliament of Uganda · 2021–2026
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">
            MP Directory
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] max-w-2xl">
            Complete registry of Uganda's Members of Parliament. All profiles are verified against official parliamentary records.
          </p>
        </motion.div>

        {/* Summary stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="ncmp-card p-4 text-center">
            <div className="text-2xl font-bold font-display text-gold">{allMPs.length}</div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">Total MPs</div>
          </div>
          <div className="ncmp-card p-4 text-center">
            <div className="text-2xl font-bold font-display text-[hsl(var(--uganda-red))]">
              {allMPs.filter(m => m.gender === "Female").length}
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">Female MPs</div>
          </div>
          <div className="ncmp-card p-4 text-center">
            <div className="text-2xl font-bold font-display text-gold">
              {allMPs.filter(m => m.party === "NRM").length}
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">NRM MPs</div>
          </div>
          <div className="ncmp-card p-4 text-center">
            <div className="text-2xl font-bold font-display text-[hsl(var(--uganda-red))]">
              {allMPs.filter(m => m.type === "Directly Elected").length}
            </div>
            <div className="text-xs text-[hsl(var(--muted-foreground))]">Directly Elected</div>
          </div>
        </div>

        {/* Party breakdown bar */}
        <div className="ncmp-card p-4 mb-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-3">Party Distribution</h3>
          <div className="flex gap-3 flex-wrap">
            {partyStats.map(p => (
              <button
                key={p.party}
                onClick={() => setSelectedParty(selectedParty === p.party ? "All" : p.party)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  selectedParty === p.party ? "opacity-100 scale-105" : "opacity-70 hover:opacity-100"
                }`}
                style={{
                  background: `${p.color}18`,
                  color: p.color,
                  borderColor: `${p.color}44`,
                }}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
                {p.party} ({p.count})
              </button>
            ))}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="flex gap-3 mb-4 flex-wrap">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
            <Input
              placeholder="Search by name, constituency, or district..."
              className="pl-10 bg-card border-border focus:border-gold"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className={`border-border gap-2 ${showFilters ? "border-gold text-gold" : ""}`}
          >
            <Filter className="w-4 h-4" />
            Filters
            {(selectedRegion !== "All" || selectedParty !== "All" || selectedType !== "All") && (
              <span className="w-2 h-2 rounded-full bg-[hsl(var(--uganda-red))]" />
            )}
          </Button>
        </div>

        {/* Filter panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="ncmp-card p-5 mb-5 grid sm:grid-cols-3 gap-4"
          >
            {/* Region */}
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2 block">Region</Label>
              <div className="flex flex-wrap gap-1.5">
                {["All", ...REGIONS].map(r => (
                  <button key={r} onClick={() => setSelectedRegion(r as Region | "All")}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedRegion === r ? "bg-gold text-[hsl(var(--uganda-black))]" : "bg-muted text-[hsl(var(--muted-foreground))] hover:text-foreground"
                    }`}>{r}</button>
                ))}
              </div>
            </div>
            {/* Type */}
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] mb-2 block">Type</Label>
              <div className="flex flex-wrap gap-1.5">
                {types.map(t => (
                  <button key={t} onClick={() => setSelectedType(t)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      selectedType === t ? "bg-[hsl(var(--uganda-red))] text-foreground" : "bg-muted text-[hsl(var(--muted-foreground))] hover:text-foreground"
                    }`}>{t}</button>
                ))}
              </div>
            </div>
            {/* Reset */}
            <div className="flex items-end">
              <Button variant="outline" size="sm" className="border-border gap-1"
                onClick={() => { setSelectedRegion("All"); setSelectedParty("All"); setSelectedType("All"); setSearch(""); }}>
                <X className="w-3 h-3" /> Reset All Filters
              </Button>
            </div>
          </motion.div>
        )}

        {/* Results count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[hsl(var(--muted-foreground))] text-sm">
            Showing <span className="text-gold font-semibold">{filtered.length}</span> of {allMPs.length} MPs
            {selectedRegion !== "All" && <span> · {selectedRegion} Region</span>}
          </p>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-foreground font-semibold">No MPs found</h3>
            <p className="text-[hsl(var(--muted-foreground))] text-sm mt-2">Try different search terms or filters</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(mp => (
              <MPProfileCard key={mp.id} mp={mp} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

// Local Label component since we need it
function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}