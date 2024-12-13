import { NutritionInfo } from '../types/nutrition';

// Simplified nutrition database (in a real app, this would come from an API)
const nutritionDatabase: Record<string, NutritionInfo> = {
  apple: { calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  banana: { calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  orange: { calories: 62, protein: 1.2, carbs: 15, fat: 0.2 },
  // Add more foods as needed
};

export function calculateNutrition(foodName: string): NutritionInfo | null {
  const normalizedFoodName = foodName.toLowerCase();
  return nutritionDatabase[normalizedFoodName] || null;
}