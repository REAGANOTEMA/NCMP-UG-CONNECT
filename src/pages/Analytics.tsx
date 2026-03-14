import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, Users, MapPin, 
  CheckCircle2, AlertCircle, Activity, Bell,
  PieChart as PieChartIcon, LineChart as LineChartIcon,
  ShieldCheck, Globe
} from "lucide-react";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { allMPs, partyStats } from "@/data/ugandaData";

const engagementData = [
  { name: "Jan", citizens: 4000, issues: 2400, resolved: 1800 },
  { name: "Feb", citizens: 5200, issues: 3100, resolved: 2400 },
  { name: "Mar", citizens: 6800, issues: 4200, resolved: 3600 },
  { name: "Apr", citizens: 8100, issues: 4800, resolved: 4100 },
  { name: "May", citizens: 9500, issues: 5600, resolved: 4900 },
  { name: "Jun", citizens: 12400, issues: 6800, resolved: 6100 },
];

const regionalPerformance = [
  { region: "Central", score: 92, active: 88 },
  { region: "Eastern", score: 84, active: 76 },
  { region: "Northern", score: 78, active: 72 },
  { region: "Western", score: 86, active: 81 },
  { region: "Southwestern", score: 89, active: 84 },
];

const COLORS = ['#FFD700', '#FF0000', '#0066CC', '#006400', '#8B0000', '#888888'];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-[0.2em] uppercase mb-2">
            <ShieldCheck className="w-4 h-4" /> Nexterp Governance Intelligence
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">
            National Analytics
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Real-time insights into citizen engagement, governance performance, and national development 
            across all 353 constituencies.
          </p>
        </motion.div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Citizens", value: "20.4M", icon: Users, change: "+12%", color: "text-gold" },
            { label: "Active MPs", value: "529", icon: CheckCircle2, change: "100%", color: "text-green-500" },
            { label: "Issue Resolution", value: "88.4%", icon: Activity, change: "+4.2%", color: "text-blue-500" },
            { label: "Pending Bills", value: "24", icon: AlertCircle, change: "-2", color: "text-red-500" },
          ].map((kpi, i) => (
            <motion.div 
              key={kpi.label} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: i * 0.1 }} 
              className="ncmp-card p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-muted">
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                </div>
                <Badge variant="secondary" className="text-[10px] font-bold">{kpi.change}</Badge>
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{kpi.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-medium">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 mb-6">
          {/* Engagement Trend */}
          <div className="lg:col-span-8 ncmp-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-foreground flex items-center gap-2">
                <LineChartIcon className="w-4 h-4 text-gold" /> Citizen Engagement Trend
              </h3>
              <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-gold" /> Citizens</div>
                <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500" /> Issues</div>
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={engagementData}>
                  <defs>
                    <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FFD700" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#FFD700" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                  <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="citizens" stroke="#FFD700" fillOpacity={1} fill="url(#colorGold)" strokeWidth={2} />
                  <Area type="monotone" dataKey="issues" stroke="#FF0000" fillOpacity={0} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Party Composition */}
          <div className="lg:col-span-4 ncmp-card p-6">
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-gold" /> Party Composition
            </h3>
            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={partyStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                  >
                    {partyStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {partyStats.slice(0, 4).map((p) => (
                <div key={p.party} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">{p.party}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Regional Performance */}
          <div className="lg:col-span-6 ncmp-card p-6">
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <Globe className="w-4 h-4 text-gold" /> Regional Performance Index
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regionalPerformance} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#222" horizontal={false} />
                  <XAxis type="number" stroke="#666" fontSize={12} hide />
                  <YAxis dataKey="region" type="category" stroke="#666" fontSize={12} tickLine={false} axisLine={false} width={100} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,215,0,0.05)' }}
                    contentStyle={{ backgroundColor: '#0A0A0A', border: '1px solid #333', borderRadius: '8px' }}
                  />
                  <Bar dataKey="score" fill="#FFD700" radius={[0, 4, 4, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Critical Alerts */}
          <div className="lg:col-span-6 ncmp-card p-6">
            <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
              <Bell className="w-4 h-4 text-gold" /> National Governance Alerts
            </h3>
            <div className="space-y-4">
              {[
                { title: "Budget Scrutiny", desc: "35 MPs have flagged concerns regarding the Health budget allocation.", time: "10m ago", type: "critical" },
                { title: "Project Milestone", desc: "Gulu Water System expansion reached 100% completion today.", time: "2h ago", type: "success" },
                { title: "Citizen Petition", desc: "Petition #PET-092 reached 50,000 signatures threshold.", time: "5h ago", type: "info" },
                { title: "Session Update", desc: "Order Paper for tomorrow's plenary session has been published.", time: "1d ago", type: "info" },
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border hover:border-gold/20 transition-all">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    alert.type === 'critical' ? 'bg-red-500 animate-pulse' : 
                    alert.type === 'success' ? 'bg-green-500' : 'bg-gold'
                  }`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="text-sm font-bold text-foreground">{alert.title}</h4>
                      <span className="text-[10px] text-muted-foreground">{alert.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{alert.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}