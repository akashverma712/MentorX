import { motion } from "framer-motion";
import { Bot, Bolt, LineChart, MessageSquare } from "lucide-react";

const features = [
  {
    icon: <Bot className="w-8 h-8 text-yellow-400" />,
    title: "AI Career Chatbot",
    desc: "Get personalized career guidance and answers to your questions through our intelligent AI assistant.",
    btn: "Start Chatting",
    color: "bg-yellow-500 hover:bg-yellow-600",
  },
  {
    icon: <Bolt className="w-8 h-8 text-blue-400" />,
    title: "Career Simulation",
    desc: "Try tasks from real careers through interactive challenges and mini-games to see what fits you.",
    btn: "Try a Challenge",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    icon: <LineChart className="w-8 h-8 text-green-400" />,
    title: "Visual Life Graph",
    desc: "View your 10-year career plan with milestones, salary progression, and key decision points.",
    btn: "Build My Graph",
    color: "bg-green-500 hover:bg-green-600",
  },
  {
    icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
    title: "Mentor Connect",
    desc: "Connect with experienced professionals and get real-time answers to your career questions.",
    btn: "Connect Now",
    color: "bg-purple-500 hover:bg-purple-600",
  },
];

export default function CareerPath() {
  return (
    <section className="w-full bg-linear-to-b from-[#0f172a] to-[#1e1b4b] text-white py-24 px-6">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h2 className="text-4xl font-bold mb-4">
          Discover Your Perfect Career Path
        </h2>
        <p className="text-lg text-gray-300">
          Use our powerful tools to explore, compare, and plan your future with confidence.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {features.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-[#1e293b] p-8 rounded-2xl shadow-lg border border-gray-700 hover:border-indigo-400 transition-all"
          >
            <div className="flex items-center mb-4 gap-3">
              <div className="p-3 bg-[#0f172a] rounded-lg">{item.icon}</div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
            </div>
            <p className="text-gray-400 mb-6">{item.desc}</p>
            <button className={`${item.color} text-white font-medium rounded-xl p-2.5 cursor-pointer`}>
              {item.btn} →
            </button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}