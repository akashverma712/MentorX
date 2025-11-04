import React from "react";
import { Mail, Phone, MapPin, Facebook, Linkedin, Twitter, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-gray-300 py-10  border-t border-slate-700 mt-0">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 sm:grid-cols-2 gap-8">

        <div>
          <h2 className="text-2xl font-bold text-white mb-3">MentorX</h2>
          <p className="text-sm">
            Explore your path, learn from the best, and grow your career with our curated video and document resources across multiple domains.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About</a></li>
            <li><a href="#" className="hover:text-white transition">Career Paths</a></li>
            <li><a href="#" className="hover:text-white transition">Resources</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail size={18} /> <span>support@MentorX.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={18} /> <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={18} /> <span>New Delhi, India</span>
            </li>
          </ul>
        </div>

        {/* 4️⃣ Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500 transition"><Facebook /></a>
            <a href="#" className="hover:text-blue-400 transition"><Twitter /></a>
            <a href="#" className="hover:text-blue-700 transition"><Linkedin /></a>
            <a href="#" className="hover:text-red-500 transition"><Youtube /></a>
          </div>
        </div>

      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-slate-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} <span className="text-white font-semibold">MentorX</span>.  
        All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
