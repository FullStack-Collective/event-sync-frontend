"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { useCounterAnimation } from "@/hooks/useCounterAnimation";
import { useEvents } from "@/hooks/useEvents";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

export function HeroSection() {
  const heroStatsRef = useRef<HTMLDivElement>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const { counts, animate } = useCounterAnimation();
  const { events, isLoading } = useEvents({ limit: 10 });

  // Calcul des stats depuis le backend (memoisé pour éviter recréation à chaque render)
  const stats = useMemo(() => {
    const eventsCount = events.length;
    const sessionsCount = events.reduce(
      (acc, e) => acc + (e.totalSessions || 0),
      0,
    );
    const speakersCount = 64; // À remplacer par un appel API dédié
    const liveCount = events.filter((e) => e.isLive).length;

    return {
      events: eventsCount || 12,
      sessions: sessionsCount || 148,
      speakers: speakersCount,
      live: liveCount || 3,
    } as const;
  }, [events]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countersStarted) {
          setCountersStarted(true);
          animate("events", stats.events, 1000);
          animate("sessions", stats.sessions, 1100);
          animate("speakers", stats.speakers, 1200);
          animate("live", stats.live, 1300);
        }
      },
      { threshold: 0.3 },
    );
    if (heroStatsRef.current) observer.observe(heroStatsRef.current);
    return () => observer.disconnect();
  }, [countersStarted, animate, stats]);

  const displayStats: { key: keyof typeof stats; label: string }[] = [
    { key: "events", label: "Événements actifs" },
    { key: "sessions", label: "Sessions planifiées" },
    { key: "speakers", label: "Intervenants" },
    { key: "live", label: "Sessions en direct" },
  ];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-10 pt-[120px] pb-20 text-center z-[1]">
      <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium mb-8 bg-violet-500/15 border border-violet-500/35 text-violet-400">
        <LiveBadge />
        Plateforme de gestion d&apos;événements en temps réel
      </div>

      <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-extrabold leading-[1.05] tracking-tight mb-6">
        Gérez vos événements
        <br />
        avec{" "}
        <span className="text-gradient animate-gradientFlow">
          précision
        </span> et{" "}
        <span className="text-gradient animate-gradientFlow">impact</span>
      </h1>

      <p className="text-lg max-w-xl mx-auto mb-12 text-es-text-muted">
        Remplacez les supports statiques par une interface dynamique. Planning
        multi-track, Q&A live, intervenants, favoris — tout en un.
      </p>

      <div className="flex gap-4 justify-center flex-wrap">
        <a
          href="#events"
          className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1"
          style={{
            background: "linear-gradient(135deg, #7c3aed, #a855f7)",
            boxShadow: "0 8px 32px rgba(124,58,237,0.4)",
          }}
        >
          Découvrir les événements →
        </a>
        <a
          href="#planning"
          className="inline-flex items-center gap-2 px-9 py-3.5 rounded-full text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-500/50 border border-white/[0.06]"
        >
          📅 Voir le planning
        </a>
      </div>

      <div
        ref={heroStatsRef}
        className="flex gap-12 mt-[72px] pt-12 flex-wrap justify-center border-t border-white/[0.06]"
      >
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          displayStats.map((stat) => (
            <div key={stat.key} className="text-center">
              <div className="font-display text-4xl font-extrabold text-gradient-subtle">
                {counts[stat.key] || 0}
              </div>
              <div className="text-sm mt-1 text-es-text-muted">
                {stat.label}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
