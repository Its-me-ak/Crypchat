import React from "react";
import { Route, Routes } from "react-router";
import { CallPage, ChatPage, HomePage, LoginPage, NotificationPage, OnboardingPage, SignUpPage } from "./pages";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="h-screen" data-theme="coffee">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/notifications" element={< NotificationPage/>} />
        <Route path="/call" element={<CallPage/>} />
        <Route path="/chat" element={<ChatPage/>} />
        <Route path="/onboarding" element={<OnboardingPage/>} />
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
