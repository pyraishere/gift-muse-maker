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

  // Generate smooth bezier curve path
  const getSmoothPath = (points: TrailPoint[]) => {
    if (points.length < 2) return "";
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      // Calculate control point (midpoint between current and next)
      const cpX = (curr.x + next.x) / 2;
      const cpY = (curr.y + next.y) / 2;
      
      // Use quadratic bezier curve
      path += ` Q ${curr.x} ${curr.y} ${cpX} ${cpY}`;
    }
    
    // Add the last point
    if (points.length > 1) {
      const last = points[points.length - 1];
      path += ` L ${last.x} ${last.y}`;
    }
    
    return path;
  };

  return (
    <svg className="pointer-events-none fixed inset-0 z-50 overflow-hidden w-full h-full">
      {trail.length > 1 && (
        <path
          d={getSmoothPath(trail)}
          fill="none"
          stroke="hsl(12 88% 65%)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 8px hsl(12 88% 65% / 0.7))",
          }}
        />
      )}
    </svg>
  );
};
