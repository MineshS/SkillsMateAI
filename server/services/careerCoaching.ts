import { generateCareerAdvice, analyzeSkillGap, generatePortfolioProjects } from "./openai";
import { storage } from "../storage";
import type { SkillAssessment, User } from "@shared/schema";

export async function getPersonalizedCareerAdvice(
  userId: string,
  question: string
): Promise<{
  message: string;
  recommendations: string[];
  nextSteps: string[];
}> {
  const user = await storage.getUser(userId);
  const skillAssessments = await storage.getSkillAssessments(userId);
  
  if (!user) {
    throw new Error("User not found");
  }

  const userContext = {
    currentRole: user.currentRole,
    targetRole: user.targetRole,
    skills: skillAssessments.map(skill => ({
      name: skill.skillName,
      level: skill.currentLevel
    })),
    experience: user.experienceLevel || 'Not specified',
    industry: user.industry,
  };

  return await generateCareerAdvice(userContext, question);
}

export async function generateSkillGapAnalysis(userId: string): Promise<void> {
  const user = await storage.getUser(userId);
  const existingAssessments = await storage.getSkillAssessments(userId);
  
  if (!user || !user.targetRole) {
    throw new Error("User or target role not found");
  }

  const currentSkills = existingAssessments.map(assessment => ({
    name: assessment.skillName,
    level: assessment.currentLevel
  }));

  const skillGapAnalysis = await analyzeSkillGap(
    currentSkills,
    user.targetRole,
    user.industry || 'Technology'
  );

  // Update or create skill assessments based on the analysis
  for (const analysis of skillGapAnalysis) {
    await storage.upsertSkillAssessment({
      userId,
      skillName: analysis.skillName,
      currentLevel: analysis.currentLevel,
      targetLevel: analysis.targetLevel,
      marketDemand: analysis.marketDemand,
      priority: analysis.priority,
    });
  }
}

export async function generateUserPortfolioProjects(userId: string): Promise<void> {
  const user = await storage.getUser(userId);
  const skillAssessments = await storage.getSkillAssessments(userId);
  
  if (!user || !user.targetRole) {
    throw new Error("User or target role not found");
  }

  const skills = skillAssessments.map(skill => skill.skillName);
  const projects = await generatePortfolioProjects(
    user.targetRole,
    skills,
    user.experienceLevel || 'intermediate'
  );

  // Save suggested projects to database
  for (const project of projects) {
    await storage.createPortfolioProject({
      userId,
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      difficulty: project.difficulty,
      estimatedTime: project.estimatedTime,
      status: 'suggested',
    });
  }
}
