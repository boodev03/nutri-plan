import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { getMealsByDateRange, saveMeal } from "../services/supabase";
import { Meal } from "../types/meal";

export function useMealsByWeek(weekStartDate: Date, userId: string) {
    return useQuery({
        queryKey: ["meals", format(weekStartDate, "yyyy-MM-dd"), userId],
        queryFn: async () => {
            const start = startOfWeek(weekStartDate);
            const end = endOfWeek(weekStartDate);
            return getMealsByDateRange(userId, start, end);
        },
        select: (meals) => {
            // Group meals by date
            return meals.reduce((acc, meal) => {
                const dateKey = format(meal.date, "yyyy-MM-dd");
                if (!acc[dateKey]) {
                    acc[dateKey] = [];
                }
                acc[dateKey].push(meal);
                return acc;
            }, {} as Record<string, Meal[]>);
        },
    });
}

export function useAddMeal() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveMeal,
        onMutate: async (newMeal) => {
            // Cancel any outgoing refetches
            await queryClient.cancelQueries({
                queryKey: ["meals"],
            });

            // Snapshot the previous value
            const previousMeals = queryClient.getQueryData<Record<string, Meal[]>>([
                "meals",
                format(newMeal.date, "yyyy-MM-dd"),
            ]);

            // Optimistically update to the new value
            queryClient.setQueryData<Record<string, Meal[]>>(
                ["meals", format(newMeal.date, "yyyy-MM-dd")],
                (old = {}) => {
                    const dateKey = format(newMeal.date, "yyyy-MM-dd");
                    return {
                        ...old,
                        [dateKey]: [...(old[dateKey] || []), { ...newMeal, id: "temp-" + Date.now() }],
                    };
                }
            );

            // Return a context object with the snapshotted value
            return { previousMeals };
        },
        onError: (_, newMeal, context) => {
            // If the mutation fails, use the context returned from onMutate to roll back
            if (context?.previousMeals) {
                queryClient.setQueryData(
                    ["meals", format(newMeal.date, "yyyy-MM-dd")],
                    context.previousMeals
                );
            }
        },
        onSettled: (_data, _error, variables) => {
            // Always refetch after error or success
            queryClient.invalidateQueries({
                queryKey: ["meals", format(variables.date, "yyyy-MM-dd")],
            });
        },
    });
} 