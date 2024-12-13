import { NutritionInfo } from "../types/analysis";

interface NutritionTableProps {
  nutrition: NutritionInfo;
}

export function NutritionTable({ nutrition }: NutritionTableProps) {
  const items = [
    { label: "Calories", value: `${nutrition.calories} kcal`, daily: "-" },
    {
      label: "Protein",
      value: `${nutrition.protein}g`,
      daily: `${(((nutrition.protein * 4) / 2000) * 100).toFixed(1)}%`,
    },
    {
      label: "Carbohydrates",
      value: `${nutrition.carbs}g`,
      daily: `${(((nutrition.carbs * 4) / 2000) * 100).toFixed(1)}%`,
    },
    {
      label: "Fat",
      value: `${nutrition.fat}g`,
      daily: `${(((nutrition.fat * 9) / 2000) * 100).toFixed(1)}%`,
    },
  ];

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Detailed Nutrition
      </h3>
      <div className="border rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nutrient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                % Daily Value*
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.label}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.label}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.daily}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
