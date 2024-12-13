import { useNutritionCalculator } from "../hooks/useNutritionCalculator";
import { UserInfo } from "../types/user";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingSpinner } from "./LoadingSpinner";
import { NutritionGoalsDisplay } from "./NutritionGoalsDisplay";
import { UserInfoForm } from "./UserInfoForm";

export function SuggestTab() {
  const { calculateNutritionGoals, nutritionGoals, loading, error } =
    useNutritionCalculator();

  const handleSubmit = async (userInfo: UserInfo) => {
    await calculateNutritionGoals(userInfo);
  };

  return (
    <div className="w-full px-4">
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Personalized Nutrition Recommendations
        </h2>

        <div className="grid grid-cols-1 gap-12">
          {/* Left Column - Form */}
          <div className="lg:border-r lg:pr-8 border-gray-200">
            <div className="w-full">
              <UserInfoForm onSubmit={handleSubmit} />
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="lg:pl-8">
            <div className="h-full flex items-center justify-center">
              {loading ? (
                <LoadingSpinner />
              ) : error ? (
                <ErrorMessage message={error} />
              ) : nutritionGoals ? (
                <NutritionGoalsDisplay goals={nutritionGoals} />
              ) : (
                <div className="text-center text-gray-500">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-lg font-medium">Enter your details</p>
                  <p className="mt-2">
                    Fill out the form to get your personalized nutrition goals
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
