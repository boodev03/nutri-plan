import { format } from "date-fns";
import { useState } from "react";
import { useMeals } from "../../contexts/MealContext";
import { Meal } from "../../types/meal";
import { UserProfile } from "../../types/user";
import { getTimeSlots } from "../../utils/calendarUtils";
import { AddMealModal } from "./AddMealModal";
import { MealEvent } from "./MealEvent";
import { ViewMealModal } from "./ViewMealModal";

interface TimeColumnProps {
  day: Date;
  weekStartDate: Date;
  profile: UserProfile | null;
}

export function TimeColumn({ day, weekStartDate, profile }: TimeColumnProps) {
  const timeSlots = getTimeSlots();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const { getMealsByDate } = useMeals();

  const meals = getMealsByDate(day);

  const handleTimeSlotClick = (time: string) => {
    const date = new Date(`2000-01-01T${time}`);
    const formattedTime = date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .replace(/\s/, " ");

    const existingMeal = meals.find((meal) => meal.time === formattedTime);
    if (existingMeal) {
      setSelectedMeal(existingMeal);
    } else {
      setSelectedTime(formattedTime);
    }
  };

  const handleCloseModal = () => {
    setSelectedTime(null);
    setSelectedMeal(null);
  };

  const handleRegenerate = () => {
    if (selectedMeal) {
      setSelectedTime(selectedMeal.time);
      setSelectedMeal(null);
    }
  };

  return (
    <div className="relative">
      {/* Column header */}
      <div className="h-12 border-b border-gray-200 sticky top-0 bg-white z-10">
        <div className="flex flex-col items-center justify-center h-full">
          <span className="text-sm font-medium text-gray-900">
            {format(day, "EEE")}
          </span>
          <span className="text-sm text-gray-500">{format(day, "d")}</span>
        </div>
      </div>

      {/* Time slots */}
      <div className="relative h-[3840px]">
        {timeSlots.map((time) => (
          <div
            key={time}
            onClick={() => handleTimeSlotClick(time)}
            className="h-20 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
          />
        ))}

        {/* Meal events */}
        <div className="absolute inset-0 pointer-events-none">
          {meals.map((meal) => (
            <div
              key={meal.id}
              className="pointer-events-auto"
              onClick={() => setSelectedMeal(meal)}
            >
              <MealEvent meal={meal} />
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedTime && (
        <AddMealModal
          isOpen={true}
          onClose={handleCloseModal}
          selectedDate={day}
          selectedTime={selectedTime}
          weekStartDate={weekStartDate}
          initialProfile={profile}
        />
      )}

      {selectedMeal && (
        <ViewMealModal
          isOpen={true}
          onClose={handleCloseModal}
          meal={selectedMeal}
          onRegenerate={handleRegenerate}
        />
      )}
    </div>
  );
}
