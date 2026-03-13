import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, MessageSquare, Search, ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const logo = "/ncmp-logo.png";

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
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--uganda-black)/0.95)] backdrop-blur-md border-b border-[hsl(var(--uganda-gold)/0.2)]">
      <div className="bg-[hsl(var(--uganda-red))] py-1 px-4 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-white uppercase">
          Official Civic Digital Infrastructure · Republic of Uganda
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="NCMP Logo" className="h-10 w-auto" />
            <div className="flex flex-col">
              <div className="text-gold font-display font-bold text-lg leading-none">NCMP</div>
              <div className="text-[hsl(var(--muted-foreground))] text-[10px] tracking-widest uppercase">
                Uganda · 2026
              </div>
            </div>
          </Link>

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
                    location.pathname.startsWith(link.href) && link.href !== "/"
                      ? "text-gold bg-gold/10"
                      : "text-foreground hover:text-gold"
                  }`}
                >
                  {link.label}
                  {link.sub && <ChevronDown className="w-3 h-3" />}
                </Link>

                {link.sub && activeDropdown === link.href && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-0 mt-1 w-52 bg-card border border-border rounded-lg shadow-elegant overflow-hidden"
                  >
                    {link.sub.map(sub => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className="block px-4 py-2.5 text-sm text-foreground hover:text-gold hover:bg-gold/5 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold relative">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </Link>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-1 hover:bg-gold/10">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-xs">
                        {user?.firstName[0]}
                      </div>
                      <ChevronDown className="w-3 h-3 text-muted-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold">{user?.firstName} {user?.lastName}</span>
                        <span className="text-[10px] text-gold uppercase tracking-wider">{user?.role}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="cursor-pointer">
                      <User className="w-4 h-4 mr-2" /> Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500">
                      <LogOut className="w-4 h-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-gold hover:bg-gold/10">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-gold text-black hover:bg-gold/90 font-bold">Register</Button>
                </Link>
              </>
            )}
          </div>

          <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map(link => (
                <Link key={link.href} to={link.href} onClick={() => setOpen(false)} className="block text-lg font-medium text-foreground">
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <div className="pt-4 flex flex-col gap-3">
                  <Link to="/login" className="w-full">
                    <Button variant="outline" className="w-full border-gold text-gold">Sign In</Button>
                  </Link>
                  <Link to="/register" className="w-full">
                    <Button className="w-full bg-gold text-black font-bold">Register</Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}