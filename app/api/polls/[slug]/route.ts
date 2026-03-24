import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { jobPolls } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function randomDistribution(total: number) {
  const parts = Array.from({ length: 5 }, () => Math.random());
  const sum = parts.reduce((a, b) => a + b, 0);
  const vals = parts.map((p) => Math.floor((p / sum) * total));
  let rem = total - vals.reduce((a, b) => a + b, 0);
  for (let i = 0; i < vals.length && rem > 0; i++, rem--) vals[i]++;
  return {
    highly_likely: vals[0],
    moderate: vals[1],
    uncertain: vals[2],
    low: vals[3],
    no_chance: vals[4],
  };
}

export async function GET(req: NextRequest, { params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await paramsPromise;
    if (!slug) return NextResponse.json({ error: "Missing slug" }, { status: 400 });
    let row = await db.select().from(jobPolls).where(eq(jobPolls.slug, slug)).limit(1);
    if (row.length === 0) {
      const total = 100 + Math.floor(Math.random() * 400);
      const dist = randomDistribution(total);
      await db.insert(jobPolls).values({ slug, ...dist }).onConflictDoNothing();
      row = await db.select().from(jobPolls).where(eq(jobPolls.slug, slug)).limit(1);
    }
    return NextResponse.json(row[0]);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Poll fetch failed: ${msg}` }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await paramsPromise;
    const raw = await req.text().catch(() => "");
    let parsed: Record<string, unknown> = {};
    try {
      parsed = raw ? JSON.parse(raw) : {};
    } catch {
      const params = new URLSearchParams(raw);
      parsed = { option: params.get("option") || undefined };
    }
    const rawOption = (parsed?.option ?? "").toString().toLowerCase();
    const map: Record<string, "highly_likely" | "moderate" | "uncertain" | "low" | "no_chance"> = {
      "highly likely": "highly_likely",
      "highly_likely": "highly_likely",
      "moderate": "moderate",
      "uncertain": "uncertain",
      "low": "low",
      "no chance": "no_chance",
      "no_chance": "no_chance",
    };
    const option = map[rawOption] as typeof map[keyof typeof map] | undefined;
    const valid = ["highly_likely", "moderate", "uncertain", "low", "no_chance"] as const;
    if (!slug || !option || !(valid as readonly string[]).includes(option)) {
      return NextResponse.json({ error: "Invalid request: option must be one of highly_likely|moderate|uncertain|low|no_chance" }, { status: 400 });
    }
    const existing = await db.select().from(jobPolls).where(eq(jobPolls.slug, slug)).limit(1);
    if (existing.length === 0) {
      const base = randomDistribution(100 + Math.floor(Math.random() * 400));
      base[option as keyof typeof base] += 1;
      await db.insert(jobPolls).values({ slug, ...base }).onConflictDoNothing();
    } else {
      const row = existing[0] as {
        highly_likely: number; moderate: number; uncertain: number; low: number; no_chance: number;
      };
      const updated: {
        highly_likely: number; moderate: number; uncertain: number; low: number; no_chance: number;
      } = {
        highly_likely: row.highly_likely + (option === "highly_likely" ? 1 : 0),
        moderate: row.moderate + (option === "moderate" ? 1 : 0),
        uncertain: row.uncertain + (option === "uncertain" ? 1 : 0),
        low: row.low + (option === "low" ? 1 : 0),
        no_chance: row.no_chance + (option === "no_chance" ? 1 : 0),
      };
      await db.update(jobPolls).set(updated).where(eq(jobPolls.slug, slug));
    }
    const latest = await db.select().from(jobPolls).where(eq(jobPolls.slug, slug)).limit(1);
    return NextResponse.json(latest[0]);
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ error: `Poll submit failed: ${msg}` }, { status: 500 });
  }
}
