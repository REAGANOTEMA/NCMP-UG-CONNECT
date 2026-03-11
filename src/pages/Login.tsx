import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, User, Users, Briefcase, FileText, Megaphone, BarChart, MessageCircle, Bell } from "lucide-react";
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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert("Please fill all fields");

    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, role: selectedRole }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Icon hover shake animation
  const shake = { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0], transition: { duration: 0.5 } };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
         {/* Logo */}
<Link to="/" className="flex items-center gap-4 mb-12">
  {/* Logo Image */}
  <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
    <img
      src="/ncmp-logo.png"
      alt="NCMP Uganda Logo"
      className="w-full h-full object-contain"
    />
  </div>

  {/* Logo Text */}
  <div>
    <div className="text-gold font-display font-bold text-2xl">NCMP Uganda</div>
    <div className="text-[hsl(var(--muted-foreground))] text-sm tracking-wider">Official Platform</div>
  </div>
</Link>
          <div className="mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-[hsl(var(--muted-foreground))] mt-3 text-lg">Sign in to your official NCMP account</p>
          </div>

          {/* Role selector */}
          <div className="mb-8">
            <Label className="text-[hsl(var(--muted-foreground))] text-sm uppercase tracking-wider mb-3 block">
              Account Type
            </Label>
            <div className="grid grid-cols-2 gap-4">
              {roles.map(role => (
                <motion.button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  whileHover={shake}
                  className={`p-5 rounded-lg border text-left transition-all flex flex-col gap-2 ${
                    selectedRole === role.value
                      ? "border-gold bg-[hsl(var(--uganda-gold)/0.1)] text-foreground"
                      : "border-border bg-card text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--uganda-gold)/0.3)]"
                  }`}
                >
                  {role.icon}
                  <div className="text-sm font-semibold">{role.label}</div>
                  <div className="text-xs opacity-70">{role.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Login Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-foreground text-sm font-medium mb-2 block">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-12 py-3 bg-card border-border focus:border-gold text-lg"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground text-sm font-medium mb-2 block">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[hsl(var(--muted-foreground))]" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-12 pr-12 py-3 bg-card border-border focus:border-gold text-lg"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
                >
                  {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-base">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-[hsl(var(--muted-foreground))]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gold hover:text-[hsl(45_100%_45%)] font-semibold transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold text-lg h-14 shadow-gold flex items-center justify-center gap-3"
            >
              {loading ? "Signing in..." : "Sign In to NCMP"}
              {!loading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </form>

          <div className="mt-8 text-center text-lg">
            <p className="text-[hsl(var(--muted-foreground))]">
              Don't have an account?{" "}
              <Link to="/register" className="text-gold hover:text-[hsl(45_100%_45%)] font-semibold transition-colors">
                Register here
              </Link>
            </p>
          </div>

          {/* Security notice */}
          <div className="mt-10 p-4 rounded-lg bg-[hsl(var(--muted)/0.5)] border border-border flex items-start gap-3">
            <Shield className="w-6 h-6 text-gold mt-1 flex-shrink-0" />
            <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed">
              This is a secure government platform. Unauthorized access is prohibited under the Uganda Computer Misuse Act.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center items-center p-16 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 4%), hsl(220 20% 8%), hsl(45 30% 8%))" }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-2 flex flex-col">
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
        </div>

        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center max-w-md">
          <motion.div whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }} className="text-9xl mb-8">🇺🇬</motion.div>
          <h2 className="font-display text-4xl font-bold text-gold mb-5">Governance for All Ugandans</h2>
          <p className="text-[hsl(var(--muted-foreground))] text-lg leading-relaxed mb-10">
            NCMP connects every citizen with their elected representatives, enabling transparent, accountable, and participatory democracy.
          </p>
          <div className="space-y-4 text-left text-lg">
            {[
              { icon: <Users />, text: "Direct access to your MP" },
              { icon: <Megaphone />, text: "Submit constituency issues" },
              { icon: <BarChart />, text: "Track development projects" },
              { icon: <MessageCircle />, text: "Real-time government updates" },
              { icon: <Bell />, text: "National announcement alerts" },
            ].map((item, idx) => (
              <motion.div key={idx} whileHover={shake} className="flex items-center gap-3 text-foreground">
                <div className="w-6 h-6">{item.icon}</div>
                <span>{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}