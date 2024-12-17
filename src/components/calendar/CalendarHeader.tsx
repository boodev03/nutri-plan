import { format } from "date-fns";

interface CalendarHeaderProps {
  weekStart: Date;
  onPreviousWeek: () => void;
  onNextWeek: () => void;
}

export function CalendarHeader({
  weekStart,
  onPreviousWeek,
  onNextWeek,
}: CalendarHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-800">
        {format(weekStart, "MMMM yyyy")}
      </h2>

      <div className="flex space-x-2">
        <button
          onClick={onPreviousWeek}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={onNextWeek}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
