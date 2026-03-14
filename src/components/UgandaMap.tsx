"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { REGIONS } from "@/data/ugandaData";

interface UgandaMapProps {
  onRegionSelect: (region: string) => void;
  activeRegion: string;
}

export default function UgandaMap({ onRegionSelect, activeRegion }: UgandaMapProps) {
  const [hovered, setHovered] = useState<string | null>(null);

  // Simplified SVG paths for Uganda regions
  const regions = [
    { id: "Northern", path: "M 50,10 L 150,10 L 180,60 L 120,100 L 40,80 Z", color: "hsl(var(--uganda-gold))" },
    { id: "Eastern", path: "M 150,10 L 190,40 L 190,120 L 140,140 L 120,100 Z", color: "hsl(var(--uganda-red))" },
    { id: "Central", path: "M 80,100 L 120,100 L 140,140 L 100,180 L 60,160 Z", color: "hsl(var(--uganda-black))" },
    { id: "Western", path: "M 40,80 L 80,100 L 60,160 L 20,140 L 10,60 Z", color: "hsl(var(--uganda-gold))" },
    { id: "Southwestern", path: "M 20,140 L 60,160 L 50,190 L 10,190 Z", color: "hsl(var(--uganda-red))" },
  ];

  return (
    <div className="relative w-full aspect-square max-w-md mx-auto bg-gold/5 rounded-full border border-gold/10 p-8 flex items-center justify-center overflow-hidden">
      {/* Scanning Line Effect */}
      <motion.div 
        className="absolute inset-0 w-full h-1 bg-gold/20 blur-sm z-20"
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_30px_rgba(255,215,0,0.1)]">
        {regions.map((region) => (
          <motion.path
            key={region.id}
            d={region.path}
            fill={activeRegion === region.id || hovered === region.id ? region.color : "transparent"}
            stroke="hsl(var(--uganda-gold))"
            strokeWidth="1"
            strokeOpacity={0.5}
            fillOpacity={activeRegion === region.id ? 0.4 : hovered === region.id ? 0.2 : 0.05}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            onMouseEnter={() => setHovered(region.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => onRegionSelect(region.id)}
            className="cursor-pointer transition-all duration-300"
            whileHover={{ scale: 1.02, strokeOpacity: 1 }}
          />
        ))}
      </svg>

      {/* Region Label Overlay */}
      <AnimatePresence>
        {(hovered || activeRegion !== "All") && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-md border border-gold/30 px-4 py-2 rounded-lg text-center z-30"
          >
            <p className="text-[10px] text-gold font-bold uppercase tracking-widest mb-1">Active Sector</p>
            <p className="text-sm font-bold text-white">{hovered || activeRegion}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, hsl(var(--uganda-gold)) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    </div>
  );
}

import { AnimatePresence } from "framer-motion";