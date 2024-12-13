import { useState } from 'react';
import { UserInfo } from '../types/user';
import { calculateNutritionGoalsWithAI } from '../services/gemini/nutritionGoalsService';
import { NutritionGoalsResponse } from '../services/gemini/validators/nutritionResponseValidator';

export function useNutritionCalculator() {
  const [nutritionGoals, setNutritionGoals] = useState<NutritionGoalsResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateNutritionGoals = async (userInfo: UserInfo) => {
    try {
      setLoading(true);
      setError(null);
      const goals = await calculateNutritionGoalsWithAI(userInfo);
      setNutritionGoals(goals);
    } catch (err) {
      const errorMessage = err instanceof Error 
        ? err.message 
        : 'Failed to calculate nutrition goals. Please try again.';
      setError(errorMessage);
      console.error('Nutrition calculation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return {
    nutritionGoals,
    loading,
    error,
    calculateNutritionGoals
  };
}