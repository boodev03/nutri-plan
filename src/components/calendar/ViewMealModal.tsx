import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { Meal } from "../../types/meal";
import { LoadingSpinner } from "../LoadingSpinner";

interface ViewMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal;
  onRegenerate: () => void;
  loading?: boolean;
}

export function ViewMealModal({
  isOpen,
  onClose,
  meal,
  onRegenerate,
  loading = false,
}: ViewMealModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

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
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Meal Details
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-700">Name</h4>
              <p className="text-gray-900">{meal.name}</p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Time</h4>
              <p className="text-gray-900">
                {format(meal.date, "MMMM d, yyyy")} at {meal.time}
              </p>
            </div>

            <div>
              <h4 className="font-medium text-gray-700">Nutrition</h4>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Calories</p>
                  <p className="text-lg font-medium text-blue-700">
                    {meal.nutrition.calories} kcal
                  </p>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Protein</p>
                  <p className="text-lg font-medium text-green-700">
                    {meal.nutrition.protein}g
                  </p>
                </div>
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Carbs</p>
                  <p className="text-lg font-medium text-yellow-700">
                    {meal.nutrition.carbs}g
                  </p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-600">Fat</p>
                  <p className="text-lg font-medium text-red-700">
                    {meal.nutrition.fat}g
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Close
              </button>
              <button
                onClick={onRegenerate}
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {loading ? (
                  <>
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  "Generate New Meal"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
