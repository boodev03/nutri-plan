import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { IoFastFood, IoNutrition, IoRestaurant } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useMeals } from "../contexts/MealContext";
import type { DayMealPlan } from "../services/gemini";
import {
  generateDayMealPlan,
  generateMealSuggestion,
} from "../services/gemini";
import { getUserProfile } from "../services/supabase";
import { FormInput } from "./form/FormInput";
import { FormSelect } from "./form/FormSelect";
import { LoadingSpinner } from "./LoadingSpinner";

interface SuggestFormData {
  age: number;
  weight: number;
  height: number;
  goal: string;
  mealType: string;
  dietaryPreference: string;
}

interface MealSuggestion {
  name: string;
  description: string;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  recommendedTime: string;
}

export function SuggestTab() {
  const [loadingSuggestion, setLoadingSuggestion] = React.useState(false);
  const [errorSuggestion, setErrorSuggestion] = React.useState<string | null>(
    null
  );
  const [suggestion, setSuggestion] = React.useState<MealSuggestion | null>(
    null
  );
  const [dayMealPlan, setDayMealPlan] = React.useState<DayMealPlan | null>(
    null
  );
  const { user } = useAuth();
  const { addMeals } = useMeals();
  const [addingToCalendar, setAddingToCalendar] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SuggestFormData>();

  const onSubmit = async (data: SuggestFormData) => {
    try {
      setLoadingSuggestion(true);
      setErrorSuggestion(null);
      setSuggestion(null);

      const profile = await getUserProfile(user!.id);
      if (!profile) {
        setErrorSuggestion("Please complete your profile first");
        return;
      }

      if (data.mealType === "fullDay") {
        const result = await generateDayMealPlan(profile, {
          goal: data.goal,
          dietaryPreference: data.dietaryPreference,
        });
        setDayMealPlan(result);
      } else {
        const result = await generateMealSuggestion(
          profile,
          data.mealType,
          new Date()
        );
        setSuggestion(result);
      }
    } catch (error) {
      setErrorSuggestion("Failed to generate suggestion");
      console.error(error);
    } finally {
      setLoadingSuggestion(false);
    }
  };

  const handleAddToCalendar = async () => {
    if (!dayMealPlan) return;

    try {
      setAddingToCalendar(true);
      const today = new Date();

      const extractTime = (recommendedTime: string) => {
        const timeMatch = recommendedTime.match(/(\d{1,2}:\d{2}\s*[AaPp][Mm])/);
        return timeMatch ? timeMatch[1] : null;
      };

      const meals = [
        {
          name: dayMealPlan.breakfast.name,
          type: "breakfast" as const,
          date: today,
          time: extractTime(dayMealPlan.breakfast.recommendedTime) || "8:00 AM",
          nutrition: dayMealPlan.breakfast.nutrition,
          user_id: user!.id,
        },
        {
          name: dayMealPlan.lunch.name,
          type: "lunch" as const,
          date: today,
          time: extractTime(dayMealPlan.lunch.recommendedTime) || "12:00 PM",
          nutrition: dayMealPlan.lunch.nutrition,
          user_id: user!.id,
        },
        {
          name: dayMealPlan.dinner.name,
          type: "dinner" as const,
          date: today,
          time: extractTime(dayMealPlan.dinner.recommendedTime) || "6:00 PM",
          nutrition: dayMealPlan.dinner.nutrition,
          user_id: user!.id,
        },
      ];

      await addMeals(meals);
      toast.success("Meal plan added to calendar!");
    } catch (error) {
      console.error("Error adding to calendar:", error);
      toast.error("Failed to add meal plan to calendar");
    } finally {
      setAddingToCalendar(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Hero Section with 3D Illustration */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-50" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Your Personal
                <span className="text-blue-600"> Meal Planner</span>
              </h1>
              <p className="mt-6 text-xl text-gray-500 max-w-3xl">
                Get personalized meal suggestions based on your preferences and
                nutritional needs, powered by AI.
              </p>
            </div>
            <div className="relative h-64 lg:h-96">
              <IoRestaurant className="w-full h-full text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with Floating Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
            <div className="p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="bg-blue-100 rounded-full p-3">
                  <IoNutrition className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Your Preferences
                </h2>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Physical Info - 2 items per row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput
                    label="Age"
                    type="number"
                    {...register("age", {
                      required: "Age is required",
                      min: { value: 1, message: "Age must be positive" },
                      max: { value: 120, message: "Invalid age" },
                    })}
                    error={errors.age?.message}
                    className="bg-gray-50 focus:bg-white transition-colors"
                    placeholder="Years"
                  />

                  <FormInput
                    label="Weight"
                    type="number"
                    {...register("weight", {
                      required: "Weight is required",
                      min: {
                        value: 20,
                        message: "Weight must be at least 20kg",
                      },
                      max: {
                        value: 300,
                        message: "Weight must be under 300kg",
                      },
                    })}
                    error={errors.weight?.message}
                    className="bg-gray-50 focus:bg-white transition-colors"
                    placeholder="kg"
                    suffix="kg"
                  />

                  <FormInput
                    label="Height"
                    type="number"
                    {...register("height", {
                      required: "Height is required",
                      min: {
                        value: 100,
                        message: "Height must be at least 100cm",
                      },
                      max: {
                        value: 250,
                        message: "Height must be under 250cm",
                      },
                    })}
                    error={errors.height?.message}
                    className="bg-gray-50 focus:bg-white transition-colors"
                    placeholder="cm"
                    suffix="cm"
                  />
                </div>

                {/* Preferences Section - 1 item per row */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    Your Preferences
                  </h3>
                  <div className="space-y-6">
                    <FormSelect
                      label="What's your goal for this meal?"
                      {...register("goal", { required: "Goal is required" })}
                      error={errors.goal?.message}
                      className="bg-gray-50 focus:bg-white transition-colors"
                      options={[
                        { value: "healthy", label: "🥗 Healthy Eating" },
                        { value: "weight_loss", label: "⚖️ Weight Loss" },
                        { value: "muscle_gain", label: "💪 Muscle Gain" },
                        { value: "energy_boost", label: "⚡ Energy Boost" },
                        { value: "quick_meal", label: "⏱️ Quick Meal" },
                      ]}
                    />

                    <FormSelect
                      label="What type of meal are you looking for?"
                      {...register("mealType", {
                        required: "Meal type is required",
                      })}
                      error={errors.mealType?.message}
                      className="bg-gray-50 focus:bg-white transition-colors"
                      options={[
                        { value: "breakfast", label: "🍳 Breakfast" },
                        { value: "lunch", label: "🥪 Lunch" },
                        { value: "dinner", label: "🍽️ Dinner" },
                        { value: "snack", label: "🍎 Snack" },
                        { value: "fullDay", label: "📅 Full Day Plan" },
                      ]}
                    />

                    <FormSelect
                      label="Any dietary preferences?"
                      {...register("dietaryPreference", {
                        required: "Dietary preference is required",
                      })}
                      error={errors.dietaryPreference?.message}
                      className="bg-gray-50 focus:bg-white transition-colors"
                      options={[
                        { value: "none", label: "🍴 No Preference" },
                        { value: "vegetarian", label: "🥬 Vegetarian" },
                        { value: "vegan", label: "🌱 Vegan" },
                        { value: "keto", label: "🥑 Keto" },
                        { value: "paleo", label: "🍖 Paleo" },
                        { value: "mediterranean", label: "🫒 Mediterranean" },
                      ]}
                    />
                  </div>
                </div>

                {/* Error and Submit Button */}
                <div className="pt-6">
                  {errorSuggestion && (
                    <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm mb-4">
                      {errorSuggestion}
                    </div>
                  )}

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={loadingSuggestion}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center"
                    >
                      {loadingSuggestion ? (
                        <>
                          <LoadingSpinner className="w-4 h-4 mr-2" />
                          Generating...
                        </>
                      ) : (
                        "Generate Suggestion"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8">
              {suggestion || dayMealPlan ? (
                <div className="p-8 bg-white rounded-2xl w-full shadow-xl">
                  {suggestion ? (
                    <>
                      <h3 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center">
                        <span className="text-3xl mr-3">🍽️</span>
                        Your Meal Suggestion
                      </h3>
                      <div className="space-y-6">
                        <div className="bg-white bg-opacity-70 rounded-xl p-6 shadow-sm">
                          <h4 className="font-semibold text-emerald-700 text-lg mb-2">
                            Meal
                          </h4>
                          <p className="text-emerald-900 text-lg">
                            {suggestion.name}
                          </p>
                          <p className="text-emerald-600 mt-2">
                            {suggestion.description}
                          </p>
                          <div className="mt-4 bg-emerald-50 p-4 rounded-lg">
                            <div className="flex items-center">
                              <span className="text-xl mr-2">⏰</span>
                              <div>
                                <p className="font-medium text-emerald-800">
                                  Recommended Time
                                </p>
                                <p className="text-emerald-600">
                                  {suggestion.recommendedTime}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white bg-opacity-70 rounded-xl p-6 shadow-sm">
                          <h4 className="font-semibold text-emerald-700 text-lg mb-4">
                            Nutrition Facts
                          </h4>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-emerald-50 p-4 rounded-lg text-center">
                              <p className="text-sm font-medium text-emerald-600 mb-1">
                                Calories
                              </p>
                              <p className="text-2xl font-bold text-emerald-700">
                                {suggestion.nutrition.calories}
                                <span className="text-base font-normal text-emerald-600 ml-1">
                                  kcal
                                </span>
                              </p>
                            </div>
                            {/* Similar styling for protein, carbs, fat */}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : dayMealPlan ? (
                    <>
                      <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center justify-center">
                        <span className="text-3xl mr-3">📋</span>
                        Your Daily Meal Plan
                      </h3>
                      <div className="space-y-6">
                        {/* Breakfast Section */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-amber-500 hover:shadow-xl transition-shadow">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl mr-3">🍳</span>
                            <h4 className="font-bold text-gray-900 text-xl">
                              Breakfast
                            </h4>
                          </div>
                          <div className="pl-9">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {dayMealPlan.breakfast.name}
                                </p>
                                <p className="text-gray-600 mt-2 text-base">
                                  {dayMealPlan.breakfast.description}
                                </p>
                              </div>
                              <div className="flex items-center bg-amber-50 px-4 py-2 rounded-lg">
                                <span className="text-xl mr-2">⏰</span>
                                <div>
                                  <p className="text-amber-800 text-sm font-medium">
                                    {dayMealPlan.breakfast.recommendedTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div className="bg-amber-50 p-4 rounded-lg">
                                <p className="text-amber-800 font-medium mb-1 text-sm">
                                  Calories
                                </p>
                                <p className="text-2xl font-bold text-amber-900">
                                  {dayMealPlan.breakfast.nutrition.calories}
                                  <span className="text-base font-normal ml-1">
                                    kcal
                                  </span>
                                </p>
                              </div>
                              {/* Add other nutrition facts with similar styling */}
                            </div>
                          </div>
                        </div>

                        {/* Lunch Section */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-emerald-500 hover:shadow-xl transition-shadow">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl mr-3">🥪</span>
                            <h4 className="font-bold text-gray-900 text-xl">
                              Lunch
                            </h4>
                          </div>
                          <div className="pl-9">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {dayMealPlan.lunch.name}
                                </p>
                                <p className="text-gray-600 mt-2 text-base">
                                  {dayMealPlan.lunch.description}
                                </p>
                              </div>
                              <div className="flex items-center bg-emerald-50 px-4 py-2 rounded-lg">
                                <span className="text-xl mr-2">⏰</span>
                                <div>
                                  <p className="text-emerald-800 text-sm font-medium">
                                    {dayMealPlan.lunch.recommendedTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div className="bg-emerald-50 p-4 rounded-lg">
                                <p className="text-emerald-800 font-medium mb-1 text-sm">
                                  Calories
                                </p>
                                <p className="text-2xl font-bold text-emerald-900">
                                  {dayMealPlan.lunch.nutrition.calories}
                                  <span className="text-base font-normal ml-1">
                                    kcal
                                  </span>
                                </p>
                              </div>
                              {/* Add other nutrition facts with similar styling */}
                            </div>
                          </div>
                        </div>

                        {/* Dinner Section */}
                        <div className="bg-white rounded-xl p-6 shadow-lg border-l-4 border-indigo-500 hover:shadow-xl transition-shadow">
                          <div className="flex items-center mb-4">
                            <span className="text-2xl mr-3">🍽️</span>
                            <h4 className="font-bold text-gray-900 text-xl">
                              Dinner
                            </h4>
                          </div>
                          <div className="pl-9">
                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <p className="text-lg font-semibold text-gray-800">
                                  {dayMealPlan.dinner.name}
                                </p>
                                <p className="text-gray-600 mt-2 text-base">
                                  {dayMealPlan.dinner.description}
                                </p>
                              </div>
                              <div className="flex items-center bg-indigo-50 px-4 py-2 rounded-lg">
                                <span className="text-xl mr-2">⏰</span>
                                <div>
                                  <p className="text-indigo-800 text-sm font-medium">
                                    {dayMealPlan.dinner.recommendedTime}
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                              <div className="bg-indigo-50 p-4 rounded-lg">
                                <p className="text-indigo-800 font-medium mb-1 text-sm">
                                  Calories
                                </p>
                                <p className="text-2xl font-bold text-indigo-900">
                                  {dayMealPlan.dinner.nutrition.calories}
                                  <span className="text-base font-normal ml-1">
                                    kcal
                                  </span>
                                </p>
                              </div>
                              {/* Add other nutrition facts with similar styling */}
                            </div>
                          </div>
                        </div>

                        {/* Daily Totals */}
                        <div className="mt-8 pt-8 border-t-2 border-gray-100">
                          <div className="flex justify-between items-center mb-6">
                            <h4 className="font-bold text-gray-900 text-xl">
                              Daily Nutrition Summary
                            </h4>
                            <button
                              onClick={handleAddToCalendar}
                              disabled={addingToCalendar}
                              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center"
                            >
                              {addingToCalendar ? (
                                <>
                                  <LoadingSpinner className="w-4 h-4 mr-2" />
                                  Adding to Calendar...
                                </>
                              ) : (
                                <>
                                  <span className="mr-2">📅</span>
                                  Add to Calendar
                                </>
                              )}
                            </button>
                          </div>
                          <div className="grid grid-cols-1 gap-6">
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl text-center shadow-md">
                              <p className="text-gray-600 font-medium mb-2">
                                Total Calories
                              </p>
                              <p className="text-3xl font-bold text-gray-900">
                                {dayMealPlan.totalNutrition.calories}
                                <span className="text-base font-normal text-gray-600 ml-1">
                                  kcal
                                </span>
                              </p>
                            </div>
                            {/* Add other total nutrition facts with similar styling */}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : null}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                  <IoFastFood className="w-48 h-48 mb-8 text-blue-600" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Ready to Plan Your Meals?
                  </h3>
                  <p className="text-gray-500 max-w-md">
                    Fill out your preferences to get personalized meal
                    suggestions tailored just for you.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Animated Cards */}
      <div className="bg-gradient-to-br from-gray-50 to-blue-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              Smart Meal Planning Features
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to plan your perfect meals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white rounded-xl p-6 shadow-lg transform transition-all duration-200 hover:scale-105">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="bg-blue-100 rounded-lg p-3">
                    {/* Feature icon */}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    AI-Powered Suggestions
                  </h3>
                  <p className="mt-2 text-gray-600">
                    Get personalized meal recommendations based on your
                    preferences
                  </p>
                </div>
              </div>
            </div>
            {/* Add more feature cards */}
          </div>
        </div>
      </div>
    </div>
  );
}
