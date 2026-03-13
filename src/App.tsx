import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import MPDirectory from "./pages/MPDirectory";
import MPProfile from "./pages/MPProfile";
import Parliament from "./pages/Parliament";
import Constituencies from "./pages/Constituencies";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Messages from "./pages/Messages";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/feed" element={<Feed />} />
              <Route path="/parliament" element={<Parliament />} />
              <Route path="/parliament/mps" element={<MPDirectory />} />
              <Route path="/parliament/mps/:id" element={<MPProfile />} />
              <Route path="/constituencies" element={<Constituencies />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/about" element={<About />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}