import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";


const SparklesIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 18H8a4 4 0 0 1-4-4V6L3 3h3l3 3h6l3-3h3l-1 3v8a4 4 0 0 1-4 4h-4zM12 2v2M20 12h2M2 12h2M12 20v2"/>
  </svg>
);
const LayoutDashboardIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);
const BookOpenIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M2 16h6M8 16h12M12 8l4 8M16 16l4-8M12 8l-4 8M8 8l4-8M16 8l-4-8"/>
  </svg>
);
const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);
const TargetIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10"></circle>
    <circle cx="12" cy="12" r="6"></circle>
    <circle cx="12" cy="12" r="2"></circle>
  </svg>
);
const LineChartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
  </svg>
);
const UsersIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <path d="M20 8v6M23 11h-6"></path>
  </svg>
);
const MessageCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M21 11.5a8.38 8.38 0 0 1-2.92 5.88c-1.8.84-3.7 1.32-5.78 1.32H12a8 8 0 1 1 0-16c2.08 0 3.98.48 5.78 1.32A8.38 8.38 0 0 1 21 11.5z"></path>
  </svg>
);
const ArrowRightIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const SearchIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);
const CheckCircleIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
);
const PlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19"></line>
        <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
);
const AwardIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="7"></circle>
        <polyline points="8.21 13.89 7 22 17 22 15.79 13.89"></polyline>
    </svg>
);
// Added X icon from lucide-react standard
const XIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);


const FEATURE_OPTIONS = [
    { id: 'repairs', label: 'Home Repairs (Minor)', icon: ZapIcon },
    { id: 'tutoring', label: 'Academic Tutoring', icon: BookOpenIcon },
    { id: 'cleaning', label: 'Deep Cleaning Services', icon: TargetIcon },
    { id: 'tech_support', label: 'IT/Tech Support', icon: LineChartIcon },
];

// Updated stat cards with 0 values and new context
const statCards = [
  { 
    title: "Jobs Completed", 
    value: "0", 
    detail: "Earn points by completing services.", 
    detailColor: "text-green-600", 
    icon: TargetIcon, 
    iconBg: "bg-indigo-600" 
},
  { 
    title: "Helper Rating", 
    value: "0.0", 
    detail: "Based on 5-star customer reviews.", 
    detailColor: "text-red-600", 
    icon: AwardIcon, 
    iconBg: "bg-teal-500" 
},
  { 
    title: "Hours Contributed", 
    value: "0", 
    detail: "Total time spent providing help.", 
    detailColor: "text-indigo-600", 
    icon: UsersIcon, 
    iconBg: "bg-red-500" 
},
];

const mainServices = [
  { id: "guide", title: "Services", subtitle: "Find services near you", icon: LayoutDashboardIcon, color: "text-indigo-600", bgColor: "bg-indigo-50" },
  { id: "mentor", title: "Requests", subtitle: "See who has requsted services", icon: MessageCircleIcon, color: "text-green-600", bgColor: "bg-green-50" },
  { id: "ai", title: "PieBot", subtitle: "Get your doubts cleared via our PieBot", icon: SparklesIcon, color: "text-purple-600", bgColor: "bg-purple-50" },
];

// --- Sub Components ---

/**
 * FeatureOfferModal Component (The required popup box with Description and Selection)
 */
