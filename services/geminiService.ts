import { GoogleGenAI } from "@google/genai";
import type { Task } from '../types';

// This function is implemented but not currently used in the application.
// It's designed to generate a more detailed, motivational description for a task.
export async function getDetailedTaskDescription(task: Task): Promise<string> {
  // IMPORTANT: The API key is sourced from an environment variable.
  // Do not add any UI or code to set this key.
  // It is assumed to be pre-configured in the deployment environment.
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    return `Error: API Key is not configured. Please contact support.`;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `
      You are an inspiring and stoic life coach. 
      Your tone is direct, motivational, and slightly philosophical.
      The user is undertaking a daily challenge to build discipline.
      For the task "${task.title}", provide a short, powerful, and motivating paragraph in JAPANESE.
      Explain WHY this task is important for their journey of self-improvement.
      Keep it under 150 characters. Do not use markdown.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-04-17",
      contents: prompt,
    });
    
    return response.text;

  } catch (error) {
    console.error("Error fetching detailed description from Gemini API:", error);
    // Return the original description as a fallback
    return task.description;
  }
}
