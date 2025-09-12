import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import BookingSessions from "./components/BookingSessions";
import MyNetwork from "./components/MyNetwork";
import ChatInterface from "./components/ChatInterface";
import PracticeHub from "./components/PracticeHub";
import BadgesGallery from "./components/BadgesGallery";
import AdminDashboard from "./components/AdminDashboard";
import Sidebar from "./components/Sidebar";
import TopHeader from "./components/TopHeader";
import { Toaster } from "./components/ui/sonner";

// Mock authentication context
interface User {
  id: string;
  name: string;
  email: string;
  role: "student" | "mentor" | "admin";
  avatar: string;
  isMentor: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = React.createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  isAuthenticated: false,
});

export const useAuth = () => React.useContext(AuthContext);

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  // Handle initial URL cleanup
  useEffect(() => {
    // If the current path includes .html or other non-SPA patterns, redirect to root
    if (
      window.location.pathname.includes(".html") ||
      window.location.pathname.includes("preview_page")
    ) {
      window.history.replaceState({}, "", "/");
    }
  }, []);

  const login = (email: string, password: string) => {
    // Mock login - in real app would authenticate with backend
    const mockUser: User = {
      id: "1",
      name:
        email === "admin@test.com"
          ? "Aditi Sharma"
          : "Arjun Patel",
      email,
      role: email === "admin@test.com" ? "admin" : "student",
      avatar:
        "https://images.unsplash.com/photo-1681165232934-c09dfa5ee694?w=150&h=150&fit=crop&crop=face",
      isMentor: email.includes("mentor"),
    };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const authValue = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={authValue}>
      <Router basename="/">
        <div className="min-h-screen bg-background">
          <Toaster />
          {user ? (
            <div className="flex h-screen">
              <Sidebar />
              <div className="flex-1 flex flex-col overflow-hidden">
                <TopHeader />
                <main className="flex-1 overflow-auto bg-background">
                  <Routes>
                    <Route
                      path="/"
                      element={<Navigate to="/book-sessions" />}
                    />
                    <Route
                      path="/auth"
                      element={<Navigate to="/book-sessions" />}
                    />
                    <Route
                      path="/book-sessions"
                      element={<BookingSessions />}
                    />
                    <Route
                      path="/my-network"
                      element={<MyNetwork />}
                    />
                    <Route
                      path="/chat"
                      element={<ChatInterface />}
                    />
                    <Route
                      path="/practice-hub"
                      element={<PracticeHub />}
                    />
                    <Route
                      path="/badges"
                      element={<BadgesGallery />}
                    />
                    <Route
                      path="/admin"
                      element={
                        user?.role === "admin" ? (
                          <AdminDashboard />
                        ) : (
                          <Navigate to="/book-sessions" />
                        )
                      }
                    />
                    <Route
                      path="*"
                      element={
                        <Navigate to="/book-sessions" replace />
                      }
                    />
                  </Routes>
                </main>
              </div>
            </div>
          ) : (
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route
                path="*"
                element={<Navigate to="/" replace />}
              />
            </Routes>
          )}
        </div>
      </Router>
    </AuthContext.Provider>
  );
}