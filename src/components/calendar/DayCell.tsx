import { format } from "date-fns";
import { Meal } from "../../types/meal";
import { getMealTypeColor } from "../../utils/calendarUtils";

interface DayCellProps {
  date: Date;
  isSelected: boolean;
  meals: Meal[];
  onSelect: () => void;
}

export function DayCell({ date, isSelected, meals, onSelect }: DayCellProps) {
  return (
    <div
      onClick={onSelect}
      className={`
        p-4 rounded-lg cursor-pointer transition-all min-h-[150px]
        ${
          isSelected
            ? "bg-blue-50 border-2 border-blue-500 shadow-md"
            : "hover:bg-gray-50 border border-gray-200 hover:shadow-sm"
        }
      `}
    >
      <div className="text-center mb-3">
        <div className="text-sm text-gray-500">{format(date, "EEE")}</div>
        <div className="text-lg font-semibold">{format(date, "d")}</div>
      </div>

      <div className="space-y-1.5">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className="text-xs p-2 rounded-md truncate transition-all hover:opacity-90"
            style={{
              backgroundColor: getMealTypeColor(meal.type),
              color: "white",
            }}
          >
            <div className="font-medium">{meal.type}</div>
            <div className="text-white/90 truncate">{meal.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
