import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Users, TrendingUp, Search, Plus, ArrowUpRight, Clock, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const mockDebates = [
  {
    id: 1,
    title: "National Budget Framework 2026/27: Education vs Infrastructure",
    category: "National Policy",
    participants: 1240,
    comments: 450,
    status: "Active",
    time: "Started 2h ago",
    author: "Parliamentary Secretariat"
  },
  {
    id: 2,
    title: "Kampala Central: Proposed New Market Regulations",
    category: "Local Governance",
    participants: 890,
    comments: 320,
    status: "Active",
    time: "Started 5h ago",
    author: "Hon. Muhammad Nsereko"
  },
  {
    id: 3,
    title: "Digital Identity Standards: Privacy Concerns",
    category: "Technology",
    participants: 2100,
    comments: 1200,
    status: "Trending",
    time: "Started Yesterday",
    author: "Ministry of ICT"
  }
];

export default function TownHall() {
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
              🏛️ National Town Hall
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Public Debates
            </h1>
            <p className="text-muted-foreground max-w-2xl">
              Participate in structured discussions on national policies and local constituency issues. 
              Your voice directly informs parliamentary committees.
            </p>
          </motion.div>
          <Button className="bg-gold text-black font-bold h-12 px-8">
            <Plus className="w-5 h-5 mr-2" /> Start Discussion
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search debates by topic or keyword..." 
                className="pl-12 h-14 bg-card border-border text-lg focus:border-gold"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {mockDebates.map((debate, i) => (
                <motion.div
                  key={debate.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="ncmp-card p-6 hover:border-gold/40 transition-all group cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Badge className={debate.status === 'Active' ? 'bg-gold/20 text-gold' : 'bg-blue-500/20 text-blue-500'}>
                        {debate.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {debate.time}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-gold transition-colors" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-gold transition-colors">
                    {debate.title}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Users className="w-4 h-4" /> {debate.participants.toLocaleString()} Participants
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <MessageSquare className="w-4 h-4" /> {debate.comments.toLocaleString()} Comments
                      </div>
                    </div>
                    <div className="text-[10px] font-bold text-gold uppercase tracking-widest">
                      {debate.category}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="ncmp-card p-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-6 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" /> Trending Topics
              </h3>
              <div className="space-y-4">
                {[
                  { tag: "#EducationReform", count: "12.4k" },
                  { tag: "#RoadSafety", count: "8.2k" },
                  { tag: "#DigitalTax", count: "5.1k" },
                  { tag: "#HealthFunding", count: "3.9k" },
                ].map(topic => (
                  <div key={topic.tag} className="flex items-center justify-between group cursor-pointer">
                    <span className="text-sm font-bold text-foreground group-hover:text-gold transition-colors">{topic.tag}</span>
                    <span className="text-xs text-muted-foreground">{topic.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="ncmp-card p-6 bg-gold/5 border-gold/20">
              <div className="flex items-center gap-2 text-gold mb-4">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="text-sm font-bold uppercase tracking-widest">Verified Debate</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                All Town Hall discussions are monitored by the Parliamentary Secretariat. 
                Constructive feedback is summarized and presented to relevant committees weekly.
              </p>
              <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/10 text-xs font-bold">
                View Guidelines
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}