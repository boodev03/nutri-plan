import { AnalysisResult, NutritionInfo } from '../types/analysis';
import { NUTRITION_CONSTRAINTS } from './constants';

export function validateAnalysisResult(data: unknown): AnalysisResult {
  if (!isValidAnalysisData(data)) {
    throw new Error('Invalid analysis result format');
  }

  const { foodName, nutrition, confidence } = data;
  
  if (!isValidFoodName(foodName)) {
    throw new Error('Invalid or missing food name');
  }

  const validatedNutrition = validateNutritionInfo(nutrition);
  const validatedConfidence = validateConfidence(confidence);

  if (validatedConfidence < NUTRITION_CONSTRAINTS.MIN_CONFIDENCE) {
    throw new Error('Low confidence in food detection. Please try a clearer image.');
  }

  return {
    foodName,
    nutrition: validatedNutrition,
    confidence: validatedConfidence
  };
}

function isValidAnalysisData(data: unknown): data is {
  foodName: unknown;
  nutrition: unknown;
  confidence: unknown;
} {
  return !!data && typeof data === 'object' && 'foodName' in data && 'nutrition' in data && 'confidence' in data;
}

function isValidFoodName(foodName: unknown): foodName is string {
  return typeof foodName === 'string' && foodName.length > 0;
}

function validateNutritionInfo(nutrition: unknown): NutritionInfo {
  if (!isValidNutritionData(nutrition)) {
    throw new Error('Invalid nutrition data format');
  }

  const { calories, protein, carbs, fat } = nutrition;

  return {
    calories: validateNutritionValue(calories, NUTRITION_CONSTRAINTS.MAX_CALORIES),
    protein: validateNutritionValue(protein, NUTRITION_CONSTRAINTS.MAX_MACRONUTRIENT_GRAMS),
    carbs: validateNutritionValue(carbs, NUTRITION_CONSTRAINTS.MAX_MACRONUTRIENT_GRAMS),
    fat: validateNutritionValue(fat, NUTRITION_CONSTRAINTS.MAX_MACRONUTRIENT_GRAMS)
  };
}

function isValidNutritionData(data: unknown): data is {
  calories: unknown;
  protein: unknown;
  carbs: unknown;
  fat: unknown;
} {
  return !!data && typeof data === 'object' &&
    'calories' in data && 'protein' in data &&
    'carbs' in data && 'fat' in data;
}

function validateNutritionValue(value: unknown, max: number): number {
  const num = Number(value);
  if (isNaN(num) || num < 0 || num > max) {
    throw new Error(`Invalid nutrition value: ${value}`);
  }
  return num;
}

function validateConfidence(confidence: unknown): number {
  const num = Number(confidence);
  return !isNaN(num) && num >= 0 && num <= 1 ? num : 0;
}