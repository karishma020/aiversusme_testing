import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const jobs = pgTable("jobs", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").unique().notNull(),
  risk_score: integer("risk_score").notNull(),
  calculated_risk: integer("calculated_risk"),
  polling_risk: integer("polling_risk"),
  votes_count: integer("votes_count").default(0),
  salary: text("salary").notNull(),
  hourly_salary: text("hourly_salary"),
  growth_rate: text("growth_rate").notNull(),
  growth_year: text("growth_projection_year"),
  demand_level: text("demand_level").notNull(),
  volume: integer("volume"),
  job_score: text("job_score"),
  description: text("description").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});

export const jobPolls = pgTable("job_polls", {
  slug: text("slug").unique().notNull(),
  highly_likely: integer("highly_likely").default(0).notNull(),
  moderate: integer("moderate").default(0).notNull(),
  uncertain: integer("uncertain").default(0).notNull(),
  low: integer("low").default(0).notNull(),
  no_chance: integer("no_chance").default(0).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
