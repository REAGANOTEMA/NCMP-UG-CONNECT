import { motion } from "framer-motion";
import { MapPin, Clock, Shield, TrendingUp, Filter, Search, CheckCircle2 } from "lucide-react";
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
    ministry: "Ministry of Works & Transport",
    priority: "High"
  },
  {
    id: 2,
    title: "Gulu City Water Supply System",
    location: "Northern Region",
    status: "Completed",
    progress: 100,
    budget: "UGX 120B",
    ministry: "Ministry of Water & Environment",
    priority: "Critical"
  },
  {
    id: 3,
    title: "Mbale Industrial Park Power Substation",
    location: "Eastern Region",
    status: "Planning",
    progress: 15,
    budget: "UGX 85B",
    ministry: "Ministry of Energy",
    priority: "Medium"
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
            Transparency in funding, progress, and delivery.
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
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={project.status === 'Completed' ? 'bg-green-500/20 text-green-500' : 'bg-gold/20 text-gold'}>
                      {project.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {project.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-gold transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.ministry}</p>
                  
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gold/60" />
                      <span className="text-xs font-bold text-foreground">{project.budget}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gold/60" />
                      <span className="text-xs text-muted-foreground">Updated 2 days ago</span>
                    </div>
                  </div>
                </div>

                <div className="w-full lg:w-64 space-y-2">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-gold">{project.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gold"
                    />
                  </div>
                  <Button variant="ghost" className="w-full text-xs text-gold hover:bg-gold/10 mt-4">
                    View Full Audit Trail <TrendingUp className="w-3 h-3 ml-2" />
                  </Button>
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