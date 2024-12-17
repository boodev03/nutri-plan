import { NutritionInfo } from './nutrition';

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
  id: string;
  user_id: string;
  name: string;
  type: MealType;
  date: Date;
  time: string;
  nutrition: NutritionInfo;
}

export interface MealPlan {
  breakfast: Meal;
  lunch: Meal;
  dinner: Meal;
}