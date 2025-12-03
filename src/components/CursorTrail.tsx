import { useEffect, useState } from "react";

interface TrailDot {
  id: number;
  x: number;
  y: number;
  color: string;
}

const colors = [
  "hsl(var(--primary))",
  "#ff6b6b",
  "#feca57",
  "#48dbfb",
  "#ff9ff3",
  "#54a0ff",
  "#5f27cd",
  "#00d2d3",
];

export const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const [idCounter, setIdCounter] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newDot: TrailDot = {
        id: idCounter,
        x: e.clientX,
        y: e.clientY,
        color: colors[Math.floor(Math.random() * colors.length)],
      };

      setIdCounter((prev) => prev + 1);
      setTrail((prev) => [...prev.slice(-15), newDot]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [idCounter]);

  useEffect(() => {
    const cleanup = setInterval(() => {
      setTrail((prev) => prev.slice(1));
    }, 50);

    return () => clearInterval(cleanup);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {trail.map((dot, index) => (
        <div
          key={dot.id}
          className="absolute rounded-full animate-cursor-fade"
          style={{
            left: dot.x,
            top: dot.y,
            width: `${8 + index * 0.5}px`,
            height: `${8 + index * 0.5}px`,
            backgroundColor: dot.color,
            transform: "translate(-50%, -50%)",
            opacity: (index + 1) / trail.length,
            boxShadow: `0 0 ${6 + index}px ${dot.color}`,
          }}
        />
      ))}
    </div>
  );
};
