import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import MagicBento from "../components/MagicBento";
import Navbar from "../components/Navbar1.jsx";

const About = () => {
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
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#000");
      gradient.addColorStop(1, "#000");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* ✨ Starry Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      {/* Navbar */}
      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-10">
        {/* Left Side - MagicBento with Animation */}
        <motion.div
          className="w-1/2 flex justify-center items-center"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <MagicBento
            textAutoHide={true}
            enableStars={true}
            enableSpotlight={true}
            enableBorderGlow={true}
            enableTilt={true}
            enableMagnetism={true}
            clickEffect={true}
            spotlightRadius={300}
            particleCount={12}
            glowColor="132, 0, 255"
          />
        </motion.div>

        {/* Right Side - About Text with Animation */}
        <motion.div
          className="w-1/2 text-white flex flex-col justify-center px-8 space-y-6"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          <div className="group cursor-default transition-all duration-500">
            <p className="text-lg text-white leading-relaxed group-hover:tracking-wide transition-all duration-500">
              Vriddhi stands as a bridge between farmers and technology — empowering
              those who nurture our land with tools that help them grow smarter.
            </p>
          </div>

          <div className="group cursor-default transition-all duration-500">
            <p className="text-lg text-white leading-relaxed group-hover:tracking-wide transition-all duration-500">
              Our mission is simple — bring innovation, insight, and intelligence
              to agriculture, ensuring progress is not just sustainable but shared.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
