import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar1";

const colors = {
  pageBg: "#000000",
  whiteText: "#FFFFFF",
  grayText: "#9CA3AF",
  inputBorder: "#FFFFFF",
  errorRed: "#EF4444",
};

const toastVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.8 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: 50, scale: 0.8 },
};

const ContactPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2,
        alpha: Math.random(),
        speed: 0.01 + Math.random() * 0.02,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((s) => {
        s.alpha += s.speed;
        if (s.alpha > 1 || s.alpha < 0) s.speed *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 100, 255, ${s.alpha})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setShowErrorToast(true);
      setTimeout(() => setShowErrorToast(false), 3000);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      setIsLoading(false);
      setIsSent(true);

      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSent(false);
      }, 2000);
    }, 1500);
  };

  const FormInput = ({ type = "text", name, placeholder, isTextArea = false }) => {
    const baseClass = `w-full bg-transparent border-b border-white focus:border-b-2 outline-none transition-all duration-300 py-3 text-lg font-medium placeholder-gray-500 text-white`;

    if (isTextArea) {
      return (
        <textarea
          name={name}
          rows="4"
          className={`${baseClass} resize-none`}
          placeholder={placeholder}
          onChange={handleChange}
          value={formData[name]}
        />
      );
    }

    return (
      <input
        type={type}
        name={name}
        className={baseClass}
        placeholder={placeholder}
        onChange={handleChange}
        value={formData[name]}
      />
    );
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center p-4 md:p-10 overflow-hidden"
      style={{ backgroundColor: colors.pageBg }}
    >
      {/* Twinkling star canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-6xl py-12 px-6 md:px-12 lg:px-16"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24">
          {/* Left Info Section */}
          <div className="space-y-12">
            <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-white">
              Get in Touch
              <span className="text-7xl md:text-9xl align-top text-purple-400">*</span>
            </h1>

            <div className="space-y-10">
              <p className="text-lg font-light max-w-md text-gray-400">
                We’d love to hear from you! Whether it is any feature which
                can be improved or any part which you don't like. Just drop us a 
                message.
              </p>

              <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 text-base font-medium">
                <span className="flex items-center space-x-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href="tel:+91 7479676602"
                    className="hover:text-white transition-colors duration-200"
                  >
                    +91 7479676602
                  </a>
                </span>
                <span className="flex items-center space-x-3 text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
                    />
                  </svg>
                  <a
                    href="mailto:hello@company.com"
                    className="hover:text-white transition-colors duration-200"
                  >
                    vriddhi@company.com
                  </a>
                </span>
              </div>
            </div>
          </div>


          <motion.form onSubmit={handleSubmit} className="space-y-12 pt-16 lg:pt-0">
            <FormInput name="name" placeholder="Name*" />
            <FormInput name="email" placeholder="Email*" type="email" />
            <FormInput
              name="message"
              placeholder="Message (Tell us about your problem)"
              isTextArea={true}
            />

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: isLoading || isSent ? 1 : 0.95 }}
              transition={{ type: "spring", stiffness: 400 }}
              className="flex items-center justify-center text-lg font-semibold py-3 transition-all duration-300 relative w-48 text-white border border-white rounded-full overflow-hidden"
              disabled={isLoading}
            >
              {!isLoading && !isSent && (
                <>
                  <span>Send Message</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </>
              )}
              {isLoading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              )}
              {isSent && <span>Message Sent!</span>}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Toast Message */}
      <AnimatePresence>
        {showErrorToast && (
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-xl shadow-2xl z-50 flex items-center space-x-3"
            style={{ backgroundColor: colors.errorRed, color: colors.whiteText }}
            variants={toastVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="font-semibold">Please fill out required fields.</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <Navbar />
      <ContactPage />
    </>
  );
};

export default Contact;
