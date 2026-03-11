import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  { value: "citizen", label: "Citizen", icon: "👤", desc: "General public access" },
  { value: "mp", label: "Member of Parliament", icon: "🏛️", desc: "Parliamentary access" },
  { value: "official", label: "Government Official", icon: "⚖️", desc: "Executive access" },
  { value: "staff", label: "Parliamentary Staff", icon: "📋", desc: "Staff access" },
];

export default function Login() {
  const [showPwd, setShowPwd] = useState(false);
  const [selectedRole, setSelectedRole] = useState("citizen");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle login
  // -----------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) return alert("Please fill all fields");

    setLoading(true);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: selectedRole,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      // Save JWT token locally
      localStorage.setItem("token", data.token);

      // Redirect user (could also store user info)
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left: Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 max-w-lg mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex flex-col">
              <div className="flex-1 flag-stripe-black" />
              <div className="flex-1 flag-stripe-gold" />
              <div className="flex-1 flag-stripe-red" />
            </div>
            <div>
              <div className="text-gold font-display font-bold text-xl">NCMP Uganda</div>
              <div className="text-[hsl(var(--muted-foreground))] text-xs tracking-wider">Official Platform</div>
            </div>
          </Link>

          <div className="mb-8">
            <h1 className="font-display text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="text-[hsl(var(--muted-foreground))] mt-2">Sign in to your official NCMP account</p>
          </div>

          {/* Role selector */}
          <div className="mb-6">
            <Label className="text-[hsl(var(--muted-foreground))] text-xs uppercase tracking-wider mb-3 block">
              Account Type
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(role => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    selectedRole === role.value
                      ? "border-gold bg-[hsl(var(--uganda-gold)/0.1)] text-foreground"
                      : "border-border bg-card text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--uganda-gold)/0.3)]"
                  }`}
                >
                  <div className="text-lg mb-1">{role.icon}</div>
                  <div className="text-xs font-semibold">{role.label}</div>
                  <div className="text-xs opacity-70">{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <Label htmlFor="email" className="text-foreground text-sm font-medium mb-1.5 block">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="pl-10 bg-card border-border focus:border-gold"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-foreground text-sm font-medium mb-1.5 block">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-card border-border focus:border-gold"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-foreground transition-colors"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-[hsl(var(--muted-foreground))]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gold hover:text-[hsl(45_100%_45%)] transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold text-base h-11 shadow-gold flex items-center justify-center"
            >
              {loading ? "Signing in..." : "Sign In to NCMP"}
              {!loading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              Don't have an account?{" "}
              <Link to="/register" className="text-gold hover:text-[hsl(45_100%_45%)] font-semibold transition-colors">
                Register here
              </Link>
            </p>
          </div>

          {/* Security notice */}
          <div className="mt-8 p-3 rounded-lg bg-[hsl(var(--muted)/0.5)] border border-border flex items-start gap-2">
            <Shield className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
            <p className="text-[hsl(var(--muted-foreground))] text-xs leading-relaxed">
              This is a secure government platform. Unauthorized access is prohibited under the Uganda Computer Misuse Act.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right: Branding panel */}
      <div
        className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 4%), hsl(220 20% 8%), hsl(45 30% 8%))" }}
      >
        {/* Flag stripes */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center max-w-sm"
        >
          <div className="text-8xl mb-6">🇺🇬</div>
          <h2 className="font-display text-3xl font-bold text-gold mb-4">
            Governance for All Ugandans
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
            NCMP connects every citizen with their elected representatives, enabling transparent, accountable, and participatory democracy.
          </p>
          <div className="space-y-3 text-left">
            {[
              "🏛️ Direct access to your MP",
              "📢 Submit constituency issues",
              "📊 Track development projects",
              "💬 Real-time government updates",
              "🔔 National announcement alerts",
            ].map(item => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}