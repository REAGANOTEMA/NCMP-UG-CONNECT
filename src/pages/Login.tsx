import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, User, Users, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  { value: "citizen", label: "Citizen", icon: <User className="w-6 h-6" />, desc: "General public access" },
  { value: "mp", label: "Member of Parliament", icon: <Users className="w-6 h-6" />, desc: "Parliamentary access" },
  { value: "official", label: "Government Official", icon: <Briefcase className="w-6 h-6" />, desc: "Executive access" },
  { value: "staff", label: "Parliamentary Staff", icon: <FileText className="w-6 h-6" />, desc: "Staff access" },
];

export default function Login() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [selectedRole, setSelectedRole] = useState("citizen");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login
    setTimeout(() => {
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("user", JSON.stringify({ email: form.email, role: selectedRole }));
      navigate("/feed");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="flex items-center gap-4 mb-12">
            <img src="/ncmp-logo.png" alt="NCMP Logo" className="w-12 h-12" />
            <div>
              <div className="text-gold font-display font-bold text-2xl">NCMP Uganda</div>
              <div className="text-muted-foreground text-sm tracking-wider">Official Platform</div>
            </div>
          </Link>

          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Welcome Back</h1>
          <p className="text-muted-foreground mb-8">Sign in to your official NCMP account</p>

          <div className="mb-8">
            <Label className="text-muted-foreground text-xs uppercase tracking-widest mb-3 block">Account Type</Label>
            <div className="grid grid-cols-2 gap-3">
              {roles.map(role => (
                <button
                  key={role.value}
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    selectedRole === role.value
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  <div className={selectedRole === role.value ? "text-gold" : ""}>{role.icon}</div>
                  <div className="text-sm font-bold mt-2">{role.label}</div>
                  <div className="text-[10px] opacity-60">{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label>Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type="email" 
                  className="pl-10 bg-card border-border" 
                  placeholder="name@domain.go.ug"
                  value={form.email}
                  onChange={(e) => setForm({...form, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  type={showPwd ? "text" : "password"} 
                  className="pl-10 pr-10 bg-card border-border"
                  value={form.password}
                  onChange={(e) => setForm({...form, password: e.target.value})}
                />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button className="w-full bg-gold text-black hover:bg-gold/90 h-12 font-bold text-lg">
              {loading ? "Authenticating..." : "Sign In"}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </form>

          <div className="mt-10 p-4 rounded-lg bg-muted/50 border border-border flex items-start gap-3">
            <Shield className="w-5 h-5 text-gold mt-0.5" />
            <p className="text-xs text-muted-foreground leading-relaxed">
              This is a secure government platform. Unauthorized access is prohibited under the Uganda Computer Misuse Act.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-black via-zinc-900 to-black items-center justify-center p-12">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-8">🇺🇬</div>
          <h2 className="text-4xl font-display font-bold text-gold mb-4">National Civic Infrastructure</h2>
          <p className="text-muted-foreground text-lg">Connecting every Ugandan to the heart of governance through secure, transparent digital channels.</p>
        </div>
      </div>
    </div>
  );
}