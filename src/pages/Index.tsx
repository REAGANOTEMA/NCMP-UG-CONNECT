import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Users, MessageSquare, BarChart3, MapPin, Shield, Zap,
  ArrowRight, ChevronRight, Star, Globe, TrendingUp, Radio
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MPProfileCard from "@/components/MPProfileCard";
import { nationalOfficials, allMPs, REGIONS, partyStats } from "@/data/ugandaData";

const stats = [
  { label: "Members of Parliament", value: "529", icon: Users, color: "text-gold" },
  { label: "Constituencies", value: "290+", icon: MapPin, color: "text-[hsl(var(--uganda-red))]" },
  { label: "Registered Citizens", value: "20M+", icon: Globe, color: "text-gold" },
  { label: "Active Projects", value: "1,240+", icon: TrendingUp, color: "text-[hsl(var(--uganda-red))]" },
];

const features = [
  {
    icon: Users,
    title: "Civic Social Network",
    desc: "Connect with MPs, government officials, and fellow citizens. Post, comment, share issues, and participate in national discourse.",
    color: "text-gold",
    bg: "bg-[hsl(var(--uganda-gold)/0.08)]",
    border: "border-[hsl(var(--uganda-gold)/0.2)]",
  },
  {
    icon: MessageSquare,
    title: "Real-Time Messaging",
    desc: "Secure instant communication between citizens, MPs, and national leadership. Private messages, groups, and document sharing.",
    color: "text-[hsl(var(--uganda-red))]",
    bg: "bg-[hsl(var(--uganda-red)/0.08)]",
    border: "border-[hsl(var(--uganda-red)/0.2)]",
  },
  {
    icon: BarChart3,
    title: "Governance Analytics",
    desc: "Real-time dashboards tracking citizen engagement, MP responsiveness, regional issues, and national development progress.",
    color: "text-gold",
    bg: "bg-[hsl(var(--uganda-gold)/0.08)]",
    border: "border-[hsl(var(--uganda-gold)/0.2)]",
  },
  {
    icon: Shield,
    title: "Constituency Management",
    desc: "MPs manage community issues, development projects, and citizen complaints. Citizens track progress in real time.",
    color: "text-[hsl(var(--uganda-red))]",
    bg: "bg-[hsl(var(--uganda-red)/0.08)]",
    border: "border-[hsl(var(--uganda-red)/0.2)]",
  },
  {
    icon: Radio,
    title: "Voice & Video Calls",
    desc: "WebRTC-powered voice calls, video calls, government broadcasts, and live town hall meetings across Uganda.",
    color: "text-gold",
    bg: "bg-[hsl(var(--uganda-gold)/0.08)]",
    border: "border-[hsl(var(--uganda-gold)/0.2)]",
  },
  {
    icon: Zap,
    title: "Push Notifications",
    desc: "Instant alerts for government announcements, project updates, new messages, and national civic events.",
    color: "text-[hsl(var(--uganda-red))]",
    bg: "bg-[hsl(var(--uganda-red)/0.08)]",
    border: "border-[hsl(var(--uganda-red)/0.2)]",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.6 } }),
};

