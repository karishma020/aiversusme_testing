import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";
import * as dotenv from "dotenv";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

// Server-side cache to reduce API calls to AI providers
const serverCache = new Map<string, any>();

// Unified interface for AI provider configurations
interface AiProvider {
  name: string;
  enabled: boolean;
  url: string;
  model: string;
  apiKey: string;
  getPayload: (prompt: string) => object;
  extractContent: (data: any) => string;
}

// --- Provider Configurations ---
const providers: AiProvider[] = [
  {
    name: "groq",
    enabled: !!process.env.GROQ_API_KEY,
    url: "https://api.groq.com/openai/v1/chat/completions",
    model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
    apiKey: process.env.GROQ_API_KEY || "",
    getPayload: (prompt) => ({
      model: "llama-3.1-8b-instant",
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "Respond ONLY with a single valid JSON object that matches the requested schema." },
        { role: "user", content: prompt },
      ],
      max_tokens: 1000,
    }),
    extractContent: (data) => data?.choices?.[0]?.message?.content ?? "",
  },
  {
    name: "deepseek",
    enabled: !!process.env.DEEPSEEK_API_KEY,
    url: "https://api.deepseek.com/v1/chat/completions",
    model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
    apiKey: process.env.DEEPSEEK_API_KEY || "",
    getPayload: (prompt) => ({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: "Respond ONLY with a single valid JSON object that matches the requested schema." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    }),
    extractContent: (data) => data?.choices?.[0]?.message?.content ?? "",
  },
  {
    name: "openai",
    enabled: !!process.env.OPENAI_API_KEY,
    url: "https://api.openai.com/v1/chat/completions",
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    apiKey: process.env.OPENAI_API_KEY || "",
    getPayload: (prompt) => ({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Respond ONLY with a single valid JSON object that matches the requested schema." },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
      max_tokens: 1000,
    }),
    extractContent: (data) => data?.choices?.[0]?.message?.content ?? "",
  },
];

