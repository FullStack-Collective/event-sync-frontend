"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { SpeakerAvatar } from "@/components/ui/SpeakerAvatar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { QASystem } from "@/components/interactive/QASystem";
import { useSession } from "@/hooks/useSessions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { formatDateTimeRange, isSessionLive } from "@/lib/utils";

interface SessionDetailSectionProps {
  sessionId?: number;
}

export function SessionDetailSection({
  sessionId = 1,
}: SessionDetailSectionProps) {
  const { session, isLoading } = useSession(sessionId);
  const [favorites, setFavorites] = useLocalStorage<number[]>("favorites", []);
  const [isFavActive, setIsFavActive] = useState(() =>
    favorites.includes(sessionId),
  );

  if (isLoading) {
    return (
      <section
        id="session-detail"
        className="relative z-[1] py-24 px-10 max-w-7xl mx-auto"
      >
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section
        id="session-detail"
        className="relative z-[1] py-24 px-10 max-w-7xl mx-auto"
      >
        <p className="text-center text-es-text-muted">Session non trouvée.</p>
      </section>
    );
  }

  const live =
    session.isLive || isSessionLive(session.startTime, session.endTime);

  const toggleFavorite = () => {
    setFavorites((prev) => {
      if (prev.includes(session.id)) {
        setIsFavActive(false);
        return prev.filter((id) => id !== session.id);
      }
      setIsFavActive(true);
      return [...prev, session.id];
    });
  };

  return (
    <section
      id="session-detail"
      className="relative z-[1] py-24 px-10 max-w-7xl mx-auto"
    >
      <SectionTag>Détail de Session</SectionTag>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4">
        {live ? "Session en cours — Q&A Live" : "Détail de la session"}
      </h2>
      <p className="text-base max-w-xl mb-16 text-es-text-muted">
        Interagissez directement avec les intervenants pendant la session. Posez
        vos questions, votez pour les meilleures.
      </p>

      <div
        className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 items-start"
        id="session-anchor"
      >
        {/* Detail Card */}
        <Reveal delay={0.2}>
          <div className="rounded-[20px] p-9 bg-es-bg2 border border-white/[0.06]">
            {live && (
              <div className="flex items-center gap-3 mb-6">
                <LiveBadge size="md" />
              </div>
            )}

            <h3 className="font-display text-3xl font-bold tracking-tight leading-tight mb-3">
              {session.title}
            </h3>

            <div className="flex gap-5 flex-wrap mb-6">
              <span className="flex items-center gap-2 text-sm text-es-text-muted">
                ⏰ {formatDateTimeRange(session.startTime, session.endTime)}
              </span>
              {session.room && (
                <span className="flex items-center gap-2 text-sm text-es-text-muted">
                  📍 {session.room.name}
                </span>
              )}
              {session.room?.capacity && (
                <span className="flex items-center gap-2 text-sm text-es-text-muted">
                  🪑 Capacité : {session.room.capacity} personnes
                </span>
              )}
            </div>

            <p className="leading-7 mb-7 text-[0.95rem] text-es-text-muted">
              {session.description ||
                "Aucune description disponible pour cette session."}
            </p>

            {session.speakers && session.speakers.length > 0 && (
              <>
                <div className="mb-3 text-sm font-semibold text-es-text-muted">
                  Intervenants
                </div>
                <div className="flex gap-3 flex-wrap mb-8">
                  {session.speakers
                    .map(({ speaker }) => speaker)
                    .filter((speaker): speaker is NonNullable<typeof speaker> =>
                      Boolean(speaker),
                    )
                    .map((speaker) => (
                      <a
                        key={speaker.id}
                        href={`#speakers`}
                        className="flex items-center gap-2.5 rounded-full pl-1.5 pr-3.5 py-1.5 transition-all duration-200 hover:border-violet-500/40 hover:bg-violet-500/5 bg-es-bg3 border border-white/[0.06]"
                      >
                        <SpeakerAvatar
                          name={speaker.name}
                          photoUrl={speaker.photoUrl}
                          color="violet"
                        />
                        <span className="text-sm font-medium">
                          {speaker.name}
                        </span>
                      </a>
                    ))}
                </div>
              </>
            )}

            <button
              onClick={toggleFavorite}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-[1.03] ${
                isFavActive
                  ? "bg-amber-500/25 border-amber-500/50"
                  : "bg-amber-500/15 border-amber-500/30 hover:bg-amber-500/20"
              }`}
              style={{
                color: "#f59e0b",
                border: `1px solid ${isFavActive ? "rgba(245,158,11,0.5)" : "rgba(245,158,11,0.3)"}`,
              }}
            >
              {isFavActive ? "✅ Dans mes favoris" : "⭐ Ajouter aux favoris"}
            </button>
          </div>
        </Reveal>

        {/* Q&A Card */}
        <QASystem sessionId={session.id} isLive={live} />
      </div>
    </section>
  );
}
