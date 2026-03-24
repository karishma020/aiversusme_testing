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
      <section className="w-full min-h-[100vh] flex items-center justify-center bg-black px-4 pt-32">
        <div className="w-full max-w-4xl bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12 text-center shadow-lg">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white text-black p-2 rounded-full">
              <FaRobot size={18} />
            </div>
          </div>
          <h1 className="text-2xl md:text-4xl font-semibold text-white mb-3">
            Explore your job’s future
          </h1>
          <p className="text-gray-400 mb-8 text-sm md:text-base">
            Find out how likely your job is to be automated.
          </p>
          <div className="relative w-full max-w-2xl mx-auto mb-8">
            <SearchAutocomplete className="max-w-2xl mx-auto" />
          </div>
          <p className="text-gray-500 text-sm mb-4">Most searched:</p>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <TrendingJobs titles={trendingJobs} />
          </div>
          <p className="text-gray-500 text-sm mb-6">
            or show <span className="text-white underline cursor-pointer hover:text-gray-300">random example</span>
          </p>
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
