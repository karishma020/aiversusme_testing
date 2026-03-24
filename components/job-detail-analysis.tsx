"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { 
  TrendingUp, Facebook, Twitter, Linkedin, Repeat, Search, 
  GitCompare, Vote, MessageSquare, ChevronDown, Sparkles, BrainCircuit, Rocket, Lightbulb
} from "lucide-react";
import { 
  BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend
} from 'recharts';
import { cn } from "@/lib/utils";
import Gauge from "./gauge";
import RadarChart from "./radar-chart";
import SentimentChart from "./sentiment-chart";
import { useAuth, SignInButton, SignUpButton } from "@clerk/nextjs";
import type { jobs as jobsTable } from "@/lib/db/schema";

type JobSelect = typeof jobsTable.$inferSelect;
interface JobDetailAnalysisProps { job: JobSelect }

interface AnalysisData {
  executive_summary: string;
  risk_analysis: string;
  strategic_advice: {
    individuals: string;
    businesses: string;
  };
  task_analysis: {
    replaceable: string[];
    non_replaceable: string[];
  };
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
  employment_history: number[];
  wage_history: {
    year: number;
    job_wage: number;
    national_median: number;
  }[];
  drivers?: { name: string; impact: number }[];
  task_impact?: { replaced: number; augmented: number; preserved: number };
  regional_demand?: { region: string; demand: number }[];
  wage_forecast?: { year: number; forecast: number }[];
  hiring_trend?: { month: string; postings: number }[];
  timeline?: { year: number; event: string; risk_change: number }[];
}

const StatusBox = ({ children, borderColor = "border-orange-500" }: { children: React.ReactNode, borderColor?: string }) => (
  <div className={cn("bg-[#25282c] border-l-4 rounded-md p-4 mb-6", borderColor)}>
    <p className="text-sm font-bold tracking-tight">{children}</p>
  </div>
);

const SectionHeader = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-2xl font-bold tracking-tight mb-6">{children}</h2>
);

const detailCache = new Map<string, AnalysisData>();

