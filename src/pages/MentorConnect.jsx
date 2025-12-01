"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Search,
  Mail,
  Phone,
  Clock,
  MapPin,
  CheckCircle,
  X,
  TrendingUp,
  Users,
  AlertTriangle,
  Calendar,
} from "lucide-react";

// --- Utility Components ---
const StatCard = ({ title, value, detail, icon: Icon, color }) => (
  <div className="bg-white p-5 rounded-xl shadow-lg border border-gray-100 flex flex-col justify-between transition duration-300 hover:shadow-xl">
    <div className="flex justify-between items-start mb-3">
      <div>
        <p className="text-gray-500 text-sm mb-1">{title}</p>
        <p className="text-3xl font-bold text-gray-800">{value}</p>
      </div>
      <Icon className={`w-8 h-8 ${color} opacity-70`} />
    </div>
    <p className={`text-sm font-medium ${color}`}>{detail}</p>
  </div>
);

// --- MOCK SERVICE REQUEST DATA ---
const initialRequests = [
  {
    id: 1,
    name: "Abhas Kumar Bardhan",
    city: "Bokaro",
    email: "abhas.bardhan@example.com",
    phone: "7903550610",
    service: "Minor Electrical Fix",
    date: "2025-12-05",
    time: "10:00 AM",
    description: "Light switch replacement in the kitchen and a plug point repair.",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1579389083072-5205562d98c2?q=80&w=800",
  },
  {
    id: 2,
    name: "Priya Sharma",
    city: "Ranchi",
    email: "priya.sharma22@example.com",
    phone: "9876543210",
    service: "Home Deep Cleaning",
    date: "2025-12-06",
    time: "02:00 PM",
    description: "Full apartment deep clean, including bathroom and kitchen.",
    status: "Pending",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?w=800&q=80",
  },
  {
    id: 3,
    name: "Rahul Mehta",
    city: "Dhanbad",
    email: "rahul.mehta99@example.com",
    phone: "9876123450",
    service: "Math Tutoring (Grade 10)",
    date: "2025-12-08",
    time: "05:00 PM",
    description: "Need regular tutoring for algebra and geometry, 3 times a week.",
    status: "Accepted",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&q=80",
  },
];

const MentorConnect = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);

  // --- Trend Data ---
  const trendStats = [
    { title: "Pending Requests", value: requests.filter(r => r.status === 'Pending').length, detail: "Immediate Action Required", icon: AlertTriangle, color: "text-red-600" },
    { title: "Jobs Accepted", value: requests.filter(r => r.status === 'Accepted').length, detail: "Requests in Progress", icon: CheckCircle, color: "text-green-600" },
    { title: "Avg. Response Time", value: "0.5 hr", detail: "Faster than industry average", icon: Clock, color: "text-indigo-600" },
  ];

  // Filter requests by search
  const filteredRequests = useMemo(() => {
    if (!searchTerm) return requests;
    const lower = searchTerm.toLowerCase();
    return requests.filter(
      (r) =>
        r.name.toLowerCase().includes(lower) ||
        r.service.toLowerCase().includes(lower) ||
        r.city.toLowerCase().includes(lower) ||
        r.description.toLowerCase().includes(lower)
    );
  }, [searchTerm, requests]);

  // Handle request status change
  const handleStatusChange = (id, newStatus) => {
    setRequests(prevRequests => 
      prevRequests.map(r => 
        r.id === id ? { ...r, status: newStatus } : r
      )
    );
    setSelectedRequest(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 py-12 px-6 flex flex-col items-center">
      
      {/* Header */}
      <motion.div
        className="text-center mb-10 w-full max-w-6xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-5xl font-extrabold text-indigo-700">
          <TrendingUp className="inline-block w-10 h-10 mr-2 text-red-500" />
          Service Request Hub
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Manage all incoming service requests and track your performance.
        </p>
      </motion.div>

      {/* Recent Trends Section */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mb-10">
        {trendStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Search Bar */}
      <div className="relative w-full max-w-lg mb-10">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
        <input
          type="text"
          placeholder="Search requests by name, service, or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
        />
      </div>

      {/* Request List */}
      <div className="grid md:grid-cols-1 gap-6 w-full max-w-6xl">
        {filteredRequests.length > 0 ? (
          filteredRequests.map((request) => (
            <motion.div
              key={request.id}
              className={`bg-white rounded-xl p-6 shadow-md border-l-4 ${
                request.status === "Pending" ? "border-red-500" : "border-green-500"
              } hover:shadow-lg transition cursor-pointer`}
              whileHover={{ scale: 1.01 }}
              onClick={() => setSelectedRequest(request)}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-indigo-700">
                  {request.service} for {request.name}
                </h3>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                  request.status === "Pending"
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}>
                  {request.status}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-3">{request.description}</p>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 text-indigo-500" /> {request.city}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1 text-red-500" /> {request.date} ({request.time})
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center p-10 bg-white rounded-xl shadow-lg border border-gray-200">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-xl font-semibold text-gray-600">No matching service requests found.</p>
          </div>
        )}
      </div>

      {/* Modal for Request Details and Action */}
      <AnimatePresence>
        {selectedRequest && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md relative text-gray-900"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setSelectedRequest(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-indigo-700 mb-2">
                Request Details
              </h2>
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <p className="text-xl font-semibold mb-1">{selectedRequest.service}</p>
                <p className="text-sm text-gray-600 mb-3 italic">{selectedRequest.description}</p>
                <p className="text-sm text-gray-700 font-medium flex items-center mb-1">
                  <Calendar className="w-4 h-4 mr-2 text-red-500" /> Date/Time: {selectedRequest.date} at {selectedRequest.time}
                </p>
              </div>
              
              <h3 className="text-lg font-bold mb-3">Customer Contact</h3>
              <div className="space-y-2 mb-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 text-sm">
                  <Users className="w-4 h-4 text-indigo-500" />
                  <span>{selectedRequest.name} ({selectedRequest.city})</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="w-4 h-4 text-green-500" />
                  <span>{selectedRequest.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="w-4 h-4 text-cyan-500" />
                  <span>{selectedRequest.email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedRequest.status === "Pending" && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, "Accepted")}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition shadow-md flex items-center justify-center"
                  >
                    <CheckCircle className="w-5 h-5 mr-2" /> Accept Job
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedRequest.id, "Cancelled")}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition shadow-md flex items-center justify-center"
                  >
                    <X className="w-5 h-5 mr-2" /> Cancel Request
                  </button>
                </div>
              )}
              {selectedRequest.status === "Accepted" && (
                <button
                    onClick={() => handleStatusChange(selectedRequest.id, "Completed")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition shadow-md flex items-center justify-center"
                >
                    <CheckCircle className="w-5 h-5 mr-2" /> Mark as Completed
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MentorConnect;