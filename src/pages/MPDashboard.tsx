import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, MessageSquare, AlertCircle, 
  TrendingUp, CheckCircle2, Clock, MapPin, 
  FileText, Calendar, Bell, Search, Filter,
  ArrowUpRight, MoreHorizontal, Briefcase, Plus,
  ExternalLink, Eye, Radio
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";

export default function MPDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");

  const stats = [
    { label: "Constituent Reach", value: "42.5k", change: "+12%", icon: Users, color: "text-gold" },
    { label: "Issues Resolved", value: "892", change: "94%", icon: CheckCircle2, color: "text-green-500" },
    { label: "Active Projects", value: "14", change: "3 Pending", icon: Briefcase, color: "text-blue-500" },
    { label: "Avg. Response Time", value: "4.2h", change: "-15%", icon: Clock, color: "text-[hsl(var(--uganda-red))]" },
  ];

  const recentIssues = [
    { id: "ISS-001", title: "Water Shortage in Ward 4", category: "Utilities", priority: "High", status: "In Progress", time: "2h ago", reporter: "John D." },
    { id: "ISS-002", title: "Road Blockage - Jinja Rd", category: "Infrastructure", priority: "Critical", status: "Pending", time: "5h ago", reporter: "Sarah A." },
    { id: "ISS-003", title: "Health Center Staffing", category: "Health", priority: "Medium", status: "Resolved", time: "1d ago", reporter: "Musa K." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2">
              <LayoutDashboard className="w-4 h-4" /> MP Command Center
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground">
              Welcome, Hon. {user?.firstName} {user?.lastName}
            </h1>
            <p className="text-muted-foreground mt-1">
              Managing <span className="text-gold font-semibold">{user?.constituency || "Kampala Central"}</span> · 11th Parliament
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-gold/20 text-gold hover:bg-gold/10">
              <Calendar className="w-4 h-4 mr-2" /> Legislative Calendar
            </Button>
            <Button className="bg-gold text-black font-bold shadow-lg shadow-gold/10">
              <Plus className="w-4 h-4 mr-2" /> New Announcement
            </Button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="ncmp-card p-5 relative overflow-hidden group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-2 rounded-lg bg-muted group-hover:bg-gold/10 transition-colors`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold">
                  {stat.change}
                </Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{stat.label}</div>
              
              {/* Scanning Effect */}
              <motion.div 
                className="absolute inset-0 w-full h-0.5 bg-gold/10 blur-sm"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            {/* Live Constituency Pulse */}
            <div className="ncmp-card p-6 border-gold/20 bg-gold/5 relative overflow-hidden">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <Radio className="w-4 h-4 text-gold animate-pulse" /> Live Constituency Pulse
                </h3>
                <Badge className="bg-gold text-black font-bold">Active Engagement</Badge>
              </div>
              <div className="h-32 flex items-end gap-1">
                {Array.from({ length: 40 }).map((_, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 100}%` }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse", delay: i * 0.05 }}
                    className="flex-1 bg-gold/40 rounded-t-sm"
                  />
                ))}
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4 text-center font-bold">
                Real-time citizen sentiment monitoring for {user?.constituency || "Kampala Central"}
              </p>
            </div>

            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-muted/50 border border-border p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-black font-bold">Overview</TabsTrigger>
                  <TabsTrigger value="issues" className="data-[state=active]:bg-gold data-[state=active]:text-black font-bold">Constituent Issues</TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-gold data-[state=active]:text-black font-bold">Projects</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="space-y-6">
                <div className="ncmp-card p-6">
                  <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                    <Bell className="w-4 h-4 text-gold" /> Critical Alerts & Activity
                  </h3>
                  <div className="space-y-4">
                    {recentIssues.map((issue) => (
                      <div key={issue.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 border border-border hover:border-gold/20 transition-all">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${issue.priority === 'Critical' ? 'bg-red-500 animate-pulse' : 'bg-gold'}`} />
                          <div>
                            <p className="text-sm font-bold text-foreground">{issue.title}</p>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{issue.category} · {issue.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-[10px] border-gold/30 text-gold">{issue.status}</Badge>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUpRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="ncmp-card p-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 rounded-lg bg-muted/30 hover:bg-gold/10 border border-border hover:border-gold/30 transition-all text-center group">
                  <MessageSquare className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-gold" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-foreground">Broadcast</span>
                </button>
                <button className="p-4 rounded-lg bg-muted/30 hover:bg-gold/10 border border-border hover:border-gold/30 transition-all text-center group">
                  <FileText className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-gold" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-foreground">Hansard</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}