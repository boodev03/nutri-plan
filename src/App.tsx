import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginForm } from "./components/auth/LoginForm";
import { Calendar } from "./components/calendar/Calendar";
import { LandingPage } from "./components/LandingPage";
import { Layout } from "./components/Layout";
import { SuggestTab } from "./components/SuggestTab";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { MealProvider } from "./contexts/MealContext";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/suggest" replace />} />
        <Route
          path="/suggest"
          element={
            <ProtectedRoute>
              <SuggestTab />
            </ProtectedRoute>
          }
        />
        <Route
          path="/calendar"
          element={
            <ProtectedRoute>
              <Calendar />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <MealProvider>
            <AppContent />
            <Toaster position="top-right" />
          </MealProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
