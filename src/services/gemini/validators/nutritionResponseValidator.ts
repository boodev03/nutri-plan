import { NutritionGoals } from '../../../types/user';

export interface NutritionGoalsResponse extends NutritionGoals {
  explanation: string;
}

export function validateNutritionGoalsResponse(response: unknown): NutritionGoalsResponse {
  if (!isValidResponseObject(response)) {
    throw new Error('Invalid response format from AI');
  }

  validateNutritionValues(response);
  
  return response;
}

function isValidResponseObject(response: unknown): response is NutritionGoalsResponse {
  if (!response || typeof response !== 'object') {
    return false;
  }

  const requiredKeys = ['calories', 'protein', 'carbs', 'fat', 'explanation'];
  return requiredKeys.every(key => key in response);
}

function validateNutritionValues(response: NutritionGoalsResponse): void {
  const { calories, protein, carbs, fat } = response;
  
  if (!isValidNumber(calories, 500, 10000)) {
    throw new Error('Invalid calories value');
  }
  
  if (!isValidNumber(protein, 10, 500)) {
    throw new Error('Invalid protein value');
  }
  
  if (!isValidNumber(carbs, 20, 1000)) {
    throw new Error('Invalid carbs value');
  }
  
  if (!isValidNumber(fat, 10, 300)) {
    throw new Error('Invalid fat value');
  }
}

function isValidNumber(value: unknown, min: number, max: number): boolean {
  return typeof value === 'number' && !isNaN(value) && value >= min && value <= max;
}