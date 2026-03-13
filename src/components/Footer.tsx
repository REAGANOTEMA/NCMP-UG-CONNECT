import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import crownedCrane from "@/assets/crowned-crane.png";
import ncmpLogo from "@/assets/ncmp-logo.png";

const footerLinks = {
  "Platform": [
    { label: "MP Directory", href: "/parliament/mps" },
    { label: "Constituencies", href: "/constituencies" },
    { label: "National Projects", href: "/projects" },
    { label: "Governance Analytics", href: "/analytics" },
  ],
  "Resources": [
    { label: "Help Centre", href: "/support" },
    { label: "Citizen Guide", href: "/guide" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  "Government": [
    { label: "Parliament of Uganda", href: "https://parliament.go.ug", external: true },
    { label: "State House", href: "https://statehouse.go.ug", external: true },
    { label: "Ministry of ICT", href: "https://ict.go.ug", external: true },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* National Crane Animation Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden h-32">
        <motion.div
          className="absolute top-8"
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ 
            x: "110%", 
            opacity: [0, 1, 1, 0],
            y: [0, -10, 5, -15, 0] 
          }}
          transition={{ 
            x: { duration: 25, repeat: Infinity, ease: "linear" },
            opacity: { duration: 25, repeat: Infinity, times: [0, 0.1, 0.9, 1] },
            y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <div className="relative">
            <motion.img
              src={crownedCrane}
              alt="Grey Crowned Crane"
              className="h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]"
              animate={{ scaleY: [1, 0.8, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Subtle wind trail */}
            <div className="absolute -left-4 top-1/2 w-8 h-px bg-gradient-to-r from-transparent to-gold/20 blur-sm" />
          </div>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-12 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={ncmpLogo} alt="NCMP Logo" className="h-12 w-auto" />
              <div>
                <div className="text-gold font-display font-bold text-xl tracking-tight">NCMP</div>
                <div className="text-[10px] text-muted-foreground tracking-[0.3em] uppercase">Uganda</div>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              The official digital civic infrastructure connecting citizens, Parliament, and national leadership.
            </p>
          </div>

          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-gold text-xs font-bold uppercase tracking-[0.2em] mb-6">{section}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-gold transition-colors">
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm text-muted-foreground hover:text-gold transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="text-xs text-muted-foreground">
              © 2026 National Constituency Management Platform. All Rights Reserved.
            </p>
            <p className="text-[10px] text-gold font-bold uppercase tracking-widest mt-1">
              For God and My Country
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-muted-foreground uppercase tracking-tighter">Official Status</span>
              <span className="text-xs font-bold text-foreground flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                SYSTEMS OPERATIONAL
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Flag Stripe */}
      <div className="flex h-1">
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-gold" />
        <div className="flex-1 bg-red-600" />
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-gold" />
        <div className="flex-1 bg-red-600" />
      </div>
    </footer>
  );
}