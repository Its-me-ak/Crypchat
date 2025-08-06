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
import Layout from "./components/Layout";
import { useThemeStore } from "./store/useThemeStore";

function App() {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();
  const isAuthenticated = Boolean(authUser);

  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <Loader />;

  return (
    <div className="" data-theme={theme}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {isOnboarded ? (
                <Layout showSidebar>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" replace />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <SignUpPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage />
            ) : (
              <Navigate to={isOnboarded ? "/" : "/onboarding"} replace />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {isOnboarded ? (
                <Layout showSidebar>
                  <NotificationPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" replace />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/call/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {
                isOnboarded ? (
                  <Layout>
                    <CallPage />
                  </Layout>
                ) : (
                  <Navigate to="/onboarding" replace />
                )
              }
            </ProtectedRoute>
          }
        />
        <Route
          path="/chat/:id"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
             {
              isOnboarded ? (
                <Layout>
                  <ChatPage />
                </Layout>
              ) : (
                <Navigate to="/onboarding" replace />
              )
             }
            </ProtectedRoute>
          }
        />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              {!isOnboarded ? <OnboardingPage /> : <Navigate to="/" replace />}
            </ProtectedRoute>
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
