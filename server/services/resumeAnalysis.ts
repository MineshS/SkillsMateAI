import { analyzeResume } from "./openai";

export async function extractTextFromResume(buffer: Buffer, mimetype: string): Promise<string> {
  // For now, we'll assume the resume is in plain text format
  // In production, you'd use libraries like pdf-parse for PDF files
  // or mammoth for Word documents
  
  if (mimetype === 'text/plain') {
    return buffer.toString('utf-8');
  }
  
  // For other file types, return a placeholder
  // In production, implement proper file parsing
  return "Resume content extraction not yet implemented for this file type. Please upload a plain text version of your resume.";
}

export async function processResumeUpload(buffer: Buffer, mimetype: string): Promise<{
  skills: Array<{ name: string; level: number }>;
  experience: string;
  recommendations: string[];
}> {
  const resumeText = await extractTextFromResume(buffer, mimetype);
  return await analyzeResume(resumeText);
}
