"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const privacySections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: (
      <ul className="list-disc pl-6 space-y-3">
        <li><strong>Basic User Data:</strong> If you register or subscribe, we collect basic details such as your name and email address.</li>
        <li><strong>Usage Data:</strong> We automatically track how you interact with our platform, including pages visited, features used, and specific career-related search queries.</li>
        <li><strong>Device Information:</strong> We may collect data such as your IP address, browser type, operating system, and unique device identifiers to optimize performance.</li>
      </ul>
    )
  },
  {
    id: "how-we-use",
    title: "2. How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p>We use the collected information strictly for the following purposes:</p>
        <ul className="list-disc pl-6 space-y-3">
          <li>To drastically improve platform functionality and ensure our AI risk scores are accurate and helpful.</li>
          <li>To personalize your user experience with highly relevant career insights.</li>
          <li>To analyze massive market trends, usage patterns, and shifts in specific industries.</li>
          <li>To communicate securely with you regarding platform updates or requested support.</li>
        </ul>
      </div>
    )
  },
  {
    id: "data-storage",
    title: "3. Data Storage & Security",
    content: (
      <p>
        Your data is stored securely on modern, highly encrypted cloud infrastructure. While we actively implement strict, industry-standard administrative and technical measures to protect your personal information, please note that no system or network overhead is 100% impenetrable. We cannot absolutely guarantee the overarching security of any data transmitted over the internet, and users participate at their own risk.
      </p>
    )
  },
  {
    id: "cookies",
    title: "4. Cookies & Tracking",
    content: (
      <p>
        <strong>AI Take My Job?</strong> utilizes cookies and similar tracking technologies to heavily enhance your browsing experience. These tiny encrypted text files are used primarily for analytics, session management, and ongoing performance tracking. You have the total ability to disable cookies through your specific browser settings, though doing so may limit your access to certain dynamic features on our platform.
      </p>
    )
  },
  {
    id: "third-party",
    title: "5. Third-Party Services",
    content: (
      <p>
        We may occasionally employ trusted third-party tools (such as analytics providers, hosting partners, or secure authentication services). These strictly vetted external services may collect limited usage data governed solely by their own individual privacy policies.
      </p>
    )
  },
  {
    id: "data-sharing",
    title: "6. Data Sharing",
    content: (
      <div className="p-6 rounded-2xl bg-white/5 border-l-4 border-l-cyan-500 shadow-md">
        <strong>We DO NOT sell your personal user data.</strong> We will only share anonymized information when legally required by law enforcement or strictly limited to essential operational vendors enabling fundamental platform features.
      </div>
    )
  },
  {
    id: "user-rights",
    title: "7. User Rights",
    content: (
      <p>
        You inherently retain fundamental rights regarding your personal information. You can request direct access to, rapid modification of, or total deletion of your active data footprint across our servers. Should you wish to execute any of these requests, please drop a note to <strong>support@aitakemyjob.com</strong>.
      </p>
    )
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: (
      <p>
        Our AI career analysis tools are designed specifically for adults navigating their professional lifetimes. Therefore, the platform is not intended for use by anyone under the age of <strong>13</strong>, and we do not knowingly or intentionally collect personal data from children.
      </p>
    )
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: (
      <p>
        We may actively update this Privacy Policy from time to time to properly reflect new technological integrations, features, or evolving legal frameworks. All users are heavily encouraged to review this page periodically. Continued usage of our services ultimately implies acceptance of these rolling changes.
      </p>
    )
  },
  {
    id: "contact",
    title: "10. Contact Information",
    content: (
      <p>
        If you have any direct questions, ongoing concerns, or data requests relating specifically to how your privacy is handled within this web ecosystem, ping us directly at <strong>support@aitakemyjob.com</strong>.
      </p>
    )
  }
];

export default function PrivacyPolicy() {
  const [activeId, setActiveId] = useState<string>("information-we-collect");
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
      for (const section of privacySections) {
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
    <div id="privacy" className="min-h-screen bg-black text-gray-300 font-sans selection:bg-cyan-500/30 selection:text-white pb-32">
      
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
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            Your privacy matters to us. Here's a transparent breakdown of exactly how we handle and protect your data.
          </p>
          <div className="mt-8 text-sm text-gray-500 uppercase tracking-widest font-medium">
            Effective Date: March 2026
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
              {privacySections.map((section) => (
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
            {privacySections.map((section) => (
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
                      {section.title.split('. ').slice(1).join('. ')}
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
            <h3 className="text-xl font-medium text-white mb-3">Reach Out</h3>
            <p className="text-gray-400 mb-6">If you have any further questions about how we securely manage your data, let us know.</p>
            <a href="mailto:support@aitakemyjob.com" className="inline-block px-6 py-3 rounded-full bg-white/10 text-white font-medium hover:bg-white/20 transition-colors border border-white/10">
              Contact Support
            </a>
          </div>
        </main>

      </div>
    </div>
  );
}
