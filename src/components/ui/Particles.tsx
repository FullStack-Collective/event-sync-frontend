"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  left: string;
  size: string;
  duration: string;
  delay: string;
  color: string;
}

export function Particles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.7 ? "3px" : "2px",
      duration: `${8 + Math.random() * 16}s`,
      delay: `${Math.random() * 12}s`,
      color: Math.random() > 0.5 ? "#a855f7" : Math.random() > 0.5 ? "#06b6d4" : "#ec4899",
    }));
    setParticles(p);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-float"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            opacity: 0,
            animationDuration: p.duration,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}