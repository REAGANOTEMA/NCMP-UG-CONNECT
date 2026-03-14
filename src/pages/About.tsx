"use client";

import { motion } from "framer-motion";
import { Shield, Globe, Users, Award, CheckCircle2, Building2, Cpu, Lock, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

export default function About() {
  const values = [
    { icon: Shield, title: "Transparency", desc: "Open access to parliamentary proceedings and representative data." },
    { icon: Globe, title: "Connectivity", desc: "Bridging the gap between the capital and the furthest constituency." },
    { icon: Users, title: "Engagement", desc: "Empowering citizens to participate directly in national discourse." },
    { icon: Award, title: "Accountability", desc: "Tracking national development projects and legislative promises." },
  ];

  const techFeatures = [
    { icon: Lock, title: "Enterprise Security", desc: "Secure cloud-based infrastructure with advanced encryption." },
    { icon: Cpu, title: "Scalable Architecture", desc: "Built to support millions of users across the Republic." },
    { icon: Zap, title: "Real-time Data", desc: "Instant communication and live governance analytics." },
    { icon: Building2, title: "Local Innovation", desc: "Proudly developed in Kampala by Nexterp Systems Ltd." },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold/10 border border-gold/20 text-gold text-[10px] font-bold uppercase tracking-widest mb-6">
            Official Technology Partner: Nexterp Systems Ltd
          </div>
          <h1 className="font-display text-4xl sm:text-6xl font-bold text-foreground mb-6">
            The Future of <span className="text-gold">Digital Governance</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            NCMP Uganda Connect is a comprehensive digital system designed to strengthen communication, 
            transparency, and engagement between the Parliament of Uganda and its citizens.
          </p>
        </motion.div>

        {/* Core Values */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((value, i) => (
            <motion.div 
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="ncmp-card p-6 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                <value.icon className="w-6 h-6 text-gold" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl font-bold text-foreground mb-6">Built on Enterprise Technology</h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Nexterp Systems Ltd has deployed a modern digital infrastructure capable of supporting 
              the Government of Uganda's digital transformation agenda. Our platform ensures that 
              every citizen has a secure and verified channel to their representative.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {techFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="ncmp-card p-8 bg-gradient-to-br from-gold/5 to-transparent border-gold/20"
          >
            <h3 className="text-xl font-bold text-gold mb-6">Implementation Roadmap</h3>
            <div className="space-y-6">
              {[
                { phase: "Phase 1", title: "System Deployment", desc: "Infrastructure setup and security configuration." },
                { phase: "Phase 2", title: "Parliamentary Integration", desc: "Creation of verified MP profiles and staff onboarding." },
                { phase: "Phase 3", title: "National Citizen Access", desc: "Citizen registration portal activation and national rollout." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-bold text-xs">
                    {i + 1}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-gold uppercase tracking-widest">{step.phase}</div>
                    <h4 className="text-sm font-bold text-foreground">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cost Transparency Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="ncmp-card p-12 text-center mb-24"
        >
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">National Investment Options</h2>
          <p className="text-muted-foreground mb-10 max-w-2xl mx-auto">
            Nexterp Systems Ltd offers flexible acquisition models to ensure the Parliament of Uganda 
            can sustainably manage this national digital asset.
          </p>
          <div className="grid sm:grid-cols-2 gap-8">
            <div className="p-8 rounded-xl bg-muted/30 border border-border hover:border-gold/30 transition-all">
              <h4 className="text-lg font-bold text-foreground mb-2">Full Government Ownership</h4>
              <div className="text-3xl font-bold text-gold mb-4">UGX 500M</div>
              <p className="text-xs text-muted-foreground mb-6">
                Full ownership rights transferred to the Government of Uganda as a national digital infrastructure asset.
              </p>
              <Button className="w-full bg-gold text-black font-bold">Select Option 1</Button>
            </div>
            <div className="p-8 rounded-xl bg-muted/30 border border-border hover:border-gold/30 transition-all">
              <h4 className="text-lg font-bold text-foreground mb-2">Licensed Deployment</h4>
              <div className="text-3xl font-bold text-gold mb-4">UGX 200M</div>
              <p className="text-xs text-muted-foreground mb-6">
                Nexterp retains IP while providing full operational access, technical upgrades, and continuous support.
              </p>
              <Button variant="outline" className="w-full border-gold/20 text-gold hover:bg-gold/10">Select Option 2</Button>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-display text-3xl font-bold text-gold mb-6">For God and My Country</h2>
          <p className="text-muted-foreground italic mb-8">
            "Building a transparent, accountable, and digitally connected Uganda for the 2026 generation."
          </p>
          <div className="flex justify-center gap-8">
            <div className="text-center">
              <div className="text-sm font-bold text-foreground">Reagan Otema</div>
              <div className="text-[10px] text-muted-foreground uppercase">Technology Officer</div>
            </div>
            <div className="text-center">
              <div className="text-sm font-bold text-foreground">Najiib Binsobedde</div>
              <div className="text-[10px] text-muted-foreground uppercase">Operation Officer</div>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}