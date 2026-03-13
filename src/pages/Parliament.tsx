"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MPProfileCard from "@/components/MPProfileCard";
import { allMPs } from "@/data/ugandaData";

export default function Parliament() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-gold text-xs font-semibold tracking-widest uppercase mb-2">
            🏛️ Legislative Branch
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Parliament of Uganda — 2026
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Official registry of the 11th Parliament. Access verified profiles, 
            constituency data, and legislative records directly from the national digital infrastructure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allMPs.map((mp) => (
            <MPProfileCard key={mp.id} mp={mp} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}