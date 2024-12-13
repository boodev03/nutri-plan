import React from 'react';
import { NutritionGoals } from '../types/user';

interface NutritionGoalsDisplayProps {
  goals: NutritionGoals & { explanation: string };
}

export function NutritionGoalsDisplay({ goals }: NutritionGoalsDisplayProps) {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800">
        Your Personalized Nutrition Goals
      </h3>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">Daily Calories</p>
            <p className="text-2xl font-bold text-blue-600">{goals.calories}</p>
            <p className="text-xs text-gray-500">kcal</p>
          </div>
          
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-sm text-gray-600">Protein</p>
            <p className="text-2xl font-bold text-green-600">{goals.protein}g</p>
            <p className="text-xs text-gray-500">{((goals.protein * 4) / goals.calories * 100).toFixed(0)}% of calories</p>
          </div>
          
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-sm text-gray-600">Carbs</p>
            <p className="text-2xl font-bold text-yellow-600">{goals.carbs}g</p>
            <p className="text-xs text-gray-500">{((goals.carbs * 4) / goals.calories * 100).toFixed(0)}% of calories</p>
          </div>
          
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-sm text-gray-600">Fat</p>
            <p className="text-2xl font-bold text-red-600">{goals.fat}g</p>
            <p className="text-xs text-gray-500">{((goals.fat * 9) / goals.calories * 100).toFixed(0)}% of calories</p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">AI Recommendation:</h4>
          <p className="text-sm text-gray-600">{goals.explanation}</p>
        </div>
      </div>
    </div>
  );
}