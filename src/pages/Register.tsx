import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, Shield, User, Users, Briefcase, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  { value: "citizen", label: "Citizen", icon: <User className="w-6 h-6" />, desc: "General public access" },
  { value: "mp", label: "Member of Parliament", icon: <Users className="w-6 h-6" />, desc: "Parliamentary access" },
  { value: "official", label: "Government Official", icon: <Briefcase className="w-6 h-6" />, desc: "Executive access" },
  { value: "staff", label: "Parliamentary Staff", icon: <FileText className="w-6 h-6" />, desc: "Staff access" },
];

export default function Register() {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [selectedRole, setSelectedRole] = useState("citizen");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate registration and save role
    setTimeout(() => {
      localStorage.setItem("role", selectedRole);
      localStorage.setItem("user", JSON.stringify({ ...form, role: selectedRole }));
      navigate("/login");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-black flex">
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/" className="flex items-center gap-4 mb-12">
            <img src="/ncmp-logo.png" alt="NCMP Logo" className="w-12 h-12" />
            <div>
              <div className="text-yellow-400 font-display font-bold text-2xl">NCMP Uganda</div>
              <div className="text-gray-400 text-sm tracking-wider">Official Platform</div>
            </div>
          </Link>

          <h1 className="font-display text-4xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-gray-400 text-lg mb-8">Sign up to access NCMP services</p>

          <div className="mb-8">
            <Label className="text-gray-400 text-sm uppercase tracking-wider mb-3 block">Account Type</Label>
            <div className="grid grid-cols-2 gap-4">
              {roles.map(role => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  className={`p-5 rounded-lg border text-left transition-all flex flex-col gap-2 ${
                    selectedRole === role.value
                      ? "border-yellow-400 bg-yellow-500/10 text-white"
                      : "border-gray-700 bg-gray-900 text-gray-400 hover:border-yellow-400"
                  }`}
                >
                  {role.icon}
                  <div className="text-sm font-semibold">{role.label}</div>
                  <div className="text-xs opacity-70">{role.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white text-sm font-medium mb-2 block">First Name</Label>
                <Input
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                  value={form.firstName}
                  onChange={e => setForm({ ...form, firstName: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label className="text-white text-sm font-medium mb-2 block">Last Name</Label>
                <Input
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                  value={form.lastName}
                  onChange={e => setForm({ ...form, lastName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div>
              <Label className="text-white text-sm font-medium mb-2 block">Email</Label>
              <Input
                type="email"
                className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label className="text-white text-sm font-medium mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  type={showPwd ? "text" : "password"}
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 pr-12"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 hover:from-yellow-500 hover:to-red-700 text-white font-bold h-14 flex items-center justify-center gap-3"
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight />}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 hover:text-red-500 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-gray-900 via-gray-800 to-black items-center justify-center p-16">
        <div className="text-center max-w-md">
          <div className="text-9xl mb-8">🇺🇬</div>
          <h2 className="font-display text-4xl font-bold text-yellow-400 mb-5">Governance for All Ugandans</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            NCMP connects every citizen with their elected representatives, enabling transparent, accountable, and participatory democracy.
          </p>
        </div>
      </div>
    </div>
  );
}