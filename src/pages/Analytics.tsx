import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  TrendingUp,
  Users,
  MapPin,
  Activity,
  CheckCircle2,
  AlertCircle,
  Bell
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { fetchJSON } from "@/services/api"; // helper to fetch from backend
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";

export default function Analytics() {
  // Fetch MPs
  const { data: allMPs, isLoading: loadingMPs } = useQuery(["mpProfiles"], () =>
    fetchJSON("/api/mp-profiles")
  );

  // Fetch regional engagement
  const { data: engagementData } = useQuery(["regionalEngagement"], () =>
    fetchJSON("/api/analytics/engagement")
  );

  // Fetch trending topics
  const { data: trendingTopics } = useQuery(["trendingTopics"], () =>
    fetchJSON("/api/analytics/trending")
  );

  // Fetch live national activity feed
  const { data: liveFeed } = useQuery(["liveFeed"], () =>
    fetchJSON("/api/analytics/live-feed")
  );

  if (loadingMPs) {
    return <div className="p-8 text-center text-lg">Loading analytics from NCMP database…</div>;
  }

  // Compute top MPs by response rate
  const topMPsByActivity = allMPs
    .filter(mp => mp.responseRate)
    .sort((a, b) => b.responseRate - a.responseRate)
    .slice(0, 5);

  // Compute party stats
  const partyStats = Object.values(
    allMPs.reduce((acc: any, mp: any) => {
      if (!acc[mp.politicalParty])
        acc[mp.politicalParty] = { party: mp.politicalParty, count: 0, color: mp.partyColor || "#FFD700" };
      acc[mp.politicalParty].count += 1;
      return acc;
    }, {})
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <TooltipProvider>
        <Toaster />
        <Sonner />
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
              {
                label: "Total Citizens",
                value: "20.4M",
                icon: Users,
                change: "+2.1M",
                up: true,
                color: "text-gold"
              },
              {
                label: "Active MPs",
                value: `${allMPs.length}`,
                icon: CheckCircle2,
                change: "100%",
                up: true,
                color: "text-gold"
              },
              {
                label: "Open Issues",
                value: "4,821",
                icon: AlertCircle,
                change: "-234",
                up: false,
                color: "text-[hsl(var(--uganda-red))]"
              },
              {
                label: "Projects Active",
                value: "1,240",
                icon: Activity,
                change: "+87",
                up: true,
                color: "text-gold"
              }
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                custom={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="ncmp-card p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                  <span
                    className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                      kpi.up
                        ? "bg-[hsl(var(--uganda-gold)/0.1)] text-gold"
                        : "bg-[hsl(var(--uganda-red)/0.1)] text-[hsl(var(--uganda-red))]"
                    }`}
                  >
                    {kpi.change}
                  </span>
                </div>
                <div className={`text-2xl font-bold font-display ${kpi.color}`}>{kpi.value}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{kpi.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Regional engagement & party stats */}
          <div className="grid lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2 ncmp-card p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gold" /> Regional Issue Heatmap
              </h2>
              <div className="space-y-4">
                {engagementData?.map((row: any) => (
                  <div key={row.region}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-foreground">{row.region} Region</span>
                      <div className="flex items-center gap-3 text-xs text-[hsl(var(--muted-foreground))]">
                        <span>
                          {row.resolved}/{row.issues} resolved
                        </span>
                        <span className="text-gold font-semibold">{row.engagement}%</span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, hsl(45 100% 51%), hsl(3 90% 45%))`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${row.engagement}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ncmp-card p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4">
                Parliament Composition
              </h2>
              <div className="space-y-3">
                {partyStats.map((p: any) => (
                  <div key={p.party} className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0"
                      style={{ background: p.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-foreground font-medium truncate">{p.party}</span>
                        <span className="font-bold flex-shrink-0 ml-2" style={{ color: p.color }}>
                          {p.count}
                        </span>
                      </div>
                      <div className="h-1.5 mt-1 rounded-full bg-muted overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ background: p.color, width: `${(p.count / allMPs.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Trending topics */}
          <div className="grid lg:grid-cols-2 gap-6 mb-6">
            <div className="ncmp-card p-6">
              <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" /> Trending National Topics
              </h2>
              <div className="space-y-3">
                {trendingTopics?.map((t: any, i: number) => (
                  <div
                    key={t.topic}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[hsl(var(--muted)/0.5)] hover:bg-[hsl(var(--muted)/0.8)] transition-colors"
                  >
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
                {topMPsByActivity.map((mp: any, i: number) => (
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

          {/* Live activity feed */}
          <div className="ncmp-card p-6">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-gold" /> Live National Activity Feed
            </h2>
            <div className="space-y-3">
              {liveFeed?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[hsl(var(--muted)/0.3)] border border-[hsl(var(--border))]"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      item.type === "resolved"
                        ? "bg-[hsl(var(--uganda-gold))]"
                        : item.type === "announcement"
                        ? "bg-[hsl(var(--uganda-red))]"
                        : "bg-[hsl(var(--uganda-gold)/0.6)]"
                    }`}
                  />
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
      </TooltipProvider>
      <Footer />
    </div>
  );
}