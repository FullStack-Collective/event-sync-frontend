"use client";

import { useEffect, useRef } from "react";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Tech Conf 2026",
    description: "La plus grande conférence tech de l'année réunissant les experts mondiaux.",
    date: "15-17 Mai 2026",
    location: "Paris, France",
    speakers: 45,
    image: "/api/placeholder/400/300",
  },
  {
    id: 2,
    title: "DevOps Summit",
    description: "Découvrez les dernières innovations en matière de DevOps et cloud computing.",
    date: "5-7 Juin 2026",
    location: "Lyon, France",
    speakers: 30,
    image: "/api/placeholder/400/300",
  },
  {
    id: 3,
    title: "AI & Data Forum",
    description: "Plongez dans le futur de l'IA et de la data science avec les leaders du secteur.",
    date: "20-22 Sept 2026",
    location: "Bordeaux, France",
    speakers: 38,
    image: "/api/placeholder/400/300",
  },
];

export function EventsSection() {
  const sectionRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <section id="events" ref={sectionRef} className="py-20 relative">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Our <span className="text-gradient-primary">Events</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Discover our upcoming events and join a passionate community
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="event-card card card-hover overflow-hidden opacity-0"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-sage opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-primary/40" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold mb-2">
                  {event.title}
                </h3>
                <p className="text-text-muted text-sm mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-muted text-sm">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{event.speakers} speakers</span>
                  </div>
                </div>

                <button className="w-full btn-outline text-sm group">
                  Voir les détails
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            Voir tous les événements
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}