export default function JobDetailAnalysis({ job }: JobDetailAnalysisProps) {
  const [data, setData] = useState<AnalysisData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useAuth();
  const [pollData, setPollData] = useState<{ highly_likely: number; moderate: number; uncertain: number; low: number; no_chance: number } | null>(null);
  const [choice, setChoice] = useState<"highly_likely" | "moderate" | "uncertain" | "low" | "no_chance" | null>(null);
  const [pollMessage, setPollMessage] = useState<string | null>(null);

  function recommendCerts(title: string) {
    const t = title.toLowerCase();
    if (t.includes("data") || t.includes("analyst") || t.includes("scientist")) {
      return ["Google Data Analytics", "IBM Data Science", "AWS Data Analytics", "Microsoft Azure DP-100", "Tableau Desktop", "Power BI Analyst PL-300"];
    }
    if (t.includes("developer") || t.includes("engineer") || t.includes("programmer")) {
      return ["AWS Solutions Architect Associate", "Azure AZ-104", "Google Professional Cloud Developer", "Meta Front-End", "React Nanodegree", "Kubernetes CKAD"];
    }
    if (t.includes("accountant") || t.includes("finance")) {
      return ["ACCA Foundations", "CPA fundamentals", "Tally with GST", "SAP FI basics", "Financial Modeling", "Excel Advanced"];
    }
    if (t.includes("marketing")) {
      return ["Google Ads", "Meta Blueprint", "HubSpot Content", "SEO Specialization", "GA4 Analytics", "Email Marketing"];
    }
    if (t.includes("designer")) {
      return ["Adobe Certified Professional", "Figma UI Design", "UX Research", "Motion Graphics", "3D Modeling Basics", "Brand Design"];
    }
    if (t.includes("electrical") || t.includes("mechanical") || t.includes("civil")) {
      return ["AutoCAD", "SolidWorks", "PLC SCADA", "Primavera P6", "ANSYS Basics", "Quality Management"];
    }
    return ["Communication Skills", "Project Management Basics", "SQL Fundamentals", "Git & GitHub", "Python Essentials", "Cloud Foundations"];
  }

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (detailCache.has(job.title)) {
        setData(detailCache.get(job.title)!);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.post("/api/ai-analysis", { job_title: job.title }, { withCredentials: true });
        detailCache.set(job.title, response.data);
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

    if (isSignedIn) {
      fetchAnalysis();
    } else {
      setLoading(false);
    }
  }, [job.title, isSignedIn]);

  useEffect(() => {
    const loadPoll = async () => {
      if (!isSignedIn) return;
      const res = await axios.get(`/api/polls/${job.slug}`, { withCredentials: true });
      setPollData(res.data);
    };
    loadPoll();
  }, [isSignedIn, job.slug]);

  const risk = data?.scores?.automation_risk ?? job.risk_score;
  const riskLevel = risk > 70 ? "Imminent Risk" : risk > 30 ? "Moderate Risk" : "Minimal Risk";
  const riskColor = risk > 70 ? "border-orange-500" : risk > 30 ? "border-yellow-500" : "border-green-500";
  const sentimentData = (() => {
    const seed = Array.from(job.slug || job.title || "").reduce((a, c) => a + c.charCodeAt(0), 0);
    const startYear = 2018;
    const startQuarter = 1;
    const quarters = 36;
    const base = Math.max(40, Math.min(65, risk - 10));
    const slope = ((risk - base) / quarters) * 0.8 + ((data?.scores?.growth_potential ?? 50) / 500);
    const arr: { label: string; value: number }[] = [];
    for (let i = 0; i < quarters; i++) {
      const year = startYear + Math.floor((startQuarter - 1 + i) / 4);
      const q = ((startQuarter - 1 + i) % 4) + 1;
      const noise = (((seed * (i + 3)) % 17) - 8) * 0.6;
      const val = Math.max(0, Math.min(100, base + i * slope + noise));
      arr.push({ label: `Q${q} ${year}`, value: Math.round(val) });
    }
    return arr;
  })();

  return (
    <div className="w-full max-w-4xl flex flex-col items-center">
      {/* Title & Badge */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight">{job.title}</h1>
        <div className="flex justify-center">
          <div className="bg-[#451a1a] text-[#f87171] px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            High pay & high risk
          </div>
        </div>
        <div className="inline-block border-2 border-yellow-500/50 rounded-xl px-8 py-2 text-xl font-black text-yellow-500 bg-yellow-500/5 uppercase tracking-widest">
          {riskLevel}
        </div>
      </div>

      {/* Main Gauge Section */}
      <div className="w-full max-w-2xl flex flex-col items-center mb-16">
        <Gauge value={risk} size={400} />
      </div>

      {/* Next Steps Section */}
      <div className="w-full max-w-md bg-[#25282c] rounded-3xl p-8 border border-white/5 space-y-6 text-center mb-16">
        <h3 className="text-xl font-bold">Where Would You Like to Go Next?</h3>
        <p className="text-muted-foreground text-sm">Share your results with friends and family.</p>
        <div className="flex justify-center gap-4">
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Facebook className="h-5 w-5" /></button>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Twitter className="h-5 w-5" /></button>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Linkedin className="h-5 w-5" /></button>
          <button className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"><Repeat className="h-5 w-5" /></button>
        </div>
        <div className="flex flex-col gap-3 pt-4">
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/10 transition-colors">
            <Search className="h-4 w-4" /> Get results for another job
          </Link>
          <button className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/10 transition-colors">
            <GitCompare className="h-4 w-4" /> Compare to another job
          </button>
        </div>
      </div>

      <h2 className="text-2xl font-bold tracking-tight text-center mb-8">Or, Explore This Profession In Greater Detail...</h2>
      
      <div className="flex gap-4 justify-center mb-12">
        <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/10 transition-colors text-sm">
          <Vote className="h-4 w-4" /> Vote
        </button>
        <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-blue-500/50 text-blue-400 font-bold hover:bg-blue-500/10 transition-colors text-sm">
          <MessageSquare className="h-4 w-4" /> Comments ({job.votes_count || 0})
        </button>
      </div>

      {!isSignedIn ? (
        <div className="w-full max-w-md bg-[#25282c] border border-white/5 rounded-3xl p-8 text-center mb-12">
          <h3 className="text-xl font-bold mb-3">Sign in to analyze this job</h3>
          <p className="text-[#94a3b8] text-sm mb-6">Login or sign up to generate AI-powered insights for <span className="font-bold">{job.title}</span>.</p>
          <div className="flex items-center justify-center gap-3">
            <SignInButton mode="modal">
              <button className="px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200">Login</button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-6 py-2 rounded-full bg-[#0ea5e9] text-white font-semibold hover:bg-[#0284c7]">Sign up</button>
            </SignUpButton>
          </div>
        </div>
      ) : loading ? (
        <div className="w-full flex flex-col items-center py-20 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          <p className="text-muted-foreground animate-pulse">AI is generating detailed analysis for {job.title}...</p>
        </div>
      ) : error ? (
        <div className="p-8 rounded-3xl border-2 border-dashed border-red-200 bg-red-50 text-red-700 text-center w-full mb-12">
          <p className="font-medium">{error}</p>
        </div>
      ) : data ? (
        <div className="w-full space-y-20">
          {/* 🔍 Executive Summary */}
          <section className="bg-[#25282c] border border-white/5 rounded-3xl p-8 shadow-xl">
            <SectionHeader>🔍 Executive Summary</SectionHeader>
            <div className="prose prose-invert max-w-none text-[#cbd5e1] leading-relaxed italic border-l-4 border-blue-500 pl-6 py-2">
              {data.executive_summary}
            </div>
          </section>

          {/* 1. Calculated automation risk & Analysis */}
          <section>
            <SectionHeader>📉 Job Risk Analysis</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
               <div className="md:col-span-1 flex flex-col items-center justify-center bg-[#1e293b]/30 rounded-3xl p-8 border border-white/5">
                  <span className="text-sm font-bold text-[#94a3b8] uppercase tracking-widest mb-2">Risk Score</span>
                  <span className={cn("text-6xl font-black", risk > 70 ? "text-orange-500" : risk > 30 ? "text-yellow-500" : "text-green-500")}>
                    {risk}%
                  </span>
                  <span className="text-xs font-bold text-[#94a3b8] mt-2 uppercase tracking-widest">{riskLevel}</span>
               </div>
               <div className="md:col-span-2 space-y-4">
                  <StatusBox borderColor={riskColor}>
                    Expert Interpretation
                  </StatusBox>
                  <p className="text-[#94a3b8] leading-relaxed">
                    {data.risk_analysis}
                  </p>
               </div>
            </div>
            
            <div className="bg-[#1e293b]/30 border-l-4 border-green-500 rounded-md p-6 mt-8">
              <p className="font-bold text-sm mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-green-500" /> Future-Proof Skills to Focus On:
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-[#94a3b8]">
                {(data?.skills || []).map((skill, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500" /> {skill}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* 🤖 Task-Level Automation Insight */}
          <section className="bg-[#25282c] border border-white/5 rounded-3xl p-8 shadow-xl">
            <SectionHeader>🤖 Task-Level Automation Insight</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="text-lg font-bold text-red-400 flex items-center gap-2">
                     <BrainCircuit className="h-5 w-5" /> Tasks AI Can Replace
                  </h4>
                  <ul className="space-y-4">
                     {(data.task_analysis.replaceable || []).map((task, i) => (
                        <li key={i} className="text-sm text-[#94a3b8] bg-[#111315] p-4 rounded-xl border border-white/5">
                           {task}
                        </li>
                     ))}
                  </ul>
               </div>
               <div className="space-y-6">
                  <h4 className="text-lg font-bold text-green-400 flex items-center gap-2">
                     <Lightbulb className="h-5 w-5" /> Tasks AI Cannot Replace
                  </h4>
                  <ul className="space-y-4">
                     {(data.task_analysis.non_replaceable || []).map((task, i) => (
                        <li key={i} className="text-sm text-[#94a3b8] bg-[#111315] p-4 rounded-xl border border-white/5">
                           {task}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
          </section>

          {/* 🧑‍💼 Strategic Advice */}
          <section className="bg-[#1e293b]/20 border border-blue-500/20 rounded-3xl p-8 shadow-xl overflow-hidden relative">
            <div className="absolute top-0 right-0 p-8 opacity-5">
               <Rocket className="h-32 w-32" />
            </div>
            <SectionHeader>🧑‍💼 Strategic Advice</SectionHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
               <div className="space-y-4">
                  <h4 className="text-lg font-bold text-blue-400">For Individuals</h4>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">
                     {data.strategic_advice.individuals}
                  </p>
               </div>
               <div className="space-y-4">
                  <h4 className="text-lg font-bold text-purple-400">For Business Owners</h4>
                  <p className="text-[#94a3b8] text-sm leading-relaxed">
                     {data.strategic_advice.businesses}
                  </p>
               </div>
            </div>
          </section>

          {/* 2. User poll */}
          <section>
            <SectionHeader>Community Perception</SectionHeader>
            <StatusBox borderColor="border-yellow-500">
              {(data?.scores?.automation_risk ?? risk)}% chance of full automation within the next two decades
            </StatusBox>
            <p className="text-[#94a3b8] mb-8 leading-relaxed">
              Our AI analysis estimates a {(data?.scores?.automation_risk ?? risk)}% chance of automation.
            </p>
            <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8 max-w-xl w-full">
              <h4 className="text-2xl font-bold mb-4">What do you think the risk of automation is?</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                <button onClick={() => setChoice("highly_likely")} className={`px-4 py-2 rounded-md border ${choice==="highly_likely"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Highly likely</button>
                <button onClick={() => setChoice("moderate")} className={`px-4 py-2 rounded-md border ${choice==="moderate"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Moderate</button>
                <button onClick={() => setChoice("uncertain")} className={`px-4 py-2 rounded-md border ${choice==="uncertain"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Uncertain</button>
                <button onClick={() => setChoice("low")} className={`px-4 py-2 rounded-md border ${choice==="low"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>Low</button>
                <button onClick={() => setChoice("no_chance")} className={`px-4 py-2 rounded-md border ${choice==="no_chance"?"border-blue-500 text-white":"border-white/10 text-[#94a3b8]"}`}>No chance</button>
              </div>
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={async () => {
                    if (!choice) return;
                    const res = await axios.post(`/api/polls/${job.slug}`, { option: choice }, { withCredentials: true });
                    setPollData(res.data);
                    setPollMessage("Poll submitted!");
                    setTimeout(() => setPollMessage(null), 2500);
                  }}
                  disabled={!choice}
                  className="bg-[#00e5ff] hover:bg-[#00b8cc] text-black font-black px-8 py-3 rounded-xl transition-colors text-sm disabled:opacity-50"
                >
                  Submit vote
                </button>
                {pollMessage && <span className="text-sm text-green-400">{pollMessage}</span>}
              </div>
              {pollData && (
                <div className="space-y-2">
                  {([
                    { k: "highly_likely", label: "Highly likely", color: "bg-red-500" },
                    { k: "moderate", label: "Moderate", color: "bg-orange-500" },
                    { k: "uncertain", label: "Uncertain", color: "bg-yellow-500" },
                    { k: "low", label: "Low", color: "bg-green-500" },
                    { k: "no_chance", label: "No chance", color: "bg-blue-500" },
                  ] as Array<{ k: keyof typeof pollData; label: string; color: string }>).map((o) => {
                    const total =
                      pollData.highly_likely +
                      pollData.moderate +
                      pollData.uncertain +
                      pollData.low +
                      pollData.no_chance || 1;
                    const val = pollData[o.k];
                    const pct = Math.round((val / total) * 100);
                    return (
                      <div key={o.k} className="text-xs">
                        <div className="flex justify-between mb-1">
                          <span className="text-[#94a3b8]">{o.label}</span>
                          <span className="text-[#94a3b8]">{pct}%</span>
                        </div>
                        <div className="h-2 bg-[#111315] rounded">
                          <div className={`h-2 ${o.color} rounded`} style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          <section>
            <SectionHeader>Sentiment</SectionHeader>
            <StatusBox borderColor="border-yellow-500">
              Trends based on community perception and automation risk
            </StatusBox>
            <SentimentChart data={sentimentData} />
          </section>

          <section>
            <SectionHeader>Risk drivers</SectionHeader>
            <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8 h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart layout="vertical" data={data?.drivers || []}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                  <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} hide />
                  <YAxis type="category" dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={120} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="impact" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={20} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </section>

          <section>
            <SectionHeader>Task impact</SectionHeader>
            <div className="bg-[#25282c] border border-white/5 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 h-4 bg-[#111315] rounded overflow-hidden">
                  <div className="h-4 bg-[#ef4444]" style={{ width: `${data?.task_impact?.replaced || 0}%` }} />
                </div>
                <span className="text-xs">Replaced {data?.task_impact?.replaced || 0}%</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex-1 h-4 bg-[#111315] rounded overflow-hidden">
                  <div className="h-4 bg-[#f59e0b]" style={{ width: `${data?.task_impact?.augmented || 0}%` }} />
                </div>
                <span className="text-xs">Augmented {data?.task_impact?.augmented || 0}%</span>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <div className="flex-1 h-4 bg-[#111315] rounded overflow-hidden">
                  <div className="h-4 bg-[#22c55e]" style={{ width: `${data?.task_impact?.preserved || 0}%` }} />
                </div>
                <span className="text-xs">Preserved {data?.task_impact?.preserved || 0}%</span>
              </div>
            </div>
          </section>

          {/* 3. Growth */}
          <section>
            <SectionHeader>Growth</SectionHeader>
            <StatusBox borderColor="border-green-500">
              {(data?.scores?.growth_potential ?? 0) > 60 ? "High" : (data?.scores?.growth_potential ?? 0) > 30 ? "Moderate" : "Low"} growth potential
            </StatusBox>
            <p className="text-[#94a3b8] mb-8 leading-relaxed">
              {data.future}
            </p>
            <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8 h-[400px]">
              <h4 className="text-xl font-bold mb-8">Total employment, and estimated job openings</h4>
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart data={(data?.employment_history || []).map((val, i) => ({ year: 2015 + i, value: val }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="year" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    tickFormatter={(value) => value >= 1000 ? `${(value/1000).toFixed(1)}k` : value}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff' }}
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {(data?.employment_history || []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index < 10 ? "#336791" : "#4b5563"} />
                    ))}
                  </Bar>
                </RechartsBarChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-8 text-xs text-[#94a3b8]">
                <div className="flex items-center gap-2"><div className="h-3 w-3 bg-[#336791] rounded-full" /> Total employed</div>
                <div className="flex items-center gap-2"><div className="h-3 w-3 bg-[#4b5563] rounded-full" /> Estimated openings</div>
              </div>
            </div>
          </section>

          {/* 4. Wages & Radar Chart */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <section className="space-y-4">
              <SectionHeader>Wages</SectionHeader>
              <StatusBox borderColor="border-green-500">
                {(data?.scores?.wage_score ?? 0) > 60 ? "High" : (data?.scores?.wage_score ?? 0) > 30 ? "Moderate" : "Low"} paid relative to other professions
              </StatusBox>
              <div className="space-y-4 text-[#94a3b8] mb-8 leading-relaxed">
                <p>Median annual wage for <span className="font-bold">{job.title}</span> is currently estimated at <span className="font-bold text-white">{job.salary}</span>.</p>
                <p>Alternative career paths: <span className="font-bold text-white">{(data?.alternatives || []).join(", ")}</span>.</p>
              </div>
              <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8">
                <h4 className="text-xl font-bold mb-4">Recommended certificate courses</h4>
                <ul className="grid grid-cols-1 gap-2 text-sm text-[#94a3b8]">
                  {recommendCerts(job.title).map((c, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" /> {c}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8 h-[400px]">
                <h4 className="text-xl font-bold mb-8">Wages over time</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data?.wage_history || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="year" 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="#94a3b8" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      tickFormatter={(value) => `₹${(value/1000).toFixed(0)}k`}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                      cursor={{ fill: 'rgba(255,255,255,0.05)' }}       
                      formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                    />
                    <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                    <Bar name="Occupation Wage" dataKey="job_wage" fill="#336791" radius={[4, 4, 0, 0]} />
                    <Bar name="National Median" dataKey="national_median" fill="#9f1239" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              {(data?.wage_forecast || []).length > 0 && (
                <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8 h-[300px]">
                  <h4 className="text-xl font-bold mb-8">Wage forecast</h4>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart data={data?.wage_forecast || []}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                      <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
                        itemStyle={{ color: '#fff' }}
                        formatter={(value: any) => `₹${Number(value).toLocaleString()}`}
                      />
                      <Bar dataKey="forecast" fill="#4ade80" radius={[4, 4, 0, 0]} />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              )}
            </section>

            <div className="flex flex-col items-center space-y-4 pt-12">
               <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">AI Summary Score</p>
               <RadarChart 
                  data={{
                    calculated: risk,
                    polling: data?.scores?.automation_risk ?? 0,
                    growth: data?.scores?.growth_potential ?? 0,
                    wages: data?.scores?.wage_score ?? 0,
                    volume: data?.scores?.job_volume ?? 0
                  }} 
                />
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">AI Job Score</p>
                  <div className="flex items-center gap-2 justify-center">
                    <span className="text-2xl font-black text-yellow-500">★ {(data?.scores?.overall_job_score ?? 0)}/10</span>
                  </div>
                </div>
                {(data?.regional_demand || []).length > 0 && (
                  <div className="w-full bg-[#25282c] border border-white/5 rounded-3xl p-6 h-[400px]">
                    <h4 className="text-xl font-bold mb-6">Regional demand</h4>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart layout="vertical" data={data?.regional_demand || []}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                        <XAxis type="number" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} hide />
                        <YAxis type="category" dataKey="region" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={80} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff' }}
                        />
                        <Bar dataKey="demand" fill="#60a5fa" radius={[0, 4, 4, 0]} barSize={20} />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                )}
            </div>
          </div>

          {(data?.hiring_trend || []).length > 0 && (
            <section>
              <SectionHeader>Hiring trend (last 12 months)</SectionHeader>
              <div className="bg-[#25282c] border border-white/5 rounded-3xl p-8 h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={data?.hiring_trend || []}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis 
                      dataKey="month" 
                      stroke="#94a3b8" 
                      fontSize={10} 
                      tickLine={false} 
                      axisLine={false}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#111315', borderColor: '#1e293b', borderRadius: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar name="Job Postings" dataKey="postings" fill="#a78bfa" radius={[4, 4, 0, 0]} />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </section>
          )}

          {(data?.timeline || []).length > 0 && (
            <section className="bg-[#25282c] border border-white/5 rounded-3xl p-8">
              <SectionHeader>Risk timeline</SectionHeader>
              <div className="space-y-4">
                {(data?.timeline || []).map((t, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="text-sm font-bold w-14">{t.year}</div>
                    <div className="flex-1">
                      <div className="text-sm">{t.event}</div>
                      <div className="text-xs text-[#94a3b8]">Risk change: {t.risk_change > 0 ? "+" : ""}{t.risk_change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 5. Job description */}
          <section className="bg-[#25282c] border border-white/5 rounded-3xl p-8">
            <SectionHeader>Job description</SectionHeader>
            <p className="text-[#94a3b8] mb-6 leading-relaxed">
              {job.description}
            </p>
          </section>
        </div>
      ) : null}
    </div>
  );
}
