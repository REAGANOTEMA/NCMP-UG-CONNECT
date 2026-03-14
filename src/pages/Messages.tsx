import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Circle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CallInterface from "@/components/CallInterface";
import { allMPs } from "@/data/ugandaData";

const mockConversations = [
  { id: "mp-001", name: "Muhammad Nsereko", role: "MP – Kampala Central", lastMsg: "Thank you for your feedback...", time: "10:24", unread: 2, online: true, restricted: false },
  { id: "mp-003", name: "Joel Ssenyonyi", role: "MP – Nakawa West", lastMsg: "I will address this in parliament...", time: "Yesterday", unread: 0, online: true, restricted: false },
  { id: "mp-010", name: "Matthias Mpuuga", role: "MP – Nyendo-Mukungwe", lastMsg: "Meeting scheduled for Monday.", time: "Yesterday", unread: 1, online: false, restricted: false },
];

export default function Messages() {
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [chatHistories, setChatHistories] = useState<Record<string, any[]>>({
    "mp-001": [
      { id: 1, sender: "other", text: "Hello, I've received your complaint about the road conditions in Kampala Central.", time: "10:00" },
      { id: 2, sender: "me", text: "Thank you for responding. The roads on Jinja Road have been in terrible condition for over 6 months.", time: "10:05" },
    ],
    "mp-003": [
      { id: 1, sender: "other", text: "The Nakawa West development plan is now available for public review.", time: "09:00" }
    ]
  });
  
  const [callState, setCallState] = useState<{ isOpen: boolean; type: 'voice' | 'video' }>({ isOpen: false, type: 'voice' });
  const userRole = localStorage.getItem("role");

  const currentMessages = chatHistories[activeChat.id] || [];

  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const newMessage = { 
      id: Date.now(), 
      sender: "me", 
      text: message, 
      time: new Date().toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit" }) 
    };

    setChatHistories(prev => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMessage]
    }));
    
    setMessage("");

    // Simulate MP Response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        sender: "other",
        text: "I have noted your concern. My office will follow up with the relevant committee.",
        time: new Date().toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit" })
      };
      setChatHistories(prev => ({
        ...prev,
        [activeChat.id]: [...(prev[activeChat.id] || []), response]
      }));
    }, 2000);
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9 bg-muted border-border text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map(conv => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gold/5 transition-colors text-left border-b border-border/50 ${activeChat.id === conv.id ? "bg-gold/10 border-l-2 border-l-gold" : ""}`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-sm">
                    {conv.name[0]}
                  </div>
                  {conv.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground truncate">{conv.name}</span>
                    <span className="text-[10px] text-muted-foreground flex-shrink-0">{conv.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground truncate">{conv.role}</p>
                </div>
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
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold">
                  {activeChat.name[0]}
                </div>
                {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">{activeChat.name}</h3>
                <p className="text-[10px] text-muted-foreground">
                  {activeChat.online ? <span className="text-green-500">● Online</span> : "Last seen recently"}
                  {" · "}{activeChat.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-gold w-8 h-8"
                onClick={() => setCallState({ isOpen: true, type: 'voice' })}
              >
                <Phone className="w-4 h-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-muted-foreground hover:text-gold w-8 h-8"
                onClick={() => setCallState({ isOpen: true, type: 'video' })}
              >
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-8 h-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {currentMessages.map(msg => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-sm lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${
                  msg.sender === "me"
                    ? "bg-gold text-black rounded-br-sm"
                    : "bg-card border border-border text-foreground rounded-bl-sm"
                }`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-black/50" : "text-muted-foreground"} text-right`}>
                    {msg.time}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold w-9 h-9">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Input
                placeholder="Type a message..."
                className="flex-1 bg-muted border-border focus:border-gold"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gold text-black hover:bg-gold/90 w-9 h-9 p-0"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CallInterface 
        isOpen={callState.isOpen} 
        onClose={() => setCallState({ ...callState, isOpen: false })} 
        callerName={activeChat.name}
        type={callState.type}
      />
    </div>
  );
}