// --- Main API Route Handler ---
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { job_title } = await req.json();

    if (!job_title) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    // Check server-side cache
    if (serverCache.has(job_title)) {
      console.log(`Cache hit for ${job_title}`);
      return NextResponse.json(serverCache.get(job_title));
    }

    const prompt = `You are an expert data analyst, AI strategist, and business consultant.
Your task is to deeply analyze the job role: ${job_title} in the context of the Indian market.

## YOUR OBJECTIVE:
Do NOT just describe visuals. You must INTERPRET, EXTRACT MEANING, and PROVIDE BUSINESS INSIGHTS.
Convert data -> insights -> decisions. Avoid generic statements.

CRITICAL: You must return a valid JSON object with the following structure. Do not include any other text or explanation outside the JSON.

Required JSON structure:
{
  "executive_summary": "3-5 lines overall conclusion.",
  "risk_analysis": "Detailed explanation of what the % risk means in real-world impact.",
  "strategic_advice": {
    "individuals": "Actionable career advice.",
    "businesses": "Advice for business owners/consultants."
  },
  "task_analysis": {
    "replaceable": ["Task 1 with reasoning", "Task 2 with reasoning"],
    "non_replaceable": ["Task 1 with reasoning", "Task 2 with reasoning"]
  },
  "explanation": "Brief overview of automation impact (legacy field).",
  "future": "Detailed trend analysis and future outlook (5-10 years).",
  "skills": ["List 5-8 future-proof skills"],
  "alternatives": ["List 5-8 safer career paths"],
  "scores": {
    "automation_risk": 0-100,
    "growth_potential": 0-100,
    "wage_score": 0-100,
    "job_volume": 0-100,
    "overall_job_score": 1-10
  },
  "employment_history": [20 historical/projected data points],
  "wage_history": [
    { "year": 2015-2024, "job_wage": number, "national_median": number }
  ],
  "drivers": [
    { "name": "Factor", "impact": 0-100 }
  ],
  "task_impact": {
    "replaced": percentage,
    "augmented": percentage,
    "preserved": percentage
  },
  "regional_demand": [
    { "region": "City/State", "demand": 0-100 }
  ],
  "wage_forecast": [
    { "year": 2025-2030, "forecast": number }
  ],
  "hiring_trend": [
    { "month": "2024-01", "postings": number }
  ],
  "timeline": [
    { "year": 2025-2030, "event": "Milestone", "risk_change": -50 to 50 }
  ]
}

## ANALYSIS RULES:
- If visuals/data are unclear, infer intelligently.
- Translate automation probability into business and career implications.
- Back every insight with reasoning.
- Final Verdict should be implicitly clear in the explanation (Safe, Evolving, or At Risk).`;

    let aiContent = "";
    const providerErrors: Array<{ provider: string; status?: number; message: string }> = [];

    for (const provider of providers) {
      if (!provider.enabled) continue;
      try {
        const response = await axios.post(
          provider.url,
          provider.getPayload(prompt),
          { headers: { Authorization: `Bearer ${provider.apiKey}`, "Content-Type": "application/json" } }
        );
        aiContent = provider.extractContent(response.data);
        if (aiContent) break; // Success, exit loop
      } catch (e: unknown) {
        const err = e as AxiosError<{ error?: { message?: string } }>;
        providerErrors.push({
          provider: provider.name,
          status: err.response?.status,
          message: err.response?.data?.error?.message || err.message || "Unknown error",
        });
      }
    }

    if (!aiContent) {
      console.error("AI Analysis Fallback Errors:", providerErrors);
      return NextResponse.json(
        { error: "All AI providers failed or are unavailable.", providers: providerErrors },
        { status: 503 }
      );
    }
    
    // Clean up markdown blocks if present
    if (typeof aiContent === "string") {
      if (aiContent.includes("```json")) {
        aiContent = aiContent.split("```json")[1].split("```")[0].trim();
      } else if (aiContent.includes("```")) {
        aiContent = aiContent.split("```")[1].split("```")[0].trim();
      }
    }

    let parsedData;
    try {
      parsedData = JSON.parse(aiContent);
    } catch {
      // Attempt to extract the first JSON object substring
      const match = typeof aiContent === "string" ? aiContent.match(/\{[\s\S]*\}/) : null;
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        return NextResponse.json(
          { error: "AI returned invalid JSON. Please try again." },
          { status: 422 }
        );
      }
    }

    const n = (v: unknown, d: number) => (typeof v === "number" && isFinite(v) ? v : d);
    const s = (v: unknown, d: string) => (typeof v === "string" ? v : d);
    const arr = <T>(v: unknown, d: T[]) => (Array.isArray(v) ? v : d);
    const obj = (v: unknown) => (v && typeof v === "object" ? v as Record<string, unknown> : {});
    const getNum = (o: Record<string, unknown>, key: string, d: number) => n(o[key], d);
    const getStr = (o: Record<string, unknown>, key: string, d: string) => s(o[key], d);

    const input = obj(parsedData);
    const scoresIn = obj(input.scores);
    const scores = {
      automation_risk: n(scoresIn.automation_risk, 50),
      growth_potential: n(scoresIn.growth_potential, 50),
      wage_score: n(scoresIn.wage_score, 50),
      job_volume: n(scoresIn.job_volume, 50),
      overall_job_score: n(scoresIn.overall_job_score, 5),
    };
    const skills = arr<string>(input.skills, []).map(v => String(v)).slice(0, 8);
    const alternatives = arr<string>(input.alternatives, []).map(v => String(v)).slice(0, 8);
    let employment_history = arr<number>(input.employment_history, []);
    if (employment_history.length < 20) {
      const base = 100;
      employment_history = Array.from({ length: 20 }, (_, i) => employment_history[i] ?? base + i * 5);
    } else {
      employment_history = employment_history.slice(0, 20).map(v => n(v, 0));
    }
    const wage_historyRaw = arr<Record<string, unknown>>(input.wage_history, []);
    const wage_history: { year: number; job_wage: number; national_median: number }[] =
      wage_historyRaw.length < 10
        ? (() => {
            const start = 2015;
            return Array.from({ length: 10 }, (_, i) => ({
              year: start + i,
              job_wage: 400000 + i * 25000,
              national_median: 350000 + i * 20000,
            }));
          })()
        : wage_historyRaw.slice(0, 10).map((w) => ({
            year: getNum(w, "year", 2015),
            job_wage: getNum(w, "job_wage", 400000),
            national_median: getNum(w, "national_median", 350000),
          }));
    const drivers = arr<Record<string, unknown>>(input.drivers, []).map((d) => ({ name: getStr(d, "name", "Factor"), impact: getNum(d, "impact", 50) })).slice(0, 8);
    const task_impactIn = obj(input.task_impact);
    const task_impact = {
      replaced: n(task_impactIn.replaced, 30),
      augmented: n(task_impactIn.augmented, 40),
      preserved: n(task_impactIn.preserved, 30),
    };
    const regional_demand = arr<Record<string, unknown>>(input.regional_demand, []).map((r) => ({ region: getStr(r, "region", "City"), demand: getNum(r, "demand", 50) })).slice(0, 8);
    const wage_forecast = arr<Record<string, unknown>>(input.wage_forecast, []).map((w) => ({ year: getNum(w, "year", 2025), forecast: getNum(w, "forecast", 450000) })).slice(0, 6);
    const hiring_trend = arr<Record<string, unknown>>(input.hiring_trend, []).map((m) => ({ month: getStr(m, "month", "2025-01"), postings: getNum(m, "postings", 100) })).slice(0, 12);
    const timeline = arr<Record<string, unknown>>(input.timeline, []).map((t) => ({ year: getNum(t, "year", 2025), event: getStr(t, "event", "Milestone"), risk_change: getNum(t, "risk_change", 0) })).slice(0, 6);

    const strategic_advice_in = obj(input.strategic_advice);
    const strategic_advice = {
      individuals: s(strategic_advice_in.individuals, "Actionable career advice."),
      businesses: s(strategic_advice_in.businesses, "Strategic business advice.")
    };

    const task_analysis_in = obj(input.task_analysis);
    const task_analysis = {
      replaceable: arr<string>(task_analysis_in.replaceable, []),
      non_replaceable: arr<string>(task_analysis_in.non_replaceable, [])
    };

    const normalized = {
      executive_summary: s(input.executive_summary, "Executive summary pending."),
      risk_analysis: s(input.risk_analysis, "Risk analysis pending."),
      strategic_advice,
      task_analysis,
      explanation: s(input.explanation, "Analysis pending."),
      future: s(input.future, "Outlook pending."),
      skills,
      alternatives,
      scores,
      employment_history,
      wage_history,
      drivers,
      task_impact,
      regional_demand,
      wage_forecast,
      hiring_trend,
      timeline,
    };

    // Save to server cache
    serverCache.set(job_title, normalized);

    return NextResponse.json(normalized);
  } catch (error: unknown) {
    type AxiosErrorLike = {
      response?: {
        status?: number;
        data?: { error?: { message?: string } } | Record<string, unknown>;
      };
      message?: string;
    };
    const e = error as AxiosErrorLike;
    let errorMessage = "Failed to generate AI analysis";

    if (e.response?.status === 401) {
      errorMessage = "Invalid or expired API key for provider. Please check credentials.";
    } else if (e.response?.status === 429) {
      errorMessage = "Rate limit exceeded for provider. Please wait and try again.";
    } else if (e.response?.status === 503) {
      errorMessage = "All AI providers failed or are unavailable.";
    }

    // Check if the error object has the expected shape
    if (
      e.response &&
      e.response.data &&
      typeof e.response.data === 'object' &&
      'error' in e.response.data &&
      e.response.data.error &&
      typeof e.response.data.error === 'object' &&
      'message' in e.response.data.error &&
      typeof e.response.data.error.message === 'string'
    ) {
      errorMessage = e.response.data.error.message;
    }

    console.error("AI Analysis Error:", { 
      message: errorMessage,
      status: e.response?.status,
      data: e.response?.data,
    });

    return NextResponse.json(
      { error: errorMessage },
      { status: e.response?.status || 500 }
    );
  }
}
