import { motion } from "framer-motion";
import { Palette, Laptop, BarChart } from "lucide-react";

const careers = [
    {
        icon: <Palette className="w-7 h-7 text-pink-400" />,
        level: "Beginner",
        title: "UI Designer",


        company: "Tech Startup",
        challenge: "Design a mobile app login screen",
        desc: "Experience the daily work of a UI designer by creating user interfaces, choosing colors, and making design decisions.",
        tags: ["Design Thinking", "User Experience", "Visual Design"],
        time: "15 mins",
        users: "2.3k",
        rating: "4.8",
    },
    {
        icon: <Laptop className="w-7 h-7 text-yellow-400" />,
        level: "Intermediate",
        title: "Software Developer",
        company: "E-commerce Company",
        challenge: "Debug a shopping cart feature",
        desc: "Step into the shoes of a developer and solve coding problems, debug issues, and implement new features.",
        tags: ["Problem Solving", "Programming", "Debugging"],
        time: "20 mins",
        users: "3.1k",
        rating: "4.9",
    },
    {
        icon: <BarChart className="w-7 h-7 text-blue-400" />,
        level: "Beginner",
        title: "Digital Marketer",
        company: "Fashion Brand",
        challenge: "Create a social media campaign",
        desc: "Learn how marketers think by creating campaigns, analyzing data, and making strategic decisions.",
        tags: ["Strategy", "Content Creation", "Analytics", "Market"],
        time: "12 mins",
        users: "1.8k",
        rating: "4.7",
    },
];

export default function CareerSimulator() {
    return (
        <section className="w-full bg-linear-to-b from-[#0f172a] to-[#1e1b4b] text-white py-24 px-6">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h2 className="text-4xl font-bold mb-4">Career Simulator</h2>
                <p className="text-lg text-gray-300">
                    Try real tasks from different careers to see what actually fits you. No textbook theory – just hands-on experience.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {careers.map((career, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.03 }}
                        transition={{ type: "spring", stiffness: 150 }}
                        className="bg-[#1e293b] p-8 rounded-2xl border border-gray-700 hover:border-indigo-400 shadow-lg transition-all"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-[#0f172a] rounded-lg">{career.icon}</div>
                            <div>
                                <span
                                    className={`text-xs px-2 py-1 rounded-full font-medium ${career.level === "Beginner"
                                            ? "bg-green-900 text-green-300"
                                            : "bg-yellow-900 text-yellow-300"
                                        }`}
                                >
                                    {career.level}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-xl font-semibold mb-1">{career.title}</h3>
                        <p className="text-sm text-gray-400 mb-3">{career.company}</p>

                        <div className="bg-[#0f172a] rounded-lg p-4 mb-4">
                            <p className="font-semibold text-gray-200 mb-2">
                                Challenge: {career.challenge}
                            </p>
                            <p className="text-gray-400 text-sm">{career.desc}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            {career.tags.map((tag, i) => (
                                <span
                                    key={i}
                                    className="text-xs bg-slate-700 text-slate-300 px-3 py-1 rounded-full "
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                            <span>⏱ {career.time}</span>
                            <span>👥 {career.users}</span>
                            <span>⭐ {career.rating}</span>
                        </div>

                        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl cursor-pointer font-semibold">
                            ▶ Try Challenge
                        </button>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}