import { Route, Routes, Navigate } from "react-router";
import {
  CallPage,
  ChatPage,
  HomePage,
  LoginPage,
  NotificationPage,
  OnboardingPage,
  SignUpPage,
} from "./pages";
import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./utils/axios";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const {
    data: authData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const response = await axiosInstance.get("/auth/me");
      return response.data;
    },
    retry: false, // disable auto retry on error, without retry: false, React Query by default retries failed queries 3 times
  });
  
  const authUser = authData?.data;

  return (
    <div className="h-screen" data-theme="forest">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute authUser={authUser}>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute authUser={authUser}>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call"
          element={
            <ProtectedRoute authUser={authUser}>
              <CallPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute authUser={authUser}>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute authUser={authUser}>
              <OnboardingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
