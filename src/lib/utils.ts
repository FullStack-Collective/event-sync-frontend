import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Fusionne les classes Tailwind CSS avec clsx et tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formate une date en français
 */
export const formatDate = (
  date: string | Date,
  format: "short" | "long" = "short",
) => {
  const d = new Date(date);

  if (format === "short") {
    return d.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  return d.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Vérifie si une date est aujourd'hui
 */
export const isToday = (date: string | Date) => {
  const today = new Date();
  const d = new Date(date);
  return d.toDateString() === today.toDateString();
};

/**
 * Calcule la durée entre deux dates en minutes
 */
export const getDurationInMinutes = (
  startDate: string | Date,
  endDate: string | Date,
) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.round((end.getTime() - start.getTime()) / (1000 * 60));
};

/**
 * Tronque un texte
 */
export const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

/**
 * Génère une couleur aléatoire basée sur une string
 */
export const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const colors = [
    "#ffc600",
    "#0088ff",
    "#ff005d",
    "#10b981",
    "#f59e0b",
    "#ef4444",
  ];
  return colors[Math.abs(hash) % colors.length];
};

/**
 * Formate une heure en HH:mm
 */
export const formatTime = (time: string | Date) => {
  const date = new Date(time);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

/**
 * Formate une plage horaire en HH:mm – HH:mm
 */
export const formatDateTimeRange = (
  startTime: string | Date,
  endTime: string | Date,
) => {
  return `${formatTime(startTime)} – ${formatTime(endTime)}`;
};

/**
 * Vérifie si une session est actuellement en direct
 */
export const isSessionLive = (
  startTime: string | Date,
  endTime: string | Date,
) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);
  return now >= start && now <= end;
};
