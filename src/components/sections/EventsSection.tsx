"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useEvents } from "@/hooks/useEvents";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

export function EventsSection() {
  const { events, isLoading, error, refetch } = useEvents({ limit: 6 });

  if (isLoading) {
    return (
      <section id="events" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="events" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
        <ErrorMessage message={error} onRetry={refetch} />
      </section>
    );
  }

  return (
    <section id="events" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
      <SectionTag>Événements</SectionTag>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4">
        Explorez les événements disponibles
      </h2>
      <p className="text-base max-w-xl mb-16 text-es-text-muted">
        Conférences, workshops, hackathons — accédez à tous les événements et leur planning en temps réel.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(340px,1fr))] gap-6">
        {events.map((event, i) => (
          <Reveal key={event.id} delay={i * 0.1}>
            <Link href={`/event/${event.id}`}>
              <div className="rounded-2xl p-7 cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden bg-es-bg2 border border-white/[0.06] h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="flex justify-between items-start mb-5 relative z-10">
                  <div className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-2xl bg-violet-500/20">
                    {event.isLive ? "🔴" : event.isUpcoming ? "📅" : "✅"}
                  </div>
                  {event.isLive ? (
                    <LiveBadge />
                  ) : event.isUpcoming ? (
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 text-amber-500 border border-amber-500/25">
                      ⏱ À venir
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-es-bg3 text-es-text-dim border border-white/[0.06]">
                      Terminé
                    </div>
                  )}
                </div>

                <h3 className="font-display text-xl font-bold mb-2 tracking-tight relative z-10">
                  {event.title}
                </h3>
                
                <p className="text-sm mb-5 leading-relaxed relative z-10 text-es-text-muted line-clamp-3">
                  {event.description || "Aucune description disponible."}
                </p>

                <div className="flex gap-4 flex-wrap mb-5 relative z-10">
                  {event.location && (
                    <span className="flex items-center gap-1.5 text-xs text-es-text-dim">
                      <span>📍</span> {event.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5 text-xs text-es-text-dim">
                    <span>📅</span> {formatDate(event.startDate)}
                  </span>
                </div>

                <div className="pt-5 flex items-center justify-between relative z-10 border-t border-white/[0.06]">
                  <span className="bg-violet-500/15 text-violet-400 px-3 py-1 rounded-full text-xs font-medium">
                    {event.totalSessions || 0} sessions
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-violet-400 transition-all duration-200 group-hover:gap-2">
                    Voir le planning →
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}