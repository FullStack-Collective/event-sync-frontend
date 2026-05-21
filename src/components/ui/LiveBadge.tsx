"use client";

import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  size?: "sm" | "md";
  className?: string;
}

export function LiveBadge({ size = "sm", className }: LiveBadgeProps) {
  const padding = size === "md" ? "px-3.5 py-1" : "px-2 py-0.5";
  const textSize = size === "md" ? "text-xs" : "text-[0.65rem]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-bold uppercase tracking-wide",
        "bg-green-500/15 text-green-400 border border-green-500/30",
        padding,
        textSize,
        className
      )}
    >
      <span className="w-[5px] h-[5px] rounded-full bg-green-400 animate-pulseLive" />
      Live
    </span>
  );
}