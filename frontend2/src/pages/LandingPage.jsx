import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar1";
import Loader from "./LoadingPage.jsx";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 12000); // Show loader for 12 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Navbar />
      <div
        style={{
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
          position: "relative",
          background: "linear-gradient(135deg, #000000, #4B0082)",
        }}
      >
        <iframe
          src="https://my.spline.design/prismcoin-tp4FPkfRxuG92CqzNJvvc35s/"
          frameBorder="0"
          width="100%"
          height="100%"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            border: "none",
          }}
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
};

export default Landing;
