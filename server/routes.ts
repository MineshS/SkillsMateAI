import type { Express } from "express";
import { createServer, type Server } from "http";
import multer from "multer";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { processResumeUpload } from "./services/resumeAnalysis";
import { 
  getPersonalizedCareerAdvice,
  generateSkillGapAnalysis,
  generateUserPortfolioProjects 
} from "./services/careerCoaching";
import { 
  insertSkillAssessmentSchema,
  insertCareerGoalSchema,
  insertUserProgressSchema,
  insertPortfolioProjectSchema 
} from "@shared/schema";
import { linkedinService } from "./services/linkedinService";

const upload = multer({ storage: multer.memoryStorage() });

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // User profile routes
  app.put('/api/user/profile', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const updates = req.body;
      
      const user = await storage.upsertUser({
        id: userId,
        ...updates,
      });
      
      res.json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });

  // Resume upload and analysis
  app.post('/api/resume/upload', isAuthenticated, upload.single('resume'), async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const analysis = await processResumeUpload(file.buffer, file.mimetype);
      
      // Update user profile with extracted skills and experience
      await storage.upsertUser({
        id: userId,
        experienceLevel: analysis.experience,
        resumeUrl: `resume-${userId}-${Date.now()}`, // In production, store actual file
      });

      // Create skill assessments from resume analysis
      for (const skill of analysis.skills) {
        await storage.upsertSkillAssessment({
          userId,
          skillName: skill.name,
          currentLevel: skill.level,
          targetLevel: Math.min(skill.level + 1, 5), // Assume they want to improve
          marketDemand: 3, // Default market demand
          priority: 3, // Default priority
        });
      }

      res.json({
        message: "Resume analyzed successfully",
        analysis,
      });
    } catch (error) {
      console.error("Error processing resume:", error);
      res.status(500).json({ message: "Failed to process resume" });
    }
  });

  // Skill assessment routes
  app.get('/api/skills/assessments', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const assessments = await storage.getSkillAssessments(userId);
      res.json(assessments);
    } catch (error) {
      console.error("Error fetching skill assessments:", error);
      res.status(500).json({ message: "Failed to fetch skill assessments" });
    }
  });

  app.post('/api/skills/assessment', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const assessmentData = insertSkillAssessmentSchema.parse({
        ...req.body,
        userId,
      });
      
      const assessment = await storage.upsertSkillAssessment(assessmentData);
      res.json(assessment);
    } catch (error) {
      console.error("Error creating skill assessment:", error);
      res.status(500).json({ message: "Failed to create skill assessment" });
    }
  });

  app.post('/api/skills/gap-analysis', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await generateSkillGapAnalysis(userId);
      
      const updatedAssessments = await storage.getSkillAssessments(userId);
      res.json({
        message: "Skill gap analysis completed",
        assessments: updatedAssessments,
      });
    } catch (error) {
      console.error("Error generating skill gap analysis:", error);
      res.status(500).json({ message: "Failed to generate skill gap analysis" });
    }
  });

  // Learning resources routes
  app.get('/api/resources', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const skillAssessments = await storage.getSkillAssessments(userId);
      
      if (skillAssessments.length === 0) {
        const allResources = await storage.getAllLearningResources();
        return res.json(allResources);
      }

      const skills = skillAssessments.map(assessment => assessment.skillName);
      const resources = await storage.getLearningResourcesBySkills(skills);
      res.json(resources);
    } catch (error) {
      console.error("Error fetching learning resources:", error);
      res.status(500).json({ message: "Failed to fetch learning resources" });
    }
  });

  // Progress tracking routes
  app.get('/api/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progress = await storage.getUserProgress(userId);
      res.json(progress);
    } catch (error) {
      console.error("Error fetching user progress:", error);
      res.status(500).json({ message: "Failed to fetch progress" });
    }
  });

  app.post('/api/progress', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId,
      });
      
      const progress = await storage.updateUserProgress(progressData);
      res.json(progress);
    } catch (error) {
      console.error("Error updating progress:", error);
      res.status(500).json({ message: "Failed to update progress" });
    }
  });

  // Career goals routes
  app.get('/api/goals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const goals = await storage.getCareerGoals(userId);
      res.json(goals);
    } catch (error) {
      console.error("Error fetching career goals:", error);
      res.status(500).json({ message: "Failed to fetch career goals" });
    }
  });

  app.post('/api/goals', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const goalData = insertCareerGoalSchema.parse({
        ...req.body,
        userId,
      });
      
      const goal = await storage.createCareerGoal(goalData);
      res.json(goal);
    } catch (error) {
      console.error("Error creating career goal:", error);
      res.status(500).json({ message: "Failed to create career goal" });
    }
  });

  // AI Career coaching routes
  app.post('/api/chat/advice', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { question } = req.body;
      
      if (!question) {
        return res.status(400).json({ message: "Question is required" });
      }

      const advice = await getPersonalizedCareerAdvice(userId, question);
      res.json(advice);
    } catch (error) {
      console.error("Error getting career advice:", error);
      res.status(500).json({ message: "Failed to get career advice" });
    }
  });

  app.get('/api/chat/sessions', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const sessions = await storage.getChatSessions(userId);
      res.json(sessions);
    } catch (error) {
      console.error("Error fetching chat sessions:", error);
      res.status(500).json({ message: "Failed to fetch chat sessions" });
    }
  });

  app.post('/api/chat/session', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const { messages, topic } = req.body;
      
      const session = await storage.createChatSession({
        userId,
        messages: messages || [],
        topic,
      });
      
      res.json(session);
    } catch (error) {
      console.error("Error creating chat session:", error);
      res.status(500).json({ message: "Failed to create chat session" });
    }
  });

  // Portfolio project routes
  app.get('/api/portfolio/projects', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const projects = await storage.getPortfolioProjects(userId);
      res.json(projects);
    } catch (error) {
      console.error("Error fetching portfolio projects:", error);
      res.status(500).json({ message: "Failed to fetch portfolio projects" });
    }
  });

  app.post('/api/portfolio/generate', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await generateUserPortfolioProjects(userId);
      
      const projects = await storage.getPortfolioProjects(userId);
      res.json({
        message: "Portfolio projects generated successfully",
        projects,
      });
    } catch (error) {
      console.error("Error generating portfolio projects:", error);
      res.status(500).json({ message: "Failed to generate portfolio projects" });
    }
  });

  app.put('/api/portfolio/project/:id', isAuthenticated, async (req: any, res) => {
    try {
      const projectId = parseInt(req.params.id);
      const updates = req.body;
      
      const project = await storage.updatePortfolioProject(projectId, updates);
      res.json(project);
    } catch (error) {
      console.error("Error updating portfolio project:", error);
      res.status(500).json({ message: "Failed to update portfolio project" });
    }
  });

  // Seed some initial learning resources
  app.post('/api/admin/seed-resources', async (req, res) => {
    try {
      const sampleResources = [
        {
          title: "Python for Data Science",
          description: "Complete Python course focused on data science applications",
          url: "https://www.coursera.org/specializations/python-data-science",
          provider: "Coursera",
          type: "course",
          skillTags: ["Python", "Data Science", "Machine Learning"],
          difficulty: "intermediate",
          duration: "4 weeks",
          rating: 5,
        },
        {
          title: "JavaScript Fundamentals",
          description: "Learn JavaScript from basics to advanced concepts",
          url: "https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/",
          provider: "freeCodeCamp",
          type: "course",
          skillTags: ["JavaScript", "Web Development", "Programming"],
          difficulty: "beginner",
          duration: "8 weeks",
          rating: 4,
        },
        {
          title: "React Development",
          description: "Build modern web applications with React",
          url: "https://react.dev/learn",
          provider: "React.dev",
          type: "course",
          skillTags: ["React", "Frontend", "JavaScript"],
          difficulty: "intermediate",
          duration: "6 weeks",
          rating: 5,
        },
      ];

      for (const resource of sampleResources) {
        await storage.createLearningResource(resource);
      }

      res.json({ message: "Sample learning resources created" });
    } catch (error) {
      console.error("Error seeding resources:", error);
      res.status(500).json({ message: "Failed to seed resources" });
    }
  });

  // LinkedIn Integration Routes
  app.get('/api/linkedin/auth', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const authUrl = linkedinService.generateAuthUrl(userId);
      res.json({ authUrl });
    } catch (error) {
      console.error("LinkedIn auth error:", error);
      res.status(500).json({ message: "Failed to generate LinkedIn auth URL" });
    }
  });

  app.get('/api/linkedin/callback', async (req, res) => {
    try {
      const { code, state } = req.query;
      if (!code || !state) {
        return res.status(400).json({ message: "Missing code or state" });
      }

      const userId = state as string;
      await linkedinService.exchangeCodeForToken(code as string, userId);
      
      // Redirect to frontend with success
      res.redirect(`${process.env.APP_URL || 'http://localhost:5000'}/?linkedin=success`);
    } catch (error) {
      console.error("LinkedIn callback error:", error);
      res.redirect(`${process.env.APP_URL || 'http://localhost:5000'}/?linkedin=error`);
    }
  });

  app.post('/api/linkedin/sync', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const result = await linkedinService.syncUserProfile(userId);
      res.json(result);
    } catch (error) {
      console.error("LinkedIn sync error:", error);
      res.status(500).json({ message: "Failed to sync LinkedIn profile" });
    }
  });

  app.get('/api/linkedin/data', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const linkedinData = await linkedinService.getUserLinkedInData(userId);
      res.json(linkedinData);
    } catch (error) {
      console.error("LinkedIn data error:", error);
      res.status(500).json({ message: "Failed to fetch LinkedIn data" });
    }
  });

  app.delete('/api/linkedin/disconnect', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      await linkedinService.disconnectLinkedIn(userId);
      res.json({ message: "LinkedIn disconnected successfully" });
    } catch (error) {
      console.error("LinkedIn disconnect error:", error);
      res.status(500).json({ message: "Failed to disconnect LinkedIn" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
