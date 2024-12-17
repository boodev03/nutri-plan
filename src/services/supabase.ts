import { supabase } from "../lib/supabase";
import { UserProfile } from "../types/user";
import { Meal } from "../types/meal";

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (error) {
        // PGRST116 means no rows found - this is expected for new users
        if (error.code === 'PGRST116') {
            return null;
        }
        throw error;
    }

    return data;
}

export async function updateUserProfile(profile: Partial<UserProfile>) {
    const { data, error } = await supabase
        .from("user_profiles")
        .upsert(profile)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function saveMeal(meal: Omit<Meal, "id">) {
    // Create a date at midnight in local timezone
    const localDate = new Date(meal.date);
    localDate.setHours(0, 0, 0, 0);

    // Format date in YYYY-MM-DD format using local timezone
    const dateStr = localDate.toLocaleDateString('en-CA'); // en-CA gives YYYY-MM-DD format

    const { data, error } = await supabase
        .from("meals")
        .insert({
            user_id: meal.user_id,
            name: meal.name,
            type: meal.type,
            date: dateStr,
            time: meal.time,
            nutrition: meal.nutrition,
        })
        .select()
        .single();

    if (error) throw error;

    // Convert back to local date
    return {
        ...data,
        date: new Date(data.date + 'T00:00:00')
    };
}

export async function getMealsByDateRange(
    userId: string,
    startDate: Date,
    endDate: Date
): Promise<Meal[]> {
    // Format dates in YYYY-MM-DD using local timezone
    const startStr = startDate.toLocaleDateString('en-CA');
    const endStr = endDate.toLocaleDateString('en-CA');

    const { data, error } = await supabase
        .from("meals")
        .select("*")
        .eq("user_id", userId)
        .gte("date", startStr)
        .lte("date", endStr)
        .order("date", { ascending: true });

    if (error) throw error;

    // Convert dates back to local timezone
    return data.map(meal => ({
        ...meal,
        date: new Date(meal.date + 'T00:00:00')
    }));
} 