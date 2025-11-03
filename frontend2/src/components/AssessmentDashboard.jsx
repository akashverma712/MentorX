import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export default function AptitudeDashboard() {
  const [phase, setPhase] = useState("start"); // start | quiz | result | error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Form for starting the quiz — start empty
  const [form, setForm] = useState({
    name: "",
    age: "",
    education: "",
    interests: [{ interest: "", skill: "" }],
  });

  const [sessionId, setSessionId] = useState(null);
  const [question, setQuestion] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [assessment, setAssessment] = useState(null);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function updateInterest(idx, key, value) {
    setForm((prev) => {
      const copy = [...prev.interests];
      copy[idx][key] = value;
      return { ...prev, interests: copy };
    });
  }

  function addInterest() {
    setForm((prev) => ({
      ...prev,
      interests: [...prev.interests, { interest: "", skill: "" }],
    }));
  }

  function removeInterest(idx) {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.filter((_, i) => i !== idx),
    }));
  }

  function interestsToObject(arr) {
    const out = {};
    arr.forEach((it) => {
      if (it.interest) out[it.interest] = it.skill || "";
    });
    return out;
  }

  async function startQuiz(e) {
    if (e) e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name: form.name || "Anonymous",
        age: Number(form.age) || "",
        education: form.education || "",
        interests: interestsToObject(form.interests),
      };

      const res = await axios.post(
        "http://127.0.0.1:5000/api/aptitude",
        payload
      );

      setSessionId(res.data.session_id);
      setQuestion(res.data.question || null);
      setCurrentAnswer("");
      setPhase("quiz");
    } catch (err) {
      console.error(err);
      setError(err.response?.data || err.message || "Failed to start quiz");
      setPhase("error");
    } finally {
      setLoading(false);
    }
  }

  async function submitAnswer() {
    if (!sessionId) return setError("Missing session id");

    setLoading(true);
    setError(null);
    try {
      const payload = {
        session_id: sessionId,
        answer: currentAnswer,
      };

      const res = await axios.post(
        "http://127.0.0.1:5000/api/aptitude/answer",
        payload
      );

      if (res.data.assessment) {
        setAssessment(res.data.assessment);
        setPhase("result");
        setQuestion(null);
        setSessionId(null);
        return;
      }

      if (res.data.question) {
        setQuestion(res.data.question);
        setCurrentAnswer("");
        setPhase("quiz");
        return;
      }

      setError({ message: "Unexpected response", raw: res.data });
      setPhase("error");
    } catch (err) {
      const data = err.response?.data;
      if (data?.assessment) {
        setAssessment(data.assessment);
        setPhase("result");
        return;
      }
      setError(err.response?.data || err.message || "Failed to submit answer");
      setPhase("error");
    } finally {
      setLoading(false);
    }
  }

  function resetAll() {
    setPhase("start");
    setForm({ name: "", age: "", education: "", interests: [{ interest: "", skill: "" }] });
    setSessionId(null);
    setQuestion(null);
    setCurrentAnswer("");
    setAssessment(null);
    setError(null);
  }

  function scoresToRadarData(scores) {
    if (!scores) return [];
    return Object.entries(scores).map(([k, v]) => ({
      subject: k,
      A: Number(v),
    }));
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 p-6">
      <div className="max-w-5xl mx-auto">
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">
              Aptitude — Interactive Dashboard
            </h1>
            <p className="text-sm text-slate-600">
              Start a personalized aptitude quiz and get a visual report.
            </p>
          </div>
          <button
            onClick={resetAll}
            type="button"
            className="px-3 py-1 rounded bg-white shadow"
          >
            Reset
          </button>
        </header>

        <main>
          <AnimatePresence mode="wait">
            {phase === "start" && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white/70 p-5 rounded-2xl shadow max-w-lg mx-auto"
              >
                <h2 className="font-semibold mb-2">Start a Quiz</h2>
                <form onSubmit={startQuiz} className="space-y-3">
                  <input
                    name="name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="Name"
                    className="w-full p-2 rounded border"
                  />

                  <input
                    name="age"
                    value={form.age}
                    onChange={(e) => updateField("age", e.target.value)}
                    placeholder="Age"
                    type="number"
                    className="w-full p-2 rounded border"
                  />

                  <input
                    name="education"
                    value={form.education}
                    onChange={(e) => updateField("education", e.target.value)}
                    placeholder="Education (e.g., B.Tech 2nd Year IT)"
                    className="w-full p-2 rounded border"
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Interests & skill level
                    </label>
                    <div className="space-y-2">
                      {form.interests.map((it, idx) => (
                        <div key={idx} className="flex gap-2">
                          <input
                            value={it.interest}
                            onChange={(e) =>
                              updateInterest(idx, "interest", e.target.value)
                            }
                            placeholder="Interest (e.g., maths)"
                            className="flex-1 p-2 rounded border"
                          />
                          <input
                            value={it.skill}
                            onChange={(e) =>
                              updateInterest(idx, "skill", e.target.value)
                            }
                            placeholder="Skill (beginner/intermediate/advanced)"
                            className="w-40 p-2 rounded border"
                          />
                          {form.interests.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeInterest(idx)}
                              className="px-3 rounded bg-red-100"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={addInterest}
                        className="px-3 py-1 rounded bg-indigo-600 text-white"
                      >
                        + Add Interest
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full px-4 py-2 rounded bg-green-600 text-white"
                  >
                    {loading ? "Starting..." : "Start Quiz"}
                  </button>
                </form>
              </motion.div>
            )}

            {phase === "quiz" && question && (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white/70 p-6 rounded-2xl shadow max-w-3xl mx-auto"
              >
                <h3 className="font-semibold mb-2">{question.category}</h3>
                <p className="mb-3 whitespace-pre-wrap">{question.question}</p>

                {question.type === "MCQ" ? (
                  <div className="space-y-2">
                    {Object.entries(question.options || {}).map(([k, v]) => (
                      <label
                        key={k}
                        className={`flex items-center gap-3 p-2 rounded border cursor-pointer ${
                          currentAnswer === k
                            ? "bg-indigo-50 border-indigo-300"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="mcq"
                          value={k}
                          checked={currentAnswer === k}
                          onChange={() => setCurrentAnswer(k)}
                        />
                        <div className="text-sm">
                          <strong>{k}.</strong> {v}
                        </div>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-2 mt-3 rounded border min-h-[120px]"
                  />
                )}

                <button
                  onClick={submitAnswer}
                  disabled={loading || !currentAnswer}
                  className="mt-4 px-4 py-2 rounded bg-indigo-600 text-white"
                >
                  {loading ? "Submitting..." : "Submit Answer"}
                </button>
              </motion.div>
            )}

            {phase === "result" && assessment && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="bg-white/80 p-6 rounded-2xl shadow max-w-5xl mx-auto"
              >
                <h2 className="text-xl font-bold text-center mb-4">
                  Final Assessment
                </h2>
                <div className="w-full flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 bg-white/40 p-4 rounded">
                    <h4 className="font-medium mb-2">Cognitive Profile</h4>
                    <ResponsiveContainer width="100%" height={250}>
                      <RadarChart data={scoresToRadarData(assessment.scores)}>
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" />
                        <PolarRadiusAxis domain={[0, 10]} />
                        <Radar
                          name="You"
                          dataKey="A"
                          stroke="#4f46e5"
                          fill="#6366f1"
                          fillOpacity={0.6}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="flex-1 bg-white/40 p-4 rounded">
                    <h4 className="font-medium mb-2">Summary</h4>
                    <div className="text-sm whitespace-pre-wrap break-words">
                      {assessment.summary}
                    </div>

                    {/* Strengths & Weaknesses added here (keeps original style) */}
                    <div className="mt-4 grid grid-cols-1 gap-3">
                      <div className="bg-white/60 p-3 rounded">
                        <h5 className="font-medium text-green-700 mb-1">Top Strengths</h5>
                        <div className="text-sm text-slate-800">
                          {(assessment.strengths || []).length
                            ? (assessment.strengths || []).join(", ")
                            : "—"}
                        </div>
                      </div>

                      <div className="bg-white/60 p-3 rounded">
                        <h5 className="font-medium text-rose-700 mb-1">Weaknesses</h5>
                        <div className="text-sm text-slate-800">
                          {(assessment.weaknesses || []).length
                            ? (assessment.weaknesses || []).join(", ")
                            : "—"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 bg-white/40 p-4 rounded">
                  <h4 className="font-medium mb-2">Q&A Transcript</h4>
                  <pre className="text-xs overflow-auto max-h-60 bg-white/30 p-2 rounded whitespace-pre-wrap break-words">
                    {JSON.stringify(assessment.qa || assessment.transcript || {}, null, 2)}
                  </pre>
                </div>
              </motion.div>
            )}

            {phase === "error" && (
              <motion.div
                key="error"
                className="bg-rose-50 p-5 rounded-2xl max-w-lg mx-auto"
              >
                <h3 className="font-semibold text-rose-700">Error</h3>
                <pre className="mt-2 text-sm">
                  {JSON.stringify(error, null, 2)}
                </pre>
                <button
                  type="button"
                  onClick={() => setPhase("start")}
                  className="mt-3 px-3 py-1 rounded bg-indigo-600 text-white"
                >
                  Back
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <footer className="mt-6 text-sm text-slate-500 text-center">
          Built with React, Recharts, and Framer Motion.
        </footer>
      </div>
    </div>
  );
}
