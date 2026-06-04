"use client";

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface GlowAnimatedCounterProps {
  targetValue: number;
  suffix?: string;
  duration?: number;
}

export function GlowAnimatedCounter({ 
  targetValue, 
  suffix = "", 
  duration = 2000 
}: GlowAnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = targetValue;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [inView, targetValue, duration]);

  const formatValue = () => {
    if (suffix === "k+" && targetValue >= 1000) {
      const inK = (count / 1000).toFixed(1);
      return `${inK}${suffix}`;
    }
    return `${count}${suffix}`;
  };

  return (
    <div ref={ref} className="relative inline-block">
      <div className="text-3xl font-bold text-white py-1 px-4 rounded-lg">
        {formatValue()}
      </div>
      <div className="absolute inset-0 blur-xl opacity-20 -z-10" />
    </div>
  );
}