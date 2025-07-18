import { AuthClient } from "linkedin-api-client";
import { db } from "../db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

export class LinkedInService {
  private authClient: AuthClient | null = null;
  private isConfigured: boolean = false;

  constructor() {
    if (process.env.LINKEDIN_CLIENT_ID && process.env.LINKEDIN_CLIENT_SECRET) {
      this.authClient = new AuthClient({
        clientId: process.env.LINKEDIN_CLIENT_ID,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
        redirectUrl: `${process.env.APP_URL || 'http://localhost:5000'}/api/linkedin/callback`,
      });
      this.isConfigured = true;
    }
  }

  private checkConfiguration() {
    if (!this.isConfigured || !this.authClient) {
      throw new Error("LinkedIn integration not configured. Please add LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET environment variables.");
    }
  }

  generateAuthUrl(userId: string): string {
    this.checkConfiguration();
    return this.authClient!.generateMemberAuthUrl({
      scopes: ['r_liteprofile', 'r_emailaddress', 'r_basicprofile'],
      state: userId, // Use userId as state to identify user after callback
    });
  }

  async exchangeCodeForToken(code: string, userId: string) {
    try {
      this.checkConfiguration();
      const tokenResponse = await this.authClient!.exchangeAuthCodeForAccessToken(code);
      
      // Store tokens in database
      await db.update(users)
        .set({
          linkedinAccessToken: tokenResponse.access_token,
          linkedinRefreshToken: tokenResponse.refresh_token,
          linkedinTokenExpiry: new Date(Date.now() + tokenResponse.expires_in * 1000),
          linkedinLastSync: new Date(),
        })
        .where(eq(users.id, userId));

      return tokenResponse;
    } catch (error) {
      console.error('LinkedIn token exchange error:', error);
      throw error;
    }
  }

  async syncUserProfile(userId: string) {
    try {
      const [user] = await db.select().from(users).where(eq(users.id, userId));
      
      if (!user?.linkedinAccessToken) {
        throw new Error('No LinkedIn access token found');
      }

      // Check if token is expired
      if (user.linkedinTokenExpiry && new Date() > user.linkedinTokenExpiry) {
        throw new Error('LinkedIn token expired');
      }

      // Fetch profile data using the token
      const profileResponse = await fetch('https://api.linkedin.com/v2/people/~', {
        headers: {
          'Authorization': `Bearer ${user.linkedinAccessToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!profileResponse.ok) {
        throw new Error(`LinkedIn API error: ${profileResponse.status}`);
      }

      const profileData = await profileResponse.json();

      // Extract skills from profile (note: skills require partner API access)
      // For now, we'll use a mock implementation showing the structure
      const extractedSkills = this.extractSkillsFromProfile(profileData);

      // Update user with LinkedIn profile data
      await db.update(users)
        .set({
          linkedinId: profileData.id,
          linkedinProfileUrl: profileData.publicProfileUrl,
          linkedinHeadline: profileData.headline,
          linkedinSummary: profileData.summary,
          linkedinSkills: extractedSkills,
          linkedinLastSync: new Date(),
        })
        .where(eq(users.id, userId));

      return {
        success: true,
        profile: profileData,
        skills: extractedSkills,
      };
    } catch (error) {
      console.error('LinkedIn profile sync error:', error);
      throw error;
    }
  }

  private extractSkillsFromProfile(profileData: any): string[] {
    // Note: LinkedIn's Skills API requires partner access
    // This is a demonstration of how skills would be extracted
    const skills: string[] = [];
    
    // Skills would typically come from profileData.skills
    // For demo purposes, we'll extract from headline and summary
    const text = `${profileData.headline || ''} ${profileData.summary || ''}`.toLowerCase();
    
    // Common tech skills to look for
    const techSkills = [
      'javascript', 'typescript', 'react', 'node.js', 'python', 'java', 'sql',
      'aws', 'docker', 'kubernetes', 'mongodb', 'postgresql', 'redis',
      'machine learning', 'data science', 'artificial intelligence', 'ai',
      'project management', 'agile', 'scrum', 'leadership', 'communication'
    ];

    techSkills.forEach(skill => {
      if (text.includes(skill)) {
        skills.push(skill);
      }
    });

    return skills;
  }

  async getUserLinkedInData(userId: string) {
    const [user] = await db.select({
      linkedinId: users.linkedinId,
      linkedinProfileUrl: users.linkedinProfileUrl,
      linkedinHeadline: users.linkedinHeadline,
      linkedinSummary: users.linkedinSummary,
      linkedinSkills: users.linkedinSkills,
      linkedinLastSync: users.linkedinLastSync,
    }).from(users).where(eq(users.id, userId));

    return user;
  }

  async disconnectLinkedIn(userId: string) {
    await db.update(users)
      .set({
        linkedinId: null,
        linkedinAccessToken: null,
        linkedinRefreshToken: null,
        linkedinTokenExpiry: null,
        linkedinProfileUrl: null,
        linkedinHeadline: null,
        linkedinSummary: null,
        linkedinSkills: null,
        linkedinLastSync: null,
      })
      .where(eq(users.id, userId));
  }
}

export const linkedinService = new LinkedInService();