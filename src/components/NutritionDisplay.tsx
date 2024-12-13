import React from 'react';
import { NutritionInfo } from '../types/analysis';
import { NutritionChart } from './NutritionChart';
import { NutritionTable } from './NutritionTable';

interface NutritionDisplayProps {
  nutrition: NutritionInfo;
  foodName: string;
}

export function NutritionDisplay({ nutrition, foodName }: NutritionDisplayProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Nutrition Facts for {foodName}
      </h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full max-w-md mx-auto">
          <NutritionChart nutrition={nutrition} />
        </div>
        
        <div>
          <NutritionTable nutrition={nutrition} />
        </div>
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>* Percent Daily Values are based on a 2,000 calorie diet.</p>
      </div>
    </div>
  );
}