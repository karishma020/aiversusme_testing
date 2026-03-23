"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const termsSections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <p>
        Welcome to <strong>AI Take My Job?</strong> ("we," "our," or "the platform"). This platform is designed as an informational resource to help users understand the potential ongoing impact of Artificial Intelligence and automation on various career paths.
      </p>
    )
  },
  {
    id: "acceptance",
    title: "2. Acceptance of Terms",
    content: (
      <p>
        By accessing or using our platform, you explicitly agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use our platform or its services.
      </p>
    )
  },
  {
    id: "usage",
    title: "3. Use of the Platform",
    content: (
      <ul className="list-disc pl-6 space-y-3">
        <li>Users are permitted to freely explore job insights, industry analyses, and AI risk scores provided on the platform.</li>
        <li>You must not misuse, scrape, clone, reverse-engineer, or exploit the platform's proprietary data or infrastructure for commercial gain without explicit written permission.</li>
        <li>Any illegal, harmful, or malicious usage of the platform (like automated attacks) is strictly prohibited and will result in immediate termination of access.</li>
      </ul>
    )
  },
  {
    id: "disclaimer",
    title: "4. AI Risk Disclaimer",
    content: (
      <div className="space-y-4">
        <p>The core features of this platform rely on complex models and algorithms. Please note:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li><strong>AI risk scores are estimates</strong> based on current industry trends, not absolute guarantees of future events.</li>
          <li>All data provided is strictly for informational purposes only.</li>
          <li>The platform and its creators are <strong>not responsible</strong> for any career choices, financial decisions, or professional transitions made by users based on our insights.</li>
        </ul>
      </div>
    )
  },
  {
    id: "intellectual-property",
    title: "5. Intellectual Property",
    content: (
      <p>
        All digital content, UI design, analytics data, logos, and codebases belong exclusively to the platform. Users may not reproduce, distribute, or create derivative works from our proprietary resources without prior written permission.
      </p>
    )
  },
  {
    id: "liability",
    title: "6. Limitation of Liability",
    content: (
      <p>
        We continuously strive to provide the most accurate market predictions possible. However, the platform is provided "as is." We bear no liability for any inaccuracies in the data, nor do we offer any guarantees regarding specific job outcomes, market predictions, or long-term career safety. 
      </p>
    )
  },
  {
    id: "modifications",
    title: "7. Modifications",
    content: (
      <ul className="list-disc pl-6 space-y-3">
        <li>These Terms & Conditions may be updated, amended, or revised at any time without prior direct notice.</li>
        <li>Your continued use of the platform following any highly visible updates implies direct acceptance of the newly revised terms.</li>
      </ul>
    )
  },
  {
    id: "termination",
    title: "8. Termination",
    content: (
      <p>
        The platform reserves the absolute right to restrict, suspend, or terminate user access at any given time if these terms are actively violated or if usage poses a security threat to our systems.
      </p>
    )
  },
  {
    id: "governing-law",
    title: "9. Governing Law",
    content: (
      <p>
        These terms, as well as any disputes arising out of the use of the platform, shall be governed by and construed in accordance with the applicable regional laws, without regard to its conflict of law provisions.
      </p>
    )
  }
];

export default function TermsAndCondition() {
  const [activeId, setActiveId] = useState<string>("introduction");
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress for the top indicator
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));

      // Determine the active section for the TOC
      let currentSection = activeId;
      for (const section of termsSections) {
        const element = document.getElementById(section.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section is near the top third of the screen
          if (rect.top <= 250 && rect.bottom >= 250) {
            currentSection = section.id;
          }
        }
      }
      setActiveId(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeId]);

  return (
    <div id="terms" className="min-h-screen bg-black text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-white pb-32">
      
      {/* Scroll Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 z-50 transition-all duration-150"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Hero Header */}
      <div className="w-full pt-32 pb-16 px-6 relative border-b border-white/10 bg-black/50 overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-blue-600/10 via-cyan-500/10 to-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-100 to-gray-500">
            Terms & Conditions
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our platform to navigate your career with AI insights.
          </p>
          <div className="mt-8 text-sm text-gray-500 uppercase tracking-widest font-medium">
            Last Updated: March 2026
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row gap-16 relative">
        
        {/* Sticky Table of Contents (Desktop) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-32">
            <h3 className="text-white font-semibold mb-6 uppercase tracking-wider text-sm border-b border-white/10 pb-4">
              Table of Contents
            </h3>
            <ul className="flex flex-col gap-3 border-l-2 border-white/5 space-y-1">
              {termsSections.map((section) => (
                <li key={section.id}>
                  <button 
                    onClick={() => {
                      const el = document.getElementById(section.id);
                      if (el) {
                        const yOffset = -100; // offset for fixed navbar
                        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                        window.scrollTo({ top: y, behavior: 'smooth' });
                      }
                    }}
                    className={cn(
                      "text-left pl-4 py-1.5 text-sm transition-all duration-300 relative block w-full",
                      activeId === section.id 
                        ? "text-cyan-400 font-medium" 
                        : "text-gray-500 hover:text-gray-300"
                    )}
                  >
                    {/* Active Indicator Dot */}
                    <span className={cn(
                      "absolute -left-[5px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-all duration-300",
                      activeId === section.id ? "bg-cyan-500 scale-100 shadow-[0_0_8px_rgba(6,182,212,0.8)]" : "bg-transparent scale-0"
                    )} />
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 max-w-3xl animate-in fade-in duration-1000 delay-150">
          <div className="flex flex-col gap-16">
            {termsSections.map((section) => (
              <section 
                key={section.id} 
                id={section.id} 
                className="scroll-mt-32 group"
              >
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-semibold text-white tracking-tight flex items-baseline gap-3">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500 font-bold opacity-80 transition-opacity group-hover:opacity-100">
                      {section.title.split('.')[0]}.
                    </span>
                    <span className="group-hover:text-cyan-100 transition-colors">
                      {section.title.split('. ')[1]}
                    </span>
                  </h2>
                  <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent mt-4 transition-all duration-500 group-hover:from-cyan-500/30" />
                </div>
                
                <div className="prose prose-invert prose-lg max-w-none prose-p:leading-relaxed prose-li:leading-relaxed prose-a:text-cyan-400 hover:prose-a:text-cyan-300 prose-strong:text-white/90">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-20 p-8 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm text-center">
            <h3 className="text-xl font-medium text-white mb-3">Still have questions?</h3>
            <p className="text-gray-400 mb-6">If you need clarification on any of our legal terms, feel free to reach out to our legal department.</p>
            <a href="/contact" className="inline-block px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/10">
              Contact Support
            </a>
          </div>
        </main>

      </div>
    </div>
  );
}
