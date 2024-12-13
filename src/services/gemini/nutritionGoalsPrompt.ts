export const NUTRITION_GOALS_PROMPT = `You are a professional nutritionist. Based on the following user information, calculate their daily nutritional needs and return a JSON object. Consider their age, weight, height, activity level, and goal.

User Information:
Age: {{age}} years
Weight: {{weight}} kg
Height: {{height}} cm
Activity Level: {{activityLevel}}
Goal: {{goal}}

Return only a JSON object with the following structure (no additional text or markdown):
{
  "calories": number,
  "protein": number,
  "carbs": number,
  "fat": number,
  "explanation": "brief explanation of the recommendation"
}`;