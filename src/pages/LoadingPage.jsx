import React from 'react';

const CustomLoader = () => (
  <div className="relative flex justify-center items-center">
    
    <div className="absolute w-28 h-28 rounded-full bg-red-600 opacity-20 animate-ping duration-1500"></div>
    
    <div className="relative w-20 h-20 bg-gray-900 border-4 border-indigo-500 rounded-full shadow-2xl shadow-red-500/50 flex justify-center items-center animate-pulse">
      
      <div className="w-8 h-8 border-4 border-t-4 border-t-white border-indigo-300 rounded-full animate-spin duration-700"></div>
      
    </div>
    
    <div className="absolute text-red-500 text-xl font-extrabold" style={{ transform: 'translateY(-1px)' }}>
      H
    </div>

  </div>
);

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 p-4 font-inter">
      
      <h1 
        className="text-6xl md:text-8xl font-black text-gray-800 bg-clip-text mb-8 tracking-widest animate-pulse-slow" 
        style={{ 
          color: '#1f2937', 
          textShadow: '2px 2px 0 #fff, -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 0 0 10px rgba(255, 255, 255, 0.7)'
        }}
      >
        HELPIE
      </h1>
      
      <CustomLoader />
      
  
      <p className="mt-12 text-2xl text-gray-300 font-light tracking-wider animate-bounce-slow">
        Your Skills Their Smiles
      </p>
    
      <p className="absolute bottom-4 text-xs text-gray-600">
        Securing connections...
      </p>

    </div>
  );
};
export default Loader;