import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar1";
import Loader from "./LoadingPage.jsx";

const Landing = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 6000); 
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
          
          <iframe src='https://my.spline.design/abstractnirvana-kRzEFFbwEVvJk2CDwkCoDXps/' frameborder='0' width='100%' height='100%'></iframe>
    
      </div>
    </>
  );
};

export default Landing;
