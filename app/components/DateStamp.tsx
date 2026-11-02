"use client";

import { useEffect, useState } from "react";

type Props = {
  onHover?: (hovering: boolean) => void;
};

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export default function DateStamp({ onHover }: Props) {
  const [parts, setParts] = useState<{ day: string; month: string } | null>(null);

  // Computed in the browser so it shows today's date, not the build date
  useEffect(() => {
    const d = new Date();

    setParts({
      day: String(d.getDate()).padStart(2, "0"),
      month: MONTHS[d.getMonth()],
    });
  }, []);

  if (!parts) return null;

  return (
    <button
      type="button"
      className="date-stamp"
      aria-label={`Today's date: ${parts.day} ${parts.month}`}
      onMouseEnter={() => onHover?.(true)}
      onMouseLeave={() => onHover?.(false)}
      onFocus={() => onHover?.(true)}
      onBlur={() => onHover?.(false)}
    >
      <span className="date-stamp__num">{parts.day}</span>
      <span className="date-stamp__month">{parts.month}</span>
    </button>
  );
}