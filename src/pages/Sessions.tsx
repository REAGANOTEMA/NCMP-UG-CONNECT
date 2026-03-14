import { motion } from "framer-motion";
import { Calendar, Clock, Radio, PlayCircle, FileText, ExternalLink, Youtube, ShieldAlert } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";

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
  const youtubeChannelUrl = "https://www.youtube.com/@parliamentofuganda7837";

  const isOfficial = user?.role === 'speaker' || user?.role === 'clerk';

  const handleGoLive = () => {
    sendLiveAlert("Plenary Session: National Budget Debate 2026/27");
  };

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
              <Button onClick={handleGoLive} className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2">
                <ShieldAlert className="w-4 h-4" /> Trigger National Live Alert
              </Button>
            )}
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Watch live broadcasts, view the Order Paper, and access Hansard records. All live sessions are streamed via the official 
            <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="text-gold font-bold hover:underline ml-1">
              Parliament of Uganda YouTube Channel
            </a>.
          </p>
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
                <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 h-12">
                    <Youtube className="w-5 h-5 mr-2" /> Watch on YouTube
                  </Button>
                </a>
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
                    <a href={youtubeChannelUrl} target="_blank" rel="noopener noreferrer">
                      <Button className="bg-red-600 hover:bg-red-700 text-white font-bold gap-2 w-full sm:w-auto">
                        <PlayCircle className="w-4 h-4" /> Watch Live
                      </Button>
                    </a>
                  ) : s.status === 'Upcoming' ? (
                    <Button className="bg-gold text-black font-bold gap-2 w-full sm:w-auto">
                      <FileText className="w-4 h-4" /> View Order Paper
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