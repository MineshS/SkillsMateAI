import OpenAI from "openai";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR || "default_key"
});

export interface SkillGapAnalysis {
  skillName: string;
  currentLevel: number;
  targetLevel: number;
  marketDemand: number;
  priority: number;
  recommendations: string[];
}

export interface CareerAdvice {
  message: string;
  recommendations: string[];
  nextSteps: string[];
}

export async function analyzeSkillGap(
  currentSkills: Array<{ name: string; level: number }>,
  targetRole: string,
  industry: string
): Promise<SkillGapAnalysis[]> {
  const prompt = `
    Analyze the skill gap for someone transitioning to a ${targetRole} role in the ${industry} industry.
    
    Current skills: ${JSON.stringify(currentSkills)}
    
    Provide a detailed analysis with:
    1. Current skill level assessment (1-5 scale)
    2. Target skill level needed for the role (1-5 scale)
    3. Market demand for each skill (1-5 scale)
    4. Priority for learning each skill (1-5 scale)
    5. Specific recommendations for improvement
    
    Return the analysis in JSON format with the following structure:
    {
      "skillAnalysis": [
        {
          "skillName": "string",
          "currentLevel": number,
          "targetLevel": number,
          "marketDemand": number,
          "priority": number,
          "recommendations": ["string"]
        }
      ]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a senior career advisor and hiring manager with expertise in skill gap analysis across various industries. Provide accurate, actionable insights based on current market trends."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.skillAnalysis || [];
  } catch (error) {
    console.error("Error analyzing skill gap:", error);
    throw new Error("Failed to analyze skill gap: " + error.message);
  }
}

export async function analyzeResume(resumeText: string): Promise<{
  skills: Array<{ name: string; level: number }>;
  experience: string;
  recommendations: string[];
}> {
  const prompt = `
    Analyze the following resume and extract:
    1. Technical and soft skills with estimated proficiency levels (1-5 scale)
    2. Overall experience level (entry, mid, senior, executive)
    3. Recommendations for improvement
    
    Resume content: ${resumeText}
    
    Return the analysis in JSON format:
    {
      "skills": [{"name": "string", "level": number}],
      "experience": "string",
      "recommendations": ["string"]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are an expert resume analyzer and career coach. Extract meaningful insights from resumes and provide actionable feedback."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error("Error analyzing resume:", error);
    throw new Error("Failed to analyze resume: " + error.message);
  }
}

export async function generateCareerAdvice(
  userContext: {
    currentRole?: string;
    targetRole?: string;
    skills: Array<{ name: string; level: number }>;
    experience: string;
    industry?: string;
  },
  question: string
): Promise<CareerAdvice> {
  const prompt = `
    User Context:
    - Current Role: ${userContext.currentRole || 'Not specified'}
    - Target Role: ${userContext.targetRole || 'Not specified'}
    - Industry: ${userContext.industry || 'Not specified'}
    - Experience Level: ${userContext.experience}
    - Skills: ${JSON.stringify(userContext.skills)}
    
    User Question: ${question}
    
    Provide personalized career advice including:
    1. A detailed response to their question
    2. Specific recommendations based on their profile
    3. Next actionable steps they should take
    
    Return the advice in JSON format:
    {
      "message": "string",
      "recommendations": ["string"],
      "nextSteps": ["string"]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a senior career coach with 15+ years of experience helping professionals advance their careers. Provide personalized, actionable advice based on current market trends and best practices."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result;
  } catch (error) {
    console.error("Error generating career advice:", error);
    throw new Error("Failed to generate career advice: " + error.message);
  }
}

export async function generatePortfolioProjects(
  targetRole: string,
  skills: string[],
  experienceLevel: string
): Promise<Array<{
  title: string;
  description: string;
  technologies: string[];
  difficulty: string;
  estimatedTime: string;
}>> {
  const prompt = `
    Generate 5 portfolio project ideas for someone targeting a ${targetRole} role with ${experienceLevel} experience level.
    
    Skills to showcase: ${skills.join(', ')}
    
    For each project, provide:
    1. Project title
    2. Detailed description
    3. Key technologies to use
    4. Difficulty level (beginner, intermediate, advanced)
    5. Estimated time to complete
    
    Return the projects in JSON format:
    {
      "projects": [
        {
          "title": "string",
          "description": "string",
          "technologies": ["string"],
          "difficulty": "string",
          "estimatedTime": "string"
        }
      ]
    }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content: "You are a technical mentor and portfolio advisor. Create project ideas that will effectively demonstrate skills and attract employers."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0].message.content || '{}');
    return result.projects || [];
  } catch (error) {
    console.error("Error generating portfolio projects:", error);
    throw new Error("Failed to generate portfolio projects: " + error.message);
  }
}
