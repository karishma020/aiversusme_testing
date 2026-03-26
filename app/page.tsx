import Link from "next/link";
import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { desc } from "drizzle-orm";
import { cn } from "@/lib/utils";
import AboutSection from "@/app/components/about";
import BlogSection from "@/app/components/blog";
import TestimonialsSection from "@/app/components/testimonials";
import HowItWorksSection from "@/app/components/howtouse";
import ContactSection from "./components/contact";
import FeatureSection from "@/app/components/featuresection";
import LandingHero from "@/app/components/hero";

export default async function Home() {
  const featuredJobs = await db.select().from(jobs).orderBy(desc(jobs.created_at)).limit(6);

  return (
    <div className="flex flex-col items-center">
      {/* Landing Hero */}
      <LandingHero />

      {/* Features Section */}
      <FeatureSection />

      {/* How It Works Section */}
      <HowItWorksSection />

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