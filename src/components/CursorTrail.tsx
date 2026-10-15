import { useEffect, useState } from "react";

interface TrailPoint {
  x: number;
  y: number;
}

export const CursorTrail = () => {
  const [trail, setTrail] = useState<TrailPoint[]>([]);

  useEffect(() => {
    // Target follows the mouse instantly, drawn line eases toward it (lerp)
    const target = { x: 0, y: 0 };
    const current: { x: number; y: number }[] = [];
    let raf = 0;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!hasMoved) {
        hasMoved = true;
        for (let i = 0; i < 22; i++) current.push({ x: e.clientX, y: e.clientY });
      }
    };

    const animate = () => {
      if (hasMoved) {
        // Ease each point toward the one in front of it for buttery motion
        let prevX = target.x;
        let prevY = target.y;
        for (let i = current.length - 1; i >= 0; i--) {
          const p = current[i];
          if (!p) continue;
          const ease = i === current.length - 1 ? 0.18 : 0.3;
          p.x += (prevX - p.x) * ease;
          p.y += (prevY - p.y) * ease;
          prevX = p.x;
          prevY = p.y;
        }
        setTrail(current.map((p) => ({ ...p })));
      }
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    raf = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Generate smooth bezier curve path
  const getSmoothPath = (points: TrailPoint[]) => {
    const first = points[0];
    if (points.length < 2 || !first) return "";
    
    let path = `M ${first.x} ${first.y}`;
    
    for (let i = 1; i < points.length - 1; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      if (!curr || !next) continue;
      
      // Calculate control point (midpoint between current and next)
      const cpX = (curr.x + next.x) / 2;
      const cpY = (curr.y + next.y) / 2;
      
      // Use quadratic bezier curve
      path += ` Q ${curr.x} ${curr.y} ${cpX} ${cpY}`;
    }
    
    // Add the last point
    const last = points[points.length - 1];
    if (last) {
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
          stroke="hsl(12 88% 65% / 0.45)"
          strokeWidth="2.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: "drop-shadow(0 0 4px hsl(12 88% 65% / 0.25))",
          }}
        />
      )}
    </svg>
  );
};
