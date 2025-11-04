import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react"; // Importing an icon for the logo placeholder

// Custom colors and theme (Made darker and more vibrant)
const customStyles = {
  vridhiWhite: "#f0f0f0", // Slightly off-white for crisp text
  vridhiGreen: "#10b981", // More saturated Emerald green for intense glow
  VriddhiRed: "#f87171", // More saturated Red
  darkBgStart: "#000000", // Pure black
  darkBgEnd: "#080b13", // Very deep dark blue/gray
  vridhiGold: "#fbbf24", // Saturated Gold/Yellow accent
};

// --- Keyframes ---
const letterRevealKeyframes = `
  @keyframes slide-reveal {
    0% { transform: translateY(20px) scaleY(0.1); opacity: 0; }
    100% { transform: translateY(0) scaleY(1); opacity: 1; }
  }
`;

const taglineRevealKeyframes = `
  @keyframes typing {
    from { width: 0 }
    to { width: 100% }
  }
`;

// New keyframe for the Zap icon's subtle pulse/beat (Glow reduced)
const zapKeyframes = `
  @keyframes zap-beat {
    0%, 100% { transform: scale(1); filter: drop-shadow(0 0 3px ${customStyles.vridhiGreen}); } /* Reduced glow */
    50% { transform: scale(1.02); filter: drop-shadow(0 0 8px ${customStyles.vridhiGreen}); } /* Reduced scale and glow */
  }
`;

// --- Tagline Component ---
const TaglineText = ({ sizeClass = "text-xl" }) => {
  const taglineText = "Empower Paths, Inspire Futures";
  const duration = "4s";
  const charCount = taglineText.length;

  const baseStrokeStyle = {
    color: "transparent",
    WebkitTextStrokeWidth: "1px",
    WebkitTextStrokeColor: customStyles.vridhiGold,
    textStroke: "1px " + customStyles.vridhiGold,
    display: "inline-block",
  };

  return (
    <p
      className={`${sizeClass} font-medium tracking-wide mx-auto text-center`}
      style={{
        width: "max-content",
        whiteSpace: "nowrap",
        overflow: "hidden",
        animation: `typing ${duration} steps(${charCount}, end) forwards`,
      }}
    >
      <span style={baseStrokeStyle}>{taglineText}</span>
    </p>
  );
};

// --- Animated VRIDDHI Text ---
const AnimatedVridhiText = ({ sizeClass = "text-6xl" }) => {
  const text = "Mentor X";
  const letters = text.split("");

  const getDelay = (index) => `${index * 0.15}s`;

  return (
    <h1 className={`${sizeClass} font-black tracking-widest flex justify-center space-x-2 md:space-x-4`}>
      {letters.map((letter, index) => {
        const isX = letter === "X";
        const strokeColor = isX ? customStyles.VriddhiRed : customStyles.vridhiWhite;

        const letterStyle = {
          color: "transparent",
          WebkitTextStroke: `3px ${strokeColor}`,
          textStroke: `3px ${strokeColor}`,
          animation: `slide-reveal 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
          animationDelay: getDelay(index),
          opacity: 0,
          transformOrigin: "top",
        };

        return (
          <span key={index} className="inline-block" style={letterStyle}>
            {letter}
          </span>
        );
      })}
    </h1>
  );
};

// --- Main Loader Component ---
const Loader = () => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("loading");

  useEffect(() => {
    const totalDuration = 3500;
    const intervalTime = 100;
    const step = 100 / (totalDuration / intervalTime); 
    const TAGLINE_DURATION = 4000;
    const POST_LOAD_PAUSE = 500;

    const loadingInterval = setInterval(() => {
      setProgress((prev) => {
        let newProgress = prev + step;
        if (newProgress >= 100) {
          newProgress = 100;
          clearInterval(loadingInterval);
          setTimeout(() => {
            setPhase("tagline");
            setTimeout(() => setPhase("vridhi"), TAGLINE_DURATION);
          }, POST_LOAD_PAUSE);
        }
        return newProgress;
      });
    }, intervalTime);

    return () => clearInterval(loadingInterval);
  }, []);

  const isInitialLoading = phase === "loading";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-500 ease-in-out"
      style={{
        fontFamily: "Inter, sans-serif",
        background: `linear-gradient(135deg, ${customStyles.darkBgStart} 0%, ${customStyles.darkBgEnd} 100%)`,
      }}
    >
      <style>{letterRevealKeyframes + taglineRevealKeyframes + zapKeyframes}</style>

      {/* --- Loading Screen --- */}
      {isInitialLoading && (
        <div 
          className="w-full max-w-sm p-10 rounded-3xl border border-gray-900 flex flex-col items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: "#0c101a", 
            boxShadow: `0 0 30px rgba(16, 185, 129, 0.1), 0 0 10px rgba(16, 185, 129, 0.05)`, // Reduced card shadow
          }}
        >
          <div className="text-center w-full min-h-[250px] flex flex-col justify-center items-center">
            
            {/* Logo/Icon Replacement with subtle glow and custom animation */}
            <Zap 
              className="h-24 w-24 mx-auto" 
              style={{ 
                color: customStyles.vridhiGreen,
                filter: `drop-shadow(0 0 5px ${customStyles.vridhiGreen})`, // Further reduced initial glow
                animation: 'zap-beat 2.5s ease-in-out infinite', // Apply custom beat animation
              }} 
            />
            <p className="text-gray-300 font-semibold mt-4 tracking-wider">M E N T O R X</p>

            {/* Progress bar */}
            <div className="space-y-4 mt-8 w-full">
              <div className="w-full bg-gray-800 rounded-full h-3 shadow-inner overflow-hidden">
                <div
                  className="h-3 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: customStyles.vridhiGreen,
                    boxShadow: `0 0 8px ${customStyles.vridhiGreen}, 0 0 3px ${customStyles.vridhiGreen}` // Slightly reduced progress bar glow
                  }}
                ></div>
              </div>
              <p className="text-center text-sm font-semibold text-gray-400">
                Initializing AI Mentor Services: {Math.floor(progress)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Tagline + VRIDDHI Reveal --- */}
      {(phase === "tagline" || phase === "vridhi") && (
        <div className="flex flex-col items-center justify-center w-full text-white space-y-8 transition-opacity duration-1000 ease-in opacity-100">
          <div className="h-[100px] md:h-[120px] overflow-hidden">
            {phase === "vridhi" && <AnimatedVridhiText sizeClass="text-7xl md:text-9xl" />}
          </div>

          <div className="overflow-hidden">
            <TaglineText sizeClass="text-3xl md:text-4xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Loader;
