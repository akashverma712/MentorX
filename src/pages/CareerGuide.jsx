import React, { useState, useEffect, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  MapPin,
  CheckCircle,
  X,
  Search,
  Filter,
  DollarSign,
  Star,
  Zap,
  Briefcase,
} from "lucide-react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// --- LEAFLET MARKER FIX (Essential for Map rendering) ---
if (L) {
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
        iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
        shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
    });
}

// --- MOCK SERVICE PROVIDER DATA (6 Providers) ---
const serviceProviderData = [
    {
        id: 1,
        name: "Ravi Electricals",
        service: "Minor Repairs (Electrical)",
        rate: 350,
        jobsDone: 152,
        rating: 4.8,
        lat: 23.8144,
        lng: 86.4412,
        city: "Dhanbad",
        description: "Certified electrician with quick response time for home repairs.",
    },
    {
        id: 2,
        name: "Priya Tutors",
        service: "Tutoring (Math & Science)",
        rate: 500,
        jobsDone: 88,
        rating: 4.9,
        lat: 23.825,
        lng: 86.455,
        city: "Dhanbad",
        description: "Experienced teaching professional, specializing in secondary education.",
    },
    {
        id: 3,
        name: "CleanSweep Team",
        service: "Deep Cleaning (Home/Office)",
        rate: 1200,
        jobsDone: 210,
        rating: 4.6,
        lat: 23.79,
        lng: 86.43,
        city: "Dhanbad",
        description: "Professional cleaning services with eco-friendly products.",
    },
    {
        id: 4,
        name: "Event Decor Masters",
        service: "Event Decorating",
        rate: 4500,
        jobsDone: 45,
        rating: 4.5,
        lat: 23.78,
        lng: 86.45,
        city: "Dhanbad",
        description: "Creative and affordable decoration for all occasions.",
    },
    {
        id: 5,
        name: "Quick Shopper",
        service: "Grocery Shopping & Delivery",
        rate: 150,
        jobsDone: 320,
        rating: 4.7,
        lat: 23.83,
        lng: 86.44,
        city: "Dhanbad",
        description: "Fastest delivery service for groceries and urgent errands.",
    },
    {
        id: 6,
        name: "Plumbing Pro",
        service: "Plumbing Fixes",
        rate: 400,
        jobsDone: 110,
        rating: 4.4,
        lat: 23.80,
        lng: 86.46,
        city: "Dhanbad",
        description: "Reliable solutions for all leaks and pipe repairs.",
    },
];

// --- Sub-Components ---

// Re-centers the map when the user's position changes
const MapRecenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        if (map && center) map.flyTo(center, 13, { animate: true });
    }, [center, map]);
    return null;
};

// The Booking Modal (Popup) Component
const BookingModal = ({ isOpen, onClose, provider }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [isConfirmed, setIsConfirmed] = useState(false);

    // Reset state when modal opens/changes provider
    useEffect(() => {
        setName("");
        setPhone("");
        setAddress("");
        setIsConfirmed(false);
    }, [provider]);

    if (!isOpen || !provider) return null;

    const handleBooking = () => {
        // Here you would send the booking request to your backend
        console.log(`Booking confirmed for ${provider.name}. Details: Name: ${name}, Phone: ${phone}, Address: ${address}`);
        setIsConfirmed(true);

        setTimeout(() => {
            onClose();
        }, 3000);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999] p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <motion.div
                className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg relative border-4 border-indigo-500 z-[10000] text-gray-900"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 p-2 rounded-full hover:bg-gray-100 transition"
                >
                    <X className="w-6 h-6" />
                </button>

                {!isConfirmed ? (
                    <>
                        <h2 className="text-3xl font-extrabold text-indigo-600 mb-2 flex items-center">
                            <Zap className="w-7 h-7 mr-3" /> Book {provider.service}
                        </h2>
                        <div className="bg-indigo-50 p-4 rounded-lg mb-6 border border-indigo-200">
                            <p className="text-lg font-bold">{provider.name}</p>
                            <p className="text-sm text-gray-700">Service: **{provider.service}**</p>
                            <p className="text-sm text-gray-700">Rate: **₹{provider.rate}/hr (approx)**</p>
                            <p className="text-sm text-gray-700 flex items-center">
                                <Star className="w-4 h-4 text-yellow-500 mr-1" /> {provider.rating} ({provider.jobsDone} Jobs Done)
                            </p>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your name"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Enter your contact number"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Service Address</label>
                                <textarea
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="Enter full service address"
                                    rows="2"
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                                />
                            </div>
                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={!name || !phone || !address}
                            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-bold transition shadow-md disabled:opacity-50"
                        >
                            Confirm Booking
                        </button>
                    </>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-10"
                    >
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h3>
                        <p className="text-gray-600">
                            **{provider.name}** will contact you shortly at **{phone}**.
                            <br />Thank you for using our service!
                        </p>
                    </motion.div>
                )}
            </motion.div>
        </motion.div>
    );
};

