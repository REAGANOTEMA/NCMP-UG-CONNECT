import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShieldCheck, MapPin, Users, MessageSquare, Phone, 
  FileText, Award, TrendingUp, ChevronLeft, Globe 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { allMPs, PARTIES } from "@/data/ugandaData";

export default function MPProfile() {
  const { id } = useParams();
  const mp = allMPs.find(m => m.id === id);

  if (!mp) return <div className="pt-32 text-center">MP Not Found</div>;

  const partyInfo = PARTIES[mp.party];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link to="/parliament/mps" className="inline-flex items-center text-gold hover:underline mb-8 text-sm">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Directory
        </Link>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="ncmp-card p-6 text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: partyInfo.color }} />
              
              <div className="w-32 h-32 rounded-full bg-gold/10 border-4 border-gold/20 mx-auto mb-6 flex items-center justify-center text-4xl font-bold text-gold">
                {mp.name.split(" ").slice(-1)[0][0]}
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <h1 className="text-2xl font-display font-bold text-foreground">{mp.name}</h1>
                <ShieldCheck className="w-5 h-5 text-gold" />
              </div>
              
              <p className="text-gold font-medium mb-4">{mp.constituency}</p>
              
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <Badge variant="outline" className="border-gold/30 text-gold">{mp.party}</Badge>
                <Badge variant="outline" className="border-gold/30 text-gold">{mp.type}</Badge>
                <Badge variant="outline" className="border-gold/30 text-gold">Term: {mp.term}</Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-border">
                <Link to="/messages" className="w-full">
                  <Button className="w-full bg-gold text-black hover:bg-gold/90 font-bold">
                    <MessageSquare className="w-4 h-4 mr-2" /> Message
                  </Button>
                </Link>
                <Button variant="outline" className="w-full border-gold/30 text-gold hover:bg-gold/10">
                  <Phone className="w-4 h-4 mr-2" /> Call
                </Button>
              </div>
            </motion.div>

            <div className="ncmp-card p-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest mb-4">Constituency Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Responsiveness</span>
                  <span className="text-sm font-bold text-foreground">94%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gold w-[94%]" />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Issues Resolved</span>
                  <span className="text-sm font-bold text-foreground">1,240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Projects Active</span>
                  <span className="text-sm font-bold text-foreground">12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Activity */}
          <div className="lg:col-span-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="ncmp-card p-8"
            >
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5 text-gold" /> Official Biography & Mandate
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Hon. {mp.name} is the elected representative for {mp.constituency} in the 11th Parliament of Uganda. 
                With a focus on regional development and legislative oversight, they have been a key voice in 
                national debates regarding infrastructure and social services.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-widest">Committees</h4>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-gold/60" /> Committee on National Economy
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <Award className="w-4 h-4 text-gold/60" /> Committee on Physical Infrastructure
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-widest">Contact Information</h4>
                  <ul className="space-y-2">
                    <li className="text-sm flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gold/60" /> parliament.go.ug/members/{mp.id}
                    </li>
                    <li className="text-sm flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gold/60" /> Parliament House, Kampala
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <div className="ncmp-card p-8">
              <h2 className="text-xl font-display font-bold text-foreground mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-gold" /> Recent Legislative Activity
              </h2>
              <div className="space-y-6">
                {[
                  { date: "Oct 12, 2025", title: "Tabled Motion on Rural Electrification", status: "Passed" },
                  { date: "Sep 28, 2025", title: "Debate on National Budget Framework", status: "Ongoing" },
                  { date: "Aug 15, 2025", title: "Constituency Visit: Road Inspection", status: "Completed" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-2 h-2 rounded-full bg-gold mt-2" />
                    <div>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                      <p className="text-sm font-bold text-foreground">{item.title}</p>
                      <Badge variant="secondary" className="mt-1 text-[10px]">{item.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}