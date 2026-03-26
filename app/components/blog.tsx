"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Search, Clock, ArrowRight, TrendingUp, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
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
  sections?: {
    title: string;
    content: string;
  }[];
  quote?: string;
  actionSteps?: string[];
}

// Data
export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 10 Future-Proof Jobs in India",
    slug: "top-10-future-proof-jobs-india",
    description:
      "Discover careers that are least likely to be replaced by AI and will thrive in the coming decade.",
    content: "Artificial Intelligence is evolving rapidly, but some human-centric jobs remain exceptionally safe. Roles requiring deep empathy, complex strategic thinking, and emotional intelligence are extremely difficult for AI to replicate.",
    tags: ["Future Jobs", "India", "Career Growth"],
    readingTime: "5 min read",
    date: "Oct 12, 2026",
    isTrending: true,
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Human Advantage",
        content: "In the Indian market, roles like Healthcare Professionals and Creative Directors are seeing increased demand. These jobs require 'high-touch' interactions and nuanced understanding of local cultural contexts that AI models often miss."
      },
      {
        title: "Strategic Problem Solving",
        content: "Complex problem solving in ambiguous environments—like navigating India's diverse regulatory landscape—remains a uniquely human strength. Specialized consultancy and legal roles are adapting by using AI for research while retaining human judgment for final decisions."
      }
    ],
    quote: "The future belongs to those who master the human elements that machines cannot touch.",
    actionSteps: [
      "Focus on developing soft skills and emotional intelligence.",
      "Stay updated on localized market trends that AI might overlook.",
      "Learn to use AI as a research partner, not a replacement."
    ]
  },
  {
    id: "2",
    title: "Jobs AI Will Replace",
    slug: "jobs-ai-will-replace",
    description:
      "A deep dive into jobs that are highly at risk of automation and what you can do about it.",
    content: "Certain roles are facing an imminent high risk of automation. Routine clerical work, basic data entry, and level-1 customer support are being heavily augmented or entirely replaced.",
    tags: ["AI Risk", "Automation", "Job Security"],
    readingTime: "7 min read",
    date: "Nov 03, 2026",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Automation Curve",
        content: "Any job that consists of 'if-this-then-that' logic is prime for automation. This includes basic bookkeeping, elementary translation, and routine scheduling tasks."
      },
      {
        title: "Proactive Upskilling",
        content: "The best defense is a good offense. If your job is at risk, start learning the very AI tools that perform those tasks. Transitioning from a 'doer' to an 'AI operator' is the key to longevity."
      }
    ],
    quote: "Don't compete with the machine; learn to manage the machine.",
    actionSteps: [
      "Audit your daily tasks for repetitive patterns.",
      "Experiment with AI tools that currently perform parts of your job.",
      "Identify high-value tasks that still require your unique human oversight."
    ]
  },
  {
    id: "3",
    title: "Highest Paying Tech Jobs 2026",
    slug: "highest-paying-tech-jobs-2026",
    description:
      "Explore the most lucrative tech careers and the skills needed to land them in the near future.",
    content: "The technology industry continues to offer some of the highest salaries globally, but the landscape is undergoing a dramatic shift toward specialized AI roles.",
    tags: ["Tech", "Salary", "2026 Trends"],
    readingTime: "4 min read",
    date: "Dec 15, 2026",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "AI Systems Architecture",
        content: "Commanding top-tier salaries, AI Architects design the infrastructure that allows LLMs to function securely and efficiently within large enterprise environments."
      },
      {
        title: "Cyber Resilience & Ethics",
        content: "As AI grows, so do the risks. Specialized Cyber Security Experts who focus on AI vulnerabilities and 'AI Ethicists' who ensure compliance are becoming the some of the best-compensated professionals on the planet."
      }
    ],
    quote: "Wealth in the AI era flows to those who build the systems others use.",
    actionSteps: [
      "Specialise in MLOps or AI infrastructure.",
      "Understand the ethical and security implications of automated systems.",
      "Build a portfolio that shows you can manage complex AI deployments."
    ]
  },
  {
    id: "4",
    title: "AI's Impact on Entry-Level Jobs: The New Reality",
    slug: "ai-impact-entry-level-jobs-new-reality",
    description:
      "How automation is reshaping the landscape for freshers in data entry and basic support roles.",
    content: "Entry-level positions are undergoing a massive shift. Automation tools are now capable of handling repetitive tasks with higher accuracy and lower costs than human freshers.",
    tags: ["Entry Level", "Automation", "Career Advice"],
    readingTime: "6 min read",
    date: "Dec 20, 2026",
    imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The 'Experience Gap' Challenge",
        content: "Freshers used to 'cut their teeth' on routine tasks. With those being automated, companies now expect entry-level hires to possess higher-level critical thinking skills from day one."
      },
      {
        title: "New Opportunities in AI Auditing",
        content: "While basic entry is gone, the need for 'Human-in-the-loop' workers who verify AI output is exploding. This is the new entry point for many data-centric careers."
      }
    ],
    quote: "The first step on the career ladder is no longer climbing; it's learning to operate the elevator.",
    actionSteps: [
      "Master AI-assisted productivity tools before your first interview.",
      "Focus on showing how you can solve problems, not just follow steps.",
      "Look for roles specifically titled 'AI Support' or 'Data Verification'."
    ]
  },
  {
    id: "5",
    title: "BPO & Call Centers: The Bot Revolution",
    slug: "bpo-call-centers-bot-revolution",
    description:
      "Why chatbots are rapidly replacing voice and non-voice processes in the BPO industry.",
    content: "The BPO industry is at the forefront of the AI revolution. Chatbots and AI voice agents are now handling a significant portion of routine inquiries.",
    tags: ["BPO", "Chatbots", "Automation"],
    readingTime: "5 min read",
    date: "Jan 05, 2027",
    imageUrl: "https://images.unsplash.com/photo-1549221530-50674f07e5f3?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Shift to High-Complexity Queries",
        content: "Low-level tickets are gone. Human agents are now focused on complex, emotionally charged escalations where empathy and split-second judgment are required."
      },
      {
        title: "Omnichannel Management",
        content: "Modern BPO roles are evolving into 'AI Orchestrators' who manage multiple bot streams and step in only when the system flags a high-priority human need."
      }
    ],
    quote: "In the world of bots, the human voice becomes a premium service.",
    actionSteps: [
      "Upskill in conflict resolution and high-stakes negotiation.",
      "Learn the basics of NLP (Natural Language Processing) to better manage bots.",
      "Target high-end BPO roles that focus on specialized technical support."
    ]
  },
  {
    id: "6",
    title: "Coding in the Age of AI: Efficient or Extinct?",
    slug: "coding-age-ai-efficient-extinct",
    description:
      "Exploring whether AI tools like Copilot will replace developers or simply make them 10x more efficient.",
    content: "Software development is being transformed by AI coding assistants. While generic coding tasks are becoming automated, the role of the 'Architect' is more critical than ever.",
    tags: ["Software Development", "AI Tools", "Tech Trends"],
    readingTime: "8 min read",
    date: "Jan 15, 2027",
    imageUrl: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The 10x Developer is Real",
        content: "AI tools don't replace developers; they remove the boilerplate. Developers can now focus 90% of their time on system design and logic rather than syntax."
      },
      {
        title: "From Coder to Architect",
        content: "The market value is shifting from 'writing code' to 'understanding requirements' and translating them into robust system architectures that AI can then generate."
      }
    ],
    quote: "AI won't replace developers, but developers who use AI will replace those who don't.",
    actionSteps: [
      "Integrate AI coding assistants into your workspace immediately.",
      "Focus more on learning design patterns and system architecture.",
      "Double down on soft skills to better understand client requirements."
    ]
  },
  {
    id: "7",
    title: "Job Loss vs. Transformation: The Great Shift",
    slug: "job-loss-transformation-great-shift",
    description:
      "Are traditional jobs truly disappearing, or are they evolving into something entirely new?",
    content: "The narrative around AI often focuses on job loss, but 'job transformation' is the more accurate description of what's happening.",
    tags: ["Job Market", "AI Trends", "Future of Work"],
    readingTime: "6 min read",
    date: "Jan 22, 2027",
    imageUrl: "https://images.unsplash.com/photo-1454165833767-027eeef1531a?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Re-definition of Productivity",
        content: "We are moving from a world that rewards 'output volume' to one that rewards 'decision quality.' Automation handles the volume; you handle the decisions."
      },
      {
        title: "New Career Categories",
        content: "We're seeing the birth of 'AI Prompt Engineers,' 'Algorithmic Auditors,' and 'Virtual Experience Designers'—roles that didn't exist five years ago."
      }
    ],
    quote: "Every industrial revolution destroys tasks, not occupations.",
    actionSteps: [
      "Identify which parts of your current job are tasks vs. responsibilities.",
      "Look for emerging job titles in your industry on LinkedIn.",
      "Adopt a 'growth mindset' and be ready to pivot your title every 2-3 years."
    ]
  },
  {
    id: "8",
    title: "Accounting & Finance: Beyond the Spreadsheet",
    slug: "accounting-finance-beyond-spreadsheet",
    description:
      "How AI is automating bookkeeping and auditing, and what it means for finance professionals.",
    content: "In accounting and finance, AI is no longer a futuristic concept—it's the current reality. Automated bookkeeping is replacing traditional manual roles.",
    tags: ["Finance", "Accounting", "AI in Business"],
    readingTime: "7 min read",
    date: "Feb 01, 2027",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The End of Manual Reconciliation",
        content: "AI systems can now reconcile millions of transactions in seconds, flagging only the anomalies for human investigation. This shifts the accountant's role from recorder to investigator."
      },
      {
        title: "Predictive Financial Analysis",
        content: "Modern finance professionals use AI to run thousands of 'what-if' scenarios, providing businesses with forward-looking strategy rather than just backward-looking reports."
      }
    ],
    quote: "The modern accountant is a strategic advisor, not a human calculator.",
    actionSteps: [
      "Learn to use AI-driven financial modeling software.",
      "Switch your focus from data entry to data interpretation.",
      "Provide clients with insights on 'why' the numbers look the way they do."
    ]
  },
  {
    id: "9",
    title: "Robots in the Factory: The New Manufacturing Era",
    slug: "robots-factory-new-manufacturing-era",
    description:
      "The rise of autonomous robots and their impact on manual labor in the manufacturing sector.",
    content: "Manufacturing has always been a pioneer in automation, but the new wave of AI-powered robots is more versatile and intelligent than ever.",
    tags: ["Manufacturing", "Robotics", "Automation"],
    readingTime: "9 min read",
    date: "Feb 10, 2027",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "Cobots: Human-Robot Collaboration",
        content: "The latest generation of 'Cobots' are designed to work safely alongside humans, taking over the heavy lifting and repetitive assembly while humans manage the quality control."
      },
      {
        title: "Predictive Maintenance",
        content: "Sensors and AI now predict when a machine will fail before it happens, creating a huge demand for specialized 'Predictive Maintenance Technicians'."
      }
    ],
    quote: "Automation in the factory is about amplifying human output, not just replacing human hands.",
    actionSteps: [
      "Get certified in robotic systems operation and maintenance.",
      "Understand the basics of IoT (Internet of Things) and sensor data.",
      "Focus on roles that involve technical oversight of automated assembly lines."
    ]
  },
  {
    id: "10",
    title: "Customer Support: AI vs. Human Touch",
    slug: "customer-support-ai-human-touch",
    description:
      "Does the rise of automated chat systems spell the end for human customer support agents?",
    content: "Customers are increasingly interacting with AI-driven chat systems for quick resolutions. However, the 'Human Touch' remains a premium asset.",
    tags: ["Customer Support", "AI Chat", "UI/UX"],
    readingTime: "5 min read",
    date: "Feb 20, 2027",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Personalization Paradox",
        content: "While AI can personalize content, only humans can provide genuine empathy. High-value brands are doubling down on human support for their top-tier clients."
      },
      {
        title: "Support as a Revenue Driver",
        content: "Customer support is shifting from a 'cost center' to a 'growth center' where human agents use AI data to identify opportunities for cross-selling and relationship building."
      }
    ],
    quote: "AI handles the 'what' and 'how'; humans handle the 'why' and the 'feel'.",
    actionSteps: [
      "Sharpen your emotional intelligence and active listening skills.",
      "Learn to use CRM data provided by AI to better understand customer needs.",
      "Seek roles in 'Customer Success' rather than just 'Customer Support'."
    ]
  },
  {
    id: "11",
    title: "The Skill Gap: Why Upskilling is Mandatory",
    slug: "skill-gap-upskilling-mandatory",
    description:
      "Analysis of why employees who don't adapt to AI tools are at the highest risk of job loss.",
    content: "The biggest threat to jobs isn't AI itself—it's the gap between current skills and the skills required in an AI-driven economy.",
    tags: ["Upskilling", "Education", "Risk Management"],
    readingTime: "6 min read",
    date: "Mar 05, 2027",
    imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Half-Life of Skills",
        content: "Technical skills now have a shelf life of less than three years. If you're not learning, you're falling behind. Continuous education is the new job security."
      },
      {
        title: "Learning How to Learn",
        content: "The most valuable skill in 2027 isn't knowing a specific software—it's the ability to quickly master new AI-driven tools as they emerge."
      }
    ],
    quote: "In the age of AI, your ability to unlearn and relearn is your greatest asset.",
    actionSteps: [
      "Set aside 2-3 hours every week specifically for learning new tools.",
      "Take short, specialized courses on AI implementation in your field.",
      "Build a 'learning journal' to track your growing technical proficiency."
    ]
  },
  {
    id: "12",
    title: "High-Risk vs. Low-Risk Jobs in 2027",
    slug: "high-risk-low-risk-jobs-2027",
    description:
      "A comprehensive list of careers that are safest and those that are in the crosshairs of automation.",
    content: "As we move through 2027, the line between safe and risky jobs is becoming clearer. Manual labor and routine cognitive tasks are in the high-risk zone.",
    tags: ["Career Planning", "Job Security", "Trends"],
    readingTime: "10 min read",
    date: "Mar 12, 2027",
    imageUrl: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "The Low-Risk Sanctuary",
        content: "Roles like Palliative Care, Advanced Strategic Consulting, and Fine Arts remain low-risk because they require high levels of human intuition and irregular physical movement."
      },
      {
        title: "The High-Risk Danger Zone",
        content: "Standard legal research, medical transcription, and basic report writing are seeing rapid automation. If your job involves a lot of 'summarizing,' it's at risk."
      }
    ],
    quote: "Safety lies at the intersection of complex physical work and high-stakes human empathy.",
    actionSteps: [
      "Evaluate your job based on the 'Empathy vs. Logic' matrix.",
      "If your role is high-logic, move toward the engineering side of AI.",
      "If your role is high-empathy, double down on your interpersonal skills."
    ]
  },
  {
    id: "13",
    title: "Balancing AI & Humans: A Business Guide",
    slug: "balancing-ai-humans-business-guide",
    description:
      "How modern businesses can implement AI without completely replacing their human workforce.",
    content: "Forward-thinking businesses are realizing that the most powerful approach isn't 'AI instead of humans,' but 'AI plus humans.'",
    tags: ["Business Strategy", "Leadership", "Technology"],
    readingTime: "8 min read",
    date: "Mar 20, 2027",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    sections: [
      {
        title: "Augmentation Strategy",
        content: "Rather than firing workers, successful companies are using AI to remove the 'drudgery' from their workflows, allowing their staff to focus on high-impact innovation."
      },
      {
        title: "Cultural Ready-ness",
        content: "The biggest barrier to AI adoption isn't technology—it's fear. Leaders must cultivate an environment where AI is seen as an assistant, not a competitor."
      }
    ],
    quote: "A business with AI is powerful; a business with humans and AI is unstoppable.",
    actionSteps: [
      "Implement AI 'pilot programs' that focus on augmenting employee tasks.",
      "Communicate clearly and transparently about AI's role in the company.",
      "Incentivize employees who find new, creative ways to use AI tools."
    ]
  },
];

