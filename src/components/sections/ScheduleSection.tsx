"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { SpeakerAvatar } from "@/components/ui/SpeakerAvatar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useSessions } from "@/hooks/useSessions";
import { useRooms } from "@/hooks/useRooms";
import { Session } from "@/types";
import { formatTime, isSessionLive } from "@/lib/utils";

export function ScheduleSection() {
  const [activeRoom, setActiveRoom] = useState<string>("Toutes les salles");
  const { sessions, isLoading, error, refetch } = useSessions();
  const { rooms } = useRooms();

  // Filtrer par salle si sélectionnée
  const filteredSessions = activeRoom === "Toutes les salles"
    ? sessions
    : sessions.filter((s) => s.room?.name === activeRoom);

  // Regrouper les sessions par heure de début
  const sessionsByTime = filteredSessions.reduce((acc, session) => {
    const timeKey = formatTime(session.startTime);
    if (!acc[timeKey]) acc[timeKey] = [];
    acc[timeKey].push(session);
    return acc;
  }, {} as Record<string, Session[]>);

  const timeSlots = Object.keys(sessionsByTime).sort();

  if (isLoading) {
    return (
      <section id="planning" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="planning" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
        <ErrorMessage message={error} onRetry={refetch} />
      </section>
    );
  }

  return (
    <section id="planning" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
      <SectionTag>Planning Multi-Track</SectionTag>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4">
        Vue globale — TechConf 2025
      </h2>
      <p className="text-base max-w-xl mb-16 text-es-text-muted">
        Toutes les sessions en parallèle, par salle et par horaire. Identifiez les sessions live d&apos;un coup d&apos;œil.
      </p>

      <Reveal delay={0.2}>
        <div className="flex gap-2.5 mb-8 flex-wrap">
          <button
            onClick={() => setActiveRoom("Toutes les salles")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeRoom === "Toutes les salles"
                ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                : "bg-es-bg2 border-white/[0.06] text-es-text-muted hover:bg-violet-500/15 hover:border-violet-500/40 hover:text-violet-400"
            }`}
            style={{
              border: activeRoom === "Toutes les salles" ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            Toutes les salles
          </button>
          {rooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeRoom === room.name
                  ? "bg-violet-500/15 border-violet-500/40 text-violet-400"
                  : "bg-es-bg2 border-white/[0.06] text-es-text-muted hover:bg-violet-500/15 hover:border-violet-500/40 hover:text-violet-400"
              }`}
              style={{
                border: activeRoom === room.name ? "1px solid rgba(124,58,237,0.4)" : "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {room.name}
            </button>
          ))}
        </div>
      </Reveal>

      <Reveal delay={0.3}>
        <div className="rounded-[20px] overflow-hidden bg-es-bg2 border border-white/[0.06]">
          {/* Header */}
          <div className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_repeat(3,1fr)] border-b border-white/[0.06]">
            <div className="p-4" />
            {rooms.slice(0, 3).map((room) => (
              <div key={room.id} className="hidden md:block p-4 text-xs font-semibold uppercase tracking-wider text-es-text-muted border-r border-white/[0.06]">
                <div className="flex flex-col gap-0.5">
                  <span className="text-[0.7rem] text-es-text-dim">Salle</span>
                  <span className="font-display text-sm font-bold normal-case tracking-normal text-white">
                    {room.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Rows */}
          {timeSlots.map((time) => (
            <div
              key={time}
              className="grid grid-cols-[100px_1fr] md:grid-cols-[100px_repeat(3,1fr)] transition-colors duration-200 hover:bg-violet-500/[0.03]"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div className="p-5 px-3 font-mono text-xs flex items-start pt-[22px] text-es-text-dim border-r border-white/[0.06]">
                {time}
              </div>

              {/* Mobile : liste verticale */}
              <div className="md:hidden p-4 flex flex-col gap-3">
                {sessionsByTime[time]
                  .filter((s) => activeRoom === "Toutes les salles" || s.room?.name === activeRoom)
                  .map((session) => (
                    <SessionCard key={session.id} session={session} />
                  ))}
              </div>

              {/* Desktop : grille par salle */}
              {rooms.slice(0, 3).map((room) => {
                const session = sessionsByTime[time].find((s) => s.room?.name === room.name);
                return (
                  <div key={room.id} className="hidden md:block p-4 border-r border-white/[0.06]">
                    {session ? (
                      <SessionCard session={session} />
                    ) : (
                      <div className="flex items-center justify-center h-full text-sm text-es-text-dim">
                        —
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

// Sous-composant pour une carte de session
function SessionCard({ session }: { session: Session }) {
  const live = session.isLive || isSessionLive(session.startTime, session.endTime);
  const speaker = session.speakers?.[0]?.speaker;

  return (
    <div
      className="rounded-[10px] p-3.5 cursor-pointer transition-all duration-200 hover:translate-x-[3px] relative overflow-hidden group"
      style={{
        background: live ? "rgba(34,197,94,0.05)" : "#111128",
        borderLeft: `3px solid ${live ? "#22c55e" : "#7c3aed"}`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="relative z-10">
        {live && (
          <div className="flex justify-between items-center mb-2">
            <LiveBadge />
          </div>
        )}
        <div className="mb-2 text-xs text-es-text-dim">
          {formatTime(session.startTime)} – {formatTime(session.endTime)}
        </div>
        <div className="text-sm font-semibold mb-1.5 leading-tight">{session.title}</div>
        {speaker && (
          <div className="flex items-center gap-2 flex-wrap">
            <SpeakerAvatar name={speaker.name} photoUrl={speaker.photoUrl} color="violet" />
            <span className="text-xs text-es-text-muted">{speaker.name}</span>
          </div>
        )}
      </div>
    </div>
  );
}