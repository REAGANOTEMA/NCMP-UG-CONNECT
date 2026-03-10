import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { allMPs } from "@/data/ugandaData";

const mockConversations = [
  { id: 1, name: "Muhammad Nsereko", role: "MP – Kampala Central", lastMsg: "Thank you for your feedback...", time: "10:24", unread: 2, online: true },
  { id: 2, name: "Betty Aol Ocan", role: "MP – Gulu Woman", lastMsg: "The road project is on track...", time: "09:15", unread: 0, online: false },
  { id: 3, name: "Mathias Mpuuga", role: "MP – Nyendo-Mukungwe", lastMsg: "I will address this in parliament...", time: "Yesterday", unread: 0, online: true },
  { id: 4, name: "Herbert Ariko", role: "MP – Soroti East", lastMsg: "Meeting scheduled for Monday.", time: "Yesterday", unread: 1, online: false },
  { id: 5, name: "Parliament Support", role: "Official Channel", lastMsg: "Your issue has been escalated.", time: "Mon", unread: 0, online: true },
];

const mockMessages = [
  { id: 1, sender: "other", text: "Hello, I've received your complaint about the road conditions in Kampala Central.", time: "10:00" },
  { id: 2, sender: "me", text: "Thank you for responding. The roads on Jinja Road have been in terrible condition for over 6 months.", time: "10:05" },
  { id: 3, sender: "other", text: "I understand your concern. I've already raised this in the last parliament session and the Ministry of Works has committed to repairs in Q2 2026.", time: "10:12" },
  { id: 4, sender: "me", text: "That's good to hear. When exactly will the work begin?", time: "10:14" },
  { id: 5, sender: "other", text: "The contractor tender closes on April 5th. Physical works should begin May 2026. I'll keep you updated through this platform.", time: "10:24" },
];

export default function Messages() {
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([...messages, { id: Date.now(), sender: "me", text: message, time: new Date().toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit" }) }]);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex pt-[72px] h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 border-r border-border flex flex-col bg-card hidden sm:flex">
          <div className="p-4 border-b border-border">
            <h2 className="font-display text-lg font-bold text-foreground mb-3">Messages</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              <Input placeholder="Search conversations..." className="pl-9 bg-muted border-border text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-[hsl(var(--muted)/0.5)] transition-colors text-left border-b border-[hsl(var(--border)/0.5)] ${activeChat.id === conv.id ? "bg-[hsl(var(--uganda-gold)/0.07)] border-l-2 border-l-gold" : ""}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-[hsl(var(--uganda-gold)/0.15)] text-gold flex items-center justify-center font-bold text-sm">
                    {conv.name.split(" ").slice(-1)[0][0]}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[hsl(142_60%_45%)] border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{conv.name}</span>
                    <span className="text-xs text-[hsl(var(--muted-foreground))] flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] truncate">{conv.role}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] truncate mt-0.5">{conv.lastMsg}</p>
                </div>
                {conv.unread > 0 && (
                  <div className="w-5 h-5 rounded-full bg-[hsl(var(--uganda-red))] text-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">
                    {conv.unread}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {/* Chat header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[hsl(var(--uganda-gold)/0.15)] text-gold flex items-center justify-center font-bold">
                  {activeChat.name.split(" ").slice(-1)[0][0]}
                </div>
                {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[hsl(142_60%_45%)] border-2 border-card" />}
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">{activeChat.name}</h3>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">
                  {activeChat.online ? <span className="text-[hsl(142_60%_45%)]">● Online</span> : "Last seen recently"}
                  {" · "}{activeChat.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-[hsl(var(--muted-foreground))] hover:text-gold w-8 h-8">
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[hsl(var(--muted-foreground))] hover:text-gold w-8 h-8">
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[hsl(var(--muted-foreground))] hover:text-foreground w-8 h-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="text-center">
              <span className="text-xs text-[hsl(var(--muted-foreground))] bg-muted px-3 py-1 rounded-full">Today — March 10, 2026</span>
            </div>
            {messages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-sm lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                  msg.sender === "me"
                    ? "bg-gold text-[hsl(var(--uganda-black))] rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-bl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-xs mt-1 ${msg.sender === "me" ? "text-[hsl(0_0%_0%/0.5)]" : "text-[hsl(var(--muted-foreground))]"} text-right`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-[hsl(var(--muted-foreground))] hover:text-gold w-9 h-9">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1 bg-muted border-border focus:border-gold"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && sendMessage()}
              />
              <Button variant="ghost" size="icon" className="text-[hsl(var(--muted-foreground))] hover:text-gold w-9 h-9">
                <Smile className="w-4 h-4" />
              </Button>
              <Button
                onClick={sendMessage}
                className="bg-gold text-[hsl(var(--uganda-black))] hover:bg-[hsl(45_100%_45%)] w-9 h-9 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
