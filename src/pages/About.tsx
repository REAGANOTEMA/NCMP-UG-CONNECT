"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Users, Award, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const values = [
    { icon: Shield, title: "Transparency", desc: "Open access to parliamentary proceedings and representative data." },
    { icon: Globe, title: "Connectivity", desc: "Bridging the gap between the capital and the furthest constituency." },
    { icon: Users, title: "Engagement", desc: "Empowering citizens to participate directly in national discourse." },
    { icon: Award, title: "Accountability", desc: "Tracking national development projects and legislative promises." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-6">
            About <span className="text-gold">NCMP Uganda</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            The National Constituency Management Platform is Uganda's official civic digital infrastructure, 
            designed to unify governance and citizen engagement for the 2026 generation.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-8 mb-20">
          {values.map((value, i) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="ncmp-card p-8"
            >
              <value.icon className="w-10 h-10 text-gold mb-6" />
              <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="ncmp-card p-12 text-center bg-gold/5 border-gold/20"
        >
          <h2 className="font-display text-3xl font-bold text-gold mb-6">Our National Motto</h2>
          <p className="text-4xl font-display font-bold text-foreground italic mb-8">
            "For God and My Country"
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-gold" /> OFFICIAL REGISTRY
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-gold" /> SECURE INFRASTRUCTURE
            </div>
            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-gold" /> CITIZEN CENTRIC
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}