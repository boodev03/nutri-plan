export const NUTRITION_GOALS_PROMPT = `You are a professional nutritionist. Based on the following user information, calculate their daily nutritional needs and return a JSON object. Consider their age, weight, height, activity level, and goal.

User Information:
Age: {{age}} years
Weight: {{weight}} kg
Height: {{height}} cm
Activity Level: {{activityLevel}}
Goal: {{goal}}

Calculate the daily nutritional needs based on the following rules:
1. For sedentary: BMR * 1.2
2. For light activity: BMR * 1.375
3. For moderate activity: BMR * 1.55
4. For very active: BMR * 1.725
5. For extra active: BMR * 1.9

Then adjust based on goals:
- For weight loss: Reduce by 20%
- For maintenance: Keep as is
- For weight gain: Increase by 20%

Return a JSON object with these exact keys (no additional text):
{
  "calories": number (total daily calories),
  "protein": number (in grams),
  "carbs": number (in grams),
  "fat": number (in grams),
  "explanation": "brief explanation"
}`;