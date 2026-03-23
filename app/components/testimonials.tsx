"use client";

import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Rohit Sharma",
    role: "Software Engineer",
    feedback: "This platform gave me clarity on how AI might impact my career. The insights are incredibly useful and easy to understand.",
    initials: "RS",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    name: "Ananya Verma",
    role: "MBA Student",
    feedback: "I was confused about my career path, but this helped me explore future-proof options. Highly recommend it!",
    initials: "AV",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    name: "Karan Patel",
    role: "Data Analyst",
    feedback: "The AI risk score feature is eye-opening. It helped me start upskilling in the right direction.",
    initials: "KP",
    gradient: "from-cyan-400 to-blue-600",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative w-full py-24 px-4 md:px-8 bg-black overflow-hidden" id="testimonials">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm">
            <Star size={14} className="text-cyan-400" fill="currentColor" />
            <span>User Feedback</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            What People Are Saying
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-4">
            Real feedback from users navigating their careers with AI insights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((testimonial, idx) => (
            <div 
              key={testimonial.name}
              className="group relative flex flex-col bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-[2rem] p-8 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-cyan-500/10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 h-full"
              style={{ animationDelay: `${idx * 200 + 100}ms`, animationFillMode: "both" }}
            >
              {/* Card Glow Effect on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/5 group-hover:via-purple-500/5 group-hover:to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem] pointer-events-none" />
              
              <Quote className="text-cyan-400/20 w-12 h-12 mb-6" />
              
              <p className="text-gray-300 text-lg leading-relaxed mb-10 flex-1 z-10">
                "{testimonial.feedback}"
              </p>

              <div className="flex items-center gap-4 mt-auto w-full border-t border-white/10 pt-6 z-10">
                <div className={cn(
                  "flex items-center justify-center w-12 h-12 rounded-full text-white font-bold tracking-wider shadow-lg bg-gradient-to-br",
                  testimonial.gradient
                )}>
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="text-white font-semibold flex items-center gap-2">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  <div className="flex gap-0.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={12} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
