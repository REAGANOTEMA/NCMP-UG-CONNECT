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
    region: "",
    district: "",
    constituency: ""
  });
  const [loading, setLoading] = useState(false);

  const shake = { scale: [1, 1.05, 1], rotate: [0, 5, -5, 0], transition: { duration: 0.5 } };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.firstName || !form.lastName || !form.email || !form.password || !form.confirmPassword) {
      alert("Please fill all required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const API = import.meta.env.VITE_API_BASE_URL;
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: selectedRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      alert("Account created successfully");
      navigate("/login");
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex">
      {/* Left Panel: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 py-12 max-w-lg mx-auto w-full">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
              <img src="/ncmp-logo.png" alt="NCMP Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="text-yellow-400 font-display font-bold text-2xl">NCMP Uganda</div>
              <div className="text-gray-400 text-sm tracking-wider">Official Platform</div>
            </div>
          </Link>

          <h1 className="font-display text-4xl font-bold text-white mb-2">Create Your Account</h1>
          <p className="text-gray-400 text-lg mb-8">Sign up to access NCMP services</p>

          {/* Role selector */}
          <div className="mb-8">
            <Label className="text-gray-400 text-sm uppercase tracking-wider mb-3 block">Account Type</Label>
            <div className="grid grid-cols-2 gap-4">
              {roles.map(role => (
                <motion.button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value)}
                  whileHover={shake}
                  className={`p-5 rounded-lg border text-left transition-all flex flex-col gap-2 ${
                    selectedRole === role.value
                      ? "border-yellow-400 bg-yellow-500/10 text-white"
                      : "border-gray-700 bg-gray-900 text-gray-400 hover:border-yellow-400"
                  }`}
                >
                  {role.icon}
                  <div className="text-sm font-semibold">{role.label}</div>
                  <div className="text-xs opacity-70">{role.desc}</div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={handleRegister}>
            <div>
              <Label htmlFor="firstName" className="text-white text-sm font-medium mb-2 block">First Name</Label>
              <Input
                id="firstName"
                placeholder="First Name"
                className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                value={form.firstName}
                onChange={e => setForm({ ...form, firstName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="lastName" className="text-white text-sm font-medium mb-2 block">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Last Name"
                className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                value={form.lastName}
                onChange={e => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white text-sm font-medium mb-2 block">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@example.com"
                className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="text-white text-sm font-medium mb-2 block">Phone</Label>
              <Input
                id="phone"
                placeholder="+256 7XXXXXXXX"
                className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white text-sm font-medium mb-2 block">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="Enter password"
                  className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400 pr-12"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                >
                  {showPwd ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmPassword" className="text-white text-sm font-medium mb-2 block">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                className="bg-gray-800 text-white border-gray-700 focus:border-yellow-400"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer text-gray-300">
              <input type="checkbox" className="rounded border-gray-700" />
              I agree to <span className="text-red-500">Terms</span> and <span className="text-yellow-400">Privacy Policy</span>
            </label>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 via-yellow-500 to-red-600 hover:from-yellow-500 hover:to-red-700 text-white font-bold h-14 flex items-center justify-center gap-3"
            >
              {loading ? "Creating..." : "Create Account"}
              {!loading && <ArrowRight />}
            </Button>
          </form>

          <div className="mt-6 text-center text-lg">
            <p className="text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-yellow-400 hover:text-red-500 font-semibold transition-colors">
                Login here
              </Link>
            </p>
          </div>

          {/* Security Notice */}
          <div className="mt-10 p-4 rounded-lg bg-gray-800 border border-gray-700 flex items-start gap-3">
            <Shield className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
            <p className="text-gray-400 text-base leading-relaxed">
              This is a secure government platform. Unauthorized access is prohibited under the Uganda Computer Misuse Act.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center items-center p-16 relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center max-w-md">
          <motion.div whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }} className="text-9xl mb-8">🇺🇬</motion.div>
          <h2 className="font-display text-4xl font-bold text-yellow-400 mb-5">Governance for All Ugandans</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            NCMP connects every citizen with their elected representatives, enabling transparent, accountable, and participatory democracy.
          </p>
        </motion.div>
      </div>
    </div>
  );
}