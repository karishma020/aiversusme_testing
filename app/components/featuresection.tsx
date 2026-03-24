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
      title: "Go where the workers are:",
      description: "We help ¾ of all US hourly workers find jobs each year.",
      icon: Users,
    },
    {
      title: "Get matched with the right people:",
      description: "50% fewer applicants needed to make a hire.",
      icon: CheckCircle2,
    },
    {
      title: "Fill jobs and shifts on demand:",
      description: "70% of shifts are filled in 10 minutes or less.",
      icon: Clock,
    },
  ];

  return (
    <section className="bg-white text-slate-900 py-16 md:py-24 px-6 lg:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

        {/* LEFT SIDE */}
        <div className="flex flex-col space-y-10">
          <h2 className="text-3xl md:text-5xl font-bold leading-tight text-slate-900 max-w-md">
            Why people love us as they got jobs of their choise
          </h2>

          <div className="flex flex-col space-y-8">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="mt-1 bg-green-100 p-2 rounded-full text-green-600">
                  <step.icon className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 text-base mt-1">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative flex justify-center lg:justify-end items-center mt-10 lg:mt-0">
          {/* Blob / Background Shape */}
          <div className="absolute w-[80%] h-[90%] bg-blue-50/80 rounded-[4rem] -rotate-6 z-0 right-4 lg:right-10" />

          {/* Main Image */}
          <div className="relative z-10 w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
            {/* Fallback image if actual asset is missing. Using Unsplash placeholder for "man sitting with laptop" */}
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
              alt="Man working on laptop"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Floating Badges */}
          <div className="absolute top-10 -left-6 md:-left-12 z-20 bg-white rounded-full py-2 px-4 shadow-lg border border-slate-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom flex-row">
            <div className="bg-orange-100 text-orange-500 rounded-full p-1.5">
              <ThumbsUp className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-800">User Friendly</span>
          </div>

          <div className="absolute bottom-1/3 -right-4 md:-right-8 z-20 bg-white rounded-full py-2 px-4 shadow-lg border border-slate-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom delay-150">
            <div className="bg-blue-100 text-blue-500 rounded-full p-1.5">
              <Unlock className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-800">Free Accessable</span>
          </div>

          <div className="absolute -bottom-6 left-1/4 z-20 bg-white rounded-full py-2 px-5 shadow-lg border border-slate-100 flex items-center gap-2 animate-in fade-in slide-in-from-bottom delay-300">
            <div className="bg-yellow-100 text-yellow-600 rounded-full p-1.5">
              <Zap className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold text-slate-800">10x time faster</span>
          </div>

        </div>

      </div>
    </section>
  );
}

function FeaturesBottom() {
  const cards = [
    {
      title: "A Better Job",
      description: "We source jobs directly from employer websites so you can get the highest-quality, most accurate listings. No duplicates. No spam.",
      ctaText: "Search Job Posting",
      icon: Briefcase,
    },
    {
      title: "A Helpful Community",
      description: "We source jobs directly from employer websites so you can get the highest-quality, most accurate listings. No duplicates. No spam.",
      ctaText: "Explore Community",
      icon: UsersRound,
    },
    {
      title: "A Standout Profile",
      description: "We source jobs directly from employer websites so you can get the highest-quality, most accurate listings. No duplicates. No spam.",
      ctaText: "Start Your Profile",
      icon: UserCircle,
    },
  ];

  return (
    <section className="bg-[#0b1727] text-white py-16 md:py-24 px-6 lg:px-12 xl:px-24">
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
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
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="mt-16 flex justify-center">
          <button className="bg-[#8fd17f] hover:bg-[#7bc06b] text-slate-900 font-bold px-8 py-3.5 rounded-full shadow-lg transition-colors duration-200">
            Create your Account
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
}: {
  title: string;
  description: string;
  ctaText: string;
  icon: React.ElementType;
}) {
  return (
    <div className="flex flex-col bg-[#142336] p-8 rounded-2xl border border-white/5 hover:bg-[#1a2d45] transition-colors h-full">
      {/* Icon */}
      <div className="mb-6 bg-white/5 w-12 h-12 flex items-center justify-center rounded-xl">
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold mb-4 text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="text-slate-400 leading-relaxed flex-grow">
        {description}
      </p>

      {/* CTA Link */}
      <div className="mt-8">
        <a href="#" className="inline-flex items-center text-white font-medium hover:text-[#8fd17f] transition-colors group">
          {ctaText}
          <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
