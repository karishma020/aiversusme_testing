 "use client";
 
 import { useMemo, useState } from "react";
 import { FaSearch } from "react-icons/fa";
 import { TrendingUp, ShieldAlert, Star, Sparkles } from "lucide-react";
 import {
   ScatterChart,
   Scatter,
   XAxis,
   YAxis,
   Tooltip,
   ResponsiveContainer,
   Legend,
 } from "recharts";
 
 type JobCard = {
   id: number;
   title: string;
   salary: number;
   risk: number;
   score: number;
   category: string;
 };
 
 const CATEGORIES = ["IT", "Design", "Marketing", "Management"] as const;
 type Category = typeof CATEGORIES[number];
  type JobChartPoint = { title: string; category: Category; risk: number; salary: number };
 
  // Curated static data for the chart (rough LPA → INR conversion below uses raw INR)
  const CHART_POINTS: JobChartPoint[] = [
    { title: "AI Engineer", category: "IT", risk: 12, salary: 5000000 },
    { title: "Data Scientist", category: "IT", risk: 18, salary: 3600000 },
    { title: "Cybersecurity Analyst", category: "IT", risk: 10, salary: 2400000 },
    { title: "Cloud Engineer", category: "IT", risk: 15, salary: 3000000 },
    { title: "DevOps Engineer", category: "IT", risk: 20, salary: 2800000 },
    { title: "Full Stack Developer", category: "IT", risk: 28, salary: 1800000 },
    { title: "Frontend Developer", category: "IT", risk: 30, salary: 1600000 },
 
    { title: "UI Designer", category: "Design", risk: 22, salary: 1200000 },
    { title: "UX Researcher", category: "Design", risk: 18, salary: 1500000 },
    { title: "Product Designer", category: "Design", risk: 20, salary: 1800000 },
 
    { title: "Digital Marketer", category: "Marketing", risk: 35, salary: 900000 },
    { title: "SEO Specialist", category: "Marketing", risk: 30, salary: 800000 },
    { title: "Brand Manager", category: "Marketing", risk: 25, salary: 1600000 },
 
    { title: "Product Manager", category: "Management", risk: 18, salary: 3200000 },
    { title: "Project Manager", category: "Management", risk: 22, salary: 1800000 },
    { title: "Operations Manager", category: "Management", risk: 26, salary: 1500000 },
  ];
 
  const SERIES_COLOR: Record<Category, string> = {
    IT: "#a78bfa",
    Design: "#60a5fa",
    Marketing: "#f59e0b",
    Management: "#34d399",
  };
 
  function ChartTooltip({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ value: number; name: string; payload: JobChartPoint }>;
  }) {
    if (!active || !payload || payload.length === 0) return null;
    const p = payload[0].payload;
    return (
      <div className="rounded-md border border-white/10 bg-black/80 px-3 py-2 text-xs">
        <div className="font-semibold">{p.title}</div>
        <div className="text-gray-300">{p.category}</div>
        <div className="text-gray-400">Risk: {p.risk}%</div>
        <div className="text-gray-400">Salary: ₹{(p.salary / 100000).toFixed(1)} LPA</div>
      </div>
    );
  }
 
 function Badge({ children }: { children: React.ReactNode }) {
   return (
     <span className="px-2 py-1 text-[10px] rounded-full bg-white/5 border border-white/10 text-gray-300">
       {children}
     </span>
   );
 }
 
  function SectionHeading({
    title,
    subtitle,
  }: {
    title: string;
    subtitle?: string;
  }) {
    return (
      <div className="mb-4">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h2>
          <span className="h-[6px] w-14 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        </div>
        {subtitle ? <p className="text-xs text-gray-400 mt-1">{subtitle}</p> : null}
      </div>
    );
  }
 
 function Stat({
   icon: Icon,
   label,
   value,
   color,
 }: {
   icon: React.ComponentType<{ size?: number; className?: string }>;
   label: string;
   value: string | number;
   color: string;
 }) {
   return (
     <div className="flex items-center justify-between rounded-xl bg-black/30 border border-white/10 px-3 py-2">
       <div className="flex items-center gap-2">
         <div className={`p-2 rounded-lg bg-gradient-to-br ${color} shadow-lg`}>
           <Icon size={14} className="text-white" />
         </div>
         <span className="text-xs text-gray-400">{label}</span>
       </div>
       <span className="text-sm font-semibold">{value}</span>
     </div>
   );
 }
 
 export default function RankingsClient({ jobsData }: { jobsData: JobCard[] }) {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<Category[]>([...CATEGORIES]);
  const [sortBy, setSortBy] = useState<"best" | "salary" | "risk" | "score">("best");
 
  const filteredJobs = useMemo(() => {
    const s = search.trim().toLowerCase();
    return jobsData
      .filter((j) => categories.includes(j.category as Category))
      .filter((j) => (s ? j.title.toLowerCase().includes(s) : true));
  }, [search, jobsData, categories]);
 
  const sortedJobs = useMemo(() => {
    const list = [...filteredJobs];
    if (sortBy === "salary") list.sort((a, b) => b.salary - a.salary);
    else if (sortBy === "risk") list.sort((a, b) => a.risk - b.risk);
    else if (sortBy === "score") list.sort((a, b) => b.score - a.score);
    else list.sort((a, b) => b.score + (100 - b.risk) - (a.score + (100 - a.risk)));
    return list;
  }, [filteredJobs, sortBy]);
 
   const recommendedJobs = useMemo(() => {
    return [...sortedJobs]
       .sort((a, b) => {
         const scoreA = a.score + (100 - a.risk);
         const scoreB = b.score + (100 - b.risk);
         return scoreB - scoreA;
       })
       .slice(0, 3);
  }, [sortedJobs]);
 
  const totals = useMemo(() => {
    if (filteredJobs.length === 0) return { medianSalary: 0, avgRisk: 0, count: 0 };
    const sortedSalary = [...filteredJobs].map(j => j.salary).sort((a, b) => a - b);
    const mid = Math.floor(sortedSalary.length / 2);
    const median = sortedSalary.length % 2 ? sortedSalary[mid] : Math.round((sortedSalary[mid - 1] + sortedSalary[mid]) / 2);
    const avgRisk = Math.round(filteredJobs.reduce((acc, j) => acc + j.risk, 0) / filteredJobs.length);
    return { medianSalary: median, avgRisk, count: filteredJobs.length };
  }, [filteredJobs]);
 
  const visiblePoints = useMemo(
    () =>
      CHART_POINTS.filter(
        (p) =>
          categories.includes(p.category) &&
          (search ? p.title.toLowerCase().includes(search.toLowerCase()) : true)
      ),
    [categories, search]
  );
 
   return (
     <div className="min-h-screen bg-gradient-to-br from-black via-[#020617] to-[#0f172a] text-white p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">
            Automation Outlook • Static Snapshot
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r text-white text-transparent bg-clip-text leading-tight">
            Job Intelligence Dashboard
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Explore role risk, salary, and top picks across categories.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Stat icon={TrendingUp} label="Median salary" value={`₹${(totals.medianSalary/100000).toFixed(1)} LPA`} color="from-green-500 to-emerald-600" />
          <Stat icon={ShieldAlert} label="Avg risk" value={`${totals.avgRisk}%`} color="from-red-500 to-rose-600" />
          <Stat icon={Star} label="Roles" value={totals.count} color="from-yellow-400 to-orange-500" />
        </div>
      </div>
 
      <div className="bg-[#0b1220] rounded-2xl border border-white/10 shadow-inner p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-3">
          <div className="flex items-center bg-black/40 px-3 py-2 rounded-xl border border-white/10 flex-1">
            <FaSearch className="mr-3 text-gray-400" />
            <input
              placeholder="Search jobs..."
              className="bg-transparent outline-none w-full placeholder:text-gray-500"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-400">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "best" | "salary" | "risk" | "score")}
              className="bg-black/40 border border-white/10 text-sm px-3 py-2 rounded-xl"
            >
              <option value="best">Best match</option>
              <option value="salary">Salary (high)</option>
              <option value="risk">Risk (low)</option>
              <option value="score">Score (high)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {CATEGORIES.map((c) => {
            const active = categories.includes(c);
            return (
              <button
                key={c}
                onClick={() =>
                  setCategories((prev) =>
                    active ? prev.filter((x) => x !== c) : [...prev, c]
                  )
                }
                className={`px-3 py-1.5 rounded-full text-xs border transition ${
                  active
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-gray-300 border-white/10 hover:border-white/30"
                }`}
              >
                {c}
              </button>
            );
          })}
          <button
            onClick={() => setCategories([...CATEGORIES])}
            className="px-3 py-1.5 rounded-full text-xs border border-white/10 text-gray-400 hover:text-white hover:border-white/30"
          >
            Reset
          </button>
        </div>
       </div>
 
     <div className="mb-12">
       <SectionHeading title="Role Benchmarks" subtitle="Static comparison by role: risk, salary, growth, demand, and upskilling." />
       <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#0b1220]">
         <div className="grid grid-cols-6 text-xs bg-black/30">
           <div className="px-4 py-3 font-semibold">Role</div>
           <div className="px-4 py-3 font-semibold">Risk</div>
           <div className="px-4 py-3 font-semibold">Salary</div>
           <div className="px-4 py-3 font-semibold">Growth</div>
           <div className="px-4 py-3 font-semibold">Demand</div>
           <div className="px-4 py-3 font-semibold">Upskilling</div>
         </div>
         {[
           { role: "AI Engineer", risk: "12%", salary: "₹35–60 LPA", growth: "High", demand: "High", up: "LLMs, Vector DBs" },
           { role: "Data Scientist", risk: "18%", salary: "₹18–45 LPA", growth: "High", demand: "High", up: "ML Ops, SQL" },
           { role: "Cybersecurity Analyst", risk: "10%", salary: "₹12–30 LPA", growth: "High", demand: "High", up: "Cloud Sec, SIEM" },
           { role: "Cloud Engineer", risk: "15%", salary: "₹15–35 LPA", growth: "Medium", demand: "High", up: "AWS, K8s" },
           { role: "Full Stack Developer", risk: "28%", salary: "₹8–28 LPA", growth: "Medium", demand: "High", up: "React, Node" },
           { role: "UI/UX Designer", risk: "22%", salary: "₹7–20 LPA", growth: "Medium", demand: "Medium", up: "Design Systems" },
         ].map((r, i) => (
           <div key={r.role} className={`grid grid-cols-6 text-sm ${i % 2 ? "bg-black/10" : "bg-transparent"}`}>
             <div className="px-4 py-4 font-medium">{r.role}</div>
             <div className="px-4 py-4">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-2 rounded-full bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" />
                 <span>{r.risk}</span>
               </div>
             </div>
             <div className="px-4 py-4">{r.salary}</div>
             <div className="px-4 py-4">
               <span className={`px-2 py-1 rounded-full text-[10px] border ${r.growth==="High"?"border-green-500 text-green-400":r.growth==="Medium"?"border-yellow-500 text-yellow-400":"border-gray-500 text-gray-400"}`}>
                 {r.growth}
               </span>
             </div>
             <div className="px-4 py-4">
               <div className="flex items-center gap-2">
                 <div className="h-2 w-16 rounded bg-[#0b1220] border border-white/10 overflow-hidden">
                   <div className="h-2 bg-blue-500" style={{ width: r.demand==="High"?"100%":r.demand==="Medium"?"66%":"33%" }} />
                 </div>
                 <span className="text-xs text-gray-400">{r.demand}</span>
               </div>
             </div>
             <div className="px-4 py-4 text-gray-300">{r.up}</div>
           </div>
         ))}
       </div>
     </div>
 
       <div className="mb-12">
        <SectionHeading title="Best Jobs For You" subtitle="Top 3 roles by score and lower automation risk." />
 
         <div className="grid md:grid-cols-3 gap-5">
          {recommendedJobs.map((job, idx) => (
             <div
               key={job.id}
               className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-[#111827] to-[#020617] border border-white/10 shadow-xl hover:shadow-purple-500/20 transition"
             >
               <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/20 blur-3xl" />
              <div className="absolute top-3 left-3 text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/10">
                #{idx + 1}
              </div>
 
               <div className="flex justify-between items-center mb-3">
                 <Badge>{job.category}</Badge>
                 <Badge>Top Pick</Badge>
               </div>
 
               <h3 className="text-lg font-semibold mb-4">{job.title}</h3>
 
               <div className="space-y-2">
                 <Stat
                   icon={TrendingUp}
                   label="Salary"
                   value={`₹${(job.salary / 100000).toFixed(1)} LPA`}
                   color="from-green-500 to-emerald-600"
                 />
                 <Stat
                   icon={ShieldAlert}
                   label="Risk"
                   value={`${job.risk}%`}
                   color="from-red-500 to-rose-600"
                 />
                 <Stat
                   icon={Star}
                   label="Score"
                   value={job.score}
                   color="from-yellow-400 to-orange-500"
                 />
               </div>
             </div>
           ))}
         </div>
       </div>
 
       <div className="mb-12">
         <SectionHeading title="Salary vs Risk" subtitle="Curated, static points by category. Hover for details." />
         <div className="bg-[#0b1220] p-5 rounded-2xl border border-white/10 shadow-lg">
           <ResponsiveContainer width="100%" height={320}>
             <ScatterChart>
               <XAxis dataKey="risk" name="Risk" unit="%" tick={{ fill: "#94a3b8", fontSize: 12 }} />
               <YAxis dataKey="salary" name="Salary" tick={{ fill: "#94a3b8", fontSize: 12 }} />
               <Tooltip content={<ChartTooltip />} cursor={{ strokeDasharray: "3 3" }} />
               <Legend />
               {CATEGORIES.map((cat) => (
                 <Scatter
                   key={cat}
                   name={cat}
                   data={visiblePoints.filter((p) => p.category === cat)}
                   fill={SERIES_COLOR[cat]}
                 />
               ))}
             </ScatterChart>
           </ResponsiveContainer>
         </div>
       </div>
 
       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
         {sortedJobs.map((job) => (
           <div
             key={job.id}
             className="group relative rounded-2xl p-5 bg-[#0b1220] border border-white/10 hover:border-purple-500/40 transition overflow-hidden"
           >
             <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-500/10 to-blue-500/10" />
 
             <div className="flex justify-between items-center mb-3">
               <Badge>{job.category}</Badge>
               <span className="text-xs text-gray-500">#{job.id}</span>
             </div>
 
             <h3 className="text-lg font-semibold mb-4">{job.title}</h3>
 
             <div className="space-y-2">
               <Stat
                 icon={TrendingUp}
                 label="Salary"
                 value={`₹${(job.salary / 100000).toFixed(1)} LPA`}
                 color="from-green-500 to-emerald-600"
               />
               <Stat
                 icon={ShieldAlert}
                 label="Risk"
                 value={`${job.risk}%`}
                 color="from-red-500 to-rose-600"
               />
               <Stat
                 icon={Star}
                 label="Score"
                 value={job.score}
                 color="from-yellow-400 to-orange-500"
               />
               <div className="mt-3">
                 <div className="text-[10px] text-gray-400 mb-1">Risk</div>
                 <div className="h-2 rounded bg-[#0b1220] border border-white/10 overflow-hidden">
                   <div className="h-2 bg-gradient-to-r from-green-500 via-yellow-400 to-red-500" style={{ width: `${job.risk}%` }} />
                 </div>
               </div>
               <div>
                 <div className="text-[10px] text-gray-400 mb-1">Score</div>
                 <div className="h-2 rounded bg-[#0b1220] border border-white/10 overflow-hidden">
                   <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600" style={{ width: `${job.score}%` }} />
                 </div>
               </div>
             </div>
           </div>
         ))}
       </div>
     </div>
   );
 }
