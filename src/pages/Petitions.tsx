import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Users, ShieldCheck, Plus, Search, Filter, ArrowRight, CheckCircle2, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { mockPetitions as initialPetitions } from "@/data/ugandaData";
import { toast } from "sonner";

export default function Petitions() {
  const [search, setSearch] = useState("");
  const [petitions, setPetitions] = useState(initialPetitions);
  const [signedIds, setSignedIds] = useState<string[]>([]);

  const handleSign = (id: string) => {
    if (signedIds.includes(id)) {
      toast.error("Already Signed", {
        description: "You have already appended your digital signature to this petition.",
      });
      return;
    }

    setPetitions(prev => prev.map(p => 
      p.id === id ? { ...p, signatures: p.signatures + 1 } : p
    ));
    setSignedIds(prev => [...prev, id]);
    
    toast.success("Petition Signed", {
      description: "Your signature has been verified and added to the National Registry.",
    });
  };

  const filtered = petitions.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
              📜 National E-Petitions System
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Civic Petitions
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Start or sign formal petitions to the Parliament of Uganda. Petitions that reach 
              their signature threshold are officially tabled for debate in the House.
            </p>
          </motion.div>
          <Button className="bg-gold text-black font-bold h-12 px-8 shadow-lg shadow-gold/10">
            <Plus className="w-5 h-5 mr-2" /> Start a Petition
          </Button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Active Petitions", value: "124", icon: FileText },
            { label: "Total Signatures", value: "1.2M", icon: Users },
            { label: "Tabled in House", value: "18", icon: ShieldCheck },
            { label: "Success Rate", value: "14%", icon: CheckCircle2 },
          ].map((stat, i) => (
            <div key={stat.label} className="ncmp-card p-4 text-center">
              <stat.icon className="w-5 h-5 text-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search petitions by title or category..." 
              className="pl-10 bg-card border-border"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" className="border-gold/20 text-gold gap-2">
            <Filter className="w-4 h-4" /> All Categories
          </Button>
        </div>

        {/* Petitions List */}
        <div className="grid gap-6">
          {filtered.map((petition, i) => {
            const progress = (petition.signatures / petition.target) * 100;
            const isSigned = signedIds.includes(petition.id);
            
            return (
              <motion.div
                key={petition.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="ncmp-card p-6 hover:border-gold/40 transition-all group"
              >
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Badge className={
                        petition.status === 'Active' ? 'bg-gold/20 text-gold' :
                        petition.status === 'Under Review' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-green-500/20 text-green-500'
                      }>
                        {petition.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Created {petition.dateCreated}
                      </span>
                      <span className="text-xs text-gold font-bold uppercase tracking-tighter">
                        {petition.category}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                      {petition.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6 line-clamp-2">
                      {petition.description}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-2">
                        {[1, 2, 3].map(n => (
                          <div key={n} className="w-6 h-6 rounded-full border-2 border-card bg-muted flex items-center justify-center text-[8px] font-bold">
                            U
                          </div>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Started by <span className="text-foreground font-bold">{petition.author}</span>
                        {petition.constituency && ` · ${petition.constituency}`}
                      </span>
                    </div>
                  </div>

                  <div className="w-full lg:w-72 space-y-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <div className="text-2xl font-bold text-foreground">{petition.signatures.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Signatures</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gold">{petition.target.toLocaleString()}</div>
                        <div className="text-[10px] text-muted-foreground uppercase">Goal</div>
                      </div>
                    </div>
                    
                    <Progress value={progress} className="h-2 bg-muted" />
                    
                    <Button 
                      onClick={() => handleSign(petition.id)}
                      disabled={isSigned}
                      className={`w-full font-bold transition-all ${
                        isSigned 
                          ? "bg-green-500/20 text-green-500 border border-green-500/30" 
                          : "bg-gold text-black hover:bg-gold/90 group-hover:shadow-lg group-hover:shadow-gold/10"
                      }`}
                    >
                      {isSigned ? (
                        <><CheckCircle2 className="w-4 h-4 mr-2" /> Signed</>
                      ) : (
                        <>Sign Petition <ArrowRight className="w-4 h-4 ml-2" /></>
                      )}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}