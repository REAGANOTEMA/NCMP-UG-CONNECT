// src/context/NotificationContext.tsx
"use client";

import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { toast } from "sonner";
import { initSocket } from "@/services/socket";
import { requestFirebaseToken, onMessageListener } from "@/services/firebase";
import { useAuth } from "./AuthContext";
import { Radio, Bell, ShieldCheck } from "lucide-react";

interface NotificationContextType {
  sendLiveAlert: (sessionTitle: string) => void;
  sendPostAlert: (author: string, content: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const socket = initSocket();

  useEffect(() => {
    if (!isAuthenticated) return;

    // -----------------------------
    // 1. Request Firebase Token for Push Notifications
    // -----------------------------
    requestFirebaseToken().catch((err) => console.error("❌ FCM token request failed:", err));

    // -----------------------------
    // 2. Listen for Foreground Firebase Messages
    // -----------------------------
    onMessageListener((payload) => {
      toast(payload.notification?.title || "NCMP Alert", {
        description: payload.notification?.body,
        icon: <Bell className="w-4 h-4 text-gold" />,
      });
    });

    // -----------------------------
    // 3. Listen for Socket.io Events
    // -----------------------------
    const onParliamentLive = (data: { title: string }) => {
      toast.error("PARLIAMENT IS LIVE", {
        description: data.title,
        duration: 10000,
        icon: <Radio className="w-4 h-4 animate-pulse" />,
        action: {
          label: "Watch Now",
          onClick: () => (window.location.href = "/parliament/sessions"),
        },
      });
    };

    const onOfficialPost = (data: { author: string; content: string }) => {
      toast.success(`New Post from ${data.author}`, {
        description: data.content.length > 60 ? data.content.substring(0, 60) + "..." : data.content,
        icon: <ShieldCheck className="w-4 h-4 text-gold" />,
        action: {
          label: "View Feed",
          onClick: () => (window.location.href = "/feed"),
        },
      });
    };

    socket.on("parliament_live", onParliamentLive);
    socket.on("official_post", onOfficialPost);

    // -----------------------------
    // Cleanup listeners on unmount
    // -----------------------------
    return () => {
      socket.off("parliament_live", onParliamentLive);
      socket.off("official_post", onOfficialPost);
    };
  }, [isAuthenticated, socket]);

  // -----------------------------
  // Emitters for backend or testing
  // -----------------------------
  const sendLiveAlert = (sessionTitle: string) => {
    socket.emit("broadcast_live", { title: sessionTitle });
  };

  const sendPostAlert = (author: string, content: string) => {
    socket.emit("broadcast_post", { author, content });
  };

  return (
    <NotificationContext.Provider value={{ sendLiveAlert, sendPostAlert }}>
      {children}
    </NotificationContext.Provider>
  );
};

// Custom hook for easy access
export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};