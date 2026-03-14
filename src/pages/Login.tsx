import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Shield, Eye, EyeOff, ArrowRight, Lock, Mail, User, Users, Briefcase, FileText, Loader2, Award } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid government or personal email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const roles = [
  { value: "citizen", label: "Citizen", icon: "👤", desc: "Public Access" },
  { value: "mp", label: "MP", icon: "🏛️", desc: "Parliamentary" },
  { value: "speaker", label: "Speaker", icon: "⚖️", desc: "National Oversight" },
  { value: "clerk", label: "Clerk", icon: "📝", desc: "Administration" },
] as const;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [showPwd, setShowPwd] = useState(false);
  const [selectedRole, setSelectedRole] = useState<typeof roles[number]['value']>("citizen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const from = (location.state as any)?.from?.pathname;

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      login({
        firstName: data.email.split('@')[0],
        lastName: selectedRole.toUpperCase(),
        email: data.email,
        role: selectedRole,
        constituency: selectedRole === 'mp' ? "Kampala Central" : undefined,
      });
      
      toast.success("Authentication Successful", {
        description: `Welcome to the NCMP ${selectedRole} Portal.`,
      });

      if (selectedRole === 'speaker' || selectedRole === 'clerk') {
        navigate("/oversight", { replace: true });
      } else if (selectedRole === 'mp') {
        navigate("/mp/dashboard", { replace: true });
      } else {
        navigate(from || "/feed", { replace: true });
      }
      
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="flex items-center gap-3 mb-10 group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-transparent">
              <img 
                src="/ncmp-logo.png" 
                alt="NCMP Logo" 
                className="w-10 h-10 object-contain drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] group-hover:scale-110 transition-transform" 
              />
              <div className="absolute inset-0 bg-gold/5 blur-xl rounded-full -z-10" />
            </div>
            <div className="flex flex-col">
              <div className="text-gold font-display font-bold text-2xl tracking-tight">NCMP Uganda</div>
              <div className="text-[10px] text-muted-foreground font-bold tracking-[0.3em] uppercase">National Platform</div>
            </div>
          </Link>

          <h1 className="font-display text-4xl font-bold text-foreground mb-2">Secure Sign In</h1>
          <p className="text-muted-foreground mb-8">Access the National Civic Digital Infrastructure</p>

          <div className="mb-8">
            <Label className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-3 block">Select Portal</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map(role => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-3 rounded-lg border text-left transition-all flex items-center gap-3 ${
                    selectedRole === role.value
                      ? "border-gold bg-gold/10 text-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-gold/30"
                  }`}
                >
                  <div className="text-2xl">{role.icon}</div>
                  <div>
                    <div className="text-xs font-bold">{role.label}</div>
                    <div className="text-[9px] opacity-60">{role.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-1.5">
              <Label className="text-xs">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  {...register("email")}
                  type="email" 
                  className={`pl-10 bg-card border-border h-11 ${errors.email ? "border-red-500" : ""}`} 
                  placeholder="name@domain.go.ug"
                />
              </div>
              {errors.email && <p className="text-[10px] text-red-500 font-medium">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label className="text-xs">Password</Label>
                <button type="button" className="text-[10px] text-gold hover:underline">Forgot Password?</button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  {...register("password")}
                  type={showPwd ? "text" : "password"} 
                  className={`pl-10 pr-10 bg-card border-border h-11 ${errors.password ? "border-red-500" : ""}`}
                />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-gold"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-[10px] text-red-500 font-medium">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold text-black hover:bg-gold/90 h-12 font-bold text-base shadow-lg shadow-gold/10"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Sign In to Platform <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Don't have an account? <Link to="/register" className="text-gold font-bold hover:underline">Register as a Citizen</Link>
          </p>

          <div className="mt-10 p-4 rounded-lg bg-muted/30 border border-border flex items-start gap-3">
            <Shield className="w-4 h-4 text-gold mt-0.5" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              This is a secure government portal. All activities are logged and monitored under the 
              <span className="text-foreground font-medium"> Data Protection and Privacy Act, 2019</span>.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/80 to-gold/20" />
        <div className="relative z-10 flex flex-col items-center justify-center p-12 text-center">
          <div className="text-7xl mb-6">🇺🇬</div>
          <h2 className="text-4xl font-display font-bold text-white mb-4">National Civic Infrastructure</h2>
          <p className="text-gold/80 text-lg max-w-md">Connecting every Ugandan to the heart of governance through secure, transparent digital channels.</p>
        </div>
      </div>
    </div>
  );
}