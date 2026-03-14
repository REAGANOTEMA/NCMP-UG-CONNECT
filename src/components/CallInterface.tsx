import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Video, Mic, MicOff, VideoOff, X, Maximize2, ShieldCheck, Signal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  callerName: string;
  type: 'voice' | 'video';
}

export default function CallInterface({ isOpen, onClose, callerName, type }: CallInterfaceProps) {
  const [status, setStatus] = useState<'connecting' | 'connected'>('connecting');
  const [timer, setTimer] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isOpen) {
      const timeout = setTimeout(() => setStatus('connected'), 2000);
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
        setTimer(0);
        setStatus('connecting');
      };
    }
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed bottom-6 right-6 w-80 bg-black/95 border border-gold/30 rounded-2xl shadow-2xl z-[100] overflow-hidden"
        >
          <div className="p-6 flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center">
                <span className="text-2xl font-bold text-gold">{callerName[0]}</span>
              </div>
              {status === 'connecting' && (
                <motion.div 
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 rounded-full border-2 border-gold"
                />
              )}
            </div>
            
            <h3 className="text-lg font-bold text-white mb-1">{callerName}</h3>
            <div className="flex items-center gap-2 mb-8">
              <Signal className="w-3 h-3 text-green-500" />
              <p className="text-[10px] text-gold uppercase tracking-widest font-bold">
                {status === 'connecting' ? 'Establishing Secure Line...' : `Secure Call • ${formatTime(timer)}`}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setIsMuted(!isMuted)}
                className={`rounded-full w-12 h-12 border-white/20 text-white hover:bg-white/10 ${isMuted ? 'bg-red-500/20 border-red-500/50' : ''}`}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>
              
              {type === 'video' && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={() => setIsVideoOff(!isVideoOff)}
                  className={`rounded-full w-12 h-12 border-white/20 text-white hover:bg-white/10 ${isVideoOff ? 'bg-red-500/20 border-red-500/50' : ''}`}
                >
                  {isVideoOff ? <VideoOff className="w-5 h-5" /> : <Video className="w-5 h-5" />}
                </Button>
              )}
              
              <Button 
                onClick={onClose}
                className="rounded-full w-14 h-14 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/20"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </div>
          
          <div className="bg-gold/5 p-3 flex justify-between items-center border-t border-gold/10">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3 h-3 text-gold" />
              <span className="text-[9px] text-gold/80 font-bold uppercase tracking-tighter">Nexterp Secure Encryption</span>
            </div>
            <Maximize2 className="w-3 h-3 text-gold/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}