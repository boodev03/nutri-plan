import { addDays } from "date-fns";
import { useAuth } from "../../contexts/AuthContext";
import { useMealCalendar } from "../../hooks/useMealCalendar";
import { useMealsByWeek } from "../../hooks/useMealQueries";
import { useProfile } from "../../hooks/useProfile";
import { getWeekDays } from "../../utils/calendarUtils";
import { ErrorMessage } from "../ErrorMessage";
import { LoadingSpinner } from "../LoadingSpinner";
import { CalendarHeader } from "./CalendarHeader";
import { TimeGrid } from "./TimeGrid";

export function Calendar() {
  const { weekStart, setWeekStart } = useMealCalendar();
  const { user } = useAuth();
  const { isLoading: loading, error } = useMealsByWeek(
    weekStart,
    user?.id || ""
  );
  const { data: profile, isLoading: profileLoading } = useProfile();
  const weekDays = getWeekDays(weekStart);

  if (loading || profileLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load meals" />;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[800px] flex flex-col w-full">
      <div className="p-4 border-b border-gray-200">
        <CalendarHeader
          weekStart={weekStart}
          onPreviousWeek={() => setWeekStart((date) => addDays(date, -7))}
          onNextWeek={() => setWeekStart((date) => addDays(date, 7))}
        />
      </div>

      <div className="flex-1 overflow-y-auto">
        <TimeGrid
          weekDays={weekDays}
          weekStartDate={weekStart}
          profile={profile || null}
        />
      </div>
    </div>
  );
}
