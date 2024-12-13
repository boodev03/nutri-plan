export interface UserInfo {
  age: number;
  weight: number; // in kg
  height: number; // in cm
  activityLevel: ActivityLevel;
  goal: Goal;
}

export enum ActivityLevel {
  SEDENTARY = 'sedentary',
  LIGHT = 'light',
  MODERATE = 'moderate',
  VERY_ACTIVE = 'very_active',
  EXTRA_ACTIVE = 'extra_active'
}

export enum Goal {
  LOSE_WEIGHT = 'lose_weight',
  MAINTAIN = 'maintain',
  GAIN_WEIGHT = 'gain_weight'
}

export interface NutritionGoals {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}