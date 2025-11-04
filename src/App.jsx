import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignUp,
} from "@clerk/clerk-react";

import LandingPage from "./pages/LandingPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import CareerGuide from "./pages/CareerGuide.jsx";
import MentorConnect from "./pages/MentorConnect.jsx";

const App = () => {
  return (
    <Routes>
      {/* 🌐 Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔐 Sign In + Sign Up */}
      <Route path="/sign-in/*" element={<SignInPage />} />
      <Route
        path="/sign-up/*"
        element={<SignUp routing="path" path="/sign-up" redirectUrl="/dashboard" />}
      />

      {/* 🧭 Protected Dashboard */}
      <Route
        path="/dashboard"
        element={
          <>
            <SignedIn>
              <Dashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />

      {/* 💬 Protected Chatbot */}
      <Route
        path="/chatbot"
        element={
          <>
            <SignedIn>
              <Chatbot />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />

      {/* 👨‍🏫 Protected MentorConnect */}
      <Route
        path="/mentorconnect"
        element={
          <>
            <SignedIn>
              <MentorConnect />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />

      {/* 🎯 Protected CareerGuide */}
      <Route
        path="/career-guide"
        element={
          <>
            <SignedIn>
              <CareerGuide />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />
    </Routes>
  );
};

export default App;
