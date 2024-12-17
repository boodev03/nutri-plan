import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../contexts/AuthContext";
import { useMeals } from "../../contexts/MealContext";
import { generateMealSuggestion } from "../../services/gemini";
import { getUserProfile, updateUserProfile } from "../../services/supabase";
import { MealType } from "../../types/meal";
import { UserProfile } from "../../types/user";
import {
  formatDateTimeToLocal,
  formatTimeToLocal,
} from "../../utils/calendarUtils";
import { FormInput } from "../form/FormInput";
import { FormSelect } from "../form/FormSelect";

interface AddMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date;
  selectedTime: string;
  weekStartDate: Date;
  initialProfile: UserProfile | null;
}

interface ProfileFormData extends Omit<UserProfile, "id" | "user_id"> {}

type ModalStep = "choice" | "profile" | "meal";

export function AddMealModal({
  isOpen,
  onClose,
  selectedDate,
  selectedTime,
  initialProfile,
}: AddMealModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState<ModalStep>(
    initialProfile ? "choice" : "profile"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentProfile, setCurrentProfile] = useState<UserProfile | null>(
    initialProfile
  );
  const { user } = useAuth();
  const { addMeal } = useMeals();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileFormData>();

  // Initialize form with initial profile data
  useEffect(() => {
    if (initialProfile) {
      reset(initialProfile);
    }
  }, [initialProfile, reset]);

  const onSubmitProfile = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      setError(null);

      const updatedProfile = await updateUserProfile({
        ...data,
        user_id: user!.id,
      });

      setCurrentProfile(updatedProfile);
      setStep("meal");
    } catch (error) {
      setError("Failed to save profile");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const generateMeal = async () => {
    try {
      setLoading(true);
      setError(null);

      const profile = await getUserProfile(user!.id);
      if (!profile) throw new Error("Profile not found");

      const localDateTime = formatDateTimeToLocal(selectedDate, selectedTime);

      const suggestion = await generateMealSuggestion(
        profile,
        formatTimeToLocal(selectedTime),
        localDateTime
      );

      let mealType: MealType;
      const hour = localDateTime.getHours();
      if (hour >= 5 && hour < 11) {
        mealType = "breakfast";
      } else if (hour >= 11 && hour < 16) {
        mealType = "lunch";
      } else {
        mealType = "dinner";
      }

      const newMeal = {
        name: suggestion.name,
        type: mealType,
        date: selectedDate,
        time: selectedTime,
        nutrition: suggestion.nutrition,
        user_id: user!.id,
      };

      await addMeal(newMeal);
      onClose();
    } catch (error) {
      setError("Failed to generate meal suggestion");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderProfileInfo = () => {
    if (!currentProfile) return null;
    return (
      <div className="space-y-2 text-sm text-gray-600">
        <p>Age: {currentProfile.age}</p>
        <p>Height: {currentProfile.height} cm</p>
        <p>Weight: {currentProfile.weight} kg</p>
        <p>Goal: {currentProfile.goal.replace("_", " ")}</p>
        <p>Activity Level: {currentProfile.activity_level.replace("_", " ")}</p>
      </div>
    );
  };

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    function handleEscapeKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      return () => {
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

        <div
          ref={modalRef}
          className="relative bg-white rounded-lg max-w-lg w-full p-6 shadow-xl"
        >
          {step === "choice" && currentProfile && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Current Profile
              </h3>
              {renderProfileInfo()}
              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Would you like to update your profile or continue with meal
                  generation?
                </p>
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setStep("profile")}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                  >
                    Update Profile
                  </button>
                  <button
                    onClick={() => setStep("meal")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Continue to generate
                  </button>
                </div>
              </div>
            </>
          )}

          {step === "profile" && (
            <>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {currentProfile
                    ? "Update Your Profile"
                    : "Complete Your Profile"}
                </h3>
                <p className="text-gray-600">
                  Help us provide better meal suggestions by sharing your
                  details
                </p>
              </div>

              <form
                onSubmit={handleSubmit(onSubmitProfile)}
                className="space-y-6"
              >
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-1">
                    <FormInput
                      label="Age"
                      type="number"
                      {...register("age", { required: "Age is required" })}
                      error={errors.age?.message}
                      className="bg-gray-50 focus:bg-white transition-colors"
                      placeholder="Enter your age"
                    />
                  </div>
                  <div className="col-span-1">
                    <FormInput
                      label="Weight (kg)"
                      type="number"
                      {...register("weight", {
                        required: "Weight is required",
                      })}
                      error={errors.weight?.message}
                      className="bg-gray-50 focus:bg-white transition-colors"
                      placeholder="Enter your weight"
                    />
                  </div>
                </div>

                <FormInput
                  label="Height (cm)"
                  type="number"
                  {...register("height", { required: "Height is required" })}
                  error={errors.height?.message}
                  className="bg-gray-50 focus:bg-white transition-colors"
                  placeholder="Enter your height"
                />

                <div className="space-y-4">
                  <FormSelect
                    label="What's your goal?"
                    {...register("goal", { required: "Goal is required" })}
                    error={errors.goal?.message}
                    className="bg-gray-50 focus:bg-white transition-colors"
                    options={[
                      { value: "lose_weight", label: "🎯 Lose Weight" },
                      { value: "gain_weight", label: "📈 Gain Weight" },
                      { value: "maintain", label: "⚖️ Maintain Weight" },
                      { value: "build_muscle", label: "💪 Build Muscle" },
                    ]}
                  />

                  <FormSelect
                    label="How active are you?"
                    {...register("activity_level", {
                      required: "Activity level is required",
                    })}
                    error={errors.activity_level?.message}
                    className="bg-gray-50 focus:bg-white transition-colors"
                    options={[
                      {
                        value: "sedentary",
                        label: "🪑 Sedentary (Office job)",
                      },
                      {
                        value: "light",
                        label: "🚶 Lightly Active (Light exercise)",
                      },
                      {
                        value: "moderate",
                        label: "🏃 Moderately Active (Regular exercise)",
                      },
                      {
                        value: "very_active",
                        label: "🏋️ Very Active (Intense exercise)",
                      },
                      {
                        value: "extra_active",
                        label: "⚡ Extra Active (Athlete)",
                      },
                    ]}
                  />
                </div>

                {error && (
                  <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">
                    {error}
                  </div>
                )}

                <div className="flex justify-end space-x-3 pt-4 border-t">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 font-medium flex items-center"
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Saving...
                      </>
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "meal" && (
            <>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Generate Meal Suggestion
              </h3>
              <p className="text-gray-600 mb-4">
                Generate a personalized meal suggestion for{" "}
                {format(selectedDate, "MMMM d, yyyy")} at {selectedTime}
              </p>
              {error && (
                <div className="text-red-600 text-sm mb-4">{error}</div>
              )}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900"
                >
                  Back
                </button>
                <button
                  onClick={generateMeal}
                  disabled={loading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Generate Meal"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
