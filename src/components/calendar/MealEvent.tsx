import { Meal } from "../../types/meal";

interface MealEventProps {
  meal: Meal;
}

export function MealEvent({ meal }: MealEventProps) {
  // Parse the time string (e.g., "7:30 AM") to get hours and minutes
  const [timeStr, period] = meal.time.split(" ");
  const [hours, minutes] = timeStr.split(":").map(Number);

  // Convert to 24-hour format for positioning
  let hour24 = hours;
  if (period.toLowerCase() === "pm" && hours !== 12) {
    hour24 = hours + 12;
  } else if (period.toLowerCase() === "am" && hours === 12) {
    hour24 = 0;
  }

  // Each hour slot is now 160px (2 * 80px for 30-min intervals)
  const slotHeight = 80;
  // Calculate position based on hours and minutes
  const top = (hour24 * 2 + (minutes === 30 ? 1 : 0)) * slotHeight;

  return (
    <div
      className="absolute inset-x-0 p-1 text-xs cursor-pointer"
      style={{ top: `${top}px` }}
    >
      <div className="bg-blue-100 text-blue-800 rounded p-1">
        <div className="font-medium">{meal.name}</div>
        <div>{meal.time}</div>
      </div>
    </div>
  );
}
