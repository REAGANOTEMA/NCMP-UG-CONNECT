import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MapPin, Users, Search, ChevronRight, Globe, Building2, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { allMPs, REGIONS } from "@/data/ugandaData";

export default function Constituencies() {
  const [search, setSearch] = useState("");
  const [activeRegion, setActiveRegion] = useState<string>("All");

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
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
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

        {/* Region Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <Button 
            variant={activeRegion === "All" ? "default" : "outline"}
            onClick={() => setActiveRegion("All")}
            className={activeRegion === "All" ? "bg-gold text-black" : "border-gold/20 text-gold"}
          >
            All Regions
          </Button>
          {REGIONS.map(region => (
            <Button 
              key={region}
              variant={activeRegion === region ? "default" : "outline"}
              onClick={() => setActiveRegion(region)}
              className={activeRegion === region ? "bg-gold text-black" : "border-gold/20 text-gold"}
            >
              {region}
            </Button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input 
            placeholder="Search by district name (e.g. Kampala, Gulu, Mbarara)..." 
            className="pl-12 h-14 bg-card border-border text-lg focus:border-gold"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Districts Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistricts.map((district, i) => {
            const districtMps = allMPs.filter(mp => mp.district === district);
            const region = districtMps[0]?.region;
            
            return (
              <motion.div
                key={district}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="ncmp-card p-6 group hover:border-gold/50 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold text-gold uppercase tracking-widest px-2 py-1 bg-gold/5 rounded border border-gold/10">
                    {region}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-1">{district} District</h3>
                <p className="text-xs text-muted-foreground mb-6">
                  {districtMps.length} Parliamentary Representatives
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" /> Active Citizens
                    </span>
                    <span className="font-bold text-foreground">12.4k</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" /> Projects
                    </span>
                    <span className="font-bold text-foreground">8 Active</span>
                  </div>
                </div>

                <Link to={`/parliament/mps?district=${district}`}>
                  <Button className="w-full bg-muted hover:bg-gold/10 text-muted-foreground hover:text-gold border-none group-hover:bg-gold/20 transition-all">
                    Explore District <ChevronRight className="w-4 h-4 ml-2" />
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
      <Footer />
    </div>
  );
}