import React from "react";
import { resources } from "../data/resources";
import DomainSection from "../Components/DomainSection";

const CareerResources = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8">Choose Your Career Path</h1>

      <div className="max-w-4xl mx-auto">
        {resources.map((res, index) => (
          <DomainSection key={index} {...res} />
        ))}
      </div>
    </div>
  );
};

export default CareerResources;