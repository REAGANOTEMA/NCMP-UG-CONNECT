import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CheckCircle2, MapPin, Users, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MP } from "@/data/ugandaData";
import { PARTIES } from "@/data/ugandaData";

interface MPProfileCardProps {
  mp: MP;
  compact?: boolean;
}

const partyColors: Record<string, string> = {
  NRM: "hsl(45 100% 51%)",
  NUP: "hsl(3 90% 45%)",
  FDC: "hsl(210 80% 50%)",
  DP: "hsl(142 60% 35%)",
  UPC: "hsl(0 80% 35%)",
  JEEMA: "hsl(142 60% 30%)",
  ANT: "hsl(25 90% 50%)",
  PPP: "hsl(270 60% 50%)",
  Independent: "hsl(220 10% 55%)",
  UPDF: "hsl(130 50% 35%)",
  UFA: "hsl(200 70% 45%)",
};

const genderAvatarBg = (gender: "Male" | "Female") =>
  gender === "Female" ? "hsl(330 60% 30%)" : "hsl(220 60% 25%)";

export default function MPProfileCard({ mp, compact = false }: MPProfileCardProps) {
  const initials = mp.name
    .split(" ")
    .slice(-2)
    .map(n => n[0])
    .join("");

  const partyColor = partyColors[mp.party] || "hsl(220 10% 55%)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="ncmp-card overflow-hidden cursor-pointer group"
    >
      {/* Party color accent bar */}
      <div className="h-1" style={{ background: partyColor }} />

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          {/* Avatar */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-foreground font-bold text-base flex-shrink-0"
            style={{
              background: genderAvatarBg(mp.gender),
              outline: `2px solid ${partyColor}`,
              outlineOffset: "2px",
            }}
          >
            {initials}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="text-foreground font-semibold text-sm leading-tight truncate">
                {mp.name}
              </h3>
              {mp.verified && (
                <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{ color: partyColor }} />
              )}
            </div>
            <p className="text-gold text-xs font-medium mt-0.5 truncate">{mp.constituency}</p>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{mp.district} — {mp.region} Region</span>
          </div>

          <div className="flex items-center justify-between">
            <span
              className="text-xs font-bold px-2 py-0.5 rounded-sm"
              style={{ background: `${partyColor}22`, color: partyColor, border: `1px solid ${partyColor}44` }}
            >
              {mp.party}
            </span>
            <span className="text-xs text-[hsl(var(--muted-foreground))]">{mp.type}</span>
          </div>

          {mp.bio && !compact && (
            <p className="text-xs text-[hsl(var(--muted-foreground))] line-clamp-2 mt-1">
              {mp.bio}
            </p>
          )}
        </div>

        {/* Footer actions */}
        {!compact && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-[hsl(var(--border))]">
            <Link to={`/parliament/mps/${mp.id}`} className="flex-1">
              <button className="w-full text-xs py-1.5 rounded bg-[hsl(var(--uganda-gold)/0.1)] text-gold hover:bg-[hsl(var(--uganda-gold)/0.2)] transition-colors font-medium flex items-center justify-center gap-1">
                <ExternalLink className="w-3 h-3" />
                View Profile
              </button>
            </Link>
            <button className="flex-1 text-xs py-1.5 rounded bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted)/0.8)] transition-colors">
              Follow
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
