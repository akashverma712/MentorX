import React from "react";

const experts = [
  {
    emoji: "👩‍💻",
    name: "Dr. Priya Sharma",
    title: "Senior Software Engineer",
    company: "Google",
    rating: "4.9 (127 reviews)",
    tags: ["Software Development", "Career Guidance"],
    description:
      "10+ years in tech, helped 500+ students transition into software engineering roles.",
    available: true,
  },
  {
    emoji: "👨‍💻",
    name: "Rajesh Kumar",
    title: "UX Design Director",
    company: "Microsoft",
    rating: "4.8 (89 reviews)",
    tags: ["UI/UX Design", "Product Strategy"],
    description:
      "Award-winning designer with experience at top tech companies. Passionate about mentoring.",
    available: true,
  },
  {
    emoji: "👩‍💻",
    name: "Anita Desai",
    title: "Marketing Head",
    company: "Flipkart",
    rating: "4.7 (156 reviews)",
    tags: ["Digital Marketing", "Brand Strategy"],
    description:
      "Built marketing teams from scratch. Expert in digital marketing and brand building.",
    available: false,
  },
  {
    emoji: "👨‍💻",
    name: "Dr. Vikram Singh",
    title: "Medical Consultant",
    company: "AIIMS Delhi",
    rating: "4.9 (203 reviews)",
    tags: ["Medical Career", "NEET Guidance"],
    description:
      "Senior doctor with 15+ years experience. Guides students through medical career paths.",
    available: true,
  },
];

export default function MentorConnect() {
  const bookingLink =
    "https://elevenlabs.io/app/agents/talk-to/agent_5001k95ftndne76by8pkfzm7pvmq";

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0f1120] to-[#1b1d35] text-white flex flex-col items-center py-16 px-6">
      <div className="text-center max-w-3xl mb-12">
        <button className="px-4 py-1 bg-[#2a2d4a] text-[#a8a9d0] rounded-full text-sm mb-4">
          Expert Mentorship
        </button>
        <h1 className="text-4xl font-bold mb-3">
          Learn from Industry <span className="text-purple-400">Experts</span>
        </h1>
        <p className="text-[#b0b1c9]">
          Get personalized guidance from professionals who've walked the path
          you want to take. Book 1-on-1 sessions with industry leaders.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {experts.map((expert, index) => (
          <div
            key={index}
            className="bg-[#22244a] rounded-2xl p-6 text-center shadow-lg hover:shadow-purple-500/20 transition duration-300"
          >
            <div className="text-5xl mb-3">{expert.emoji}</div>
            <h3 className="text-lg font-semibold">{expert.name}</h3>
            <p className="text-sm text-gray-400">{expert.title}</p>
            <p className="text-sm text-blue-400 mb-3">{expert.company}</p>

            <p className="text-yellow-400 text-sm mb-3">⭐ {expert.rating}</p>

            <div className="flex justify-center gap-2 flex-wrap mb-3">
              {expert.tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-purple-900/40 text-purple-300 text-xs px-3 py-1 rounded-full font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-300 text-sm mb-6">{expert.description}</p>

            {expert.available ? (
              <a
                href={bookingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full py-2 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 transition">
                  Book Session
                </button>
              </a>
            ) : (
              <button
                disabled
                className="w-full py-2 rounded-lg font-medium bg-gray-600 cursor-not-allowed"
              >
                Currently Unavailable
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
