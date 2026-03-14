import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Users, Search, ChevronRight, Globe, Building2, TrendingUp, LayoutGrid, Map as MapIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UgandaMap from "@/components/UgandaMap";
import { allMPs, REGIONS } from "@/data/ugandaData";

export default function Constituencies() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("All");
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('map');

  const districts = Array.from(new Set(allMPs.map(mp => mp.district))).sort();
  
  const filteredDistricts = districts.filter(d => {
    const matchesSearch = d.toLowerCase().includes(search.toLowerCase());
    const region = allMPs.find(mp => mp.district === d)?.region;
    const matchesRegion = activeRegion === "All" || region === activeRegion;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
              🌍 National Geographic Registry
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Constituency Explorer
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Navigate through Uganda's regions and districts to find your local representatives, 
              track development projects, and participate in constituency-level governance.
            </p>
          </motion.div>

          <div className="flex bg-muted/50 p-1 rounded-lg border border-border">
            <Button 
              variant={viewMode === 'map' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('map')}
              className={viewMode === 'map' ? 'bg-gold text-black' : 'text-muted-foreground'}
            >
              <MapIcon className="w-4 h-4 mr-2" /> Map View
            </Button>
            <Button 
              variant={viewMode === 'grid' ? 'default' : 'ghost'} 
              size="sm" 
              onClick={() => setViewMode('grid')}
              className={viewMode === 'grid' ? 'bg-gold text-black' : 'text-muted-foreground'}
            >
              <LayoutGrid className="w-4 h-4 mr-2" /> Grid View
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Map or Filters */}
          <div className="lg:col-span-5 space-y-8">
            {viewMode === 'map' ? (
              <UgandaMap activeRegion={activeRegion} onRegionSelect={setActiveRegion} />
            ) : (
              <div className="ncmp-card p-6">
                <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6">Region Filters</h3>
                <div className="space-y-2">
                  <Button 
                    variant={activeRegion === "All" ? "default" : "outline"}
                    onClick={() => setActiveRegion("All")}
                    className={`w-full justify-start ${activeRegion === "All" ? "bg-gold text-black" : "border-gold/20 text-gold"}`}
                  >
                    All Regions
                  </Button>
                  {REGIONS.map(region => (
                    <Button 
                      key={region}
                      variant={activeRegion === region ? "default" : "outline"}
                      onClick={() => setActiveRegion(region)}
                      className={`w-full justify-start ${activeRegion === region ? "bg-gold text-black" : "border-gold/20 text-gold"}`}
                    >
                      {region} Region
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="ncmp-card p-6 bg-gold/5 border-gold/20">
              <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-4">Regional Statistics</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Active Citizens</span>
                  <span className="text-sm font-bold text-foreground">1.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Verified MPs</span>
                  <span className="text-sm font-bold text-foreground">529</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Open Issues</span>
                  <span className="text-sm font-bold text-foreground">4,201</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Search & Results */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search by district name (e.g. Kampala, Gulu)..." 
                className="pl-12 h-14 bg-card border-border text-lg focus:border-gold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar">
              {filteredDistricts.map((district, i) => {
                const districtMps = allMPs.filter(mp => mp.district === district);
                const region = districtMps[0]?.region;
                
                return (
                  <motion.div
                    key={district}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="ncmp-card p-5 group hover:border-gold/50 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-bold text-gold uppercase tracking-widest px-2 py-1 bg-gold/5 rounded border border-gold/10">
                        {region}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-foreground mb-1">{district}</h3>
                    <p className="text-[10px] text-muted-foreground mb-4">
                      {districtMps.length} Representatives
                    </p>

                    <Link to={`/parliament/mps?district=${district}`}>
                      <Button variant="ghost" className="w-full text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10 text-gold">
                        Explore District <ChevronRight className="w-3 h-3 ml-2" />
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {filteredDistricts.length === 0 && (
              <div className="text-center py-20">
                <Globe className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
                <h3 className="text-xl font-bold text-foreground">No districts found</h3>
                <p className="text-muted-foreground">Try adjusting your search or region filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}