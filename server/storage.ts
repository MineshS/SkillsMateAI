import {
  users,
  skillAssessments,
  learningResources,
  userProgress,
  careerGoals,
  chatSessions,
  portfolioProjects,
  type User,
  type UpsertUser,
  type SkillAssessment,
  type InsertSkillAssessment,
  type LearningResource,
  type InsertLearningResource,
  type UserProgress,
  type InsertUserProgress,
  type CareerGoal,
  type InsertCareerGoal,
  type ChatSession,
  type InsertChatSession,
  type PortfolioProject,
  type InsertPortfolioProject,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, desc, asc } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  getUserByEmail(email: string): Promise<User | undefined>;
  
  // Skill assessment operations
  getSkillAssessments(userId: string): Promise<SkillAssessment[]>;
  upsertSkillAssessment(assessment: InsertSkillAssessment): Promise<SkillAssessment>;
  
  // Learning resource operations
  getAllLearningResources(): Promise<LearningResource[]>;
  getLearningResourcesBySkills(skills: string[]): Promise<LearningResource[]>;
  createLearningResource(resource: InsertLearningResource): Promise<LearningResource>;
  
  // User progress operations
  getUserProgress(userId: string): Promise<UserProgress[]>;
  updateUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  
  // Career goal operations
  getCareerGoals(userId: string): Promise<CareerGoal[]>;
  createCareerGoal(goal: InsertCareerGoal): Promise<CareerGoal>;
  updateCareerGoal(id: number, updates: Partial<CareerGoal>): Promise<CareerGoal>;
  
  // Chat session operations
  getChatSessions(userId: string): Promise<ChatSession[]>;
  createChatSession(session: InsertChatSession): Promise<ChatSession>;
  updateChatSession(id: number, messages: ChatSession['messages']): Promise<ChatSession>;
  
  // Portfolio project operations
  getPortfolioProjects(userId: string): Promise<PortfolioProject[]>;
  createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject>;
  updatePortfolioProject(id: number, updates: Partial<PortfolioProject>): Promise<PortfolioProject>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  // Skill assessment operations
  async getSkillAssessments(userId: string): Promise<SkillAssessment[]> {
    return await db
      .select()
      .from(skillAssessments)
      .where(eq(skillAssessments.userId, userId))
      .orderBy(desc(skillAssessments.priority));
  }

  async upsertSkillAssessment(assessment: InsertSkillAssessment): Promise<SkillAssessment> {
    const existing = await db
      .select()
      .from(skillAssessments)
      .where(
        and(
          eq(skillAssessments.userId, assessment.userId),
          eq(skillAssessments.skillName, assessment.skillName)
        )
      );

    if (existing.length > 0) {
      const [updated] = await db
        .update(skillAssessments)
        .set({ ...assessment, updatedAt: new Date() })
        .where(eq(skillAssessments.id, existing[0].id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(skillAssessments)
        .values(assessment)
        .returning();
      return created;
    }
  }

  // Learning resource operations
  async getAllLearningResources(): Promise<LearningResource[]> {
    return await db
      .select()
      .from(learningResources)
      .orderBy(desc(learningResources.rating));
  }

  async getLearningResourcesBySkills(skills: string[]): Promise<LearningResource[]> {
    // This is a simplified implementation - in production, you'd use proper JSON querying
    const resources = await db.select().from(learningResources);
    return resources.filter(resource => {
      const skillTags = resource.skillTags as string[];
      return skills.some(skill => 
        skillTags.some(tag => 
          tag.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(tag.toLowerCase())
        )
      );
    });
  }

  async createLearningResource(resource: InsertLearningResource): Promise<LearningResource> {
    const [created] = await db
      .insert(learningResources)
      .values(resource as any)
      .returning();
    return created;
  }

  // User progress operations
  async getUserProgress(userId: string): Promise<UserProgress[]> {
    return await db
      .select()
      .from(userProgress)
      .where(eq(userProgress.userId, userId))
      .orderBy(desc(userProgress.updatedAt));
  }

  async updateUserProgress(progress: InsertUserProgress): Promise<UserProgress> {
    const existing = await db
      .select()
      .from(userProgress)
      .where(
        and(
          eq(userProgress.userId, progress.userId),
          eq(userProgress.resourceId, progress.resourceId)
        )
      );

    if (existing.length > 0) {
      const [updated] = await db
        .update(userProgress)
        .set({ ...progress, updatedAt: new Date() })
        .where(eq(userProgress.id, existing[0].id))
        .returning();
      return updated;
    } else {
      const [created] = await db
        .insert(userProgress)
        .values(progress)
        .returning();
      return created;
    }
  }

  // Career goal operations
  async getCareerGoals(userId: string): Promise<CareerGoal[]> {
    return await db
      .select()
      .from(careerGoals)
      .where(eq(careerGoals.userId, userId))
      .orderBy(desc(careerGoals.priority));
  }

  async createCareerGoal(goal: InsertCareerGoal): Promise<CareerGoal> {
    const [created] = await db
      .insert(careerGoals)
      .values(goal)
      .returning();
    return created;
  }

  async updateCareerGoal(id: number, updates: Partial<CareerGoal>): Promise<CareerGoal> {
    const [updated] = await db
      .update(careerGoals)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(careerGoals.id, id))
      .returning();
    return updated;
  }

  // Chat session operations
  async getChatSessions(userId: string): Promise<ChatSession[]> {
    return await db
      .select()
      .from(chatSessions)
      .where(eq(chatSessions.userId, userId))
      .orderBy(desc(chatSessions.updatedAt));
  }

  async createChatSession(session: InsertChatSession): Promise<ChatSession> {
    const [created] = await db
      .insert(chatSessions)
      .values(session as any)
      .returning();
    return created;
  }

  async updateChatSession(id: number, messages: ChatSession['messages']): Promise<ChatSession> {
    const [updated] = await db
      .update(chatSessions)
      .set({ messages, updatedAt: new Date() })
      .where(eq(chatSessions.id, id))
      .returning();
    return updated;
  }

  // Portfolio project operations
  async getPortfolioProjects(userId: string): Promise<PortfolioProject[]> {
    return await db
      .select()
      .from(portfolioProjects)
      .where(eq(portfolioProjects.userId, userId))
      .orderBy(desc(portfolioProjects.createdAt));
  }

  async createPortfolioProject(project: InsertPortfolioProject): Promise<PortfolioProject> {
    const [created] = await db
      .insert(portfolioProjects)
      .values(project as any)
      .returning();
    return created;
  }

  async updatePortfolioProject(id: number, updates: Partial<PortfolioProject>): Promise<PortfolioProject> {
    const [updated] = await db
      .update(portfolioProjects)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(portfolioProjects.id, id))
      .returning();
    return updated;
  }
}

export const storage = new DatabaseStorage();
