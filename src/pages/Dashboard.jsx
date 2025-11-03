import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";

// --- Inline SVG Icons ---
const SparklesIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18H8a4 4 0 0 1-4-4V6L3 3h3l3 3h6l3-3h3l-1 3v8a4 4 0 0 1-4 4h-4zM12 2v2M20 12h2M2 12h2M12 20v2"/>
  </svg>
);
const LayoutDashboardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);
const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M2 16h6M8 16h12M12 8l4 8M16 16l4-8M12 8l-4 8M8 8l4-8M16 8l-4-8"/>
  </svg>
);
const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const TargetIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);
const LineChartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);
const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <path d="M20 8v6M23 11h-6"></path>
  </svg>
);
const MessageCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 11.5a8.38 8.38 0 0 1-2.92 5.88c-1.8.84-3.7 1.32-5.78 1.32H12a8 8 0 1 1 0-16c2.08 0 3.98.48 5.78 1.32A8.38 8.38 0 0 1 21 11.5z"></path>
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

// --- Data ---
const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboardIcon },
  { id: "guide", label: "Career Guide", icon: BookOpenIcon },
  { id: "sim", label: "Career Assessment", icon: ZapIcon },
  { id: "graph", label: "Roadmap", icon: LayoutDashboardIcon },
  { id: "mentor", label: "Mentor Connect", icon: UsersIcon },

];

const statCards = [
  { title: "Simulations Completed", value: "12", detail: "+3 this week", detailColor: "text-green-400", icon: TargetIcon, iconColor: "text-white", bgColor: "bg-indigo-500", iconBg: "bg-indigo-700" },
  { title: "Career Score", value: "85%", detail: "Excellent progress", detailColor: "text-green-500", icon: LineChartIcon, iconColor: "text-green-400", bgColor: "bg-gray-800", iconBg: "bg-green-600" },
  { title: "Courses Enrolled", value: "5", detail: "2 in progress", detailColor: "text-indigo-400", icon: BookOpenIcon, iconColor: "text-white", bgColor: "bg-gray-800", iconBg: "bg-purple-600" },
  { title: "Mentor Sessions", value: "3", detail: "1 scheduled", detailColor: "text-orange-400", icon: UsersIcon, iconColor: "text-white", bgColor: "bg-gray-800", iconBg: "bg-orange-600" },
];

const actionItems = [
  { title: "Ask Career Guide", subtitle: "Get instant AI-powered career advice", icon: MessageCircleIcon, color: "text-blue-400" },
  { title: "Try Career Assessment", subtitle: "Explore various career paths", icon: ZapIcon, color: "text-green-400" },
];

// --- Sub Components ---
const StatCard = ({ title, value, detail, detailColor, icon: Icon, iconColor, bgColor, iconBg }) => (
  <div className={`p-5 rounded-xl ${bgColor} shadow-xl border border-gray-700/50 flex flex-col justify-between h-full transition duration-300 transform hover:scale-[1.03] hover:shadow-2xl hover:border-indigo-500 cursor-pointer`}>
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <p className="text-gray-300 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon className={`${iconColor} w-5 h-5`} />
      </div>
    </div>
    <p className={`text-sm font-medium ${detailColor}`}>{detail}</p>
  </div>
);

const ActionItem = ({ title, subtitle, icon: Icon, color }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        if (title === "Ask Career Guide") navigate("/Chatbot");
        else if (title === "Mentor Connect") navigate("/MentorConnect");
      }}
      className="flex items-center justify-between p-4 mb-4 rounded-xl bg-gray-800/70 hover:bg-gray-700/80 transition duration-200 cursor-pointer border border-transparent hover:border-blue-400"
    >
      <div className="flex items-center space-x-4">
        <div className={`p-2 rounded-lg bg-gray-700/70 border ${color} border-current`}>
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="font-semibold text-white">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <ArrowRightIcon className="w-5 h-5 text-gray-400" />
    </div>
  );
};

const FloatingDecorations = () => (
  <>
    <div className="absolute top-1/4 left-[5%] w-32 h-32 rounded-full bg-indigo-500 opacity-20 blur-3xl animate-pulse hidden md:block"></div>
    <div className="absolute top-1/2 right-[10%] w-24 h-24 rounded-full bg-green-400 opacity-20 blur-2xl animate-ping hidden lg:block"></div>
    <div className="absolute bottom-10 left-[20%] w-20 h-20 rounded-full bg-blue-500 opacity-15 blur-2xl animate-pulse hidden md:block"></div>
  </>
);

// --- Main Component ---
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-white font-inter p-6 relative overflow-hidden">
      <FloatingDecorations />

      <div className="relative z-10">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 style={{
            WebkitTextStroke: "1px white",
          }} className="text-2xl font-extrabold tracking-tight">Mentor<span className="text-red-400">X</span></h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400 hidden sm:block">{user?.primaryEmailAddress?.emailAddress}</span>
            <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
          </div>
        </header>

        {/* Welcome Card */}
        <div className="relative p-8 rounded-2xl mb-10 bg-gradient-to-r from-indigo-600 via-purple-700 to-indigo-800 shadow-2xl overflow-hidden">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-2">
            Welcome back,{" "}
            <span className="text-yellow-300">
              {user?.firstName || user?.username || "User"}
            </span>{" "}
            👋
          </h2>
          <p className="text-indigo-100 text-lg">
            Ready to continue your career journey? Let’s explore new opportunities and insights.
          </p>
          <div className="absolute top-5 right-5 p-3 bg-indigo-700 rounded-full bg-opacity-50 border border-indigo-500">
            <SparklesIcon className="w-6 h-6 text-yellow-300" />
          </div>
        </div>

        {/* Nav Tabs */}
        <div className="flex flex-wrap border-b border-gray-700 mb-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (item.id === "mentor") navigate("/MentorConnect");
              }}
              className={`py-3 px-5 text-sm font-semibold transition duration-150 flex items-center space-x-2 rounded-t-lg
                ${activeTab === item.id
                  ? "bg-indigo-700/30 text-indigo-400 border-b-2 border-indigo-400"
                  : "text-gray-400 hover:text-white border-b-2 border-transparent hover:border-gray-600"
                }`}
            >
              <item.icon className="w-4 h-4" />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {statCards.map((card, i) => (
            <StatCard key={i} {...card} />
          ))}
        </div>

        {/* Only Quick Actions Box Now */}
        <div className="p-6 rounded-xl bg-gray-900/80 shadow-xl border border-gray-800">
          <h3 className="text-xl font-semibold mb-4 text-indigo-300">Quick Actions</h3>
          {actionItems.map((a, i) => <ActionItem key={i} {...a} />)}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
