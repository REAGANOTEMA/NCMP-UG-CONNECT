import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Feed from "./pages/Feed";
import MPDirectory from "./pages/MPDirectory";
import MPProfile from "./pages/MPProfile";
import Parliament from "./pages/Parliament";
import Committees from "./pages/Committees";
import Sessions from "./pages/Sessions";
import Constituencies from "./pages/Constituencies";
import Projects from "./pages/Projects";
import Analytics from "./pages/Analytics";
import About from "./pages/About";
import Messages from "./pages/Messages";
import ReportIssue from "./pages/ReportIssue";
import ProfileSettings from "./pages/ProfileSettings";
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
              
              {/* Protected Routes */}
              <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
              <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
              <Route path="/report-issue" element={<ProtectedRoute><ReportIssue /></ProtectedRoute>} />
              <Route path="/profile/settings" element={<ProtectedRoute><ProfileSettings /></ProtectedRoute>} />
              
              {/* Public/Semi-Public Routes */}
              <Route path="/parliament" element={<Parliament />} />
              <Route path="/parliament/mps" element={<MPDirectory />} />
              <Route path="/parliament/mps/:id" element={<MPProfile />} />
              <Route path="/parliament/committees" element={<Committees />} />
              <Route path="/parliament/sessions" element={<Sessions />} />
              
              <Route path="/constituencies" element={<Constituencies />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/about" element={<About />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}