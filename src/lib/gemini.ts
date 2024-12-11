import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini with the API key
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || "");

export const initializeGemini = () => {
  if (!process.env.VITE_GEMINI_API_KEY) {
    throw new Error("Gemini API key not found");
  }
  return genAI;
};

export const generateImprovedContent = async (content: string, type: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `Improve this ${type} for a professional resume: ${content}`;
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating content:", error);
    throw error;
  }
};