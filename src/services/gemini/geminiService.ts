import { genAI, GEMINI_MODEL } from './geminiConfig';
import { fileToGenerativePart } from '../../utils/fileUtils';
import { AnalysisResult } from '../../types/analysis';
import { NUTRITION_PROMPT } from './prompts';
import { validateAnalysisResult } from '../../utils/validators';

export async function analyzeImageWithGemini(imageFile: File): Promise<AnalysisResult> {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const imagePart = await fileToGenerativePart(imageFile);
    
    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [
          { text: NUTRITION_PROMPT },
          { inline_data: imagePart.inlineData }
        ]
      }]
    });

    if (!result.response) {
      throw new Error('No response from Gemini AI');
    }

    const text = result.response.text();
    
    // Clean the response text by removing markdown code blocks
    const cleanedText = text.replace(/```json\s*|\s*```/g, '').trim();
    
    try {
      const parsedResult = JSON.parse(cleanedText);
      return validateAnalysisResult(parsedResult);
    } catch (parseError) {
      console.error('Error parsing Gemini response:', text);
      throw new Error('Invalid response format from AI');
    }
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    throw new Error('Failed to analyze image with AI');
  }
}