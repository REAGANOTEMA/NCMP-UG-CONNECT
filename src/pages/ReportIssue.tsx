import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, MapPin, Camera, Send, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function ReportIssue() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setSubmitted(true);
      toast({
        title: "Issue Reported Successfully",
        description: "Your constituency office has been notified. Tracking ID: NCMP-2026-X92",
      });
    }, 1000);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="ncmp-card p-12 text-center max-w-md"
          >
            <div className="w-20 h-20 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-gold" />
            </div>
            <h2 className="text-2xl font-display font-bold text-foreground mb-4">Submission Received</h2>
            <p className="text-muted-foreground mb-8">
              Thank you for your civic engagement. Your report has been forwarded to the relevant Parliamentary Committee and your MP's office.
            </p>
            <Button className="bg-gold text-black font-bold w-full" onClick={() => window.location.href = '/feed'}>
              Return to Feed
            </Button>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <h1 className="text-3xl font-display font-bold text-foreground">Report a Constituency Issue</h1>
          </div>
          <p className="text-muted-foreground mb-8">
            Submit a formal report regarding infrastructure, services, or governance in your area. 
            This report will be logged in the National Registry.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6 ncmp-card p-8">
            <div className="space-y-2">
              <Label>Issue Category</Label>
              <Select required>
                <SelectTrigger className="bg-muted border-border">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="roads">Roads & Infrastructure</SelectItem>
                  <SelectItem value="water">Water & Sanitation</SelectItem>
                  <SelectItem value="health">Health Services</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="security">Security & Safety</SelectItem>
                  <SelectItem value="corruption">Governance & Accountability</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subject / Title</Label>
              <Input placeholder="Brief summary of the issue" className="bg-muted border-border" required />
            </div>

            <div className="space-y-2">
              <Label>Detailed Description</Label>
              <Textarea 
                placeholder="Provide as much detail as possible to help your MP understand the situation..." 
                className="min-h-[150px] bg-muted border-border"
                required
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location / Sub-county</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-10 bg-muted border-border" placeholder="e.g. Nakawa Division" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Evidence (Optional)</Label>
                <Button type="button" variant="outline" className="w-full border-dashed border-border hover:border-gold gap-2">
                  <Camera className="w-4 h-4" /> Upload Photo
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <Button type="submit" className="w-full bg-gold text-black font-bold h-12 text-lg">
                Submit Official Report <Send className="w-4 h-4 ml-2" />
              </Button>
              <p className="text-[10px] text-center text-muted-foreground mt-4 uppercase tracking-widest">
                For God and My Country
              </p>
            </div>
          </form>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}