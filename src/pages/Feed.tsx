import { useState } from "react";
import { motion } from "framer-motion";
import { Image, Video, FileText, Send, TrendingUp, Users, Bell, Plus, Hash } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const mockPosts = [
  {
    id: 1,
    author: "H.E. Gen. Yoweri Kaguta Museveni",
    role: "President of Uganda",
    content: "Today, I commissioned the new Kampala-Entebbe Expressway expansion. This infrastructure is vital for our national development and economic growth. For God and My Country.",
    time: "2h ago",
    likes: 12400,
    comments: 3400,
    isOfficial: true
  },
  {
    id: 2,
    author: "Joel Ssenyonyi",
    role: "MP – Nakawa West",
    content: "We are on the ground in Nakawa monitoring the drainage works. We must ensure that the funds allocated for these projects are used effectively to prevent flooding in our community.",
    time: "4h ago",
    likes: 2100,
    comments: 450,
    isOfficial: true
  },
  {
    id: 3,
    author: "Sarah Namukasa",
    role: "Citizen – Wakiso",
    content: "The new health center in our sub-county is finally open! Thank you to the local leadership for pushing this through. We now have access to better maternal care.",
    time: "6h ago",
    likes: 890,
    comments: 120,
    isOfficial: false
  }
];

const stories = [
  { id: 1, name: "Your Story", isMe: true },
  { id: 2, name: "Anita Among" },
  { id: 3, name: "Thomas Tayebwa" },
  { id: 4, name: "Robinah Nabbanja" },
  { id: 5, name: "Muhammad Nsereko" },
];

export default function Feed() {
  const [postContent, setPostContent] = useState("");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto grid lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="ncmp-card p-6 text-center">
            <div className="w-20 h-20 rounded-full bg-gold/10 border-2 border-gold mx-auto mb-4 flex items-center justify-center text-2xl font-bold text-gold">
              U
            </div>
            <h3 className="font-bold text-foreground">Ugandan Citizen</h3>
            <p className="text-xs text-muted-foreground mb-4">Kampala District</p>
            <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border">
              <div>
                <p className="text-lg font-bold text-gold">124</p>
                <p className="text-[10px] text-muted-foreground uppercase">Following</p>
              </div>
              <div>
                <p className="text-lg font-bold text-gold">56</p>
                <p className="text-[10px] text-muted-foreground uppercase">Issues</p>
              </div>
            </div>
          </div>

          <div className="ncmp-card p-4">
            <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Hash className="w-4 h-4" /> Constituency Groups
            </h4>
            <ul className="space-y-3">
              {['Kampala Central Watch', 'Nakawa West Dev', 'Wakiso Citizens', 'Jinja City Forum'].map(group => (
                <li key={group} className="flex items-center gap-3 text-sm text-foreground hover:text-gold cursor-pointer transition-colors group">
                  <div className="w-8 h-8 rounded bg-muted flex items-center justify-center text-[10px] font-bold group-hover:bg-gold/20">{group[0]}</div>
                  <span>{group}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-6 space-y-6">
          {/* Stories Bar */}
          <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
            {stories.map(story => (
              <div key={story.id} className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
                <div className={`w-16 h-16 rounded-full p-1 border-2 ${story.isMe ? 'border-dashed border-muted-foreground' : 'border-gold'} flex items-center justify-center`}>
                  <Avatar className="w-full h-full">
                    <AvatarFallback className={story.isMe ? 'bg-muted' : 'bg-gold/10 text-gold font-bold'}>
                      {story.isMe ? <Plus className="w-6 h-6" /> : story.name[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-[10px] text-muted-foreground font-medium truncate w-16 text-center">{story.name}</span>
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div className="ncmp-card p-4 bg-card border-gold/20">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/10 flex-shrink-0 flex items-center justify-center font-bold text-gold">U</div>
              <Textarea 
                placeholder="What's happening in your constituency?"
                className="min-h-[100px] bg-muted/50 border-border focus:border-gold resize-none"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold gap-2">
                  <Image className="w-4 h-4" /> <span className="hidden sm:inline">Photo</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold gap-2">
                  <Video className="w-4 h-4" /> <span className="hidden sm:inline">Video</span>
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold gap-2">
                  <FileText className="w-4 h-4" /> <span className="hidden sm:inline">Issue</span>
                </Button>
              </div>
              <Button className="bg-gold text-black hover:bg-gold/90 font-bold px-6">
                Post <Send className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {mockPosts.map(post => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="ncmp-card p-4">
            <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" /> Trending Topics
            </h4>
            <ul className="space-y-3">
              {['#Uganda2026', '#NationalBudget', '#Infrastructure', '#HealthCare'].map(tag => (
                <li key={tag} className="text-sm text-foreground hover:text-gold cursor-pointer transition-colors">
                  {tag}
                  <p className="text-[10px] text-muted-foreground">2.4k posts</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="ncmp-card p-4">
            <h4 className="text-xs font-bold text-gold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4" /> National Alerts
            </h4>
            <div className="space-y-3">
              <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                <p className="text-[10px] font-bold text-red-500 uppercase">Emergency</p>
                <p className="text-xs text-foreground">Heavy rains expected in Elgon region. Stay alert.</p>
              </div>
              <div className="p-2 rounded bg-gold/10 border border-gold/20">
                <p className="text-[10px] font-bold text-gold uppercase">Parliament</p>
                <p className="text-xs text-foreground">Live session: National Budget 2026/27 debate.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}