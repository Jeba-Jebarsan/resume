import { GoogleGenerativeAI } from "@google/generative-ai";

let genAI: GoogleGenerativeAI;

export const initializeGemini = (apiKey: string) => {
  genAI = new GoogleGenerativeAI(apiKey);
};

export const generateImprovedContent = async (
  content: string,
  type: "summary" | "experience" | "skills"
): Promise<string> => {
  if (!genAI) {
    throw new Error("Gemini API not initialized");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `Improve the following ${type} for a professional resume. Make it more impactful and professional while maintaining truthfulness: "${content}"`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};