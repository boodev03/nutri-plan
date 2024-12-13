import { genAI, GEMINI_MODEL } from './geminiConfig';
import { AnalysisResult } from '../../types/analysis';
import { NUTRITION_PROMPT } from './prompts';
import { fileToGenerativePart } from '../../utils/fileUtils';
import { validateAnalysisResult } from '../../utils/validators';
import { parseGeminiResponse } from './responseParser';

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const imagePart = await fileToGenerativePart(file);
    
    const result = await model.generateContent([
      NUTRITION_PROMPT,
      imagePart
    ]);
    
    const response = await result.response;
    const text = response.text();
    const parsedResult = parseGeminiResponse(text);
    
    return validateAnalysisResult(parsedResult);
  } catch (error) {
    console.error('Error in Gemini image analysis:', error);
    throw new Error('Failed to analyze image');
  }
}