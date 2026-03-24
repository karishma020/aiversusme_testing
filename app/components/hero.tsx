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
    <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-[#050505] px-4 pt-32 pb-20 overflow-hidden">
      
      {/* Subtle glowing radial background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

      {/* Main Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-[1000px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 md:p-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-700">
        
        {/* Soft Inner Glow */}
        <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />

        {/* LOGO */}
        <div className="mb-8 flex justify-center">
          <Image 
            src="/aiversusume.jpeg" 
            alt="AI Take My Job Logo" 
            width={160} 
            height={40} 
            className="w-auto h-12 object-contain opacity-90"
            priority
          />
        </div>

        {/* HEADING */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
          Explore your job’s future
        </h1>

        {/* SUBTEXT */}
        <p className="text-white/60 mb-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          Find out how likely your job is to be automated. Understand how AI is shaping careers with data-driven insights.
        </p>

        {/* SEARCH BAR (Upgraded) */}
        <div className="relative w-full max-w-3xl mx-auto mb-10 group">
          {/* Focus glow ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex items-center w-full bg-[#0a0a0a] border border-white/10 rounded-full focus-within:border-blue-500/50 transition-colors shadow-xl">
            {/* Search Icon */}
            <div className="pl-6 text-white/50">
              <FaSearch size={18} />
            </div>
            
            {/* Input Element */}
            <input
              type="text"
              placeholder="Search job roles (e.g., Software Developer)"
              className="w-full bg-transparent text-white placeholder-white/40 px-5 py-4 text-base md:text-lg focus:outline-none"
            />
            
            {/* Analyze Button inside input */}
            <div className="pr-2 hidden sm:block">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-medium px-8 py-3 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transform hover:scale-105 my-1">
                Analyze
              </button>
            </div>
          </div>
          {/* Mobile analyze button below input */}
          <button className="sm:hidden mt-4 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-3 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.3)] active:scale-95 transition-all">
            Analyze Job
          </button>
        </div>

        {/* TRENDING JOBS */}
        <div className="mb-10 text-center space-y-4">
          <p className="text-white/40 text-sm font-medium tracking-wide uppercase">Most searched</p>
          <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
            {trendingJobs.map((job, index) => (
              <button
                key={index}
                className="bg-white/5 border border-white/10 text-white/80 text-sm px-4 py-2 rounded-full hover:bg-white/10 hover:text-white transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
              >
                {job}
              </button>
            ))}
          </div>
        </div>

        {/* RANDOM EXAMPLE */}
        <div className="mb-12">
          <p className="text-white/50 text-sm">
            or show{" "}
            <span className="text-white/80 underline decoration-white/30 underline-offset-4 cursor-pointer hover:text-blue-400 hover:decoration-blue-400 transition-colors duration-300">
              random example
            </span>
          </p>
        </div>

        {/* EXPLORE LINKS */}
        <div className="pt-8 border-t border-white/5">
          <div className="flex flex-wrap justify-center items-center gap-3">
            <span className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20 text-blue-300 px-5 py-2 rounded-full text-sm font-semibold tracking-wide">
              Discover more &rarr;
            </span>

            {exploreLinks.map((item, index) => (
              <button
                key={index}
                className="bg-transparent border border-white/10 text-white/60 text-sm px-5 py-2 rounded-full hover:bg-white/5 hover:text-white/90 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}