import { GoogleGenerativeAI } from '@google/generative-ai';
import { UserStats } from './types';

// Initialize the Google AI with your API key
const genAI = new GoogleGenerativeAI('AIzaSyBO1Tw8cFBp4btdvpxIdxGzNV62b5AMwSA');

// Helper function to get the model
const getModel = () => {
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
};

interface AIAnalysisResult {
  analysis: string;
  recommendations: string[];
  performance: 'excellent' | 'good' | 'average' | 'needs-improvement';
}

export async function analyzeUserPerformance(stats: UserStats, username: string): Promise<AIAnalysisResult> {
  try {
    const model = getModel();
    
    const prompt = `
      Analyze the following user task statistics:
      
      User: ${username}
      Total Tasks: ${stats.totalTasks}
      Completed Tasks: ${stats.completedTasks}
      Pending Tasks: ${stats.pendingTasks}
      Points Earned: ${stats.points}
      
      Based on the data, provide:
      1. A short analysis of the user's productivity
      2. Three specific recommendations for improvement
      3. A performance rating (excellent, good, average, or needs-improvement)
      
      Format your response as JSON with the following structure:
      {
        "analysis": "Your analysis here",
        "recommendations": ["Rec 1", "Rec 2", "Rec 3"],
        "performance": "rating here"
      }
    `;
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    
    // Extract the JSON part of the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]) as AIAnalysisResult;
    }
    
    // Fallback if the AI doesn't return proper JSON
    return {
      analysis: "Unable to generate analysis at this time.",
      recommendations: ["Complete more tasks", "Break down large tasks", "Update your progress regularly"],
      performance: "average"
    };
  } catch (error) {
    console.error("Error analyzing performance:", error);
    return {
      analysis: "Error analyzing performance data.",
      recommendations: ["Try again later", "Check your connection", "Contact support if the issue persists"],
      performance: "average"
    };
  }
} 