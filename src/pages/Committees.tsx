import { motion } from "framer-motion";
import { Award, Users, FileText, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";

const committees = [
  {
    name: "Committee on National Economy",
    chair: "Hon. John Faith Magolo",
    members: 30,
    mandate: "To review and report on all loan requests and the state of the economy.",
    type: "Standing Committee"
  },
  {
    name: "Committee on Physical Infrastructure",
    chair: "Hon. David Karubanga",
    members: 28,
    mandate: "Oversight of the Ministry of Works, Transport, and Housing.",
    type: "Sectoral Committee"
  },
  {
    name: "Committee on Health",
    chair: "Hon. Dr. Charles Ayume",
    members: 25,
    mandate: "Oversight of health service delivery and policy implementation.",
    type: "Sectoral Committee"
  },
  {
    name: "Public Accounts Committee (Central Government)",
    chair: "Hon. Medard Sseggona",
    members: 35,
    mandate: "Examination of the Auditor General's reports on government accounts.",
    type: "Standing Committee"
  }
];

export default function Committees() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            🏛️ Legislative Oversight
          </div>
          <h1 className="font-display text-4xl font-bold text-foreground mb-4">Parliamentary Committees</h1>
          <p className="text-muted-foreground max-w-2xl">
            The engine rooms of Parliament. Explore the committees responsible for scrutinizing government policy and expenditure.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {committees.map((c, i) => (
            <motion.div 
              key={c.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="ncmp-card p-6 hover:border-gold/40 transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-gold/10 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-gold" />
                </div>
                <Badge variant="outline" className="border-gold/30 text-gold">{c.type}</Badge>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">{c.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{c.mandate}</p>
              
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Chairperson</p>
                  <p className="text-sm font-bold text-foreground">{c.chair}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Members</p>
                  <p className="text-sm font-bold text-foreground flex items-center gap-1">
                    <Users className="w-3 h-3" /> {c.members} MPs
                  </p>
                </div>
              </div>
              
              <button className="w-full mt-6 py-2 rounded bg-muted hover:bg-gold/10 text-xs font-bold text-muted-foreground hover:text-gold transition-all flex items-center justify-center gap-2">
                <FileText className="w-3 h-3" /> View Reports & Minutes <ExternalLink className="w-3 h-3" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}