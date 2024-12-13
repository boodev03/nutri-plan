import { genAI, GEMINI_MODEL } from './geminiConfig';
import { UserInfo } from '../../types/user';
import { NUTRITION_GOALS_PROMPT } from './prompts/nutritionGoalsPrompt';
import { formatPromptTemplate } from './utils/promptUtils';
import { 
  validateNutritionGoalsResponse,
  NutritionGoalsResponse 
} from './validators/nutritionResponseValidator';

export async function calculateNutritionGoalsWithAI(
  userInfo: UserInfo
): Promise<NutritionGoalsResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    const formattedPrompt = formatPromptTemplate(NUTRITION_GOALS_PROMPT, userInfo);

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: formattedPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    if (!result.response) {
      throw new Error('No response received from AI');
    }

    const text = result.response.text();
    let parsedResponse: unknown;
    
    try {
      parsedResponse = JSON.parse(text.replace(/```json\s*|\s*```/g, '').trim());
    } catch (parseError) {
      console.error('Failed to parse AI response:', text);
      throw new Error('Invalid JSON response from AI');
    }

    return validateNutritionGoalsResponse(parsedResponse);
  } catch (error) {
    console.error('Error calculating nutrition goals:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to calculate nutrition goals'
    );
  }
}