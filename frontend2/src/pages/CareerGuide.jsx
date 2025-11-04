import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion } from "framer-motion";

// Fix leaflet default marker issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const colleges = {
  "B.Tech": [
    {
      name: "Indian Institute of Technology (ISM) Dhanbad",
      city: "Dhanbad",
      rating: 4.8,
      website: "https://www.iitism.ac.in",
      lat: 23.8144,
      lng: 86.4412,
    },
    {
      name: "Birsa Institute of Technology, Sindri",
      city: "Sindri",
      rating: 4.3,
      website: "https://bitsindri.ac.in/",
      lat: 23.6601,
      lng: 86.4767,
    },
    {
      name: "University College of Engineering & Management, Dhanbad",
      city: "Dhanbad",
      rating: 4.4,
      website: "https://ucemdhanbad.ac.in/",
      lat: 23.8029,
      lng: 86.4431,
    },
  ],
  "B.Com": [
    {
      name: "RSP College, Jharia",
      city: "Dhanbad",
      rating: 4.0,
      website: "https://rspcollegejharia.ac.in/",
      lat: 23.7419,
      lng: 86.4228,
    },
    {
      name: "SSLNT Women's College, Dhanbad",
      city: "Dhanbad",
      rating: 4.2,
      website: "https://sslnt.in/",
      lat: 23.7985,
      lng: 86.4302,
    },
  ],
  "BA": [
    {
      name: "BBMKU (Binod Bihari Mahto Koyalanchal University)",
      city: "Dhanbad",
      rating: 4.4,
      website: "https://bbmku.ac.in/",
      lat: 23.8006,
      lng: 86.4279,
    },
    {
      name: "PK Roy Memorial College, Dhanbad",
      city: "Dhanbad",
      rating: 4.1,
      website: "https://pkroycollege.org/",
      lat: 23.8001,
      lng: 86.4304,
    },
  ],
};

const CareerGuide = () => {
  const [position, setPosition] = useState([23.8144, 86.4412]); // Default: Dhanbad
  const [selectedCourse, setSelectedCourse] = useState("B.Tech");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err) => {
          console.warn("Location access denied, using default Dhanbad");
        }
      );
    }
  }, []);

  const selectedColleges = colleges[selectedCourse] || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white p-6 flex flex-col gap-8">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
          🎓 Career Guide
        </h1>
        <p className="text-gray-300 mt-2">
          Discover the top colleges near your location with satellite view and details.
        </p>
      </motion.div>

      <div className="flex justify-center">
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="bg-gray-800 border border-indigo-500 text-white px-4 py-2 rounded-xl text-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          <option value="B.Tech">B.Tech</option>
          <option value="B.Com">B.Com</option>
          <option value="BA">BA</option>
        </select>
      </div>

      <motion.div
        className="h-[400px] rounded-2xl overflow-hidden shadow-xl border border-indigo-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <MapContainer
          center={position}
          zoom={12}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            subdomains={["mt0", "mt1", "mt2", "mt3"]}
          />
          <Marker position={position}>
            <Popup>You are here 📍</Popup>
          </Marker>
          {selectedColleges.map((college, index) => (
            <Marker
              key={index}
              position={[college.lat, college.lng]}
              title={college.name}
            >
              <Popup>
                <b>{college.name}</b> <br />
                {college.city} <br />
                ⭐ {college.rating} / 5 <br />
                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  Visit Website
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {selectedColleges.map((college, index) => (
          <motion.div
            key={index}
            className="bg-gray-900/60 border border-indigo-500/40 rounded-2xl p-5 hover:bg-gray-800/70 transition-all duration-300 shadow-lg hover:shadow-indigo-500/30"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold text-indigo-400">
              {college.name}
            </h2>
            <p className="text-gray-300">{college.city}</p>
            <p className="text-yellow-400">⭐ {college.rating}</p>
            <a
              href={college.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:underline mt-2 inline-block"
            >
              Visit College ↗
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CareerGuide;