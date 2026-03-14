import { motion } from "framer-motion";
import { 
  Shield, Users, MapPin, Activity, 
  FileText, Bell, Search, Filter, 
  TrendingUp, CheckCircle2, AlertTriangle,
  BarChart3, Globe, Briefcase, ArrowUpRight,
  ThumbsUp, ThumbsDown, Radio
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { allMPs, REGIONS } from "@/data/ugandaData";
import { useAuth } from "@/context/AuthContext";

export default function OversightDashboard() {
  const { user } = useAuth();
  const isSpeaker = user?.role === 'speaker';

  const stats = [
    { label: "Total MPs Registered", value: "529", icon: Users, color: "text-gold" },
    { label: "Active Constituencies", value: "353", icon: MapPin, color: "text-blue-500" },
    { label: "National Issue Resolution", value: "88%", icon: CheckCircle2, color: "text-green-500" },
    { label: "Pending Legislation", value: "24", icon: FileText, color: "text-[hsl(var(--uganda-red))]" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2">
            <Shield className="w-4 h-4" /> {isSpeaker ? "Speaker's National Oversight" : "Office of the Clerk – Administration"}
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground">
            National Governance Intelligence
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time monitoring of all 529 Members of Parliament and 353 Constituencies.
          </p>
        </motion.div>

        {/* National Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="ncmp-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                <Badge variant="outline" className="text-[10px]">LIVE</Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* Live Public Pulse Monitor */}
            <div className="ncmp-card p-6 border-red-600/20 bg-red-600/5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Radio className="w-4 h-4 text-red-600 animate-pulse" /> Live Public Pulse: Plenary Session
                </h3>
                <Badge className="bg-red-600 text-white">12.4k Citizens Reacting</Badge>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span className="text-green-500 flex items-center gap-2"><ThumbsUp className="w-3 h-3" /> Support</span>
                    <span className="text-foreground">84%</span>
                  </div>
                  <Progress value={84} className="h-2 bg-muted" />
                  
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span className="text-red-500 flex items-center gap-2"><ThumbsDown className="w-3 h-3" /> Oppose</span>
                    <span className="text-foreground">16%</span>
                  </div>
                  <Progress value={16} className="h-2 bg-muted" />
                </div>
                
                <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                  <h4 className="text-[10px] font-bold text-gold uppercase tracking-widest mb-3">Top Public Concern</h4>
                  <p className="text-sm text-foreground font-medium mb-2">"Budget allocation for rural health centers is insufficient."</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    <TrendingUp className="w-3 h-3 text-gold" /> Trending in 14 Districts
                  </div>
                </div>
              </div>
            </div>

            <div className="ncmp-card p-6">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                <Globe className="w-4 h-4 text-gold" /> Regional Engagement Heatmap
              </h3>
              <div className="space-y-4">
                {REGIONS.map((region, i) => (
                  <div key={region}>
                    <div className="flex justify-between text-xs font-bold mb-1.5">
                      <span className="text-foreground">{region} Region</span>
                      <span className="text-gold">{95 - (i * 4)}% Active</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${95 - (i * 4)}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-gold" 
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Administrative Alerts */}
          <div className="lg:col-span-4 space-y-6">
            <div className="ncmp-card p-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6">Critical Alerts</h3>
              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                  <div className="flex items-center gap-2 text-red-500 mb-1">
                    <AlertTriangle className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Urgent</span>
                  </div>
                  <p className="text-xs text-foreground">3 Constituencies reporting critical water shortages.</p>
                </div>
                <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                  <div className="flex items-center gap-2 text-gold mb-1">
                    <Bell className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase">Parliament</span>
                  </div>
                  <p className="text-xs text-foreground">Order Paper for tomorrow's session finalized.</p>
                </div>
              </div>
            </div>

            <div className="ncmp-card p-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6">Quick Oversight</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-20 flex flex-col gap-2 border-border hover:border-gold/30 group">
                  <Briefcase className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] uppercase font-bold">All Projects</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col gap-2 border-border hover:border-gold/30 group">
                  <BarChart3 className="w-5 h-5 text-gold group-hover:scale-110 transition-transform" />
                  <span className="text-[9px] uppercase font-bold">National Stats</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}