const FeatureOfferModal = ({ isOpen, onClose, onSave, selectedFeatures, initialDescription }) => {
    const [localSelection, setLocalSelection] = useState(selectedFeatures);
    const [description, setDescription] = useState(initialDescription || "");

    const handleToggle = (id) => {
        setLocalSelection(prev => 
            prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
        );
    };

    if (!isOpen) return null;

    return (
        // Modal Backdrop
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 flex items-center justify-center p-4">
            {/* Modal Content */}
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6">
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-2xl font-bold text-gray-900">Set Your Service Profile 🛠️</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
                        <XIcon className="w-6 h-6" />
                    </button>
                </div>
                
                {/* 1. Description Input */}
                <div className="mb-6">
                    <label htmlFor="service-desc" className="block text-sm font-semibold text-gray-800 mb-2">
                        Profile Description (What you offer and how)
                    </label>
                    <textarea
                        id="service-desc"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="E.g., I provide reliable minor electrical fixes and fast plumbing leak repairs. Available weekends."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                    />
                </div>

                {/* 2. Feature Selection */}
                <h4 className="text-md font-semibold text-gray-800 mb-3">Select Specific Services Offered:</h4>
                <div className="space-y-3 max-h-60 overflow-y-auto pr-2">
                    {FEATURE_OPTIONS.map(feature => (
                        <div
                            key={feature.id}
                            onClick={() => handleToggle(feature.id)}
                            className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition duration-150 ${
                                localSelection.includes(feature.id)
                                    ? 'border-indigo-500 bg-indigo-50 shadow-sm'
                                    : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                            }`}
                        >
                            <div className="flex items-center space-x-3">
                                <feature.icon className={`w-5 h-5 ${localSelection.includes(feature.id) ? 'text-indigo-600' : 'text-gray-500'}`} />
                                <p className="font-semibold text-gray-800">{feature.label}</p>
                            </div>
                            {localSelection.includes(feature.id) && (
                                <CheckCircleIcon className="w-6 h-6 text-indigo-600" />
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-100">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onSave(localSelection, description)}
                        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                        disabled={localSelection.length === 0 || description.trim() === ""}
                    >
                        Save Profile
                    </button>
                </div>
            </div>
        </div>
    );
};


const StatCard = ({ title, value, detail, detailColor, icon: Icon, iconBg, onClickAction }) => (
  <div 
    className={`p-5 rounded-xl ${'bg-white'} shadow-md border border-gray-200 flex flex-col justify-between h-full transition duration-300 transform hover:shadow-lg cursor-pointer`}
    onClick={onClickAction}
>
    <div className="flex justify-between items-start mb-3">
      <div className="flex-1">
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconBg} shadow-lg`}>
        <Icon className={`text-white w-5 h-5`} />
      </div>
    </div>
    <p className={`text-sm font-medium ${detailColor}`}>{detail}</p>
  </div>
);

const ServiceCard = ({ title, subtitle, icon: Icon, color, bgColor, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    if (id === "ai") navigate("/Chatbot");
    else if (id === "mentor") navigate("/MentorConnect");
    // Route name change based on new functionality (ServiceProviderFinder)
    else if (id === "guide") navigate("/career-guide"); 
  };

  return (
    <div
      onClick={handleClick}
      className={`relative p-5 rounded-xl ${bgColor} shadow-lg border-2 border-transparent transition duration-300 transform hover:scale-[1.03] hover:shadow-xl hover:border-indigo-400 cursor-pointer h-full`}
    >
      <div className={`p-3 rounded-full ${color} ${bgColor.replace('-50', '-100')} inline-flex items-center justify-center mb-3`}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className="text-lg font-semibold text-gray-900 mb-1">{title}</h4>
      <p className="text-sm text-gray-600">{subtitle}</p>
      <div className="absolute bottom-5 right-5 opacity-30">
        <ArrowRightIcon className={`w-5 h-5 ${color}`} />
      </div>
    </div>
  );
};


// --- Main Component ---
const Dashboard = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  // --- States for Feature & Verification ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Simulating user features/skills offered - Initial data
  const [userFeatures, setUserFeatures] = useState([]); // Start empty for new provider
  const [userDescription, setUserDescription] = useState("");
  // Simulating a verification status
  const [isVerified] = useState(false); // Default to false

    /**
     * Callback function to update features and close modal
     */
  const handleSaveFeatures = useCallback((features, description) => {
    setUserFeatures(features);
    setUserDescription(description);
    setIsModalOpen(false);
    // Show a confirmation message
    const featureLabels = features.map(id => FEATURE_OPTIONS.find(f => f.id === id)?.label).join(', ');
    console.log(`Profile Updated! Offering: ${featureLabels}. Description: ${description.substring(0, 30)}...`);
  }, []);
  
  // Custom Stat Card data, dynamically updated based on userFeatures state
  const featuresStatCard = {
      title: "Services Offered",
      value: userFeatures.length.toString(),
      detail: userFeatures.length > 0 
            ? `Primary: ${FEATURE_OPTIONS.find(f => f.id === userFeatures[0])?.label}`
            : "Click to set your profile details", 
      detailColor: userFeatures.length > 0 ? "text-indigo-600" : "text-red-500", 
      icon: PlusIcon, 
      iconColor: "text-white", 
      bgColor: "bg-white", 
      iconBg: "bg-blue-500",
      onClickAction: () => setIsModalOpen(true) // Added action to open modal
  };


  return (
    <div className="min-h-screen bg-gray-50 font-inter p-4 sm:p-6 lg:p-10">

      {/* Feature Selection Modal (Renders only when isModalOpen is true) */}
      {isModalOpen && (
        <FeatureOfferModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveFeatures}
            selectedFeatures={userFeatures}
            initialDescription={userDescription}
        />
      )}

      {/* Header (Top Navigation) */}
      <header className="flex justify-between items-center bg-white p-4 shadow-sm rounded-xl mb-8 sticky top-0 z-20">
        <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">
         <span className="text-red-500">H</span>ELP<span className="text-red-500">IE</span>
        </h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
                type="text"
                placeholder="Search customer requests..."
                className="w-full sm:w-64 p-2 pl-10 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-sm text-gray-800"
            />
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
        </div>
      </header>

      <div className="max-w-7xl mx-auto">
        
        {/* Welcome Banner with Verification Badge */}
        <div className="p-8 rounded-2xl mb-10 bg-red-50 border border-red-200 shadow-lg overflow-hidden flex flex-col md:flex-row items-start justify-between">
          <div>
            <div className="flex items-center mb-2">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Welcome,{" "}
                <span className="text-red-600">
                    {user?.firstName || user?.username || "Helper"}
                </span>{" "}
                🛠️
                </h2>
                {!isVerified && (
                    <div className="ml-3 flex items-center space-x-1 text-red-600 bg-red-100 px-3 py-1 rounded-full text-sm font-semibold border border-red-300">
                        <XIcon className="w-5 h-5" />
                        <span>Unverified</span>
                    </div>
                )}
            </div>
            <p className="text-gray-600 text-lg">
              Ready to earn and contribute? Complete your service profile to start getting requests!
            </p>
            {/* Offer Features Button - This opens the modal! */}
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 px-6 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition shadow-md flex items-center space-x-2"
            >
                <PlusIcon className="w-5 h-5" />
                <span>{userFeatures.length > 0 ? "Edit Service Profile" : "Setup Service Profile"}</span>
            </button>
          </div>
          <SparklesIcon className="w-10 h-10 text-red-400 hidden sm:block mt-4 md:mt-0" />
        </div>

        {/* Helper Rating & Impact Section */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-red-500 pl-3">Your Helper Rating & Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {/* Features Stat Card (Clickable) */}
            <StatCard {...featuresStatCard} /> 
            {statCards.map((card, i) => (
              <StatCard key={i} {...card} />
            ))}
          </div>
        </section>
        
        {/* User's Profile Summary (Shows details set in the modal) */}
        {userFeatures.length > 0 && (
            <section className="mb-10 p-6 bg-white shadow-lg border border-indigo-200 rounded-xl">
                <h3 className="text-xl font-bold text-indigo-600 mb-3 flex items-center">
                    <LayoutDashboardIcon className="w-5 h-5 mr-2" /> Current Profile Overview
                </h3>
                <p className="text-gray-700 italic mb-4">"{userDescription}"</p>
                <div className="flex flex-wrap gap-2">
                    {userFeatures.map(id => {
                        const feature = FEATURE_OPTIONS.find(f => f.id === id);
                        return feature ? (
                            <span key={id} className="px-3 py-1 text-sm font-medium text-white bg-indigo-500 rounded-full flex items-center">
                                <CheckCircleIcon className="w-4 h-4 mr-1 fill-white" />
                                {feature.label}
                            </span>
                        ) : null;
                    })}
                </div>
            </section>
        )}
        <hr className="my-8" />
        {/* --- Main Services / Categories (Service Provider Tools) --- */}
        <section className="mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-indigo-500 pl-3">Your Core Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mainServices.map((service, i) => (
              <ServiceCard key={i} {...service} />
            ))}
          </div>
        </section>
        <hr className="my-8" />
        {/* --- Quick Actions / Suggestions (Clean, list-style) --- */}
        <section>
          <h3 className="text-2xl font-bold text-gray-800 mb-5 border-l-4 border-indigo-500 pl-3">Next Steps</h3>
          <div className="p-6 rounded-xl bg-white shadow-lg border border-gray-200">
            <div
              onClick={() => navigate("/ServiceProviderFinder")} // Changed route name to match the Service Provider context
              className="flex items-center justify-between p-4 mb-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition duration-200 cursor-pointer border border-indigo-300"
            >
                <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-indigo-600/10 border border-indigo-600">
                      <ZapIcon className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">Go to Job Board</p>
                        <p className="text-sm text-gray-500">Find new service requests posted by nearby customers.</p>
                    </div>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div
              onClick={() => navigate("/DonationHistory")} // Keeping existing route for now
              className="flex items-center justify-between p-4 rounded-lg bg-white hover:bg-gray-50 transition duration-200 cursor-pointer border border-gray-200"
            >
                <div className="flex items-center space-x-4">
                    <div className="p-2 rounded-lg bg-green-600/10 border border-green-600">
                      <LayoutDashboardIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                        <p className="font-semibold text-gray-900">Update Availability</p>
                        <p className="text-sm text-gray-500">Control when customers can book your services.</p>
                    </div>
                </div>
                <ArrowRightIcon className="w-5 h-5 text-gray-500" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;