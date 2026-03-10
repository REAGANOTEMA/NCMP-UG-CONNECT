import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Firebase utilities
import { requestFirebaseToken, onMessageListener } from "./firebase";
import { API_BASE_URL } from "./services/api";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MPDirectory from "./pages/MPDirectory";
import Parliament from "./pages/Parliament";
import Constituencies from "./pages/Constituencies";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // 1️⃣ Request notification permission & get FCM token
    requestFirebaseToken().then((token) => {
      if (token) {
        console.log("📩 FCM Token obtained:", token);

        // Send token to backend to save for the logged-in user
        fetch(`${API_BASE_URL}/notifications/register-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token }),
        })
          .then((res) => res.json())
          .then((data) => console.log("✅ Token saved:", data))
          .catch((err) => console.error("❌ Token save error:", err));
      }
    });

    // 2️⃣ Listen for foreground notifications
    onMessageListener((payload) => {
      console.log("📩 Foreground message received:", payload);

      const title = payload.notification?.title || "NCMP Notification";
      const body = payload.notification?.body || "";

      // You can customize how you show notifications
      alert(`${title}\n${body}`);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/parliament" element={<Parliament />} />
            <Route path="/parliament/mps" element={<MPDirectory />} />
            <Route path="/constituencies" element={<Constituencies />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/about" element={<About />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}