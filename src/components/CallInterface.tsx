import { motion, AnimatePresence } from "framer-motion";
import { Phone, Video, Mic, MicOff, VideoOff, X, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CallInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  callerName: string;
  type: 'voice' | 'video';
}

export default function CallInterface({ isOpen, onClose, callerName, type }: CallInterfaceProps) {
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
            <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold flex items-center justify-center mb-4 animate-pulse">
              <span className="text-2xl font-bold text-gold">{callerName[0]}</span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{callerName}</h3>
            <p className="text-xs text-gold uppercase tracking-widest mb-8">
              {type === 'voice' ? 'Voice Call...' : 'Video Call...'}
            </p>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 text-white hover:bg-white/10">
                <Mic className="w-5 h-5" />
              </Button>
              {type === 'video' && (
                <Button variant="outline" size="icon" className="rounded-full w-12 h-12 border-white/20 text-white hover:bg-white/10">
                  <Video className="w-5 h-5" />
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
            <span className="text-[10px] text-gold/60 font-medium uppercase tracking-tighter">Secure NCMP Line</span>
            <Maximize2 className="w-3 h-3 text-gold/40" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}