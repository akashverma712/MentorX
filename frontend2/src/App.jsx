// import React from "react";
// // import RoadmapDashboard from "./components/RoadmapDashboard";
// import AptitudeDashboard from "./components/AssessmentDashboard";

// function App() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <AptitudeDashboard />
//     </div>
//   );
// }

// export default App;






import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  RedirectToSignIn,
  SignUp
} from "@clerk/clerk-react";

import LandingPage from "./pages/LandingPage.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import SignInPage from "./pages/SignInPage.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import MentorConnect from "./pages/MentorConnect.jsx";
import { Car } from "lucide-react";
import CareerGuide from "./pages/CareerGuide.jsx";
import AssessmentDashboard from "./pages/AssessmentDashboard.jsx";
import RoadmapDashboard from "./pages/RoadmapDashboard.jsx";

const App = () => {
  return (
    <Routes>
      {/* 🌐 Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/contact" element={<Contact />} />

      {/* 🔐 Custom SignIn page (black UI) */}
      <Route path="/sign-in/*" element={<SignInPage />} />

      {/* 🆕 Optional SignUp route */}
      <Route
        path="/sign-up/*"
        element={
          <SignUp routing="path" path="/sign-up" redirectUrl="/dashboard" />
        }
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

      {/* 💬 Protected Chatbot route */}
      <Route
        path="/Chatbot"
        element={
          <>
            <SignedIn>
              <Chatbot /> {/* ✅ fixed name here */}
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />
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
      {/* 💬 Protected Chatbot route */}
      <Route
        path="/Career-Assessment"
        element={
          <>
            <SignedIn>
              <AssessmentDashboard /> {/* ✅ fixed name here */}
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
       />
       <Route
        path="/roadmap"
        element={
          <>
            <SignedIn>
              <RoadmapDashboard />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn redirectUrl="/sign-in" />
            </SignedOut>
          </>
        }
      />
   <Route
        path="/MentorConnect"
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
    </Routes>
  );
};

export default App;
