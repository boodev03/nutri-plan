import { format } from "date-fns";
import { UserProfile } from "../../types/user";
import { getTimeSlots } from "../../utils/calendarUtils";
import { TimeColumn } from "./TimeColumn";
import { TimeSlot } from "./TimeSlot";

interface TimeGridProps {
  weekDays: Date[];
  weekStartDate: Date;
  profile: UserProfile | null;
}

export function TimeGrid({ weekDays, weekStartDate, profile }: TimeGridProps) {
  const timeSlots = getTimeSlots();

  return (
    <div className="flex flex-1 overflow-hidden">
      {/* Time labels column */}
      <div className="flex-none w-20 bg-white border-r border-gray-200">
        <div className="h-12 border-b border-gray-200" /> {/* Header spacer */}
        <div>
          {timeSlots.map((time) => (
            <TimeSlot key={time} time={time} />
          ))}
        </div>
      </div>

      {/* Day columns */}
      <div className="flex-1 grid grid-cols-7 divide-x divide-gray-200">
        {weekDays.map((day) => (
          <TimeColumn
            key={format(day, "yyyy-MM-dd")}
            day={day}
            weekStartDate={weekStartDate}
            profile={profile}
          />
        ))}
      </div>
    </div>
  );
}
