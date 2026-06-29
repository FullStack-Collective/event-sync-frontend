"use client";

import { useMemo, useRef } from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Event } from "@/modules/events/types/event.types";


const formatDateRange = (startDate: string, endDate: string): string => {
  const start = new Date(startDate);
  const end   = new Date(endDate);

  const startDay   = start.getDate();
  const startMonth = start.toLocaleDateString("fr-FR", { month: "short" });
  const endDay     = end.getDate();
  const endMonth   = end.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });

  if (startMonth === endMonth.split(" ")[0]) {
    return `${startDay}-${endDay} ${endMonth}`;
  }
  return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
};


interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => (
  <div className="card card-hover overflow-hidden flex flex-col w-full">
    {/* Banner */}
    <div className="relative h-48 overflow-hidden flex-shrink-0">
      {event.bannerUrl ? (
        <img
          src={event.bannerUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-sage opacity-20" />
      )}

      {event.isLive && (
        <div className="absolute top-4 left-4 live-badge">Live</div>
      )}

      {event.isUpcoming && !event.isLive && (
        <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full">
          Upcoming
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60" />
    </div>

    {/* Body */}
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-display font-semibold mb-2 line-clamp-2">
        {event.title}
      </h3>

      <p className="text-text-muted text-sm mb-4 line-clamp-3 flex-grow">
        {event.description || "No description available."}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
          <span>{formatDateRange(event.startDate, event.endDate)}</span>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-sm">
          <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
          <span>{event.location || "Location to be defined"}</span>
        </div>

        <div className="flex items-center gap-2 text-text-muted text-sm">
          <Users className="w-4 h-4 text-primary flex-shrink-0" />
          <span>{event.totalSessions} sessions</span>
        </div>
      </div>

      <Link href={`/events/${event.id}`} className="w-full">
        <button className="w-full btn-outline text-sm group flex items-center justify-center gap-2">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </Link>
    </div>
  </div>
);


interface VerticalInfiniteCarouselProps {
  events: Event[];
  direction: "up" | "down";
  durationSeconds?: number;
}

const MIN_COPIES = 4; 
export const VerticalInfiniteCarousel = ({
  events,
  direction,
  durationSeconds = 28,
}: VerticalInfiniteCarouselProps) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const items = useMemo(() => {
    if (events.length === 0) return [];
    const copiesNeeded = Math.ceil((MIN_COPIES * 2) / events.length) * events.length;
    const result: Event[] = [];
    while (result.length < copiesNeeded) result.push(...events);
    return result;
  }, [events]);

  const keyframe      = direction === "up" ? "marquee-up" : "marquee-down";
  const animationCSS  = `${keyframe} ${durationSeconds}s linear infinite`;

  if (items.length === 0) return null;

  return (
    <div
      className="vic-window"
      onMouseEnter={() => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = "paused";
        }
      }}
      onMouseLeave={() => {
        if (trackRef.current) {
          trackRef.current.style.animationPlayState = "running";
        }
      }}
    >
      <div
        ref={trackRef}
        className="vic-track"
        style={{ animation: animationCSS }}
      >
        {items.map((event, i) => (
          <div key={`${event.id}-${i}`} className="vic-card-slot">
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </div>
  );
};
