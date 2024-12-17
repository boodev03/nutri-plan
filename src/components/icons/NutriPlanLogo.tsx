interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function NutriPlanLogo({
  className = "w-8 h-8",
  showText = true,
}: LogoProps) {
  return (
    <svg
      viewBox="0 0 240 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Icon Part */}
      <g transform="translate(0, 5) scale(0.5)">
        {/* Main Circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          className="text-blue-600"
          stroke="currentColor"
          strokeWidth="4"
          fill="currentColor"
          fillOpacity="0.1"
        />

        {/* Plate Design */}
        <path
          d="M25 50C25 36.2 36.2 25 50 25C63.8 25 75 36.2 75 50"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          className="text-blue-600"
        />

        {/* Fork and Knife */}
        <path
          d="M45 35V65M55 35V65"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-blue-600"
        />

        {/* Leaf Accent */}
        <path
          d="M35 45C35 35 42 28 52 28C52 38 45 45 35 45Z"
          fill="currentColor"
          className="text-green-500"
        />
      </g>

      {/* Text Part */}
      {showText && (
        <g transform="translate(70, 38)">
          <text
            className="text-blue-600"
            fill="currentColor"
            fontSize="32"
            fontWeight="bold"
            fontFamily="system-ui"
          >
            <tspan className="text-blue-600">Nutri</tspan>
            <tspan className="text-green-500">Plan</tspan>
          </text>
        </g>
      )}

      {/* Optional Decorative Elements */}
      {showText && (
        <g transform="translate(70, 42)">
          <path
            d="M0 0L160 0"
            stroke="currentColor"
            strokeWidth="1"
            className="text-gray-300"
            strokeDasharray="2 2"
          />
        </g>
      )}
    </svg>
  );
}
