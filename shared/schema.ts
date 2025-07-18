import {
  pgTable,
  text,
  varchar,
  timestamp,
  jsonb,
  index,
  integer,
  serial,
  boolean,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table - mandatory for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table - mandatory for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().notNull(),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  currentRole: varchar("current_role"),
  targetRole: varchar("target_role"),
  experienceLevel: varchar("experience_level"),
  industry: varchar("industry"),
  resumeUrl: varchar("resume_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const skillAssessments = pgTable("skill_assessments", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  skillName: varchar("skill_name").notNull(),
  currentLevel: integer("current_level").notNull(), // 1-5 scale
  targetLevel: integer("target_level").notNull(), // 1-5 scale
  marketDemand: integer("market_demand").notNull(), // 1-5 scale
  priority: integer("priority").notNull(), // 1-5 scale
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const learningResources = pgTable("learning_resources", {
  id: serial("id").primaryKey(),
  title: varchar("title").notNull(),
  description: text("description"),
  url: varchar("url").notNull(),
  provider: varchar("provider").notNull(),
  type: varchar("type").notNull(), // course, article, video, book
  skillTags: jsonb("skill_tags").$type<string[]>().notNull(),
  difficulty: varchar("difficulty").notNull(), // beginner, intermediate, advanced
  duration: varchar("duration"), // e.g., "4 weeks", "2 hours"
  rating: integer("rating"), // 1-5 scale
  createdAt: timestamp("created_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  resourceId: integer("resource_id").references(() => learningResources.id).notNull(),
  status: varchar("status").notNull(), // not_started, in_progress, completed
  progress: integer("progress").notNull().default(0), // 0-100
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const careerGoals = pgTable("career_goals", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  targetDate: timestamp("target_date"),
  status: varchar("status").notNull().default("active"), // active, completed, paused
  priority: integer("priority").notNull(), // 1-5 scale
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const chatSessions = pgTable("chat_sessions", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  messages: jsonb("messages").$type<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>().notNull(),
  topic: varchar("topic"), // skill_development, career_advice, interview_prep
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const portfolioProjects = pgTable("portfolio_projects", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id").references(() => users.id).notNull(),
  title: varchar("title").notNull(),
  description: text("description"),
  technologies: jsonb("technologies").$type<string[]>().notNull(),
  difficulty: varchar("difficulty").notNull(),
  estimatedTime: varchar("estimated_time"),
  status: varchar("status").notNull().default("suggested"), // suggested, in_progress, completed
  projectUrl: varchar("project_url"),
  githubUrl: varchar("github_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  createdAt: true,
  updatedAt: true,
});

export const insertSkillAssessmentSchema = createInsertSchema(skillAssessments).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLearningResourceSchema = createInsertSchema(learningResources).omit({
  id: true,
  createdAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertCareerGoalSchema = createInsertSchema(careerGoals).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertChatSessionSchema = createInsertSchema(chatSessions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertPortfolioProjectSchema = createInsertSchema(portfolioProjects).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Types
export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;
export type SkillAssessment = typeof skillAssessments.$inferSelect;
export type InsertSkillAssessment = z.infer<typeof insertSkillAssessmentSchema>;
export type LearningResource = typeof learningResources.$inferSelect;
export type InsertLearningResource = z.infer<typeof insertLearningResourceSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type CareerGoal = typeof careerGoals.$inferSelect;
export type InsertCareerGoal = z.infer<typeof insertCareerGoalSchema>;
export type ChatSession = typeof chatSessions.$inferSelect;
export type InsertChatSession = z.infer<typeof insertChatSessionSchema>;
export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type InsertPortfolioProject = z.infer<typeof insertPortfolioProjectSchema>;
