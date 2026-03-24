"use client";

import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Sparkles, BrainCircuit, Rocket, Lightbulb, Repeat } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIAnalysisProps {
  jobTitle: string;
}

interface AnalysisData {
  executive_summary: string;
  risk_analysis: string;
  explanation: string;
  future: string;
  skills: string[];
  alternatives: string[];
  scores: {
    automation_risk: number;
    growth_potential: number;
    wage_score: number;
    job_volume: number;
    overall_job_score: number;
  };
}

const cache = new Map<string, AnalysisData>();

export default function AIAnalysis({ jobTitle }: AIAnalysisProps) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (cache.has(jobTitle)) {
        setData(cache.get(jobTitle)!);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/api/ai-analysis", { job_title: jobTitle });
        cache.set(jobTitle, response.data);
        setData(response.data);
      } catch (err: unknown) {
        const msg = typeof err === "object" && err && "response" in err
          ? (err as { response?: { data?: { error?: string } } }).response?.data?.error || "Failed to generate AI insights. Please try again later."
          : "Failed to generate AI insights. Please try again later.";
        setError(msg);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchAnalysis();
    }, 500);

    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [jobTitle]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-primary text-primary-foreground space-y-4 animate-pulse">
          <div className="h-8 w-48 bg-white/20 rounded-lg" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-white/10 rounded-lg" />
            <div className="h-4 w-full bg-white/10 rounded-lg" />
            <div className="h-4 w-3/4 bg-white/10 rounded-lg" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="h-8 w-48 bg-muted rounded-lg animate-pulse" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 w-full bg-muted rounded-2xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 rounded-3xl border-2 border-dashed border-red-200 bg-red-50 text-red-700 text-center">
        <p className="font-medium">{error}</p>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Summary & Risk Analysis */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-primary text-primary-foreground relative overflow-hidden group shadow-xl">
            <Sparkles className="absolute top-6 right-6 h-12 w-12 opacity-10 group-hover:rotate-12 transition-transform" />
            <div className="flex items-center gap-3 mb-4">
              <BrainCircuit className="h-6 w-6 text-primary-foreground/80" />
              <h2 className="text-2xl font-bold">Executive Summary</h2>
            </div>
            <p className="text-primary-foreground/90 leading-relaxed italic">
              {data.executive_summary}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-secondary border shadow-sm relative overflow-hidden group">
            <Rocket className="absolute top-6 right-6 h-12 w-12 opacity-10 group-hover:-translate-y-1 transition-transform" />
            <div className="flex items-center gap-3 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Risk Analysis</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {data.risk_analysis}
            </p>
          </div>
        </div>

        {/* Right Column: Scores & Skills */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-muted/30 border relative overflow-hidden group">
            <Lightbulb className="absolute top-6 right-6 h-12 w-12 opacity-5 group-hover:scale-110 transition-transform" />
            <h2 className="text-2xl font-bold mb-6">Future-Proof Skills</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.skills.map((skill, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-background border shadow-sm hover:border-primary/50 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                  <span className="text-sm font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-muted/30 border relative overflow-hidden group">
            <Repeat className="absolute top-6 right-6 h-12 w-12 opacity-5 group-hover:rotate-45 transition-transform" />
            <h2 className="text-2xl font-bold mb-6">Alternative Careers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.alternatives.map((alt, i) => (
                <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-background border shadow-sm hover:border-secondary/50 transition-colors">
                  <div className="h-2 w-2 rounded-full bg-secondary" />
                  <span className="text-sm font-medium">{alt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}