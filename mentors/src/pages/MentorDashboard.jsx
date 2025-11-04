import React, { useState } from "react";
import { SignOutButton, useUser } from "@clerk/clerk-react";
import { ToastContainer, toast } from "react-toastify";
import Spline from "@splinetool/react-spline";
import "react-toastify/dist/ReactToastify.css";

const SESSION_DATE = "6 November 2025";
const SESSION_TIME = "10:00 AM";
const GOOGLE_MEET = "https://meet.google.com/bhy-yohb-two";

const mentor = {
  name: "Akash Verma",
  email: "aakashverma7122004@gmail.com",
  role: "Mentor",
};

const student = {
  name: "Akash Verma",
  email: "rockingav9876@gmail.com",
};

export default function MentorDashboard() {
  const { user } = useUser();
  const [sent, setSent] = useState(false);

  const sendSMS = () => {
    toast.info("Sending SMS...");
    setTimeout(() => {
      setSent(true);
      toast.success("📩 SMS has been sent successfully!");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-[#070713] text-white font-inter overflow-hidden">
      {/* 🤖 Small Robot in Background */}
      <div className="absolute bottom-0 left-0 w-[450px] h-[400px] opacity-90 z-0 pointer-events-none">
        <Spline scene="https://prod.spline.design/GLppA6onwN7gQhEs/scene.splinecode" />
      </div>

      {/* 🌌 Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050510]/95 via-[#0a0a1a]/90 to-[#0e0e22]/95 backdrop-blur-sm z-[1]" />

      {/* 🌟 Main Content */}
      <div className="relative z-10 p-8">
        <ToastContainer position="top-right" autoClose={2500} />

        {/* Header */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Mentor<span className="text-indigo-400">X</span> Dashboard
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Welcome back, {mentor.name}! Manage your sessions and students.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className="text-right text-sm">
                <div className="text-gray-400">Signed in as</div>
                <div className="font-medium">{user.firstName || user.username}</div>
              </div>
            )}
            <SignOutButton>
              <button className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg shadow">
                Sign out
              </button>
            </SignOutButton>
          </div>
        </header>

        {/* Main Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Notifications Card */}
          <div className="md:col-span-2 bg-[#1b1b2f]/85 backdrop-blur-md border border-indigo-600/30 rounded-2xl p-6 shadow-2xl transition-transform hover:scale-[1.01]">
            <h2 className="text-xl font-semibold text-indigo-300 mb-4 flex items-center gap-2">
              🔔 Notifications
            </h2>

            <div className="bg-gradient-to-br from-gray-800/70 to-gray-900/40 border border-gray-700 rounded-xl p-5 flex justify-between items-center">
              <div>
                <div className="text-lg font-medium text-indigo-200">
                  Mentor Session Invite
                </div>
                <div className="text-sm text-gray-300 mt-1">
                  Scheduled for {SESSION_DATE} at {SESSION_TIME}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Student: {student.name} • {student.email}
                </div>
              </div>

              <div className="flex flex-col gap-2 items-end">
                <span
                  className={`text-xs font-semibold ${
                    sent ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {sent ? "✅ Sent" : "🕒 Pending"}
                </span>

                <button
                  onClick={sendSMS}
                  disabled={sent}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    sent
                      ? "bg-green-600/50 text-gray-200 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  {sent ? "SMS Sent" : "Send SMS Invite"}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Info Card */}
          <aside className="bg-[#1b1b2f]/85 backdrop-blur-md border border-indigo-600/30 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-semibold text-indigo-300 mb-4">
              🧾 Session Details
            </h3>
            <div className="space-y-3 text-sm">
              <p>
                <span className="text-gray-400">Date:</span> {SESSION_DATE}
              </p>
              <p>
                <span className="text-gray-400">Time:</span> {SESSION_TIME}
              </p>
              <p>
                <span className="text-gray-400">Google Meet:</span>{" "}
                <a
                  href={GOOGLE_MEET}
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan-300 hover:underline break-all"
                >
                  {GOOGLE_MEET}
                </a>
              </p>
              <div className="border-t border-gray-700 pt-3 mt-3">
                <p className="text-gray-400 text-xs mb-1">Mentor</p>
                <p className="font-medium text-white">{mentor.name}</p>
                <p className="text-xs text-gray-400">{mentor.email}</p>
              </div>
              <div className="border-t border-gray-700 pt-3 mt-3">
                <p className="text-gray-400 text-xs mb-1">Student</p>
                <p className="font-medium text-white">{student.name}</p>
                <p className="text-xs text-gray-400">{student.email}</p>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(GOOGLE_MEET);
                  toast.success("🔗 Meet link copied!");
                }}
                className="w-full bg-cyan-600 hover:bg-cyan-700 py-2 rounded-lg text-sm font-medium"
              >
                Copy Meet Link
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
