CREATE TABLE "job_polls" (
	"slug" text NOT NULL,
	"highly_likely" integer DEFAULT 0 NOT NULL,
	"moderate" integer DEFAULT 0 NOT NULL,
	"uncertain" integer DEFAULT 0 NOT NULL,
	"low" integer DEFAULT 0 NOT NULL,
	"no_chance" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "job_polls_slug_unique" UNIQUE("slug")
);
