import { UserProfile } from "../types/user";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent";

export interface MealSuggestion {
    name: string;
    description: string;
    nutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
    recommendedTime: string;
}

export interface DayMealPlan {
    breakfast: {
        name: string;
        description: string;
        nutrition: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        };
        recommendedTime: string;
    };
    lunch: {
        name: string;
        description: string;
        nutrition: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        };
        recommendedTime: string;
    };
    dinner: {
        name: string;
        description: string;
        nutrition: {
            calories: number;
            protein: number;
            carbs: number;
            fat: number;
        };
        recommendedTime: string;
    };
    totalNutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
    };
}

export async function generateMealSuggestion(
    profile: UserProfile,
    mealTime: string,
    date: Date
): Promise<MealSuggestion> {
    const prompt = `You are a nutrition expert AI. Generate a healthy meal suggestion based on this profile:
Age: ${profile.age}
Height: ${profile.height}cm
Weight: ${profile.weight}kg
Goal: ${profile.goal.replace('_', ' ')}
Activity Level: ${profile.activity_level.replace('_', ' ')}
${profile.dietary_restrictions ? `Dietary Restrictions: ${profile.dietary_restrictions.join(', ')}` : ''}

Generate a ${mealTime} meal for ${date.toLocaleDateString()}.
Also provide a recommended time to eat this meal based on the meal type and activity level.

Respond ONLY with a JSON object in this exact format (no additional text):
{
  "name": "Name of the meal",
  "description": "Brief description of the meal",
  "nutrition": {
    "calories": number between 200-800,
    "protein": number between 10-50,
    "carbs": number between 20-100,
    "fat": number between 5-35
  },
  "recommendedTime": "Recommended time to eat (e.g., '7:30 AM', '12:30 PM', etc.) with brief explanation"
}`;

    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                },
            }),
        });

        const data = await response.json();

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Invalid response format from Gemini");
        }

        const mealText = data.candidates[0].content.parts[0].text.trim();
        const jsonMatch = mealText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No JSON found in response");
        }

        const mealJson = JSON.parse(jsonMatch[0]);

        // Validate the response structure
        if (!mealJson.name || !mealJson.description || !mealJson.nutrition || !mealJson.recommendedTime) {
            throw new Error("Invalid meal suggestion format");
        }

        // Ensure nutrition values are numbers
        const nutrition = mealJson.nutrition;
        mealJson.nutrition = {
            calories: Number(nutrition.calories),
            protein: Number(nutrition.protein),
            carbs: Number(nutrition.carbs),
            fat: Number(nutrition.fat),
        };

        return mealJson;
    } catch (error) {
        console.error("Gemini API error:", error);
        throw new Error("Failed to generate meal suggestion");
    }
}

export async function generateDayMealPlan(
    profile: UserProfile,
    preferences: { goal: string; dietaryPreference: string }
): Promise<DayMealPlan> {
    const prompt = `You are a nutrition expert AI. Generate a full day meal plan based on this profile:
Age: ${profile.age}
Height: ${profile.height}cm
Weight: ${profile.weight}kg
Goal: ${preferences.goal.replace('_', ' ')}
Dietary Preference: ${preferences.dietaryPreference}
${profile.dietary_restrictions ? `Dietary Restrictions: ${profile.dietary_restrictions.join(', ')}` : ''}

Generate three meals (breakfast, lunch, and dinner) that complement each other nutritionally, including recommended times based on the activity level.

Respond ONLY with a JSON object in this exact format (no additional text):
{
  "breakfast": {
    "name": "Name of breakfast",
    "description": "Brief description",
    "nutrition": {
      "calories": number between 300-600,
      "protein": number between 15-40,
      "carbs": number between 30-70,
      "fat": number between 10-25
    },
    "recommendedTime": "Recommended time with brief explanation (e.g., '7:30 AM - Best time for early risers')"
  },
  "lunch": {
    "name": "Name of lunch",
    "description": "Brief description",
    "nutrition": {
      "calories": number between 400-700,
      "protein": number between 25-45,
      "carbs": number between 40-80,
      "fat": number between 15-30
    },
    "recommendedTime": "Recommended time with brief explanation (e.g., '12:30 PM - Best time for lunch eaters')"
  },
  "dinner": {
    "name": "Name of dinner",
    "description": "Brief description",
    "nutrition": {
      "calories": number between 400-800,
      "protein": number between 25-50,
      "carbs": number between 40-80,
      "fat": number between 15-35
    },
    "recommendedTime": "Recommended time with brief explanation (e.g., '7:30 PM - Best time for dinner eaters')"
  },
  "totalNutrition": {
    "calories": sum of all meals calories,
    "protein": sum of all meals protein,
    "carbs": sum of all meals carbs,
    "fat": sum of all meals fat
  }
}`;

    try {
        const response = await fetch(`${API_URL}?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 40,
                    topP: 0.95,
                },
            }),
        });

        const data = await response.json();

        if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
            throw new Error("Invalid response format from Gemini");
        }

        const mealText = data.candidates[0].content.parts[0].text.trim();
        const jsonMatch = mealText.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No JSON found in response");
        }

        const mealPlan = JSON.parse(jsonMatch[0]);

        // Validate the response structure
        if (!mealPlan.breakfast || !mealPlan.lunch || !mealPlan.dinner || !mealPlan.totalNutrition) {
            throw new Error("Invalid meal plan format");
        }

        return mealPlan;
    } catch (error) {
        console.error("Gemini API error:", error);
        throw new Error("Failed to generate meal plan");
    }
} 