// --- Main Component ---
const ServiceProviderFinder = () => {
    const [position, setPosition] = useState([23.8144, 86.4412]); // Default to Dhanbad
    const [selectedProvider, setSelectedProvider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Geolocation
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    setPosition([pos.coords.latitude, pos.coords.longitude]);
                },
                () => {
                    console.warn("Location access denied. Using default Dhanbad.");
                },
                { enableHighAccuracy: true, timeout: 10000 }
            );
        }
    }, []);

    // ✅ Search Filter
    const filteredProviders = useMemo(() => {
        if (!searchTerm) return serviceProviderData;
        const lower = searchTerm.toLowerCase();
        return serviceProviderData.filter(
            (p) =>
                p.name.toLowerCase().includes(lower) ||
                p.service.toLowerCase().includes(lower) ||
                p.city.toLowerCase().includes(lower) ||
                p.description.toLowerCase().includes(lower)
        );
    }, [searchTerm]);

    // ✅ Booking Modal Controls
    const openBookingModal = (provider) => {
        setSelectedProvider(provider);
        setIsModalOpen(true);
    };
    const closeBookingModal = () => {
        setIsModalOpen(false);
        setSelectedProvider(null);
    };

    return (
        // Light Theme Background
        <div className="min-h-screen bg-gray-50 text-gray-900 p-6 flex flex-col gap-8 relative font-sans">
            
            {/* Header */}
            <motion.div
                className="text-center mb-6 z-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <h1 className="text-5xl font-extrabold text-indigo-700 drop-shadow-sm">
                    <Briefcase className="inline-block w-10 h-10 mr-2 text-red-500" /> Local Service Finder
                </h1>
                <p className="text-gray-600 mt-2 text-lg">
                    Find and book verified professionals near you instantly.
                </p>
            </motion.div>

            {/* Search Bar */}
            <div className="flex justify-center my-4 z-10">
                <div className="relative w-full max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-400" />
                    <input
                        type="text"
                        placeholder="Search for a service (e.g., 'plumbing', 'tutoring')..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-3 pl-12 pr-4 bg-white border border-gray-300 rounded-full text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-lg"
                    />
                    <Filter className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
            </div>

            {/* Map */}
            <motion.div
                className="relative h-[40vh] rounded-2xl overflow-hidden shadow-xl border-4 border-indigo-200 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={true}
                    style={{ height: "100%", width: "100%", zIndex: 0 }}
                >
                    <MapRecenter center={position} />
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" // Changed to simpler OSM layer for light theme
                    />
                    <Marker position={position}>
                        <Popup className="z-[5000]">
                            <b>Your Current Location 📍</b>
                        </Popup>
                    </Marker>
                    {filteredProviders.map((provider) => (
                        <Marker key={provider.id} position={[provider.lat, provider.lng]}>
                            <Popup className="z-[5000]">
                                <div className="text-gray-900 font-sans relative z-[6000]">
                                    <b className="text-indigo-600">{provider.name}</b> <br />
                                    <p className="text-sm text-gray-700 my-1">
                                        **{provider.service}**
                                    </p>
                                    <p className="text-xs flex items-center">
                                        <Star className="w-3 h-3 text-yellow-500 mr-1" /> {provider.rating} ({provider.jobsDone} Jobs)
                                    </p>
                                    <button
                                        onClick={() => openBookingModal(provider)}
                                        className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full text-sm font-semibold transition shadow-md"
                                    >
                                        Book Now (₹{provider.rate})
                                    </button>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </motion.div>

            {/* Provider Cards */}
            <h2 className="text-2xl font-bold text-gray-800 mt-4 border-l-4 border-indigo-500 pl-3">
                Available Providers ({filteredProviders.length})
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 z-10">
                {filteredProviders.map((provider) => (
                    <motion.div
                        key={provider.id}
                        className="bg-white border border-gray-200 rounded-xl p-5 hover:border-indigo-400 transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
                        whileHover={{ scale: 1.02, y: -3 }}
                        onClick={() => openBookingModal(provider)}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <MapPin className="w-5 h-5 text-indigo-500 flex-shrink-0 mr-3 mt-1" />
                            <div>
                                <h2 className="text-xl font-bold text-indigo-600">{provider.name}</h2>
                                <p className="text-sm text-gray-500 italic">
                                    {provider.description}
                                </p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-3 space-y-2">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium flex items-center"><Zap className="w-4 h-4 mr-1 text-red-500" /> Service:</span>
                                <span className="text-gray-800 font-semibold">{provider.service}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium flex items-center"><DollarSign className="w-4 h-4 mr-1 text-green-500" /> Rate (Est.):</span>
                                <span className="text-green-700 font-bold">₹{provider.rate}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium flex items-center"><Star className="w-4 h-4 mr-1 text-yellow-500" /> Rating:</span>
                                <span className="text-gray-800 font-semibold">{provider.rating} / 5</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-600 font-medium flex items-center"><CheckCircle className="w-4 h-4 mr-1 text-cyan-500" /> Jobs Done:</span>
                                <span className="text-gray-800 font-semibold">{provider.jobsDone}</span>
                            </div>
                        </div>

                        <button className="mt-4 w-full text-md bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition shadow-md font-semibold">
                            Book Service
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* ✅ Booking Modal (The Service Booking Popup) */}
            <AnimatePresence>
                <BookingModal
                    isOpen={isModalOpen}
                    onClose={closeBookingModal}
                    provider={selectedProvider}
                />
            </AnimatePresence>
        </div>
    );
};

// Component is still exported under its original name from the prompt, though its functionality changed.
export default ServiceProviderFinder;