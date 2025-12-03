import { useEffect, useState } from "react";

interface TrailPoint {
  id: number;
  x: number;
  y: number;
}

export const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newPoint: TrailPoint = {
        id: idCounter,
        x: e.clientX,
        y: e.clientY,
      };

      setIdCounter((prev) => prev + 1);
      setTrail((prev) => [...prev.slice(-20), newPoint]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [idCounter]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 30);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <svg className="pointer-events-none fixed inset-0 z-50 overflow-hidden w-full h-full">
      {trail.length > 1 && (
        <path
          d={trail.reduce((acc, point, index) => {
            if (index === 0) return `M ${point.x} ${point.y}`;
            return `${acc} L ${point.x} ${point.y}`;
          }, "")}
          fill="none"
          stroke="hsl(12 88% 65%)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 6px hsl(12 88% 65% / 0.6))",
          }}
        />
      )}
    </svg>
  );
};
