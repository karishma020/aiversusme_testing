import Link from "next/link";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { cn } from "@/lib/utils";
import SearchAutocomplete from "@/components/search-autocomplete";
import AboutSection from "@/app/components/about";
import TrendingJobs from "@/app/components/trending-jobs";
import BlogSection from "@/app/components/blog";
import TestimonialsSection from "@/app/components/testimonials";
import HowItWorksSection from "@/app/components/howtouse";
import { FaRobot } from "react-icons/fa";
import ContactSection from "./components/contact";
import FeatureSection from "@/app/components/featuresection";


export default async function Home() {
  const featuredJobs = await db.select().from(jobs).orderBy(desc(jobs.created_at)).limit(6);
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

  return (
    <div className="flex flex-col items-center">
      {/* Landing Hero UI with existing search functionality */}
      <section className="relative w-full min-h-[100vh] flex flex-col items-center justify-center bg-[#050505] px-4 pt-32 pb-20 overflow-hidden">
        
        {/* Subtle glowing radial background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent rounded-full blur-[150px] pointer-events-none" />

        {/* Main Glassmorphism Container */}
        <div className="relative z-10 w-full max-w-[1000px] bg-white/[0.02] backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 md:p-16 text-center shadow-[0_8px_40px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in-95 duration-700">
          
          {/* Soft Inner Glow */}
          <div className="absolute inset-0 rounded-[2rem] border border-white/5 pointer-events-none" />

          {/* ICON */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white text-black p-3.5 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              <FaRobot size={24} />
            </div>
          </div>

          {/* HEADING */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-5 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-500">
            Explore your job’s future
          </h1>

          {/* SUBTEXT */}
          <p className="text-white/60 mb-10 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Find out how likely your job is to be automated. Understand how AI is shaping careers with data-driven insights.
          </p>

          {/* SEARCH BAR */}
          <div className="relative w-full max-w-3xl mx-auto mb-10 group">
             {/* Focus glow ring for the SearchAutocomplete area */}
             <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-500 pointer-events-none" />
             <div className="relative z-10">
               <SearchAutocomplete className="max-w-3xl mx-auto shadow-xl" />
             </div>
          </div>

          {/* TRENDING JOBS */}
          <div className="mb-10 text-center space-y-4">
            <p className="text-white/40 text-sm font-medium tracking-wide uppercase">Most searched</p>
            <div className="flex flex-wrap justify-center gap-2.5 max-w-4xl mx-auto">
              <TrendingJobs titles={trendingJobs} />
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

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Featured Jobs Section
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Trending Careers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Link
                key={job.id}
                href={`/job/${job.slug}`}
                className="group relative overflow-hidden rounded-2xl bg-background p-6 shadow-sm transition-all hover:shadow-md border border-border"
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {job.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 text-sm">
                      {job.description}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                      job.risk_score < 30 ? "bg-green-100 text-green-700" :
                        job.risk_score < 70 ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                    )}>
                      {job.risk_score}% Risk
                    </span>
                    <span className="text-sm font-medium text-primary">View Analysis →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}
      {/* About section for hash link */}
      <AboutSection />

      {/* Blog section */}
      <BlogSection />
      {/* Testimonials section */}
      <TestimonialsSection />

      {/* Contact section */}
      <ContactSection />
    </div>
  );
}
