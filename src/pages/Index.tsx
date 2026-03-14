import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Shield, ArrowRight, ChevronRight, Award, Landmark, Scale
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MPProfileCard from "@/components/MPProfileCard";
import HeroSlider from "@/components/HeroSlider";
import NationalSeal from "@/components/NationalSeal";
import SystemBoot from "@/components/SystemBoot";
import { nationalOfficials, allMPs } from "@/data/ugandaData";

export default function Index() {
  const [isBooting, setIsBooting] = useState(true);
  const featuredMPs = allMPs.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {isBooting && <SystemBoot onComplete={() => setIsBooting(false)} />}
      </AnimatePresence>

      {!isBooting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />

          {/* ===== HERO SECTION ===== */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
            <HeroSlider />

            <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center z-10">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/20 bg-black/60 backdrop-blur-md mb-8"
              >
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-gold text-[10px] font-bold tracking-[0.3em] uppercase">
                  Official National Civic Infrastructure
                </span>
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-tight mb-6 text-white"
              >
                National <br />
                <span className="text-gold">Constituency</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-white/80 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
              >
                Uganda's unified digital governance system — connecting citizens, 
                Parliament, and leadership for a transparent and accountable future.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Link to="/register">
                  <Button size="lg" className="bg-gold text-black hover:bg-gold/90 font-bold px-10 h-14 text-lg shadow-lg">
                    Join the Platform <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/parliament/mps">
                  <Button size="lg" variant="outline" className="bg-black/20 backdrop-blur-md border-white/20 text-white hover:border-gold hover:text-gold h-14 px-10 text-lg">
                    Explore Directory
                  </Button>
                </Link>
              </motion.div>
            </div>

            {/* National Flag Accent */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 flex z-20">
              <div className="flex-1 bg-black" />
              <div className="flex-1 bg-gold" />
              <div className="flex-1 bg-red-600" />
              <div className="flex-1 bg-black" />
              <div className="flex-1 bg-gold" />
              <div className="flex-1 bg-red-600" />
            </div>
          </section>

          {/* ===== NATIONAL AUTHORITY SECTION (Rolling Machine) ===== */}
          <section className="py-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gold/[0.02] pointer-events-none" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 text-gold text-xs font-bold tracking-[0.3em] uppercase mb-6">
                  <Landmark className="w-4 h-4" /> Sovereign Authority
                </div>
                <h2 className="font-display text-5xl font-bold text-white mb-8 leading-tight">
                  The Seal of <br />
                  <span className="text-gold">National Integrity</span>
                </h2>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                  NCMP operates under the highest standards of national security and digital sovereignty. 
                  Our platform is the official bridge between the Republic's leadership and its citizens, 
                  ensuring every voice is heard within the framework of our constitution.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Scale className="text-gold w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Constitutional</h4>
                      <p className="text-xs text-muted-foreground">Aligned with national laws.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Award className="text-gold w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-1">Verified</h4>
                      <p className="text-xs text-muted-foreground">Official government data.</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <NationalSeal />
              </motion.div>
            </div>
          </section>

          {/* ===== NATIONAL LEADERSHIP ===== */}
          <section className="py-32 px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">National Leadership</h2>
              <div className="w-24 h-1 bg-gold mx-auto" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {nationalOfficials.map((official, i) => (
                <motion.div
                  key={official.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="ncmp-card p-6 group"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center text-gold font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                    {official.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{official.name}</h3>
                  <p className="text-gold text-xs font-bold uppercase tracking-widest mb-4">{official.title}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{official.bio}</p>
                  <Button variant="ghost" className="w-full text-gold hover:bg-gold/10 font-bold text-xs uppercase tracking-widest">
                    View Profile
                  </Button>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ===== FEATURED MPs ===== */}
          <section className="py-32 px-4 sm:px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-end justify-between mb-16">
                <div>
                  <h2 className="font-display text-4xl font-bold text-white mb-2">Parliamentary Registry</h2>
                  <p className="text-muted-foreground">Verified representatives of the 11th Parliament</p>
                </div>
                <Link to="/parliament/mps">
                  <Button variant="link" className="text-gold font-bold">View All 529 MPs <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredMPs.map(mp => (
                  <MPProfileCard key={mp.id} mp={mp} />
                ))}
              </div>
            </div>
          </section>

          <Footer />
        </motion.div>
      )}
    </div>
  );
}