"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

interface SpeakerAvatarProps {
  name: string;
  photoUrl?: string | null;
  color?: "violet" | "cyan" | "pink" | "gold";
  size?: "sm" | "lg";
  className?: string;
}

const colorMap = {
  violet: "from-violet-600 to-violet-400",
  cyan: "from-cyan-700 to-cyan-500",
  pink: "from-pink-700 to-pink-500",
  gold: "from-amber-600 to-amber-500",
};

// `@/lib/utils` ne fournit pas de `getInitials`, donc on le définit localement ici.
const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0].toUpperCase())
    .slice(0, 2)
    .join("");

export function SpeakerAvatar({
  name,
  photoUrl,
  color = "violet",
  size = "sm",
  className,
}: SpeakerAvatarProps) {
  const sizeClasses = size === "lg" ? "w-20 h-20 text-2xl" : "w-6 h-6 text-[0.6rem]";
  const initials = getInitials(name);

  if (photoUrl) {
    return (
      <div className={cn("relative rounded-full overflow-hidden shrink-0", sizeClasses, className)}>
        <Image
          src={photoUrl}
          alt={name}
          fill
          className="object-cover"
          sizes={size === "lg" ? "80px" : "24px"}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-full flex items-center justify-center text-white font-bold bg-gradient-to-br shrink-0",
        colorMap[color],
        sizeClasses,
        className
      )}
      style={size === "lg" ? { border: "2px solid rgba(255,255,255,0.08)" } : undefined}
    >
      {initials}
    </div>
  );
}