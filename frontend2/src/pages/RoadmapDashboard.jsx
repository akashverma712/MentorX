import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const RoadmapDashboard = () => {
  const [inputs, setInputs] = useState({
    experience: "",
    education: "",
    dreamsalary: "",
    dreamjob: "",
    dreamcompany: "",
  });
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRoadmap(null);

    try {
      const res = await axios.post("http://127.0.0.1:5000/api/roadmap", inputs);
      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
      setError("Failed to generate roadmap. Please check your backend.");
    } finally {
      setLoading(false);
    }
  };

  // Reusable Card Component
  const Card = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-lg transition-all"
    >
      {title && <h2 className="text-xl font-semibold mb-3 text-blue-600">{title}</h2>}
      {children}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-blue-600 mb-6"
      >
        🚀 AI Career Roadmap Generator
      </motion.h1>

      {/* 🧾 Input Form */}
      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md p-6 mb-10"
      >
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., Fresher, 2 years)"
            value={inputs.experience}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="education"
            placeholder="Education (e.g., B.Tech CSE)"
            value={inputs.education}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="dreamsalary"
            placeholder="Dream Salary (e.g., 50 LPA)"
            value={inputs.dreamsalary}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="dreamjob"
            placeholder="Dream Job (e.g., ML Engineer)"
            value={inputs.dreamjob}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            name="dreamcompany"
            placeholder="Dream Company (e.g., Google)"
            value={inputs.dreamcompany}
            onChange={handleChange}
            required
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </form>

      {/* ⚙️ Loading & Error States */}
      {loading && (
        <div className="flex justify-center items-center text-gray-600 text-lg">
          Loading roadmap...
        </div>
      )}
      {error && (
        <div className="flex justify-center items-center text-red-500 text-lg">
          {error}
        </div>
      )}

      {/* 🚀 Show Generated Roadmap */}
      {roadmap && (
        <>
          <p className="text-center text-gray-700 max-w-3xl mx-auto text-lg mb-10">
            {roadmap.overview}
          </p>

          {/* 🧭 Roadmap Stages */}
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {["short_term", "mid_term", "long_term"].map((term) => (
              <Card key={term} title={term.replace("_", " ").toUpperCase()}>
                <ul className="list-disc ml-5 space-y-2 text-gray-700">
                  {roadmap.roadmap[term]?.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>

          {/* 🎯 Milestones */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">🎯 Milestones</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {roadmap.milestones?.map((milestone, i) => (
                <Card key={i}>
                  <p className="font-semibold text-gray-800">{milestone.name}</p>
                  <p className="text-sm text-gray-500">
                    Timeframe: {milestone.timeframe}
                  </p>
                  <p className="mt-2 text-gray-600 text-sm">
                    {milestone.acceptance_criteria}
                  </p>
                </Card>
              ))}
            </div>
          </div>

          {/* 📘 Learning Plan */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">📘 Learning Plan</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {roadmap.learning_plan?.map((item, i) => (
                <Card key={i} title={item.topic}>
                  <p className="text-sm text-gray-600 mb-2">
                    Weekly Hours:{" "}
                    <span className="font-medium">{item.weekly_hours}</span>
                  </p>
                  <ul className="list-disc ml-5 space-y-1 text-gray-700">
                    {item.resources?.map((res, j) => (
                      <li key={j}>
                        <a
                          href={res}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 underline"
                        >
                          {res}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* 💼 Job Search Strategy */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              💼 Job Search Strategy
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(roadmap.job_search_strategy || {}).map(([key, value]) => (
                <Card key={key} title={key.charAt(0).toUpperCase() + key.slice(1)}>
                  <p className="text-gray-700">{value}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* 💰 Salary Progression */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-blue-600 mb-4">
              💰 Estimated Salary Progression
            </h2>
            <Card>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={roadmap.estimated_salary_progression}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timeframe" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="expected_salary"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* 📝 Notes */}
          <Card title="📝 Notes">
            <p className="text-gray-700">{roadmap.notes}</p>
          </Card>

          {/* Footer */}
          <p className="text-center text-gray-400 text-sm mt-12">
            Built with ❤️ using React, Tailwind, Recharts & Framer Motion
          </p>
        </>
      )}
    </div>
  );
};

export default RoadmapDashboard;
