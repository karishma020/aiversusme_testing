import { db } from "@/lib/db";
import { jobs } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import JobDetailAnalysis from "@/components/job-detail-analysis";
import { ChevronDown } from "lucide-react";
import * as dotenv from "dotenv";

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold tracking-tight mb-6">{children}</h2>
);

export default async function JobPage({ params: promise }: { params: { slug: string } }) {
  const params = await promise;
  const job = await db.query.jobs.findFirst({
    where: eq(jobs.slug, params.slug),
  });

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-white py-12 px-4 flex flex-col items-center">
      {/* Client component that handles AI analysis and dynamic rendering */}
      <JobDetailAnalysis job={job} />

      {/* Footer sections that remain relatively static but styled */}
      <div className="w-full max-w-4xl mt-20">
        {/* Comments Section */}
        <section className="mb-20">
          <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-12">
            <SectionHeader>Comments({job.votes_count || 0})</SectionHeader>
            <button className="flex items-center gap-2 text-xs font-bold text-[#94a3b8] bg-white/5 px-3 py-1.5 rounded-md">
              Latest <ChevronDown className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-8">
            <p className="text-sm font-bold text-blue-400">Leave a reply about this occupation</p>
            <div className="space-y-4">
              <textarea 
                className="w-full bg-[#111315] border border-white/10 rounded-lg p-4 h-32 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                placeholder="Comment"
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  className="bg-[#111315] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                  placeholder="Name"
                />
                <input 
                  type="email" 
                  className="bg-[#111315] border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-blue-500/50 transition-colors text-white"
                  placeholder="Email (optional, not published)"
                />
              </div>
              <button className="bg-[#00e5ff]/20 hover:bg-[#00e5ff]/30 text-[#00e5ff] font-bold px-6 py-2 rounded-lg transition-colors text-sm border border-[#00e5ff]/30">
                Post Comment
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
