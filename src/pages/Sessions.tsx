import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calendar, Clock, Radio, PlayCircle, FileText, 
  Youtube, ShieldAlert, MessageSquare, Heart, 
  ThumbsUp, ThumbsDown, Users, Share2, Maximize2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { toast } from "sonner";

const sessions = [
  {
    title: "Debate on the National Budget Framework Paper 2026/27",
    date: "Today, March 15, 2026",
    time: "02:00 PM",
    status: "Live",
    description: "The House is debating the proposed budget allocations for the next financial year. Watch live on the official YouTube channel."
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
  const { user } = useAuth();
  const { sendLiveAlert } = useNotifications();
  const [isWatchingLive, setIsWatchingLive] = useState(false);
  const [reactions, setReactions] = useState({ support: 84, neutral: 12, oppose: 4 });
  
  const youtubeChannelUrl = "https://www.youtube.com/@parliamentofuganda7837";
  const isOfficial = user?.role === 'speaker' || user?.role === 'clerk';

  const handleReaction = (type: 'support' | 'oppose') => {
    setReactions(prev => ({
      ...prev,
      [type]: prev[type] + 1
    }));
    toast.success("Reaction Recorded", {
      description: "Your feedback has been sent to the Parliamentary Oversight desk.",
    });
  };

  if (isWatchingLive) {
    return (
      <div className="min-h-screen bg-black flex flex-col">
        <Navbar />
        <div className="flex-1 pt-14 flex flex-col lg:flex-row">
          {/* Video Stream Area */}
          <div className="flex-1 bg-zinc-900 relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <Youtube className="w-20 h-20 text-red-600 opacity-50 group-hover:scale-110 transition-transform" />
              <p className="absolute bottom-1/3 text-white/40 font-display text-xl">Official Live Stream: 11th Parliament</p>
            </div>
            
            {/* Stream Overlay */}
            <div className="absolute top-6 left-6 flex items-center gap-3">
              <Badge className="bg-red-600 text-white animate-pulse px-3 py-1 border-none">
                <Radio className="w-3 h-3 mr-2" /> LIVE
              </Badge>
              <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white flex items-center gap-2">
                <Users className="w-3 h-3 text-gold" /> 12,405 Watching
              </div>
            </div>
          </div>

          {/* Interaction Sidebar */}
          <div className="w-full lg:w-96 bg-[hsl(var(--uganda-black))] border-l border-white/5 flex flex-col">
            <div className="p-6 border-b border-white/5">
              <h2 className="font-display text-lg font-bold text-white mb-1">Public Pulse</h2>
              <p className="text-[10px] text-gold uppercase tracking-widest font-bold">Real-time Citizen Feedback</p>
            </div>

            <div className="flex-1 p-6 space-y-8 overflow-y-auto">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-green-500">Support</span>
                  <span className="text-white">{reactions.support}%</span>
                </div>
                <Progress value={reactions.support} className="h-1.5 bg-white/5" />
                
                <div className="flex justify-between text-xs font-bold uppercase">
                  <span className="text-red-500">Oppose</span>
                  <span className="text-white">{reactions.oppose}%</span>
                </div>
                <Progress value={reactions.oppose} className="h-1.5 bg-white/5" />
              </div>

              <div className="ncmp-card p-4 bg-gold/5 border-gold/20">
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  The House is currently debating the <span className="text-white font-bold">National Budget Framework</span>. Use the buttons below to express your stance.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <Button 
                    onClick={() => handleReaction('support')}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold h-12"
                  >
                    <ThumbsUp className="w-4 h-4 mr-2" /> Support
                  </Button>
                  <Button 
                    onClick={() => handleReaction('oppose')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold h-12"
                  >
                    <ThumbsDown className="w-4 h-4 mr-2" /> Oppose
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Live Discussion</h4>
                {[
                  { user: "Musa K.", msg: "We need more for health!", time: "Just now" },
                  { user: "Sarah A.", msg: "Roads are priority too.", time: "1m ago" },
                  { user: "John D.", msg: "Transparency is key.", time: "2m ago" },
                ].map((chat, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[10px] font-bold text-gold">
                      {chat.user[0]}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white">{chat.user} <span className="text-white/40 font-normal ml-2">{chat.time}</span></p>
                      <p className="text-xs text-white/60">{chat.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 border-t border-white/5">
              <Button 
                variant="outline" 
                className="w-full border-white/10 text-white hover:bg-white/5"
                onClick={() => setIsWatchingLive(false)}
              >
                Exit Immersive View
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
                🎙️ Live from Parliament House
              </div>
              <h1 className="font-display text-4xl font-bold text-foreground mb-4">Parliamentary Sessions</h1>
            </div>
            {isOfficial && (
              <Button onClick={() => sendLiveAlert("Plenary Session: National Budget Debate")} className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2">
                <ShieldAlert className="w-4 h-4" /> Trigger National Live Alert
              </Button>
            )}
          </div>
        </motion.div>

        {/* Live Stream Highlight */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="ncmp-card p-8 mb-12 border-red-600/30 bg-red-600/5 relative overflow-hidden"
        >
          <div className="absolute top-4 right-4">
            <Badge className="bg-red-600 text-white animate-pulse px-3 py-1">
              <Radio className="w-3 h-3 mr-2" /> LIVE NOW
            </Badge>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/3 aspect-video bg-black rounded-lg flex items-center justify-center border border-white/10 group cursor-pointer relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1526470498-9ae73c66a992?q=80&w=2070" 
                alt="Parliament Session" 
                className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700"
              />
              <Youtube className="w-16 h-16 text-red-600 relative z-10 group-hover:scale-125 transition-transform" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-3">Plenary Session: 11th Parliament</h2>
              <p className="text-muted-foreground mb-6">
                The House is currently in session. Join thousands of Ugandans watching the live broadcast on our official digital channel.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  onClick={() => setIsWatchingLive(true)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 h-12"
                >
                  <PlayCircle className="w-5 h-5 mr-2" /> Enter Immersive View
                </Button>
                <Button variant="outline" className="border-white/10 text-muted-foreground h-12">
                  <FileText className="w-4 h-4 mr-2" /> View Order Paper
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-4">Recent & Upcoming Sessions</h3>
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
                    <Button 
                      onClick={() => setIsWatchingLive(true)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2 w-full sm:w-auto"
                    >
                      <PlayCircle className="w-4 h-4" /> Watch Live
                    </Button>
                  ) : (
                    <Button variant="outline" className="border-border text-muted-foreground gap-2 w-full sm:w-auto">
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