interface TimeSlotProps {
  time: string;
}

export function TimeSlot({ time }: TimeSlotProps) {
  const [hours, minutes] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, hours, minutes);
  const displayTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  // Only show time label for full hours
  const showLabel = minutes === 0;

  return (
    <div className="h-20 relative border-b border-gray-100">
      {showLabel && (
        <div
          className="absolute w-full text-right pr-4 text-xs text-gray-500"
          style={{ top: "50%", transform: "translateY(-50%)" }}
        >
          {displayTime}
        </div>
      )}
      {minutes === 30 && (
        <div className="absolute right-4 top-1/2 w-1 h-1 bg-gray-300 rounded-full" />
      )}
    </div>
  );
}
