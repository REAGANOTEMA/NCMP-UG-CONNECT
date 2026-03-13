import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BarChart3, TrendingUp, Users, MapPin, MessageSquare,
  CheckCircle2, AlertCircle, Clock, Activity, Bell
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { allMPs, nationalOfficials, partyStats, REGIONS } from "@/data/ugandaData";

// Mock analytics data
const engagementData = [
  { region: "Central", issues: 342, resolved: 289, engagement: 87 },
  { region: "Eastern", issues: 218, resolved: 176, engagement: 81 },
  { region: "Northern", issues: 195, resolved: 143, engagement: 73 },
  { region: "Western", issues: 167, resolved: 134, engagement: 80 },
  { region: "Southwestern", issues: 98, resolved: 82, engagement: 84 },
];

const trendingTopics = [
  { topic: "Road Infrastructure", count: 1243, trend: "+12%", icon: "🛣️" },
  { topic: "Health Services", count: 987, trend: "+8%", icon: "🏥" },
  { topic: "Education Funding", count: 876, trend: "+15%", icon: "🎓" },
  { topic: "Water Supply", count: 654, trend: "+6%", icon: "💧" },
  { topic: "Agricultural Support", count: 543, trend: "+19%", icon: "🌾" },
  { topic: "Youth Employment", count: 498, trend: "+22%", icon: "💼" },
];

const topMPsByActivity = allMPs
  .filter(mp => mp.bio)
  .slice(0, 5)
  .map((mp, i) => ({ ...mp, responseRate: [95, 89, 86, 82, 78][i], posts: [142, 118, 97, 84, 71][i] }));

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-8 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            📊 National Governance Intelligence System
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-2">
            National Analytics
          </h1>
          <p className="text-[hsl(var(--muted-foreground))]">
            Real-time insights into citizen engagement, governance performance, and national development
          </p>
        </motion.div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Citizens", value: "20.4M", icon: Users, change: "+2.1M", up: true, color: "text-gold" },
            { label: "Active MPs", value: `${allMPs.length}`, icon: CheckCircle2, change: "100%", up: true, color: "text-gold" },
            { label: "Open Issues", value: "4,821", icon: AlertCircle, change: "-234", up: false, color: "text-[hsl(var(--uganda-red))]" },
            { label: "Projects Active", value: "1,240", icon: Activity, change: "+87", up: true, color: "text-gold" },
          ].map((kpi, i) => (
            <motion.div key={kpi.label} custom={i} initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="ncmp-card p-5">
              <div className="flex items-start justify-between mb-3">
                <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${kpi.up ? "bg-[hsl(var(--uganda-gold)/0.1)] text-gold" : "bg-[hsl(var(--uganda-red)/0.1)] text-[hsl(var(--uganda-red))]"}`}>
                  {kpi.change}
                </span>
              </div>
              <div className={`text-2xl font-bold font-display ${kpi.color}`}>{kpi.value}</div>
              <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{kpi.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Regional engagement */}
          <div className="lg:col-span-2 ncmp-card p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gold" /> Regional Issue Heatmap
            </h2>
            <div className="space-y-4">
              {engagementData.map(row => (
                <div key={row.region}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-foreground">{row.region} Region</span>
                    <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                      <span>{row.resolved}/{row.issues} resolved</span>
                      <span className="text-gold font-semibold">{row.engagement}%</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: `linear-gradient(90deg, hsl(45 100% 51%), hsl(3 90% 45%))` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${row.engagement}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Party representation */}
          <div className="ncmp-card p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4">
              Parliament Composition
            </h2>
            <div className="space-y-3">
              {partyStats.map(p => (
                <div key={p.party} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: p.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-foreground font-medium truncate">{p.party}</span>
                      <span className="font-bold flex-shrink-0 ml-2" style={{ color: p.color }}>{p.count}</span>
                    </div>
                    <div className="h-1.5 mt-1 rounded-full bg-muted overflow-hidden">
                      <div className="h-full rounded-full" style={{ background: p.color, width: `${(p.count / allMPs.length) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Trending topics */}
          <div className="ncmp-card p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" /> Trending National Topics
            </h2>
            <div className="space-y-3">
              {trendingTopics.map((t, i) => (
                <div key={t.topic} className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--muted)/0.5)] hover:bg-[hsl(var(--muted)/0.8)] transition-colors">
                  <span className="text-xl">{t.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-foreground">{t.topic}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{t.count.toLocaleString()} mentions</div>
                  </div>
                  <span className="text-xs font-bold text-[hsl(var(--uganda-red))]">{t.trend}</span>
                  <span className="w-6 h-6 rounded-full bg-[hsl(var(--uganda-gold)/0.1)] text-gold text-xs flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Top active MPs */}
          <div className="ncmp-card p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> Most Responsive MPs
            </h2>
            <div className="space-y-3">
              {topMPsByActivity.map((mp, i) => (
                <div key={mp.id} className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--muted)/0.5)]">
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--uganda-gold)/0.15)] text-gold flex items-center justify-center text-sm font-bold">
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-foreground truncate">{mp.name}</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))] truncate">{mp.constituency}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-gold text-sm font-bold">{mp.responseRate}%</div>
                    <div className="text-xs text-[hsl(var(--muted-foreground))]">{mp.posts} posts</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real-time feed */}
        <div className="ncmp-card p-6">
          <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-5 h-5 text-gold" /> Live National Activity Feed
          </h2>
          <div className="space-y-3">
            {[
              { msg: "New development project registered in Gulu City — Road Infrastructure", time: "2 min ago", type: "project", region: "Northern" },
              { msg: "MP Muhammad Nsereko responded to 12 citizen issues today", time: "8 min ago", type: "mp", region: "Central" },
              { msg: "Town hall meeting scheduled in Mbale — March 15, 2026", time: "15 min ago", type: "event", region: "Eastern" },
              { msg: "Government announcement: Education Budget 2026/27 released", time: "1 hr ago", type: "announcement", region: "National" },
              { msg: "Constituency issue resolved: Water supply restored in Tororo North", time: "2 hrs ago", type: "resolved", region: "Eastern" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))]">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  item.type === "resolved" ? "bg-[hsl(var(--uganda-gold))]" :
                  item.type === "announcement" ? "bg-[hsl(var(--uganda-red))]" :
                  "bg-[hsl(var(--uganda-gold)/0.6)]"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{item.msg}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-[hsl(var(--muted-foreground))]">{item.time}</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]">
                      {item.region}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}