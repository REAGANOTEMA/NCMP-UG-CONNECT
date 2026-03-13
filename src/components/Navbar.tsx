import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Bell, MessageSquare, ChevronDown, LogOut, User, LayoutDashboard, Search, Home, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "../context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const isMP = user?.role === 'mp';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--uganda-black)/0.98)] backdrop-blur-xl border-b border-gold/10">
      <div className="bg-gradient-to-r from-black via-gold to-red-600 h-1 w-full" />
      
      <div className="max-w-[1600px] mx-auto px-4 h-14 flex items-center justify-between gap-4">
        {/* Left: Logo & Search */}
        <div className="flex items-center gap-3 flex-1">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative">
              <img src="/ncmp-logo.png" alt="NCMP Logo" className="h-9 w-9 drop-shadow-[0_0_8px_rgba(255,215,0,0.4)] group-hover:scale-110 transition-transform" />
              <div className="absolute inset-0 bg-gold/20 blur-xl rounded-full -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-gold font-display font-bold text-xl hidden sm:block">NCMP</span>
          </Link>
          
          <div className="relative max-w-md w-full hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search Parliament, MPs, or Issues..." 
              className="bg-muted/50 border-none h-9 pl-10 focus-visible:ring-gold/50 w-full rounded-full"
            />
          </div>
        </div>

        {/* Center: Social Navigation */}
        <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {[
            { icon: Home, href: "/feed", label: "Home" },
            { icon: Users, href: "/parliament/mps", label: "MPs" },
            { icon: Globe, href: "/constituencies", label: "Regions" },
            { icon: LayoutDashboard, href: isMP ? "/mp/dashboard" : "/analytics", label: "Stats" },
          ].map((item) => (
            <Link 
              key={item.href} 
              to={item.href}
              className={`px-8 py-2 rounded-lg transition-all relative group ${
                location.pathname === item.href ? "text-gold" : "text-muted-foreground hover:bg-gold/5"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {location.pathname === item.href && (
                <motion.div layoutId="nav-active" className="absolute bottom-0 left-0 right-0 h-1 bg-gold rounded-t-full" />
              )}
              <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gold text-black text-[10px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {item.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right: Profile & Actions */}
        <div className="flex items-center gap-2 flex-1 justify-end">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-1 mr-2">
                <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-gold/10 text-muted-foreground hover:text-gold">
                  <Bell className="w-5 h-5" />
                </Button>
                <Link to="/messages">
                  <Button variant="ghost" size="icon" className="rounded-full bg-muted/50 hover:bg-gold/10 text-muted-foreground hover:text-gold">
                    <MessageSquare className="w-5 h-5" />
                  </Button>
                </Link>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="p-0 h-9 w-9 rounded-full border-2 border-gold/20 hover:border-gold transition-colors overflow-hidden">
                    <div className="w-full h-full bg-gold/10 flex items-center justify-center text-gold font-bold text-sm">
                      {user?.firstName[0]}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-card border-gold/10">
                  <DropdownMenuLabel className="flex items-center gap-3 p-4">
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                      {user?.firstName[0]}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold">{user?.firstName} {user?.lastName}</span>
                      <span className="text-[10px] text-gold uppercase tracking-widest">{user?.role}</span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile/settings")} className="cursor-pointer py-3">
                    <User className="w-4 h-4 mr-3" /> View Profile
                  </DropdownMenuItem>
                  {isMP && (
                    <DropdownMenuItem onClick={() => navigate("/mp/dashboard")} className="cursor-pointer py-3">
                      <LayoutDashboard className="w-4 h-4 mr-3" /> Command Center
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => { logout(); navigate("/login"); }} className="cursor-pointer py-3 text-red-500 focus:text-red-500">
                    <LogOut className="w-4 h-4 mr-3" /> Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"><Button variant="ghost" className="text-gold">Sign In</Button></Link>
              <Link to="/register"><Button className="bg-gold text-black font-bold">Join NCMP</Button></Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}