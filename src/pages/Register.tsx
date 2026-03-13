import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Shield, User, Users, Briefcase, FileText, Loader2, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const registerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const roles = [
  { value: "citizen", label: "Citizen", icon: <User className="w-5 h-5" />, desc: "Public Access" },
  { value: "mp", label: "MP", icon: <Users className="w-5 h-5" />, desc: "Parliamentary" },
  { value: "official", label: "Official", icon: <Briefcase className="w-5 h-5" />, desc: "Executive" },
  { value: "staff", label: "Staff", icon: <FileText className="w-5 h-5" />, desc: "Administrative" },
] as const;

export default function Register() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [selectedRole, setSelectedRole] = useState<typeof roles[number]['value']>("citizen");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsSubmitting(true);
    // Simulate secure registration
    setTimeout(() => {
      toast.success("Account Created Successfully", {
        description: "Please sign in with your new credentials.",
      });
      navigate("/login");
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="flex items-center gap-3 mb-8">
            <img src="/ncmp-logo.png" alt="NCMP Logo" className="w-10 h-10" />
            <div className="text-gold font-display font-bold text-xl tracking-tight">NCMP Uganda</div>
          </Link>

          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground mb-6 text-sm">Join the National Constituency Management Platform</p>

          <div className="mb-6">
            <Label className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] mb-3 block">Account Type</Label>
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
                  <div className={selectedRole === role.value ? "text-gold" : ""}>{role.icon}</div>
                  <div>
                    <div className="text-xs font-bold">{role.label}</div>
                    <div className="text-[9px] opacity-60">{role.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">First Name</Label>
                <Input {...register("firstName")} className={`bg-card border-border h-10 ${errors.firstName ? "border-red-500" : ""}`} />
                {errors.firstName && <p className="text-[9px] text-red-500">{errors.firstName.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Last Name</Label>
                <Input {...register("lastName")} className={`bg-card border-border h-10 ${errors.lastName ? "border-red-500" : ""}`} />
                {errors.lastName && <p className="text-[9px] text-red-500">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Email Address</Label>
              <Input {...register("email")} type="email" className={`bg-card border-border h-10 ${errors.email ? "border-red-500" : ""}`} placeholder="name@example.com" />
              {errors.email && <p className="text-[9px] text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs">Phone Number</Label>
              <Input {...register("phone")} className={`bg-card border-border h-10 ${errors.phone ? "border-red-500" : ""}`} placeholder="+256..." />
              {errors.phone && <p className="text-[9px] text-red-500">{errors.phone.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-xs">Password</Label>
                <Input {...register("password")} type="password" className={`bg-card border-border h-10 ${errors.password ? "border-red-500" : ""}`} />
                {errors.password && <p className="text-[9px] text-red-500">{errors.password.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Confirm</Label>
                <Input {...register("confirmPassword")} type="password" className={`bg-card border-border h-10 ${errors.confirmPassword ? "border-red-500" : ""}`} />
                {errors.confirmPassword && <p className="text-[9px] text-red-500">{errors.confirmPassword.message}</p>}
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold text-black hover:bg-gold/90 h-11 font-bold text-sm mt-2"
            >
              {isSubmitting ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>Create Official Account <ArrowRight className="w-4 h-4 ml-2" /></>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            Already have an account? <Link to="/login" className="text-gold font-bold hover:underline">Sign In</Link>
          </p>

          <div className="mt-8 p-4 rounded-lg bg-gold/5 border border-gold/20 flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gold" />
            <p className="text-[10px] text-muted-foreground leading-relaxed">
              By registering, you agree to the <span className="text-foreground font-medium">National Digital Identity Standards</span> and the NCMP Terms of Service.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-zinc-950 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        <div className="relative z-10 text-center max-w-md">
          <div className="text-8xl mb-8">🇺🇬</div>
          <h2 className="text-4xl font-display font-bold text-gold mb-4">For God and My Country</h2>
          <p className="text-muted-foreground text-lg">Building a transparent, accountable, and digitally connected Uganda for the 2026 generation.</p>
        </div>
      </div>
    </div>
  );
}