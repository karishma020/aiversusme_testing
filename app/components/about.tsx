"use client";

import { FaBrain, FaChartLine, FaShieldAlt } from "react-icons/fa";

const features = [
  {
    icon: <FaBrain size={20} />,
    title: "AI-Powered Insights",
    description:
      "Analyze how artificial intelligence impacts different professions using smart automation scoring.",
  },
  {
    icon: <FaChartLine size={20} />,
    title: "Career Risk Analysis",
    description:
      "Understand the probability of your job being automated and explore safer career paths.",
  },
  {
    icon: <FaShieldAlt size={20} />,
    title: "Future-Proof Your Skills",
    description:
      "Get recommendations to stay relevant and build skills that AI cannot easily replace.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="w-full bg-black text-white py-20 px-6">

      {/* CONTAINER */}
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Why This Platform?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We help you understand the future of work by analyzing how automation
            and AI will shape careers across industries.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition duration-300 hover:scale-[1.02]"
            >
              {/* ICON */}
              <div className="bg-white text-black w-fit p-3 rounded-full mb-4">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-gray-400 text-sm">
                {item.description}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}



//hello 