const categories = ["All", "AI Risk", "Careers", "Tech Jobs"];

export default function BlogSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
    }
  };

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

        {/* Blog Cards Slider */}
        <div className="relative group/slider">
          {/* Navigation Buttons - Only visible on Desktop and when there's overflow */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-4 md:-left-6 lg:-left-12 top-[40%] -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/50 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={() => scroll("right")}
            className="absolute -right-4 md:-right-6 lg:-right-12 top-[40%] -translate-y-1/2 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:border-cyan-500/50 transition-all opacity-0 group-hover/slider:opacity-100 hidden md:flex items-center justify-center shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>

          <div 
            ref={scrollRef}
            className="flex gap-6 lg:gap-8 overflow-x-auto pb-12 snap-x snap-mandatory scrollbar-hide scroll-smooth no-scrollbar px-4 -mx-4 md:px-0 md:mx-0"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
          >
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post, index) => (
                <div 
                  key={post.id} 
                  className="min-w-[85%] sm:min-w-[70%] md:min-w-[calc(50%-12px)] lg:min-w-[calc(33.333%-22px)] snap-start"
                >
                  <Link
                    href={`/blogs/${post.slug}`}
                    className="text-left group relative flex flex-col h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-cyan-500/10 transition-all duration-500 w-full"
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
                </div>
              ))
            ) : (
              <div className="w-full flex flex-col items-center justify-center p-12 text-gray-500 animate-in fade-in">
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
      </div>
    </section>
  );
}