export default function Index() {
  const featuredMPs = allMPs.slice(0, 8);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
        style={{ background: "var(--gradient-hero)" }}
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, hsl(45 100% 51%) 0%, transparent 70%)" }} />
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full opacity-5"
            style={{ background: "radial-gradient(circle, hsl(3 90% 45%) 0%, transparent 70%)" }} />
          {/* Vertical flag stripe accent */}
          <div className="absolute right-0 top-0 bottom-0 w-1.5 flex flex-col">
            <div className="flex-1 flag-stripe-black" />
            <div className="flex-1 flag-stripe-gold" />
            <div className="flex-1 flag-stripe-red" />
            <div className="flex-1 flag-stripe-black" />
            <div className="flex-1 flag-stripe-gold" />
            <div className="flex-1 flag-stripe-red" />
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          {/* Official badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[hsl(var(--uganda-gold)/0.3)] bg-[hsl(var(--uganda-gold)/0.07)] mb-8"
          >
            <Shield className="w-4 h-4 text-gold" />
            <span className="text-gold text-xs font-semibold tracking-widest uppercase">
              Official Civic Digital Infrastructure · Republic of Uganda
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
              <span className="text-gold">National Constituency</span>
              <br />
              <span className="text-foreground">Management Platform</span>
            </h1>
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-[hsl(var(--uganda-gold)/0.4)]" />
              <span className="text-[hsl(var(--muted-foreground))] text-sm font-medium tracking-widest uppercase">
                NCMP – Uganda 2026
              </span>
              <div className="h-px w-12 bg-[hsl(var(--uganda-gold)/0.4)]" />
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-[hsl(var(--muted-foreground))] text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Uganda's national digital governance system — connecting{" "}
            <span className="text-foreground font-medium">Citizens</span>,{" "}
            <span className="text-gold font-medium">Members of Parliament</span>, and{" "}
            <span className="text-[hsl(var(--uganda-red))] font-medium">National Leadership</span>{" "}
            into one unified platform for transparent, accountable governance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/register">
              <Button size="lg" className="bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold text-base px-8 shadow-gold">
                Join the Platform
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link to="/parliament/mps">
              <Button size="lg" variant="outline" className="border-[hsl(var(--uganda-gold)/0.4)] text-foreground hover:border-gold hover:text-gold text-base px-8">
                View MP Directory
              </Button>
            </Link>
          </motion.div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="ncmp-card p-4 text-center"
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                <div className={`text-2xl font-bold font-display ${stat.color}`}>{stat.value}</div>
                <div className="text-[hsl(var(--muted-foreground))] text-xs mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== NATIONAL LEADERSHIP ===== */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-gold text-sm font-semibold tracking-widest uppercase mb-2">
            🇺🇬 National Leadership 2026
          </div>
          <h2 className="font-display text-4xl font-bold text-foreground">Uganda's Top Officials</h2>
          <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-xl mx-auto">
            Verified accounts for every national leader with direct citizen communication channels
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {nationalOfficials.map((official, i) => (
            <motion.div
              key={official.id}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="ncmp-card p-5"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[hsl(var(--uganda-gold)/0.3)] to-[hsl(var(--uganda-gold)/0.1)] flex items-center justify-center text-gold font-bold text-lg font-display flex-shrink-0 border border-[hsl(var(--uganda-gold)/0.3)]">
                  {official.name.split(" ").slice(-1)[0][0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="verified-badge">✓ VERIFIED</span>
                    <span className="text-xs px-2 py-0.5 rounded bg-[hsl(var(--uganda-gold)/0.1)] text-gold border border-[hsl(var(--uganda-gold)/0.2)]">
                      {official.party}
                    </span>
                  </div>
                  <h3 className="text-foreground font-semibold mt-2 leading-snug text-sm">
                    {official.name}
                  </h3>
                  <p className="text-gold text-xs font-medium mt-1">{official.title}</p>
                  <p className="text-[hsl(var(--muted-foreground))] text-xs mt-2 line-clamp-2">
                    {official.bio}
                  </p>
                </div>
              </div>
              <div className="flex gap-2 mt-4 pt-4 border-t border-[hsl(var(--border))]">
                <button className="flex-1 text-xs py-1.5 rounded bg-[hsl(var(--uganda-gold)/0.1)] text-gold hover:bg-[hsl(var(--uganda-gold)/0.2)] transition-colors font-medium">
                  View Profile
                </button>
                <button className="flex-1 text-xs py-1.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)/0.8)] transition-colors">
                  Send Message
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== PLATFORM FEATURES ===== */}
      <section className="py-20 px-4 sm:px-6 bg-[hsl(var(--card)/0.5)]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-[hsl(var(--uganda-red))] text-sm font-semibold tracking-widest uppercase mb-2">
              Platform Capabilities
            </div>
            <h2 className="font-display text-4xl font-bold text-foreground">Three Integrated Systems</h2>
            <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-xl mx-auto">
              Civic social network, real-time communication, and national governance intelligence — unified
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className={`ncmp-card p-6 ${f.bg} ${f.border} border`}
              >
                <div className={`w-10 h-10 rounded-lg ${f.bg} border ${f.border} flex items-center justify-center mb-4`}>
                  <f.icon className={`w-5 h-5 ${f.color}`} />
                </div>
                <h3 className="text-foreground font-semibold mb-2">{f.title}</h3>
                <p className="text-[hsl(var(--muted-foreground))] text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED MPs ===== */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-10"
        >
          <div>
            <div className="text-gold text-sm font-semibold tracking-widest uppercase mb-1">
              Parliament of Uganda
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground">Featured MPs</h2>
          </div>
          <Link to="/parliament/mps">
            <Button variant="outline" className="border-[hsl(var(--uganda-gold)/0.3)] text-gold hover:border-gold hidden sm:flex">
              View All MPs <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredMPs.map(mp => (
            <MPProfileCard key={mp.id} mp={mp} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/parliament/mps">
            <Button className="bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold">
              View Full MP Directory (100+ MPs)
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* ===== PARTY DISTRIBUTION ===== */}
      <section className="py-16 px-4 sm:px-6 bg-[hsl(var(--card)/0.5)]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="font-display text-3xl font-bold text-foreground">Party Representation</h2>
            <p className="text-[hsl(var(--muted-foreground))] mt-2">10th Parliament of Uganda</p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {partyStats.map((p, i) => (
              <motion.div
                key={p.party}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                className="ncmp-card p-4 text-center"
              >
                <div
                  className="text-2xl font-bold font-display mb-1"
                  style={{ color: p.color }}
                >
                  {p.count}
                </div>
                <div className="font-semibold text-sm" style={{ color: p.color }}>{p.party}</div>
                <div className="text-[hsl(var(--muted-foreground))] text-xs mt-1 leading-tight">{p.fullName}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== REGIONS ===== */}
      <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-4xl font-bold text-foreground">Uganda's Regions</h2>
          <p className="text-[hsl(var(--muted-foreground))] mt-3">Click any region to explore its MPs and constituencies</p>
        </motion.div>

        <div className="grid sm:grid-cols-5 gap-4">
          {REGIONS.map((region, i) => {
            const regionMps = allMPs.filter(mp => mp.region === region);
            const colors = ["text-gold", "text-[hsl(var(--uganda-red))]", "text-gold", "text-[hsl(var(--uganda-red))]", "text-gold"];
            return (
              <motion.div
                key={region}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
              >
                <Link to={`/constituencies?region=${region}`}>
                  <div className="ncmp-card p-6 text-center hover:border-gold transition-colors">
                    <div className={`text-3xl font-bold font-display ${colors[i]}`}>
                      {regionMps.length}
                    </div>
                    <div className="text-foreground font-semibold mt-1">{region}</div>
                    <div className="text-[hsl(var(--muted-foreground))] text-xs mt-1">MPs</div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section
        className="py-24 px-4 sm:px-6 text-center"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 4%), hsl(220 20% 8%), hsl(45 40% 8%))" }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-6">🇺🇬</div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Your Voice Matters in{" "}
              <span className="text-gold">Uganda's Democracy</span>
            </h2>
            <p className="text-[hsl(var(--muted-foreground))] text-lg mb-8">
              Register as a citizen to follow your MP, submit issues, track development projects,
              and participate in shaping your constituency's future.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button size="lg" className="bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold text-base px-10 shadow-gold">
                  Register as a Citizen
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button size="lg" variant="outline" className="border-[hsl(var(--uganda-gold)/0.4)] text-foreground hover:border-gold hover:text-gold text-base px-10">
                  Sign In
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
