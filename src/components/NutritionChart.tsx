import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { NutritionInfo } from '../types/analysis';

ChartJS.register(ArcElement, Tooltip, Legend);

interface NutritionChartProps {
  nutrition: NutritionInfo;
}

export function NutritionChart({ nutrition }: NutritionChartProps) {
  const data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        data: [nutrition.protein, nutrition.carbs, nutrition.fat],
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}g`;
          }
        }
      }
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  return (
    <div className="relative">
      <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
        Macronutrient Distribution
      </h3>
      <Pie data={data} options={options} />
    </div>
  );
}