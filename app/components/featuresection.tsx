"use client";

import React from "react";
import {
  CheckCircle2,
  Users,
  Clock,
  Briefcase,
  UsersRound,
  UserCircle,
  ArrowRight,
  ThumbsUp,
  Unlock,
  Zap
} from "lucide-react";

export default function FeatureSection() {
  return (
    <div className="w-full flex flex-col font-sans">
      <FeaturesTop />
      <FeaturesBottom />
    </div>
  );
}

function FeaturesTop() {
  const steps = [
    {
      title: "Understand your job risk clearly:",
      description: "Get a data-backed AI Risk Score that shows how automation could impact your role.",
      icon: Users,
      color: "text-blue-400",
      glowHover: "group-hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]",
    },
    {
      title: "Make informed career decisions:",
      description: "Access salary trends, job demand, and growth projections in one place.",
      icon: CheckCircle2,
      color: "text-purple-400",
      glowHover: "group-hover:shadow-[0_0_15px_rgba(192,132,252,0.4)]",
    },
    {
      title: "Plan your next move with confidence:",
      description: "Discover safer career paths, upskilling options, and future-ready roles.",
      icon: Clock,
      color: "text-cyan-400",
      glowHover: "group-hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]",
    },
  ];

  return (
    <section id="feature" className="relative bg-[#050505] py-16 md:py-24 px-6 lg:px-12 xl:px-24 overflow-hidden">
      {/* Soft radial glow behind content */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-white/[0.02] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

        {/* LEFT SIDE */}
        <div className="flex flex-col space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70 max-w-md">
            Why people rely on us to stay ahead of AI
          </h2>

          <div className="flex flex-col space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-2 cursor-default">
                <div className={`mt-1 bg-white/5 border border-white/10 p-2.5 rounded-lg ${step.color} transition-all duration-300 ${step.glowHover}`}>
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-white/90 group-hover:text-white transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-white/60 text-base mt-1 group-hover:text-white/80 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center lg:justify-end items-center mt-10 lg:mt-0 animate-in fade-in slide-in-from-right-8 duration-700">
          {/* Soft blur behind image */}
          <div className="absolute w-[90%] h-[90%] bg-white/[0.03] rounded-[4rem] -rotate-6 z-0 right-4 lg:right-6 blur-2xl" />

          {/* Main Image */}
          <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.4)] group">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Man working on laptop"
              className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090F]/90 via-[#07090F]/20 to-transparent pointer-events-none" />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-10 -left-6 md:-left-12 z-20 bg-white/10 backdrop-blur-md rounded-full py-2.5 px-5 border border-white/10 flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(96,165,250,0.2)] group cursor-default shadow-xl shadow-black/40">
            <div className="text-blue-400 p-1.5 rounded-full bg-blue-500/10 shadow-[0_0_10px_rgba(96,165,250,0.3)] group-hover:shadow-[0_0_15px_rgba(96,165,250,0.5)] transition-shadow duration-300">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white/90">User Friendly</span>
          </div>

          <div className="absolute bottom-1/3 -right-4 md:-right-8 z-20 bg-white/10 backdrop-blur-md rounded-full py-2.5 px-5 border border-white/10 flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(192,132,252,0.2)] group cursor-default shadow-xl shadow-black/40 delay-150">
            <div className="text-purple-400 p-1.5 rounded-full bg-purple-500/10 shadow-[0_0_10px_rgba(192,132,252,0.3)] group-hover:shadow-[0_0_15px_rgba(192,132,252,0.5)] transition-shadow duration-300">
              <Unlock className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white/90">Free Accessable</span>
          </div>

          <div className="absolute -bottom-6 left-1/4 z-20 bg-white/10 backdrop-blur-md rounded-full py-2.5 px-6 border border-white/10 flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] group cursor-default shadow-xl shadow-black/40 delay-300">
            <div className="text-cyan-400 p-1.5 rounded-full bg-cyan-500/10 shadow-[0_0_10px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_15px_rgba(34,211,238,0.5)] transition-shadow duration-300">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-white/90">10x time faster</span>
          </div>

        </div>

      </div>
    </section>
  );
}

function FeaturesBottom() {
  const cards = [
    {
      title: " AI Risk Insights",
      description: "Understand how vulnerable your job is to automation using real data and trend analysis.",
      ctaText: "Search Job Posting",
      icon: Briefcase,
      color: "text-blue-400",
      bgHover: "hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.15)]",
      iconBg: "bg-blue-500/10",
      iconBorder: "border-blue-500/20"
    },
    {
      title: "Career Intelligence",
      description: "Explore salaries, demand levels, and growth forecasts for different professions.",
      ctaText: "Explore Community",
      icon: UsersRound,
      color: "text-purple-400",
      bgHover: "hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
      iconBg: "bg-purple-500/10",
      iconBorder: "border-purple-500/20"
    },
    {
      title: "Future Pathways",
      description: "Get guidance on what to learn next, alternative careers, and how to stay relevant.",
      ctaText: "Start Your Profile",
      icon: UserCircle,
      color: "text-cyan-400",
      bgHover: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
      iconBg: "bg-cyan-500/10",
      iconBorder: "border-cyan-500/20"
    },
  ];

  return (
    <section className="bg-black py-16 md:py-24 px-6 lg:px-12 xl:px-24 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
            Top ways to help you get ahead
          </h2>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {cards.map((card, idx) => (
            <FeatureCard
              key={idx}
              title={card.title}
              description={card.description}
              ctaText={card.ctaText}
              icon={card.icon}
              color={card.color}
              bgHover={card.bgHover}
              iconBg={card.iconBg}
              iconBorder={card.iconBorder}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <button className="group relative px-8 py-3.5 bg-white text-black font-semibold rounded-full overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] transition-all duration-300 hover:-translate-y-0.5 border border-white/20">
            <span className="relative z-10 flex items-center gap-2">
              Create your Account
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </button>
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  description,
  ctaText,
  icon: Icon,
  color,
  bgHover,
  iconBg,
  iconBorder
}: {
  title: string;
  description: string;
  ctaText: string;
  icon: React.ElementType;
  color?: string;
  bgHover?: string;
  iconBg?: string;
  iconBorder?: string;
}) {
  return (
    <div className={`flex flex-col bg-white/5 p-8 rounded-2xl border border-white/10 transition-all duration-300 h-full group ${bgHover || 'hover:bg-white/[0.07]'}`}>
      {/* Icon */}
      <div className={`mb-6 border w-12 h-12 flex items-center justify-center rounded-xl ${iconBg || 'bg-white/5'} ${iconBorder || 'border-white/10'}`}>
        <Icon className={`w-5 h-5 ${color || 'text-white/80'}`} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-white group-hover:text-white/90 transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed flex-grow group-hover:text-gray-300 transition-colors">
        {description}
      </p>

      {/* CTA Link */}
      <div className="mt-8">
        <a href="#" className={`inline-flex items-center font-medium text-white/80 group-hover:${color ? color.replace('text-', 'text-') : 'text-blue-400'} transition-colors`}>
          {ctaText}
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}