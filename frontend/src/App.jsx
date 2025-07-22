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
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import useAuthUser from "./hooks/useAuthUser";

function App() {
  const { isLoading, authUser } = useAuthUser();

  const isAuthenticated = Boolean(authUser);

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <Loader />;

  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {isOnboarded ? (
                <HomePage />
              ) : (
                <Navigate to="/onboarding" replace />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? <SignUpPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <NotificationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/call"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CallPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ChatPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
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
