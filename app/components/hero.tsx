"use client";

import { FaSearch } from "react-icons/fa";
import Image from "next/image";

const trendingJobs = [
  "Computer Programmers",
  "Lawyers",
  "Web Developers",
  "Accountants",
  "Electrical Engineers",
  "Graphic Designers",
  "Actors",
  "Mechanical Engineers",
  "Electricians",
];

const exploreLinks = [
  "Productivity software",
  "AI career guidance",
  "Emerging tech career",
  "Industry influence analysis",
  "Entrepreneurship resources",
  "Career transition services",
];

export default function LandingHero() {
  return (
    <section className="w-full min-h-[100vh] flex items-center justify-center bg-black px-4 pt-32">
      
      {/* CONTAINER */}
      <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-lg">
      

        {/* HEADING */}
        <h1 className="text-2xl md:text-4xl font-semibold text-white mb-3">
          Explore your job’s future
        </h1>

        <p className="text-gray-400 mb-8 text-sm md:text-base">
          Find out how likely your job is to be automated.
        </p>

        {/* SEARCH BAR */}
        <div className="relative w-full max-w-2xl mx-auto mb-8">
          <input
            type="text"
            placeholder="Enter your job title"
            className="w-full bg-black text-white placeholder-gray-500 border border-white/20 rounded-full px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-white/40 transition shadow-[0_0_20px_rgba(255,255,255,0.05)]"
          />

          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>

        {/* TRENDING */}
        <p className="text-gray-500 text-sm mb-4">Most searched:</p>

        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {trendingJobs.map((job, index) => (
            <button
              key={index}
              className="bg-white text-black text-sm px-4 py-1.5 rounded-md hover:bg-gray-200 hover:scale-105 transition"
            >
              {job}
            </button>
          ))}
        </div>

        {/* RANDOM */}
        <p className="text-gray-500 text-sm mb-6">
          or show{" "}
          <span className="text-white underline cursor-pointer hover:text-gray-300">
            random example
          </span>
        </p>

        {/* EXPLORE */}
        <div className="flex flex-wrap justify-center gap-3">
          <span className="bg-white text-black px-4 py-1.5 rounded-md text-sm font-medium">
            Discover more
          </span>

          {exploreLinks.map((item, index) => (
            <button
              key={index}
              className="bg-white/10 border border-white/20 text-white text-sm px-4 py-1.5 rounded-full hover:bg-white/20 hover:scale-105 transition"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}