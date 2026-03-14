"use client";

import React, { createContext, useContext, useEffect } from 'react';
import { toast } from "sonner";
import { initSocket, onMessage } from "@/services/socket";
import { requestFirebaseToken, onMessageListener } from "@/firebase";
import { useAuth } from "./AuthContext";
import { Radio, Bell, ShieldCheck } from "lucide-react";

interface NotificationContextType {
  sendLiveAlert: (sessionTitle: string) => void;
  sendPostAlert: (author: string, content: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const socket = initSocket();

  useEffect(() => {
    if (isAuthenticated) {
      // 1. Request Firebase Token for Background Push Notifications
      requestFirebaseToken();

      // 2. Listen for Foreground Firebase Messages
      onMessageListener((payload) => {
        toast(payload.notification?.title || "NCMP Alert", {
          description: payload.notification?.body,
          icon: <Bell className="w-4 h-4 text-gold" />,
        });
      });

      // 3. Socket.io Real-time Listeners
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

      socket.on("official_post", (data: { author: string, content: string }) => {
        toast.success(`New Post from ${data.author}`, {
          description: data.content.substring(0, 60) + "...",
          icon: <ShieldCheck className="w-4 h-4 text-gold" />,
          action: {
            label: "View Feed",
            onClick: () => window.location.href = "/feed",
          },
        });
      });
    }

    return () => {
      socket.off("parliament_live");
      socket.off("official_post");
    };
  }, [isAuthenticated]);

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

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotifications must be used within NotificationProvider");
  return context;
};