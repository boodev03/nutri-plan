import { addDays, startOfWeek } from 'date-fns';
import { useEffect, useState } from 'react';
import { MealsByDate, formatDateKey, getMockMealsForDate } from '../utils/calendarUtils';

export function useMealCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date()));
  const [meals, setMeals] = useState<MealsByDate>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadMealsForWeek = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API call with mock data
        const mockMeals: MealsByDate = {};
        for (let i = 0; i < 7; i++) {
          const date = addDays(weekStart, i);
          mockMeals[formatDateKey(date)] = getMockMealsForDate(date);
        }

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        setMeals(mockMeals);
      } catch (err) {
        setError('Failed to load meals');
        console.error('Error loading meals:', err);
      } finally {
        setLoading(false);
      }
    };

    loadMealsForWeek();
  }, [weekStart]);

  return {
    selectedDate,
    setSelectedDate,
    weekStart,
    setWeekStart,
    meals,
    loading,
    error
  };
}