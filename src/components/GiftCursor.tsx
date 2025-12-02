import { useEffect, useState } from "react";
import { Gift } from "lucide-react";

interface CursorTrail {
  id: number;
  x: number;
  y: number;
}

export const GiftCursor = () => {
  const [trails, setTrails] = useState<CursorTrail[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const newTrail: CursorTrail = {
        id: idCounter++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrails((prev) => [...prev.slice(-8), newTrail]);

      setTimeout(() => {
        setTrails((prev) => prev.filter((trail) => trail.id !== newTrail.id));
      }, 600);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="absolute animate-gift-fade"
          style={{
            left: trail.x - 8,
            top: trail.y - 8,
            opacity: (index + 1) / trails.length,
            transform: `scale(${0.5 + (index / trails.length) * 0.5}) rotate(${index * 15}deg)`,
          }}
        >
          <Gift className="w-4 h-4 text-primary" />
        </div>
      ))}
    </div>
  );
};
