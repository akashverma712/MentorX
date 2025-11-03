import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Send, User, Bot, Loader2, Briefcase, Zap, BarChart3, List } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------- ENV ----------------
const apiKey = "AIzaSyD6CbkeOehVzUtFBgVD0ThXarBXRdQbQbA";
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`;

// ---------------- Schema ----------------
const ChatResponseSchema = {
  type: "OBJECT",
  properties: {
    responseType: { type: "STRING" },
    data: {
      type: "OBJECT",
      properties: {
        text: { type: "STRING" },
        title: { type: "STRING" },
        items: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              label: { type: "STRING" },
              value: { type: "INTEGER" },
              description: { type: "STRING" },
            },
          },
        },
        steps: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              step: { type: "INTEGER" },
              title: { type: "STRING" },
              description: { type: "STRING" },
            },
          },
        },
      },
    },
  },
};

// ---------------- Retry Fetch ----------------
const retryFetch = async (url, options, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, options);
      if (res.ok) return res;
      throw new Error(`HTTP Error: ${res.status}`);
    } catch (err) {
      if (i === maxRetries - 1) throw err;
      await new Promise(r => setTimeout(r, 1000 * Math.pow(2, i)));
    }
  }
};

// ---------------- Graphical Responses ----------------
const GraphicalResponse = ({ type, data }) => {
  if (type === 'comparison') {
    return (
      <div className="mt-3 p-4 bg-gradient-to-br from-indigo-50 to-white rounded-xl border border-indigo-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <BarChart3 className="w-4 h-4 mr-2 text-indigo-600" /> {data.title || "Comparison Overview"}
        </h4>
        {data.items?.map((item, i) => (
          <div key={i} className="mb-3">
            <div className="flex justify-between text-sm font-semibold text-gray-700">
              <span>{item.label}</span>
              <span className="text-indigo-600">{item.value}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
              <div
                className="bg-indigo-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${item.value}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{item.description}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'timeline') {
    return (
      <div className="mt-3 p-4 bg-gradient-to-br from-green-50 to-white rounded-xl border border-green-100 shadow-sm">
        <h4 className="font-bold text-gray-800 mb-3 flex items-center">
          <List className="w-4 h-4 mr-2 text-green-600" /> {data.title || "Action Plan"}
        </h4>
        <ol className="relative border-l border-gray-300 ml-2">
          {data.steps?.map((s, i) => (
            <li key={i} className="mb-4 ml-4">
              <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-1.5" />
              <h5 className="text-sm font-semibold text-gray-800">Step {s.step}: {s.title}</h5>
              <p className="text-xs text-gray-600 mt-1">{s.description}</p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return null;
};

const renderMessageContent = (msgData) => {
  const { responseType, data } = msgData || {};
  if (!data) return <p className="text-red-500">Invalid data structure</p>;

  return (
    <>
      <p className="whitespace-pre-wrap leading-relaxed">{data.text}</p>
      {responseType !== 'text' && <GraphicalResponse type={responseType} data={data} />}
    </>
  );
};

// ---------------- Main ----------------
const App = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }), [messages]);

  const handleSend = useCallback(async () => {
    if (!input.trim() || loading) return;
    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    const newUserMsg = { id: Date.now() + 'user', data: { data: { text: userMessage } }, role: 'user' };
    const chat = [...messages, newUserMsg];
    setMessages(chat);

    const history = chat.map(m => ({ role: m.role, parts: [{ text: m.data.data.text }] }));

    const payload = {
      contents: history,
      systemInstruction: {
        parts: [{ text: `You are Mentor X, a supportive multilingual career mentor. Respond following the given schema.` }],
      },
      generationConfig: { responseMimeType: "application/json", responseSchema: ChatResponseSchema },
    };

    try {
      const res = await retryFetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = JSON.parse(text);
      setMessages(prev => [...prev, { id: Date.now() + 'model', data: parsed, role: 'model' }]);
    } catch (err) {
      console.error("Error:", err);
      setMessages(prev => [...prev, {
        id: Date.now() + 'error',
        data: { responseType: 'text', data: { text: `⚠️ Error: ${err.message}` } },
        role: 'model'
      }]);
    } finally { setLoading(false); }
  }, [input, loading, messages]);

  const handleKeyPress = (e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend());

  return (
    <div className="flex h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 font-sans backdrop-blur-lg">
      <div className="flex flex-col w-full max-w-2xl mx-auto bg-white/90 rounded-3xl shadow-2xl overflow-hidden border border-indigo-100">
        {/* HEADER */}
        <div className="p-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white flex justify-between items-center">
          <div className="flex items-center">
            <Briefcase className="w-7 h-7 mr-3" />
            <h1 className="text-2xl font-bold tracking-wide">Mentor X</h1>
          </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-grow p-6 space-y-5 overflow-y-auto custom-scrollbar">
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center text-gray-600 mt-20 p-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-inner border border-indigo-100"
            >
              <Zap className="w-10 h-10 mx-auto text-indigo-500 mb-3" />
              <p className="text-xl font-bold text-gray-800">Hello, I’m Mentor X 👋</p>
              <p className="text-md mt-1 text-indigo-600">
                Ask me anything about your career, growth, or learning path.
              </p>
            </motion.div>
          )}

          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-[80%] sm:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                  <div className={`p-2 rounded-full shadow-md mt-1 flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-indigo-600 text-white ml-3' : 'bg-blue-500 text-white mr-3'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>
                  <div className={`px-4 py-3 shadow-md text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-indigo-600 text-white rounded-3xl rounded-br-lg'
                      : 'bg-white text-gray-900 rounded-3xl rounded-tl-lg border border-indigo-100'
                  }`}>
                    {renderMessageContent(msg.data)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {loading && (
            <div className="flex justify-start">
              <div className="flex max-w-[80%] flex-row items-start">
                <div className="p-2 rounded-full bg-blue-500 text-white mr-3 shadow-md">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-4 py-3 bg-indigo-50 rounded-3xl rounded-tl-lg border border-indigo-100 flex items-center text-sm text-gray-700">
                  <Loader2 className="w-4 h-4 animate-spin mr-2 text-indigo-600" />
                  Mentor X is thinking...
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* INPUT AREA */}
        <div className="p-5 bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg">
          <div className="flex items-end">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your career question..."
              rows={1}
              className="flex-grow p-4 border border-gray-300 rounded-2xl resize-none focus:ring-indigo-500 focus:border-indigo-500 transition text-base shadow-inner bg-white/80"
              disabled={loading}
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className={`ml-4 p-4 rounded-2xl shadow-md transition-all duration-200 ${
                loading || !input.trim()
                  ? 'bg-indigo-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:scale-105'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
