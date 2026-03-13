import { motion } from "framer-motion";
import { Calendar, Clock, Radio, PlayCircle, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const sessions = [
  {
    title: "Debate on the National Budget Framework Paper 2026/27",
    date: "Today, March 15, 2026",
    time: "02:00 PM",
    status: "Live",
    description: "The House is debating the proposed budget allocations for the next financial year."
  },
  {
    title: "Prime Minister's Question Time",
    date: "Tomorrow, March 16, 2026",
    time: "10:00 AM",
    status: "Upcoming",
    description: "The Prime Minister responds to questions from Members of Parliament regarding government policy."
  },
  {
    title: "Second Reading: The Digital Governance Bill, 2025",
    date: "March 12, 2026",
    time: "03:30 PM",
    status: "Completed",
    description: "Scrutiny of the proposed legislation to digitize constituency management."
  }
];

export default function Sessions() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            🎙️ Live from Parliament House
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Parliamentary Sessions</h1>
          <p className="text-muted-foreground max-w-2xl">
            Watch live broadcasts, view the Order Paper, and access Hansard records of all parliamentary proceedings.
          </p>
        </motion.div>

        <div className="space-y-6">
          {sessions.map((s, i) => (
            <motion.div 
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`ncmp-card p-6 border-l-4 ${
                s.status === 'Live' ? 'border-l-red-600 bg-red-600/5' : 
                s.status === 'Upcoming' ? 'border-l-gold bg-gold/5' : 'border-l-muted'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge className={
                      s.status === 'Live' ? 'bg-red-600 text-white animate-pulse' : 
                      s.status === 'Upcoming' ? 'bg-gold text-black' : 'bg-muted text-muted-foreground'
                    }>
                      {s.status === 'Live' && <Radio className="w-3 h-3 mr-1" />}
                      {s.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {s.date}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {s.time}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.description}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  {s.status === 'Live' ? (
                    <Button className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2">
                      <PlayCircle className="w-4 h-4" /> Watch Live
                    </Button>
                  ) : s.status === 'Upcoming' ? (
                    <Button className="bg-gold text-black font-bold gap-2">
                      <FileText className="w-4 h-4" /> View Order Paper
                    </Button>
                  ) : (
                    <Button variant="outline" className="border-border text-muted-foreground gap-2">
                      <FileText className="w-4 h-4" /> View Hansard
                    </Button>
                  )}
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