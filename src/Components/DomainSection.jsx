import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, FileText, Youtube } from "lucide-react";

const DomainSection = ({ domain, description, videos, pdfs }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-slate-800 text-white rounded-2xl mb-4 p-4 shadow-md transition-all duration-300">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center py-2 text-lg font-semibold"
      >
        <span>{domain}</span>
        <ChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <p className="text-sm text-gray-300">{description}</p>

      <AnimatePresence>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="overflow-hidden"
          >
            <div className="mt-4 bg-slate-700 p-4 rounded-xl">
              {/* Buttons */}
              <div className="flex justify-center mb-4 gap-3">
                <button className="flex items-center border-b-black bg-red-500 px-3 py-1 rounded-md hover:bg-red-500 transition">
                  <Youtube className="mr-2" /> YouTube Videos ({videos.length})
                </button>
                <button className="flex items-center bg-gray-300 text-black px-3 py-1 rounded-md hover:bg-gray-200 transition">
                  <FileText className="mr-2" /> Documents & Guides ({pdfs.length})
                </button>
              </div>

              {/* Videos */}
              <div className="grid md:grid-cols-2 gap-3">
                {videos.map((vid, i) => (
                  <motion.a
                    key={i}
                    href={vid.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-slate-600 p-3 rounded-md hover:bg-slate-500 transition"
                  >
                    🎬 {vid.title}
                  </motion.a>
                ))}
              </div>

              {/* PDFs */}
              <div className="grid md:grid-cols-2 gap-3 mt-4">
                {pdfs.map((pdf, i) => (
                  <motion.a
                    key={i}
                    href={pdf.url}
                    target="_blank"
                    rel="noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.2 }}
                    className="bg-slate-600 p-3 rounded-md hover:bg-slate-500 transition"
                  >
                    📄 {pdf.title}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DomainSection;
