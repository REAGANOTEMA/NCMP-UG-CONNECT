import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, Users, MessageSquare, AlertCircle, 
  TrendingUp, CheckCircle2, Clock, MapPin, 
  FileText, Calendar, Bell, Search, Filter,
  ArrowUpRight, MoreHorizontal, Briefcase, Plus,
  ExternalLink, Eye
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

  const constituencyProjects = [
    { id: 1, name: "Ward 4 Primary School Renovation", progress: 75, budget: "UGX 45M", status: "On Track" },
    { id: 2, name: "Community Borehole Drilling", progress: 30, budget: "UGX 12M", status: "Delayed" },
    { id: 3, name: "Market Solar Lighting", progress: 100, budget: "UGX 28M", status: "Completed" },
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
              <div className="absolute bottom-0 left-0 h-1 bg-gold/20 w-full group-hover:bg-gold/40 transition-all" />
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-8">
            <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-muted/50 border border-border p-1">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-black font-bold">Overview</TabsTrigger>
                  <TabsTrigger value="issues" className="data-[state=active]:bg-gold data-[state=active]:text-black font-bold">Constituent Issues</TabsTrigger>
                  <TabsTrigger value="projects" className="data-[state=active]:bg-gold data-[state=active]:text-black font-bold">Projects</TabsTrigger>
                </TabsList>
                
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input 
                    type="text" 
                    placeholder="Search records..." 
                    className="bg-muted/30 border border-border rounded-md pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-gold w-64"
                  />
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6">
                {/* Constituency Sentiment Chart (Mock) */}
                <div className="ncmp-card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-foreground flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-gold" /> Constituency Sentiment Trend
                    </h3>
                    <select className="bg-muted border-none text-xs font-bold text-gold rounded px-2 py-1">
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                    </select>
                  </div>
                  <div className="h-48 flex items-end gap-2 px-2">
                    {[40, 65, 45, 80, 55, 90, 75, 85, 60, 95, 88, 92].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        transition={{ delay: i * 0.05, duration: 1 }}
                        className={`flex-1 rounded-t-sm ${h > 80 ? 'bg-gold' : 'bg-gold/30'}`}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-[10px] text-muted-foreground uppercase font-bold">
                    <span>Week 1</span>
                    <span>Week 2</span>
                    <span>Week 3</span>
                    <span>Week 4</span>
                  </div>
                </div>

                {/* Recent Activity Feed */}
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
                  <Button variant="ghost" className="w-full mt-4 text-xs text-gold hover:bg-gold/10">
                    View All Constituency Reports
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="issues" className="space-y-4">
                <div className="grid gap-4">
                  {recentIssues.map((issue) => (
                    <div key={issue.id} className="ncmp-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 w-10 h-10 rounded-lg flex items-center justify-center ${
                          issue.priority === 'Critical' ? 'bg-red-500/10 text-red-500' : 'bg-gold/10 text-gold'
                        }`}>
                          <AlertCircle className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-foreground">{issue.title}</h4>
                            <Badge className={issue.priority === 'Critical' ? 'bg-red-500' : 'bg-gold text-black'}>
                              {issue.priority}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mb-2">Reported by {issue.reporter} • {issue.time}</p>
                          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Ward 4</span>
                            <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" /> 12 Comments</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="border-border text-xs">Assign Staff</Button>
                        <Button className="bg-gold text-black font-bold text-xs">Resolve</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  {constituencyProjects.map((project) => (
                    <div key={project.id} className="ncmp-card p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-2 rounded bg-gold/10 text-gold">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        <Badge variant="outline" className={project.status === 'Delayed' ? 'border-red-500 text-red-500' : 'border-gold text-gold'}>
                          {project.status}
                        </Badge>
                      </div>
                      <h4 className="font-bold text-foreground mb-1">{project.name}</h4>
                      <p className="text-xs text-muted-foreground mb-4">Budget: {project.budget}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="text-gold">{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} className="h-1.5 bg-muted" />
                      </div>
                      
                      <div className="mt-6 flex gap-2">
                        <Button variant="ghost" size="sm" className="flex-1 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10">
                          <FileText className="w-3 h-3 mr-2" /> Reports
                        </Button>
                        <Button variant="ghost" size="sm" className="flex-1 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10">
                          <Eye className="w-3 h-3 mr-2" /> Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Sidebar: Quick Actions & Team */}
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
                <button className="p-4 rounded-lg bg-muted/30 hover:bg-gold/10 border border-border hover:border-gold/30 transition-all text-center group">
                  <Users className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-gold" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-foreground">Town Hall</span>
                </button>
                <button className="p-4 rounded-lg bg-muted/30 hover:bg-gold/10 border border-border hover:border-gold/30 transition-all text-center group">
                  <TrendingUp className="w-6 h-6 mx-auto mb-2 text-muted-foreground group-hover:text-gold" />
                  <span className="text-[10px] font-bold uppercase text-muted-foreground group-hover:text-foreground">Analytics</span>
                </button>
              </div>
            </div>

            <div className="ncmp-card p-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6">Constituency Staff</h3>
              <div className="space-y-4">
                {[
                  { name: "Sarah Namukasa", role: "Political Assistant", status: "Online" },
                  { name: "John Okello", role: "Project Coordinator", status: "In Field" },
                  { name: "Grace Akello", role: "Public Relations", status: "Online" },
                ].map((staff) => (
                  <div key={staff.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">
                        {staff.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-foreground">{staff.name}</p>
                        <p className="text-[9px] text-muted-foreground uppercase">{staff.role}</p>
                      </div>
                    </div>
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded ${staff.status === 'Online' ? 'bg-green-500/10 text-green-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {staff.status}
                    </span>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-6 border-border text-xs h-8">Manage Team</Button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}