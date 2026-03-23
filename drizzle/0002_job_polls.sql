CREATE TABLE IF NOT EXISTS "job_polls" (
  "slug" text PRIMARY KEY,
  "highly_likely" integer NOT NULL DEFAULT 0,
  "moderate" integer NOT NULL DEFAULT 0,
  "uncertain" integer NOT NULL DEFAULT 0,
  "low" integer NOT NULL DEFAULT 0,
  "no_chance" integer NOT NULL DEFAULT 0,
  "created_at" timestamp NOT NULL DEFAULT now()
);
