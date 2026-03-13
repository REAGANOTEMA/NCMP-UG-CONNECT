import { useState } from "react";
import { motion } from "framer-motion";
import { User, Camera, Image as ImageIcon, ShieldCheck, Save, Lock, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

export default function ProfileSettings() {
  const { user } = useAuth();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Profile Updated", {
        description: "Your official credentials have been synchronized with the National Registry.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="font-display text-3xl font-bold text-foreground mb-2">Profile Settings</h1>
          <p className="text-muted-foreground mb-8">Manage your official digital identity and constituency presence.</p>

          <div className="grid gap-8">
            {/* Visual Customization */}
            <div className="ncmp-card p-6 space-y-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                <ImageIcon className="w-4 h-4" /> Visual Identity
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <Label>Official Portrait</Label>
                  <div className="relative w-32 h-32 mx-auto sm:mx-0">
                    <div className="w-full h-full rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center text-3xl font-bold text-gold">
                      {user?.firstName[0]}
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-gold text-black rounded-full shadow-lg hover:bg-gold/90 transition-colors">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Recommended: 400x400px, Professional attire.</p>
                </div>

                <div className="space-y-4">
                  <Label>Constituency Background</Label>
                  <div className="relative h-32 w-full rounded-lg bg-muted border border-dashed border-border flex items-center justify-center overflow-hidden">
                    <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    <button className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                      Change Background
                    </button>
                  </div>
                  <p className="text-[10px] text-muted-foreground">Visible on your public profile header.</p>
                </div>
              </div>
            </div>

            {/* Official Credentials */}
            <div className="ncmp-card p-6 space-y-6">
              <h3 className="text-sm font-bold text-gold uppercase tracking-widest flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" /> Security & Verification
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>National ID (NIN)</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value="CM92034105XXXX" disabled className="pl-10 bg-muted/50 border-border cursor-not-allowed" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Verification Status</Label>
                  <div className="h-10 flex items-center px-4 rounded-md bg-gold/10 border border-gold/20 text-gold text-xs font-bold gap-2">
                    <ShieldCheck className="w-4 h-4" /> FULLY VERIFIED (LEVEL 3)
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button onClick={handleSave} disabled={isSaving} className="w-full sm:w-auto bg-gold text-black font-bold px-8">
                  {isSaving ? "Synchronizing..." : "Save Official Changes"} <Save className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}