import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { createContext, useContext } from "react";
import { useAddMeal, useMealsByWeek } from "../hooks/useMealQueries";
import { Meal } from "../types/meal";
import { useAuth } from "./AuthContext";

interface MealContextType {
  meals: Record<string, Meal[]>;
  addMeal: (meal: Omit<Meal, "id">) => Promise<void>;
  getMealsByDate: (date: Date) => Meal[];
  loading: boolean;
  error: string | null;
  addMeals: (meals: Omit<Meal, "id">[]) => Promise<void>;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const weekStart = new Date(); // You might want to get this from a prop or state
  const {
    data: meals = {},
    isLoading: loading,
    error,
  } = useMealsByWeek(weekStart, user?.id || "");
  const addMealMutation = useAddMeal();
  const queryClient = useQueryClient();

  const addMeal = async (meal: Omit<Meal, "id">) => {
    try {
      await addMealMutation.mutateAsync(meal);
    } catch (err) {
      console.error("Error saving meal:", err);
      throw new Error("Failed to save meal");
    }
  };

  const getMealsByDate = (date: Date): Meal[] => {
    const dateKey = format(date, "yyyy-MM-dd");
    return meals[dateKey] || [];
  };

  const addMeals = async (meals: Omit<Meal, "id">[]): Promise<void> => {
    try {
      await Promise.all(meals.map((meal) => addMeal(meal)));
      queryClient.invalidateQueries({ queryKey: ["meals"] });
    } catch (error) {
      console.error("Error saving meals:", error);
      throw error;
    }
  };

  return (
    <MealContext.Provider
      value={{
        meals,
        addMeal,
        getMealsByDate,
        loading,
        error: error ? "Failed to load meals" : null,
        addMeals,
      }}
    >
      {children}
    </MealContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error("useMeals must be used within a MealProvider");
  }
  return context;
}
