import { GoogleGenerativeAI } from '@google/generative-ai';

if (!import.meta.env.VITE_GEMINI_API_KEY) {
  throw new Error('Gemini API key is not configured');
}

export const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
export const GEMINI_MODEL = 'gemini-1.5-flash';