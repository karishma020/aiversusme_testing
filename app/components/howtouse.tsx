"use client";

import { Search, BrainCircuit, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const steps = [
  {
    num: "01",
    title: "Search a Job",
    description: "Enter your job title or explore trending careers to get started.",
    icon: Search,
    iconColor: "text-cyan-400",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)]", // cyan glow
  },
  {
    num: "02",
    title: "AI Analyzes Data",
    description: "Our system evaluates automation risk using advanced data and AI models.",
    icon: BrainCircuit,
    iconColor: "text-purple-400",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]", // purple glow
  },
  {
    num: "03",
    title: "Get Insights Instantly",
    description: "Receive AI risk score, salary insights, demand trends, and career guidance.",
    icon: TrendingUp,
    iconColor: "text-blue-400",
    glowColor: "group-hover:shadow-[0_0_20px_rgba(96,165,250,0.2)]", // blue glow
  }
];

export default function HowItWorksSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-black overflow-hidden hide-scrollbar" id="how-it-works">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Simple Process</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            How It Works
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-4">
            Understand your career’s future in just a few steps
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Connector Line (Desktop Only) */}
          <div className="hidden md:block absolute top-[68px] left-24 right-24 h-[1px] bg-gradient-to-r from-cyan-500/0 via-white/10 to-cyan-500/0 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={step.num}
                className="group relative flex flex-col items-center text-center bg-white/[0.02] backdrop-blur-md border border-white/10 rounded-[2rem] p-10 hover:-translate-y-2 hover:bg-white/[0.04] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 z-10"
                style={{ animationDelay: `${idx * 200 + 100}ms`, animationFillMode: "both" }}
              >
                {/* Step Number Badge */}
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black border border-white/10 flex items-center justify-center text-xs font-semibold tracking-widest text-gray-500 z-20 group-hover:text-gray-300 transition-colors">
                  STEP {step.num}
                </div>

                {/* Minimal Icon Container */}
                <div className={cn(
                  "w-14 h-14 rounded-xl flex items-center justify-center mb-8 relative z-10",
                  "bg-white/5 border border-white/10 transition-all duration-300",
                  "group-hover:scale-105 group-hover:-translate-y-1 group-hover:border-white/20",
                  step.iconColor,
                  step.glowColor
                )}>
                  <Icon size={24} className="opacity-90 group-hover:opacity-100 transition-opacity" strokeWidth={1.5} />
                </div>
                
                {/* Text Content */}
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10 group-hover:text-cyan-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed relative z-10 group-hover:text-gray-300 transition-colors">
                  {step.description}
                </p>

              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
