import { addDays, format } from 'date-fns';
import { Meal, MealType } from '../types/meal';

export interface MealsByDate {
  [date: string]: Meal[];
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
}

export function formatDateKey(date: Date): string {
  return format(date, 'yyyy-MM-dd');
}

export function getTimeSlots(): string[] {
  const slots = [];
  for (let hour = 0; hour < 24; hour++) {
    // Add both hour and half-hour slots
    const formattedHour = hour.toString().padStart(2, '0');
    slots.push(`${formattedHour}:00`);
    slots.push(`${formattedHour}:30`);
  }
  return slots;
}

export function getMealTimePosition(type: MealType): { top: number; height: number } {
  const positions: Record<MealType, { top: number; height: number }> = {
    breakfast: { top: 8.33, height: 16.67 },  // 7-9 AM
    lunch: { top: 41.67, height: 16.67 },     // 12-2 PM
    dinner: { top: 75, height: 16.67 },       // 6-8 PM
    snack: { top: 91.67, height: 8.33 }       // Add snack position
  };

  return positions[type];
}

export function getMealTypeColor(type: MealType): string {
  const colors: Record<MealType, string> = {
    breakfast: '#4F46E5', // Indigo
    lunch: '#059669',     // Emerald
    dinner: '#DC2626',    // Red
    snack: '#6B7280'      // Gray
  };

  return colors[type];
}

export function getMockMealsForDate(date: Date): Meal[] {
  return [
    {
      id: `breakfast-${formatDateKey(date)}`,
      type: "breakfast",
      name: 'Oatmeal with Berries',
      date: date,
      time: '8:00 AM',
      user_id: 'mock-user',
      nutrition: {
        calories: 300,
        protein: 10,
        carbs: 45,
        fat: 8
      }
    },
    {
      id: `lunch-${formatDateKey(date)}`,
      type: "lunch",
      name: 'Grilled Chicken Salad',
      date: date,
      time: '12:00 PM',
      user_id: 'mock-user',
      nutrition: {
        calories: 400,
        protein: 35,
        carbs: 10,
        fat: 25
      }
    },
    {
      id: `dinner-${formatDateKey(date)}`,
      type: "dinner",
      name: 'Salmon with Vegetables',
      date: date,
      time: '6:00 PM',
      user_id: 'mock-user',
      nutrition: {
        calories: 500,
        protein: 40,
        carbs: 15,
        fat: 30
      }
    }
  ];
}

export function formatTimeToLocal(time: string): string {
  if (time.includes('AM') || time.includes('PM')) {
    const [hourStr, period] = time.split(' ');
    const [hours, minutes] = hourStr.split(':').map(Number);

    // Convert to 24-hour format
    let hour24 = hours;
    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hour24 = hours + 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hour24 = 0;
    }

    // Return in HH:mm format
    return `${hour24.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  return time;
}

export function formatDateTimeToLocal(date: Date, time: string): Date {
  // Create a new date object to avoid modifying the original
  const localDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  if (time.includes('AM') || time.includes('PM')) {
    const [hourStr, period] = time.split(' ');
    const [hours, minutes] = hourStr.split(':').map(Number);

    // Convert to 24-hour format
    let hour24 = hours;
    if (period.toLowerCase() === 'pm' && hours !== 12) {
      hour24 = hours + 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
      hour24 = 0;
    }

    // Set time components
    localDate.setHours(hour24, minutes || 0, 0, 0);
  } else {
    const [hours, minutes] = time.split(':').map(Number);
    localDate.setHours(hours, minutes || 0, 0, 0);
  }

  return localDate;
}