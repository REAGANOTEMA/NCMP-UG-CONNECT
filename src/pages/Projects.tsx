import { motion } from "framer-motion";
import { MapPin, Clock, Shield, TrendingUp, Filter, Search, CheckCircle2, DollarSign, Calendar, Building2, FileText, ShieldCheck, Activity } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockProjects = [
  {
    id: 1,
    title: "Kampala-Entebbe Expressway Expansion",
    location: "Central Region",
    status: "In Progress",
    progress: 65,
    budget: "UGX 450B",
    spent: "UGX 292B",
    timeline: "2024 - 2027",
    ministry: "Ministry of Works & Transport",
    priority: "High",
    objectives: ["Reduce traffic congestion", "Improve trade logistics", "Enhance regional connectivity"],
    funding: { source: "Government of Uganda / EXIM Bank", type: "Loan & Domestic Revenue" }
  },
  {
    id: 2,
    title: "Gulu City Water Supply System",
    location: "Northern Region",
    status: "Completed",
    progress: 100,
    budget: "UGX 120B",
    spent: "UGX 118.5B",
    timeline: "2023 - 2025",
    ministry: "Ministry of Water & Environment",
    priority: "Critical",
    objectives: ["Clean water for 500k residents", "Reduce water-borne diseases", "Industrial support"],
    funding: { source: "World Bank / GoU", type: "Grant & Domestic Revenue" }
  },
  {
    id: 3,
    title: "Mbale Industrial Park Power Substation",
    location: "Eastern Region",
    status: "Planning",
    progress: 15,
    budget: "UGX 85B",
    spent: "UGX 5B",
    timeline: "2025 - 2028",
    ministry: "Ministry of Energy",
    priority: "Medium",
    objectives: ["Power stability for factories", "Job creation", "Export promotion"],
    funding: { source: "Domestic Revenue", type: "Direct Funding" }
  }
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            🏗️ National Development Infrastructure
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Project Tracker</h1>
          <p className="text-muted-foreground max-w-2xl">
            Real-time monitoring of government-funded development projects across all constituencies. 
            Transparency in funding, progress, and delivery powered by Nexterp Systems.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search projects by name or region..." className="pl-10 bg-card border-border" />
          </div>
          <Button variant="outline" className="border-gold/30 text-gold gap-2">
            <Filter className="w-4 h-4" /> Filter by Region
          </Button>
        </div>

        <div className="grid gap-6">
          {mockProjects.map((project, i) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="ncmp-card p-6 hover:border-gold/40 transition-all group"
            >
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={project.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-gold/20 text-gold'}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </span>
                    <span className="text-xs text-gold font-bold uppercase tracking-tighter">
                      {project.priority} Priority
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-gold transition-colors mb-2">
                    {project.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Building2 className="w-4 h-4" /> {project.ministry}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    <div className="p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Total Budget</div>
                      <div className="text-sm font-bold text-foreground flex items-center gap-1">
                        <DollarSign className="w-3 h-3 text-gold" /> {project.budget}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Spent to Date</div>
                      <div className="text-sm font-bold text-foreground flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-green-500" /> {project.spent}
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 border border-border">
                      <div className="text-[10px] text-muted-foreground uppercase font-bold mb-1">Timeline</div>
                      <div className="text-sm font-bold text-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-blue-500" /> {project.timeline}
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                        <Activity className="w-3 h-3" /> Key Objectives
                      </h4>
                      <ul className="space-y-1.5">
                        {project.objectives.map((obj, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-gold" /> {obj}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> Funding Source
                      </h4>
                      <div className="p-3 rounded-lg bg-gold/5 border border-gold/10">
                        <p className="text-[10px] font-bold text-foreground mb-1">{project.funding.source}</p>
                        <p className="text-[9px] text-muted-foreground uppercase">{project.funding.type}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-72 space-y-4 flex flex-col justify-center">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-muted-foreground uppercase">Implementation Progress</span>
                      <span className="text-gold">{project.progress}%</span>
                    </div>
                    <div className="h-3 w-full bg-muted rounded-full overflow-hidden border border-border">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gold shadow-[0_0_10px_rgba(255,215,0,0.3)]"
                      />
                    </div>
                  </div>
                  
                  <div className="pt-4 space-y-2">
                    <Button className="w-full bg-gold text-black font-bold gap-2">
                      <FileText className="w-4 h-4" /> View Audit Trail
                    </Button>
                    <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/10">
                      Submit Feedback
                    </Button>
                  </div>
                  
                  <div className="text-[9px] text-center text-muted-foreground uppercase tracking-widest">
                    Last Updated: 2 days ago
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}