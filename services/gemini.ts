
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getDSPExplanation = async (topic: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the following RF signal processing concept for a senior engineering project context: ${topic}. Focus on implementation in C/C++ on microcontrollers. Include a brief pseudocode snippet if applicable.`,
      config: {
        temperature: 0.7,
        topP: 0.8,
        systemInstruction: "You are a senior embedded systems engineer with expertise in DSP and RF. Provide concise, technical, and accurate explanations."
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm having trouble connecting to the DSP knowledge base right now. Please try again later.";
  }
};

export const analyzeSignalCode = async (codeSnippet: string) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: `Analyze this C++ DSP snippet for microcontrollers. Look for efficiency, potential real-time issues, and logic correctness: \n\n${codeSnippet}`,
      config: {
        temperature: 0.2,
      },
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to analyze code snippet.";
  }
};
