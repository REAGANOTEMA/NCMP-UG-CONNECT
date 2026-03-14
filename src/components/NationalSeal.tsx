"use client";

import { motion } from "framer-motion";
import coatOfArms from "@/assets/uganda-coat-of-arms.png";

export default function NationalSeal() {
  return (
    <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
      {/* Outer Rotating Gear/Machine Ring */}
      <motion.div
        className="absolute inset-0 border-4 border-dashed border-gold/20 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Inner Pulsing Ring */}
      <motion.div
        className="absolute inset-4 border border-gold/40 rounded-full"
        animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* The Coat of Arms Seal */}
      <motion.div
        className="relative z-10 w-48 h-48 flex items-center justify-center bg-black/40 backdrop-blur-sm rounded-full border border-gold/30 shadow-[0_0_50px_rgba(255,215,0,0.15)]"
        whileHover={{ scale: 1.05 }}
      >
        <img 
          src={coatOfArms} 
          alt="Uganda Coat of Arms" 
          className="w-32 h-auto object-contain drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]"
        />
      </motion.div>

      {/* Decorative "Machine" Orbits */}
      {[0, 120, 240].map((angle) => (
        <motion.div
          key={angle}
          className="absolute w-2 h-2 bg-gold rounded-full"
          style={{ 
            top: '50%', 
            left: '50%',
            marginTop: '-4px',
            marginLeft: '-4px'
          }}
          animate={{
            rotate: [angle, angle + 360],
            x: [Math.cos(angle * Math.PI / 180) * 140, Math.cos((angle + 360) * Math.PI / 180) * 140],
            y: [Math.sin(angle * Math.PI / 180) * 140, Math.sin((angle + 360) * Math.PI / 180) * 140],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
}