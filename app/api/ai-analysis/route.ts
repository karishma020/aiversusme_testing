import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";
export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const { job_title } = await req.json();

    if (!job_title) {
      return NextResponse.json({ error: "Job title is required" }, { status: 400 });
    }

    const prompt = `Analyze the job role: ${job_title} in India. 
CRITICAL: You must return a valid JSON object with the following structure. Do not include any other text or explanation outside the JSON.

Required JSON structure:
{ ... }`;

    const providers: Array<{
      name: string;
      enabled: boolean;
      call: () => Promise<string>;
    }> = [
      {
        name: "groq",
        enabled: !!process.env.GROQ_API_KEY,
        call: async () => {
          const model = process.env.GROQ_MODEL || "llama-3.1-8b-instant";
          const res = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
              model,
              response_format: { type: "json_object" },
              messages: [
                { role: "system", content: "Respond ONLY with a single valid JSON object that matches the requested schema." },
                { role: "user", content: prompt },
              ],
              max_tokens: 1000,
            },
            { headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}`, "Content-Type": "application/json" } }
          );
          return res.data?.choices?.[0]?.message?.content ?? "";
        },
      },
      {
        name: "deepseek",
        enabled: !!process.env.DEEPSEEK_API_KEY,
        call: async () => {
          const res = await axios.post(
            "https://api.deepseek.com/v1/chat/completions",
            {
              model: process.env.DEEPSEEK_MODEL || "deepseek-chat",
              messages: [
                { role: "system", content: "Respond ONLY with a single valid JSON object that matches the requested schema." },
                { role: "user", content: prompt },
              ],
              response_format: { type: "json_object" },
              max_tokens: 1000,
            },
            { headers: { Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`, "Content-Type": "application/json" } }
          );
          return res.data?.choices?.[0]?.message?.content ?? "";
        },
      },
      {
        name: "openai",
        enabled: !!process.env.OPENAI_API_KEY,
        call: async () => {
          const res = await axios.post(
            "https://api.openai.com/v1/chat/completions",
            {
              model: process.env.OPENAI_MODEL || "gpt-4o-mini",
              messages: [
                { role: "system", content: "Respond ONLY with a single valid JSON object that matches the requested schema." },
                { role: "user", content: prompt },
              ],
              response_format: { type: "json_object" },
              max_tokens: 1000,
            },
            { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" } }
          );
          return res.data?.choices?.[0]?.message?.content ?? "";
        },
      },
    ];

    let aiContent = "";
    const providerErrors: Array<{ provider: string; status?: number; message: string }> = [];
    for (const p of providers) {
      if (!p.enabled) continue;
      try {
        aiContent = await p.call();
        if (aiContent) break;
      } catch (e) {
        const err = e as { response?: { status?: number; data?: { error?: { message?: string } } }; message?: string };
        providerErrors.push({
          provider: p.name,
          status: err.response?.status,
          message: err.response?.data?.error?.message || err.message || "Unknown error",
        });
        continue;
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

    const normalized = {
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

    return NextResponse.json(normalized);
  } catch (error: unknown) {
    type AxiosErrorLike = {
      response?: {
        status?: number;
        data?: any;
      };
      message?: string;
    };
    const e = error as AxiosErrorLike;
    const errorData = e.response?.data?.error || e.response?.data || e.message;
    console.error("AI Analysis Error:", errorData);
    let errorMessage = "Failed to generate AI analysis";
    if (e.response?.status === 401) {
      errorMessage = "Invalid or expired API key for provider. Please check credentials.";
    } else if (e.response?.status === 429) {
      errorMessage = "Rate limit exceeded for provider. Please wait and try again.";
    } else if (e.response?.status === 503) {
      errorMessage = "All AI providers failed or are unavailable.";
    }
    if (e.response?.data?.error?.message) {
      errorMessage = e.response.data.error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: e.response?.status || 500 }
    );
  }
}
