import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowRight, Mail, User, Phone, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const districts = [
  "Kampala", "Wakiso", "Mukono", "Jinja", "Mbale", "Soroti", "Gulu", "Lira",
  "Arua", "Mbarara", "Fort Portal", "Kabale", "Hoima", "Masaka", "Tororo",
  "Iganga", "Moroto", "Kotido", "Kasese", "Ntungamo", "Other"
];

const regions = ["Central", "Eastern", "Northern", "Western", "Southwestern"];

export default function Register() {
  const [showPwd, setShowPwd] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    password: "", confirmPassword: "", district: "", region: "",
    constituency: "", nationalId: "", role: "citizen",
  });

  const handleChange = (k: string, v: string) => setForm({ ...form, [k]: v });

  return (
    <div className="min-h-screen bg-background flex">
      {/* Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-lg overflow-hidden flex flex-col">
              <div className="flex-1 flag-stripe-black" />
              <div className="flex-1 flag-stripe-gold" />
              <div className="flex-1 flag-stripe-red" />
            </div>
            <div>
              <div className="text-gold font-display font-bold text-xl">NCMP Uganda</div>
              <div className="text-[hsl(var(--muted-foreground))] text-xs tracking-wider">Citizen Registration</div>
            </div>
          </Link>

          {/* Step indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2].map(s => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                  step >= s ? "bg-gold text-[hsl(var(--uganda-black))]" : "bg-muted text-[hsl(var(--muted-foreground))]"
                }`}>{s}</div>
                <span className={`text-xs ${step >= s ? "text-gold" : "text-[hsl(var(--muted-foreground))]"}`}>
                  {s === 1 ? "Personal Info" : "Location & Account"}
                </span>
                {s < 2 && <div className="w-8 h-px bg-border mx-1" />}
              </div>
            ))}
          </div>

          <h1 className="font-display text-3xl font-bold text-foreground mb-1">Create Your Account</h1>
          <p className="text-[hsl(var(--muted-foreground))] text-sm mb-8">Join Uganda's national civic platform</p>

          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">First Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                    <Input placeholder="John" className="pl-10 bg-card border-border focus:border-gold"
                      value={form.firstName} onChange={e => handleChange("firstName", e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Last Name</Label>
                  <Input placeholder="Doe" className="bg-card border-border focus:border-gold"
                    value={form.lastName} onChange={e => handleChange("lastName", e.target.value)} />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                  <Input type="email" placeholder="john@example.com" className="pl-10 bg-card border-border focus:border-gold"
                    value={form.email} onChange={e => handleChange("email", e.target.value)} />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                  <Input placeholder="+256 7XX XXX XXX" className="pl-10 bg-card border-border focus:border-gold"
                    value={form.phone} onChange={e => handleChange("phone", e.target.value)} />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">National ID (Optional)</Label>
                <Input placeholder="CM XXXXXXXXXXXXXXX" className="bg-card border-border focus:border-gold"
                  value={form.nationalId} onChange={e => handleChange("nationalId", e.target.value)} />
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Optional but enables full platform access</p>
              </div>

              <Button onClick={() => setStep(2)} className="w-full bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold h-11">
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Region</Label>
                  <select
                    className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground text-sm focus:outline-none focus:border-gold"
                    value={form.region} onChange={e => handleChange("region", e.target.value)}
                  >
                    <option value="">Select Region</option>
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">District</Label>
                  <select
                    className="w-full px-3 py-2 rounded-md bg-card border border-border text-foreground text-sm focus:outline-none focus:border-gold"
                    value={form.district} onChange={e => handleChange("district", e.target.value)}
                  >
                    <option value="">Select District</option>
                    {districts.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Constituency</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
                  <Input placeholder="Your constituency name" className="pl-10 bg-card border-border focus:border-gold"
                    value={form.constituency} onChange={e => handleChange("constituency", e.target.value)} />
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Password</Label>
                <div className="relative">
                  <Input type={showPwd ? "text" : "password"} placeholder="Create a strong password"
                    className="pr-10 bg-card border-border focus:border-gold"
                    value={form.password} onChange={e => handleChange("password", e.target.value)} />
                  <button type="button" onClick={() => setShowPwd(!showPwd)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-foreground">
                    {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium mb-1.5 block">Confirm Password</Label>
                <Input type="password" placeholder="Confirm your password"
                  className="bg-card border-border focus:border-gold"
                  value={form.confirmPassword} onChange={e => handleChange("confirmPassword", e.target.value)} />
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-0.5 rounded" />
                <span className="text-xs text-[hsl(var(--muted-foreground))]">
                  I agree to the{" "}
                  <Link to="/terms" className="text-gold hover:underline">Terms of Use</Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-gold hover:underline">Privacy Policy</Link>{" "}
                  of the NCMP Uganda platform.
                </span>
              </label>

              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1 border-border">Back</Button>
                <Button className="flex-1 bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] font-bold h-11">
                  Create Account
                </Button>
              </div>
            </motion.div>
          )}

          <div className="mt-6 text-center">
            <p className="text-[hsl(var(--muted-foreground))] text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-gold hover:text-[hsl(45_100%_45%)] font-semibold">Sign in</Link>
            </p>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-[hsl(var(--muted)/0.5)] border border-border flex items-start gap-2">
            <Shield className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
            <p className="text-[hsl(var(--muted-foreground))] text-xs">
              Your information is protected under Uganda's Data Protection and Privacy Act 2019.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-12 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, hsl(0 0% 4%), hsl(220 20% 8%), hsl(45 30% 8%))" }}>
        <div className="absolute left-0 top-0 bottom-0 w-1.5 flex flex-col">
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
          <div className="flex-1 flag-stripe-black" />
          <div className="flex-1 flag-stripe-gold" />
          <div className="flex-1 flag-stripe-red" />
        </div>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center max-w-sm">
          <div className="text-8xl mb-6">🏛️</div>
          <h2 className="font-display text-3xl font-bold text-gold mb-4">Your Voice in Parliament</h2>
          <p className="text-[hsl(var(--muted-foreground))] leading-relaxed mb-8">
            Join over 20 million Ugandans already connected to their representatives through NCMP.
          </p>
          <div className="grid grid-cols-2 gap-3 text-center">
            {[
              { v: "529", l: "MPs Registered" },
              { v: "290+", l: "Constituencies" },
              { v: "5", l: "Regions" },
              { v: "24/7", l: "Platform Access" },
            ].map(s => (
              <div key={s.l} className="ncmp-card p-4">
                <div className="text-2xl font-bold font-display text-gold">{s.v}</div>
                <div className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
