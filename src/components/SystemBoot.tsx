"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Shield, Cpu, Globe, Lock } from "lucide-react";

export default function SystemBoot({ onComplete }: { onComplete: () => void }) {
  const [status, setStatus] = useState(0);
  const logs = [
    "Initializing NCMP Core...",
    "Establishing Secure Uplink to Parliament House...",
    "Loading National Registry (2021-2026)...",
    "Verifying Digital Sovereignty Protocols...",
    "Synchronizing Constituency Data...",
    "System Operational. Welcome to the Republic."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus((prev) => {
        if (prev >= logs.length - 1) {
          clearInterval(timer);
          setTimeout(onComplete, 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-6"
    >
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              rotate: { duration: 4, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-20 h-20 rounded-xl border-2 border-gold/30 flex items-center justify-center relative"
          >
            <Shield className="w-10 h-10 text-gold" />
            <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full" />
          </motion.div>
        </div>

        <div className="space-y-2 font-mono">
          {logs.slice(0, status + 1).map((log, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 text-[10px] sm:text-xs"
            >
              <span className="text-gold/40">[{new Date().toLocaleTimeString()}]</span>
              <span className={i === status ? "text-gold" : "text-muted-foreground"}>
                {i === status ? "> " : "✓ "}{log}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold text-gold uppercase tracking-widest">
            <span>System Integrity</span>
            <span>{Math.round(((status + 1) / logs.length) * 100)}%</span>
          </div>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gold"
              initial={{ width: 0 }}
              animate={{ width: `${((status + 1) / logs.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Technical Background Elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 border border-gold rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 border border-red-600 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
}