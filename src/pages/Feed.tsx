"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Image, Video, FileText, Bell, Plus, Users, Hash, Bookmark, Settings, Flag, TrendingUp, Radio, ShieldCheck } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useNotifications } from "@/context/NotificationContext";
import { initSocket } from "@/services/socket";
import { requestFirebaseToken, onMessageListener } from "@/services/firebase";

// Mock data
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
  const { user } = useAuth();
  const { sendPostAlert } = useNotifications();
  const [postContent, setPostContent] = useState("");
  const socket = initSocket();

  // Initialize Firebase & Socket Notifications
  useEffect(() => {
    socket.connect();

    requestFirebaseToken(); // background/foreground push notifications

    // Listen for foreground Firebase messages
    onMessageListener((payload) => {
      toast(payload.notification?.title || "NCMP Alert", {
        description: payload.notification?.body,
        icon: <Bell className="w-4 h-4 text-gold" />,
      });
    });

    // Socket real-time events
    socket.on("parliament_live", (data: { title: string }) => {
      toast.error("PARLIAMENT IS LIVE", {
        description: data.title,
        duration: 10000,
        icon: <Radio className="w-4 h-4 animate-pulse" />,
        action: {
          label: "Watch Now",
          onClick: () => window.location.href = "/parliament/sessions",
        },
      });
    });

    socket.on("official_post", (data: { author: string; content: string }) => {
      toast.success(`New Post from ${data.author}`, {
        description: data.content.substring(0, 60) + "...",
        icon: <ShieldCheck className="w-4 h-4 text-gold" />,
        action: {
          label: "View Feed",
          onClick: () => window.location.href = "/feed",
        },
      });
    });

    return () => {
      socket.off("parliament_live");
      socket.off("official_post");
    };
  }, []);

  const handlePost = () => {
    if (!postContent.trim()) return;

    // Official alert
    if (['mp', 'speaker', 'clerk', 'official'].includes(user?.role || '')) {
      sendPostAlert(`${user?.firstName} ${user?.lastName}`, postContent);
    }

    setPostContent("");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-20 pb-12 px-4 max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-6">

        {/* Left Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20 h-fit">
          <div className="ncmp-card p-4 flex items-center gap-3 hover:bg-gold/5 cursor-pointer transition-colors">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
              {user?.firstName[0]}
            </div>
            <span className="font-bold text-sm">{user?.firstName} {user?.lastName}</span>
          </div>

          <div className="space-y-1">
            {[
              { icon: Users, label: "Constituents", color: "text-blue-500" },
              { icon: Hash, label: "National Groups", color: "text-gold" },
              { icon: Bookmark, label: "Saved Issues", color: "text-purple-500" },
              { icon: Flag, label: "Petitions", color: "text-red-500" },
              { icon: Settings, label: "Settings", color: "text-gray-400" },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-sm font-medium">
                <item.icon className={`w-5 h-5 ${item.color}`} />
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-border">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-3 mb-2">Your Groups</h4>
            {['Kampala Central Watch', 'Nakawa West Dev'].map(group => (
              <button key={group} className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors text-xs">
                <div className="w-6 h-6 rounded bg-gold/10 flex items-center justify-center text-gold font-bold">{group[0]}</div>
                {group}
              </button>
            ))}
          </div>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-6 space-y-6">

          {/* Stories */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {stories.map(story => (
              <div key={story.id} className="flex-shrink-0 w-28 h-48 rounded-xl relative overflow-hidden cursor-pointer group">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80 z-10" />
                <div className="absolute top-2 left-2 z-20 w-8 h-8 rounded-full border-2 border-gold bg-black flex items-center justify-center text-[10px] font-bold text-gold">
                  {story.isMe ? <Plus className="w-4 h-4" /> : story.name[0]}
                </div>
                <span className="absolute bottom-2 left-2 z-20 text-[10px] font-bold text-white truncate w-24">{story.name}</span>
                <div className="w-full h-full bg-muted group-hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div className="ncmp-card p-4">
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex-shrink-0 flex items-center justify-center font-bold text-gold">{user?.firstName[0]}</div>
              <Textarea 
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder={`What's happening in your constituency, ${user?.firstName}?`}
                className="flex-1 bg-muted/50 hover:bg-muted rounded-xl border-none text-sm transition-colors min-h-[80px] resize-none"
              />
            </div>
            <div className="flex items-center justify-between pt-3 border-t border-border">
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold gap-2 rounded-full">
                  <Image className="w-5 h-5 text-green-500" /> Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold gap-2 rounded-full">
                  <Video className="w-5 h-5 text-red-500" /> Video
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-gold gap-2 rounded-full">
                  <FileText className="w-5 h-5 text-gold" /> Issue
                </Button>
              </div>
              <Button onClick={handlePost} disabled={!postContent.trim()} className="bg-gold text-black font-bold rounded-full px-6">Post</Button>
            </div>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {mockPosts.map(post => <PostCard key={post.id} {...post} />)}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-4 sticky top-20 h-fit">
          <div className="ncmp-card p-4">
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center justify-between">
              Trending Topics <TrendingUp className="w-4 h-4 text-gold" />
            </h4>
            <div className="space-y-4">
              {[{ tag: "#Uganda2026", posts: "12.4k", category: "Politics" },
                { tag: "#NationalBudget", posts: "8.2k", category: "Economy" },
                { tag: "#Infrastructure", posts: "5.1k", category: "Development" },
                { tag: "#HealthCare", posts: "3.9k", category: "Social" }].map(item => (
                <div key={item.tag} className="group cursor-pointer">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">{item.category} · Trending</p>
                  <p className="text-sm font-bold text-foreground group-hover:text-gold transition-colors">{item.tag}</p>
                  <p className="text-[10px] text-muted-foreground">{item.posts} posts</p>
                </div>
              ))}
            </div>
          </div>

          <div className="ncmp-card p-4">
            <h4 className="text-sm font-bold text-foreground mb-4 flex items-center justify-between">
              National Alerts <Bell className="w-4 h-4 text-gold" />
            </h4>
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                <p className="text-[10px] font-bold text-red-500 uppercase mb-1">Emergency</p>
                <p className="text-xs text-foreground leading-relaxed">Heavy rains expected in Elgon region. Stay alert.</p>
              </div>
              <div className="p-3 rounded-lg bg-gold/10 border border-gold/20">
                <p className="text-[10px] font-bold text-gold uppercase mb-1">Parliament</p>
                <p className="text-xs text-foreground leading-relaxed">Live session: National Budget 2026/27 debate.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}