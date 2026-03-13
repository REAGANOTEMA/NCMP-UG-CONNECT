import { motion } from "framer-motion";
import { MessageSquare, Heart, Share2, MoreHorizontal, ShieldCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";

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
      className="ncmp-card overflow-hidden"
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 border border-gold/20">
              <AvatarFallback className="bg-gold/10 text-gold font-bold">
                {author[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-sm font-bold text-foreground hover:underline cursor-pointer">{author}</h4>
                {isOfficial && <ShieldCheck className="w-3.5 h-3.5 text-gold" />}
              </div>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{role} • {time}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground rounded-full">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>

        <p className="text-sm text-foreground leading-relaxed mb-4 whitespace-pre-wrap">
          {content}
        </p>

        <div className="flex items-center justify-between py-2 border-y border-border/50">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <div className="w-4 h-4 rounded-full bg-gold flex items-center justify-center text-[8px]">❤️</div>
              <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px]">👍</div>
            </div>
            <span className="text-[10px] text-muted-foreground ml-1">{likes.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
            <span>{comments.toLocaleString()} comments</span>
            <span>124 shares</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-gold gap-2 rounded-lg">
            <Heart className="w-4 h-4" /> Like
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-gold gap-2 rounded-lg">
            <MessageSquare className="w-4 h-4" /> Comment
          </Button>
          <Button variant="ghost" size="sm" className="flex-1 text-muted-foreground hover:text-gold gap-2 rounded-lg">
            <Share2 className="w-4 h-4" /> Share
          </Button>
        </div>
      </div>

      {/* Comment Input */}
      <div className="px-4 pb-4 pt-2 bg-muted/20 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-[10px] font-bold text-gold">U</div>
        <div className="flex-1 relative">
          <Input 
            placeholder="Write a comment..." 
            className="bg-muted/50 border-none h-8 text-xs rounded-full pr-10"
          />
          <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gold hover:scale-110 transition-transform">
            <Send className="w-3 h-3" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}