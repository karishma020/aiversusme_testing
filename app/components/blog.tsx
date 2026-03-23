"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, TrendingUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  tags: string[];
  readingTime: string;
  date: string;
  isTrending?: boolean;
  imageUrl: string;
}

// Data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Future-Proof Jobs in India",
    slug: "top-10-future-proof-jobs-india",
    description:
      "Discover careers that are least likely to be replaced by AI and will thrive in the coming decade.",
    content: "Artificial Intelligence is evolving rapidly, but some human-centric jobs remain exceptionally safe. Roles requiring deep empathy, complex strategic thinking, and emotional intelligence are extremely difficult for AI to replicate. In India, careers such as Healthcare Professionals (Doctors, Nurses), Specialized Trades (Electricians, Plumbers), Advanced Robotics Engineers, Cyber Security Experts, and Creative Directors are predicted to see massive growth over the next decade. The key to future-proofing your career track is to focus relentlessly on skills that machines struggle with: emotional intelligence, physical adaptability, high-touch communication, and complex, ambiguous problem-solving.",
    tags: ["Future Jobs", "India", "Career Growth"],
    readingTime: "5 min read",
    date: "Oct 12, 2026",
    isTrending: true,
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    title: "Jobs AI Will Replace",
    slug: "jobs-ai-will-replace",
    description:
      "A deep dive into jobs that are highly at risk of automation and what you can do about it.",
    content: "As Large Language Models and automated AI systems become remarkably more sophisticated, certain roles are facing an imminent high risk of automation. Routine clerical work, basic data entry, level-1 customer support, elementary translation services, and even some forms of basic copywriting and junior coding are being heavily augmented or entirely replaced. However, this does not mean the end of work. History consistently shows us that massive technological shifts destroy some jobs but simultaneously create many more in entirely new sectors. If your profession is in a high-risk field, the absolute best strategy is proactive upskilling. Learn to master the AI tools that threaten your job—become an AI operator and director rather than competing against the machine.",
    tags: ["AI Risk", "Automation", "Job Security"],
    readingTime: "7 min read",
    date: "Nov 03, 2026",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    title: "Highest Paying Tech Jobs 2026",
    slug: "highest-paying-tech-jobs-2026",
    description:
      "Explore the most lucrative tech careers and the skills needed to land them in the near future.",
    content: "The technology industry continues to offer some of the highest salaries globally, but the landscape is undergoing a dramatic shift. Entering 2026, the most lucrative roles are highly specialized at the intersection of Artificial Intelligence, hardware systems, and cyber security. Prompt Engineering has rapidly evolved into 'AI Systems Architecture,' commanding massive compensation premiums in the market. Furthermore, Data Privacy Officers and Cloud Infrastructure Engineers are also incredibly highly paid due to strict global regulatory compliance and the ongoing shift to decentralized application networks. If you are looking to maximize your earning potential, pivot and focus on niche specializations like Quantum Computing Software Development or advanced Machine Learning Operations (MLOps).",
    tags: ["Tech", "Salary", "2026 Trends"],
    readingTime: "4 min read",
    date: "Dec 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
  },
];

const categories = ["All", "AI Risk", "Careers", "Tech Jobs"];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    if (activeCategory === "All") return true;
    if (activeCategory === "Careers") return post.tags.some(t => t.toLowerCase().includes("career"));
    if (activeCategory === "Tech Jobs") return post.tags.some(t => t.toLowerCase().includes("tech"));
    return post.tags.includes(activeCategory);
  });

  return (
    <section className="w-full min-h-screen bg-black text-white py-20 px-4 md:px-8" id="blog-section">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 mb-6 backdrop-blur-sm">
            <Sparkles size={14} className="text-cyan-400" />
            <span>Latest Articles</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Insights & Career Trends
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10">
            Explore how AI is shaping the future of jobs, automating tasks, and creating new opportunities worldwide.
          </p>

          {/* Search & Filters */}
          <div className="w-full max-w-2xl flex flex-col sm:flex-row items-center gap-4 mb-8">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search articles, insights, or careers..."
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all backdrop-blur-md"
              />
            </div>
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md",
                  activeCategory === category
                    ? "bg-white text-black shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                    : "bg-white/5 text-gray-300 border border-white/10 hover:bg-white/10 hover:text-white"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 min-h-[400px]">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (
              <Link
                key={post.id}
                href={`/blogs/${post.slug}`}
                className="text-left group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-cyan-500/10 transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 w-full"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: "both" }}
              >
                {/* Card Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-purple-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:via-purple-500/5 group-hover:to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

                {/* Thumbnail Image Placeholder with Real Image Tag */}
                <div className="w-full h-48 relative overflow-hidden bg-gray-900 border-b border-white/10">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                  {post.isTrending && (
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-xs font-medium text-white backdrop-blur-md z-10">
                      <TrendingUp size={12} className="text-cyan-400" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="flex flex-col flex-1 p-6 relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] font-medium tracking-wide text-cyan-100/70 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-gray-100 group-hover:text-white transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 flex-1 line-clamp-3 leading-relaxed">
                    {post.description}
                  </p>

                  {/* Footer of Card */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10 w-full">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock size={14} />
                      <span>{post.readingTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      Read More
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-gray-500 animate-in fade-in">
              <Search size={48} className="mb-4 opacity-20" />
              <p>No articles found for "{activeCategory}".</p>
              <button
                onClick={() => setActiveCategory("All")}
                className="mt-4 text-cyan-400 hover:text-cyan-300 text-sm font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
