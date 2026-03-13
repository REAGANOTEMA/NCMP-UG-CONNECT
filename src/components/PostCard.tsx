import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostCardProps {
  author: string;
  role: string;
  content: string;
  time: string;
  likes: number;
  comments: number;
  isOfficial?: boolean;
}

export default function PostCard({ author, role, content, time, likes, comments, isOfficial }: PostCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="ncmp-card p-4 mb-4 bg-card border-border"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10 border border-gold/20">
            <AvatarFallback className="bg-gold/10 text-gold font-bold">
              {author[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="text-sm font-bold text-foreground">{author}</h4>
              {isOfficial && <ShieldCheck className="w-3.5 h-3.5 text-gold" />}
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{role} • {time}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      <p className="text-sm text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
        {content}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors">
            <Heart className="w-4 h-4" />
            <span>{likes}</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span>{comments}</span>
          </button>
        </div>
        <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-gold transition-colors">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
}