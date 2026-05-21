"use client";

import { useState, useCallback } from "react";

export function useCounterAnimation() {
  const [counts, setCounts] = useState<Record<string, number>>({});

  const animate = useCallback((key: string, target: number, delay: number = 0) => {
    setTimeout(() => {
      const duration = 1800;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        setCounts((prev) => ({ ...prev, [key]: Math.round(current) }));
        if (current >= target) clearInterval(timer);
      }, 16);
    }, delay);
  }, []);

  return { counts, animate };
}