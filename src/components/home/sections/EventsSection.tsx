"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, MapPin, Users, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";
import { eventService } from "@/modules/events/services/event.service";
import { Event } from "@/modules/events/types/event.types";

function EventCardSkeleton() {
  return (
    <div className="card card-hover overflow-hidden animate-pulse">
      <div className="relative h-48 bg-bg-surface/50" />
      <div className="p-6 space-y-4">
        <div className="h-6 bg-bg-surface/50 rounded w-3/4" />
        <div className="h-16 bg-bg-surface/50 rounded w-full" />
        <div className="space-y-2">
          <div className="h-4 bg-bg-surface/50 rounded w-1/2" />
          <div className="h-4 bg-bg-surface/50 rounded w-2/3" />
          <div className="h-4 bg-bg-surface/50 rounded w-1/3" />
        </div>
        <div className="h-10 bg-bg-surface/50 rounded w-full" />
      </div>
    </div>
  );
}

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startDay = start.getDate();
    const startMonth = start.toLocaleDateString("fr-FR", { month: "short" });
    const endDay = end.getDate();
    const endMonth = end.toLocaleDateString("fr-FR", { month: "short", year: "numeric" });
    
    if (startMonth === endMonth.split(" ")[0]) {
      return `${startDay}-${endDay} ${endMonth}`;
    }
    return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const upcomingEvents = await eventService.getUpcomingEvents(3);
        setEvents(upcomingEvents);
      } catch (err) {
        console.error("Erreur:", err);
        setError("Impossible de charger les événements. Veuillez réessayer.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".event-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-up");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [events]);

  return (
    <section id="events" ref={sectionRef} className="py-20 relative">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient-primary">Events</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover our upcoming events and join our passionate community
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <EventCardSkeleton key={i} />
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center gap-2 bg-error/10 text-error px-4 py-2 rounded-full mb-4">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm font-medium">Error</span>
            </div>
            <p className="text-text-muted">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {events.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-text-muted">No upcoming events at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="event-card card card-hover overflow-hidden opacity-0 flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden">
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
                        <div className="absolute top-4 left-4 live-badge">
                          Live
                        </div>
                      )}
                      
                      {event.isUpcoming && !event.isLive && (
                        <div className="absolute top-4 left-4 bg-primary/20 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          Upcoming
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-bg-surface via-transparent to-transparent opacity-60" />
                    </div>
                    
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
                ))}
              </div>
            )}
          </>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="text-center mt-12">
            <Link href="/events">
              <button className="btn-primary">
                View All Events
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}