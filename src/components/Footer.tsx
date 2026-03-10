import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Link } from "react-router-dom";
import crownedCrane from "@/assets/crowned-crane.png";
import coatOfArms from "@/assets/ncmp-logo.png";

const footerLinks = {
  "About NCMP": [
    { label: "Our Mission", href: "/about" },
    { label: "Platform Overview", href: "/about#overview" },
    { label: "Design & Architecture", href: "/about#design" },
    { label: "Official Status", href: "/about#status" },
  ],
  "Quick Links": [
    { label: "MP Directory", href: "/parliament/mps" },
    { label: "Constituencies", href: "/constituencies" },
    { label: "Development Projects", href: "/projects" },
    { label: "National Analytics", href: "/analytics" },
    { label: "Parliament Sessions", href: "/parliament/sessions" },
  ],
  "Government Contacts": [
    { label: "State House Uganda", href: "https://statehouse.go.ug", external: true },
    { label: "Parliament of Uganda", href: "https://parliament.go.ug", external: true },
    { label: "Office of the PM", href: "https://opm.go.ug", external: true },
    { label: "Ministry of ICT", href: "https://ict.go.ug", external: true },
  ],
  "Support": [
    { label: "Help Centre", href: "/support" },
    { label: "Citizen Guide", href: "/guide" },
    { label: "Report an Issue", href: "/report" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-[hsl(0_0%_0%)] border-t border-[hsl(var(--uganda-gold)/0.15)]">
      {/* National Symbol Banner */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[hsl(220_20%_6%)] to-[hsl(0_0%_0%)] border-b border-[hsl(var(--uganda-gold)/0.2)]">
        {/* Flag stripes top bar */}
        <div className="flex h-1.5">
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
        </div>

        {/* Banner content */}
        <div className="relative flex items-center justify-center py-6 overflow-hidden" style={{ minHeight: 120 }}>
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: "radial-gradient(ellipse at center, hsl(45 100% 51%) 0%, transparent 70%)" }}
          />

          {/* Animated flying crane */}
          <motion.div
            className="absolute bottom-4"
            style={{ left: 0 }}
            animate={{
              x: ["-20vw", "110vw"],
              y: [0, -20, 5, -15, 0, -10, 5],
            }}
            transition={{
              x: { duration: 22, repeat: Infinity, repeatDelay: 6, ease: "linear" as const },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" as const },
            }}
          >
            <motion.img
              src={crownedCrane}
              alt="Grey Crowned Crane – National Bird of Uganda"
              className="h-16 w-auto object-contain drop-shadow-lg"
              animate={{ scaleY: [1, 0.8, 1, 0.85, 1] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" as const }}
            />
          </motion.div>

          {/* Center: Coat of Arms + Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center gap-3 z-10"
          >
            <img
              src={coatOfArms}
              alt="Uganda Coat of Arms"
              className="h-14 w-14 object-contain"
            />
            <div className="text-center">
              <div className="text-gold font-display font-bold text-lg tracking-wider">
                NATIONAL CONSTITUENCY MANAGEMENT PLATFORM
              </div>
              <div className="text-[hsl(var(--muted-foreground))] text-xs tracking-[0.3em] uppercase">
                Republic of Uganda · Official Digital Governance System
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom flag stripes */}
        <div className="flex h-1.5">
          <div className="flex-1 flag-stripe-red" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-red" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-black" />
        </div>
      </div>

      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-gold font-semibold text-sm uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--muted-foreground))] hover:text-gold text-sm transition-colors"
                      >
                        {link.label} ↗
                      </a>
                    ) : (
                      <Link
                        to={link.href}
                        className="text-[hsl(var(--muted-foreground))] hover:text-gold text-sm transition-colors"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-[hsl(var(--uganda-gold)/0.15)]">
          {/* Contact bar */}
          <div className="grid sm:grid-cols-3 gap-4 mb-8 p-4 rounded-lg bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
            <div className="text-center">
              <div className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">Parliament Hotline</div>
              <div className="text-foreground text-sm">+256 414 377 000</div>
            </div>
            <div className="text-center border-x border-[hsl(var(--border))]">
              <div className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">State House</div>
              <div className="text-foreground text-sm">+256 414 234 988</div>
            </div>
            <div className="text-center">
              <div className="text-gold text-xs font-semibold uppercase tracking-wider mb-1">Support Center</div>
              <div className="text-foreground text-sm">ncmp@ict.go.ug</div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-foreground text-sm font-semibold">
                © 2026 National Constituency Management Platform (NCMP – Uganda)
              </p>
              <p className="text-[hsl(var(--muted-foreground))] text-xs mt-1">
                Connecting Citizens, Parliament and National Leadership
              </p>
              <p className="text-gold text-xs mt-0.5 font-medium tracking-wide">
                Official Civic Digital Infrastructure of the Republic of Uganda
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-[hsl(var(--muted-foreground))] text-xs">Design Credit: Reagan Otema</p>
              <div className="flex items-center gap-2 mt-2 justify-center md:justify-end">
                <span className="text-[hsl(var(--muted-foreground))] text-xs">For God and My Country</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
