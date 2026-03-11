import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, MessageSquare, Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button"; // ✅ Correct import for your Button component

// Logo from public folder
const logo = "/ncmp-logo.png"; // Put ncmp-logo.png in your public folder

// Socket & Firebase
import { initSocket, connectSocket } from "@/services/socket";
import { requestFirebaseToken } from "@/firebase";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Parliament",
    href: "/parliament",
    sub: [
      { label: "MP Directory", href: "/parliament/mps" },
      { label: "Committees", href: "/parliament/committees" },
      { label: "Sessions", href: "/parliament/sessions" },
    ],
  },
  { label: "Constituencies", href: "/constituencies" },
  { label: "Projects", href: "/projects" },
  { label: "Analytics", href: "/analytics" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Initialize backend & notifications
  useEffect(() => {
    initSocket();
    connectSocket();
    requestFirebaseToken();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--uganda-black)/0.95)] backdrop-blur-md border-b border-[hsl(var(--uganda-gold)/0.2)]">
      {/* Top Government Bar */}
      <div className="bg-[hsl(var(--uganda-red))] py-1 px-4 text-center">
        <span className="text-xs font-semibold tracking-widest text-[hsl(var(--uganda-white))] uppercase">
          Official Civic Digital Infrastructure, Republic of Uganda
        </span>
      </div>

      {/* Main Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="NCMP Logo" className="h-10 w-auto rounded-lg" />
            <div className="flex flex-col">
              <div className="text-gold font-display font-bold text-lg leading-none">NCMP</div>
              <div className="text-[hsl(var(--muted-foreground))] text-[10px] tracking-widest uppercase">
                Uganda · 2026
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.sub && setActiveDropdown(link.href)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === link.href
                      ? "text-gold bg-[hsl(var(--uganda-gold)/0.1)]"
                      : "text-foreground hover:text-gold hover:bg-[hsl(var(--uganda-gold)/0.05)]"
                  }`}
                >
                  {link.label}
                  {link.sub && <ChevronDown className="w-3 h-3" />}
                </Link>

                {link.sub && activeDropdown === link.href && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-lg shadow-elegant overflow-hidden"
                  >
                    {link.sub.map(sub => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:text-gold hover:bg-[hsl(var(--uganda-gold)/0.05)] transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
              <Search className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold relative">
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[hsl(var(--uganda-red))] rounded-full" />
            </Button>
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
              <MessageSquare className="w-4 h-4" />
            </Button>
            <Link to="/login">
              <Button variant="outline" size="sm" className="border-gold text-gold hover:bg-[hsl(var(--uganda-gold)/0.1)] ml-1">
                Sign In
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(var(--uganda-gold)/0.9)] font-semibold">
                Register
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-foreground hover:text-gold transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 rounded-md text-sm font-medium text-foreground hover:text-gold hover:bg-[hsl(var(--uganda-gold)/0.05)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 flex gap-2 border-t border-border">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full border-gold text-gold" onClick={() => setOpen(false)}>
                    Sign In
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full bg-gold text-[hsl(var(--uganda-black))] font-semibold" onClick={() => setOpen(false)}>
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}