"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Search, MoreVertical, Phone, Video, Paperclip } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import CallInterface from "@/components/CallInterface";
import { initSocket, joinRoom, sendMessage, onMessage, typing, onTyping, messageRead, onMessageRead } from "@/services/socket";
import { useAuth } from "@/context/AuthContext";

const mockConversations = [
  { id: "mp-001", name: "Muhammad Nsereko", role: "MP – Kampala Central", lastMsg: "Thank you for your feedback...", time: "10:24", unread: 2, online: true },
  { id: "mp-003", name: "Joel Ssenyonyi", role: "MP – Nakawa West", lastMsg: "I will address this in parliament...", time: "Yesterday", unread: 0, online: true },
  { id: "mp-010", name: "Matthias Mpuuga", role: "MP – Nyendo-Mukungwe", lastMsg: "Meeting scheduled for Monday.", time: "Yesterday", unread: 1, online: false },
];

export default function Messages() {
  const { user } = useAuth();
  const [activeChat, setActiveChat] = useState(mockConversations[0]);
  const [message, setMessage] = useState("");
  const [chatHistories, setChatHistories] = useState<Record<string, any[]>>({});
  const [typingUsers, setTypingUsers] = useState<Record<string, string[]>>({});
  const [callState, setCallState] = useState<{ isOpen: boolean; type: "voice" | "video" }>({ isOpen: false, type: "voice" });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize socket
  const socket = initSocket();

  // Auto-scroll messages
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

  // Socket listeners
  useEffect(() => {
    socket.connect();
    joinRoom(activeChat.id);

    onMessage((msg: any) => {
      setChatHistories((prev) => ({
        ...prev,
        [msg.roomId]: [...(prev[msg.roomId] || []), msg],
      }));
      scrollToBottom();
    });

    onTyping(({ roomId, userId }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [roomId]: prev[roomId]?.includes(userId) ? prev[roomId] : [...(prev[roomId] || []), userId],
      }));
    });

    onMessageRead((msgId: string | number) => {
      // Optionally mark messages read visually
      // Can implement with a "read" flag in chatHistories
    });

    return () => socket.disconnect();
  }, []);

  // Switch rooms when active chat changes
  useEffect(() => {
    joinRoom(activeChat.id);
    scrollToBottom();
  }, [activeChat.id]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMsg = {
      id: Date.now(),
      sender: "me",
      text: message,
      time: new Date().toLocaleTimeString("en-UG", { hour: "2-digit", minute: "2-digit" }),
      roomId: activeChat.id,
    };

    setChatHistories((prev) => ({
      ...prev,
      [activeChat.id]: [...(prev[activeChat.id] || []), newMsg],
    }));

    sendMessage(activeChat.id, newMsg);
    setMessage("");
    scrollToBottom();
  };

  const handleTyping = () => {
    if (!user?.id) return;
    typing({ roomId: activeChat.id, userId: user.id });
  };

  const currentMessages = chatHistories[activeChat.id] || [];
  const currentTypingUsers = typingUsers[activeChat.id] || [];

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
            {mockConversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setActiveChat(conv)}
                className={`w-full p-4 flex items-start gap-3 hover:bg-gold/5 transition-colors text-left border-b border-border/50 ${
                  activeChat.id === conv.id ? "bg-gold/10 border-l-2 border-l-gold" : ""
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold text-sm">{conv.name[0]}</div>
                  {conv.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
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

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-card">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center font-bold">{activeChat.name[0]}</div>
                {activeChat.online && <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-card" />}
              </div>
              <div>
                <h3 className="text-foreground font-semibold text-sm">{activeChat.name}</h3>
                <p className="text-[10px] text-muted-foreground">
                  {activeChat.online ? <span className="text-green-500">● Online</span> : "Last seen recently"} · {activeChat.role}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold w-8 h-8" onClick={() => setCallState({ isOpen: true, type: "voice" })}>
                <Phone className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold w-8 h-8" onClick={() => setCallState({ isOpen: true, type: "video" })}>
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground w-8 h-8">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {currentMessages.map((msg) => (
              <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-sm lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.sender === "me" ? "bg-gold text-black rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm"}`}>
                  <p>{msg.text}</p>
                  <p className={`text-[10px] mt-1 ${msg.sender === "me" ? "text-black/50" : "text-muted-foreground"} text-right`}>{msg.time}</p>
                </div>
              </motion.div>
            ))}

            {/* Typing indicator */}
            {currentTypingUsers.length > 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start text-sm text-muted-foreground">
                {currentTypingUsers.join(", ")} typing...
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border bg-card flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-gold w-9 h-9">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1 bg-muted border-border focus:border-gold"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                handleTyping();
                if (e.key === "Enter") handleSendMessage();
              }}
            />
            <Button onClick={handleSendMessage} className="bg-gold text-black hover:bg-gold/90 w-9 h-9 p-0">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Call Interface */}
      <CallInterface isOpen={callState.isOpen} onClose={() => setCallState({ ...callState, isOpen: false })} callerName={activeChat.name} type={callState.type} />
    </div>
  );
}