// components/Navbar.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { LogIn } from "lucide-react"; // ✅ clean arrow login icon

const Navbar = () => {
  const canvasRef = useRef(null);
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  // 🌌 Stars animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let stars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = 80;
      stars = Array.from({ length: 60 }, () => ({
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

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-black/70 via-black/40 to-black/70 backdrop-blur-xl border-b border-white/10"
    >
      {/* Starry background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
      />

      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4 relative z-10">
        {/* Logo */}
        <motion.h1
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 250 }}
          className="text-3xl font-extrabold tracking-wide text-transparent bg-clip-text"
          style={{
            WebkitTextStroke: "1px white",
          }}
        >
          Mentor <span className="text-red-500">X</span>
        </motion.h1>

        {/* Navigation Links */}
        <div className="flex items-center gap-10">
          {[
            { name: "Home", to: "/" },
            { name: "About", to: "/about" },
            { name: "Contact", to: "/contact" },
            { name: "Dashboard", to: "/dashboard" },
          ].map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 + 0.5, duration: 0.6 }}
            >
              <Link
                to={item.to}
                onClick={(e) => {
                  if (item.to === "/dashboard" && !isSignedIn) {
                    e.preventDefault();
                    navigate("/sign-in");
                  }
                }}
                className="relative text-white/80 font-medium tracking-wide hover:text-purple-300 transition-all duration-300"
              >
                {item.name}
              </Link>
            </motion.div>
          ))}

          {/* Auth section */}
          {!isSignedIn ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate("/sign-in")}
              className="flex items-center gap-2 px-5 py-2 border border-white/40 rounded-md text-white font-medium hover:bg-white/10 transition-all duration-300 shadow-sm"
            >
              Log In
              <LogIn size={18} />
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="ml-4"
            >
              <UserButton
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10",
                  },
                  variables: {
                    colorPrimary: "#a855f7",
                  },
                }}
              />
            </motion.div>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
