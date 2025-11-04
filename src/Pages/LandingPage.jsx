import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from "lucide-react";
import { useTranslation } from 'react-i18next';

const Landing = () => {
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState("English");

  
  const languages = [
    { name: "English", code: "english" },
    { name: "Hindi", code: "hindi" },
    { name: "தமிழ்", code: "tamil" },
    { name: "తెలుగు", code: "telugu" }
  ];

 
  const changeLanguage = (lang) => {
    setSelectedLang(lang.name);
    setOpen(false);
    i18n.changeLanguage(lang.code); 
  };

  return (
    <div className="relative min-h-screen bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col items-center justify-center px-6 py-12">

     
      <div className="absolute top-12 right-35 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 cursor-pointer bg-[#1b1d35] text-gray-200 hover:bg-[#292b50] border border-gray-700 px-4 py-2 rounded-xl shadow-lg transition duration-200"
        >
          <Globe className="w-5 h-5 text-blue-400" />
          <span className="font-medium">{selectedLang}</span>
        </button>

        {open && (
          <div className="absolute mt-2 bg-[#232547] border border-gray-700 rounded-xl shadow-lg w-36 overflow-hidden animate-fadeIn">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang)}
                className={`block w-full text-left px-4 py-2 text-sm hover:bg-[#2f3162] transition ${
                  lang.name === selectedLang ? "text-blue-400" : "text-gray-300"
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>

      
      <nav className="w-full max-w-7xl flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 text-transparent bg-clip-text ">
          MentorX
        </h1>
      </nav>

     
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-[float_15s_ease-in-out_infinite]" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-56 h-56 bg-blue-500/20 rounded-full blur-3xl animate-[float_20s_ease-in-out_infinite]" style={{ top: '50%', left: '70%' }}></div>
        <div className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-[float_18s_ease-in-out_infinite]" style={{ top: '75%', left: '20%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-[float_25s_ease-in-out_infinite]" style={{ top: '30%', left: '80%' }}></div>
      </div>

      
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-between gap-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold leading-snug mb-6">
            {t("hero.heading1")}<br />
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-500 text-transparent bg-clip-text">
              {t("hero.heading2")}
            </span>
          </h2>

          <p className="text-gray-300 text-lg mb-8 max-w-xl">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-transform">
              {t("hero.button")}
            </button>
            <button className="border border-gray-400 text-gray-200 hover:bg-gray-100 hover:text-black font-semibold px-6 py-3 rounded-full">
              {t("hero.join")}
            </button>
          </div>

          <div className="flex gap-10 mt-8 text-gray-400 text-sm">
            <div>
              <p className="text-2xl font-bold text-white">50K+</p>
              {t("stats.students")}
            </div>
            <div>
              <p className="text-2xl font-bold text-white">100+</p>
              {t("stats.careers")}
            </div>
            <div>
              <p className="text-2xl font-bold text-white">95%</p>
              {t("stats.success")}
            </div>
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="flex-4 bg-white backdrop-blur-xl p-6 rounded-2xl shadow-2xl w-full max-w-md"
        >
          <h3 className="text-xl font-semibold mb-4 text-center text-black">
            {t("career.title")}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { title: t("career.engineer"), salary: t("career.salary.engineer"), emoji: "🧑‍💻" },
              { title: t("career.doctor"), salary: t("career.salary.doctor"), emoji: "👨‍⚕️" },
              { title: t("career.designer"), salary: t("career.salary.designer"), emoji: "🎨" },
              { title: t("career.teacher"), salary: t("career.salary.teacher"), emoji: "👩‍🏫" },
              { title: t("career.ias"), salary: t("career.salary.ias"), emoji: "⚖️" },
              { title: t("career.lawyer"), salary: t("career.salary.lawyer"), emoji: "👨‍⚖️" }
            ].map((career, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/20 p-4 rounded-xl text-center shadow-md hover:bg-white/30 transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2 text-white">{career.emoji}</div>
                <h4 className="font-semibold text-black">{career.title}</h4>
                <p className="text-violet-600 font-semibold text-sm">{career.salary}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
