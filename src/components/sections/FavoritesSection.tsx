"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useSessions } from "@/hooks/useSessions";
import { formatTime, isSessionLive } from "@/lib/utils";
import Link from "next/link";

export function FavoritesSection() {
  const [favoriteIds, setFavoriteIds] = useLocalStorage<number[]>("favorites", []);
  const { sessions, isLoading } = useSessions();

  // Filtrer les sessions favorites
  const favorites = sessions.filter((s) => favoriteIds.includes(s.id));

  const removeFav = (id: number) => {
    setFavoriteIds((prev) => prev.filter((fid) => fid !== id));
  };

  if (isLoading) {
    return (
      <section id="favoris" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  return (
    <section id="favoris" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
      <SectionTag>Mon Itinéraire</SectionTag>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4">
        Vos sessions favorites
      </h2>
      <p className="text-base max-w-xl mb-16 text-es-text-muted">
        Construisez votre planning personnalisé. Stocké localement dans votre navigateur.
      </p>

      <Reveal delay={0.2}>
        <div className="rounded-[20px] p-9 bg-es-bg2 border border-white/[0.06]">
          <div className="flex justify-between items-center mb-7">
            <div className="font-display text-lg font-bold">⭐ Mes sessions sélectionnées</div>
            <div className="text-sm text-es-text-muted">
              {favorites.length} session{favorites.length !== 1 ? "s" : ""}
            </div>
          </div>

          {favorites.length > 0 ? (
            <div className="flex flex-col gap-3">
              {favorites.map((fav) => {
                const live = isSessionLive(fav.startTime, fav.endTime);
                return (
                  <div
                    key={fav.id}
                    className="flex items-center gap-4 rounded-[10px] px-5 py-4 transition-all duration-200 hover:border-amber-500/30 hover:bg-amber-500/5 animate-slideIn bg-es-bg3 border border-white/[0.06]"
                  >
                    <span className="font-mono text-xs min-w-[50px] text-cyan-400">
                      {formatTime(fav.startTime)}
                    </span>
                    <div className="flex-1">
                      <Link href={`/session/${fav.id}`}>
                        <div className="font-semibold text-sm mb-0.5 hover:text-violet-400 transition-colors">
                          {fav.title}
                        </div>
                      </Link>
                      <div className="text-xs flex items-center gap-1 text-es-text-muted">
                        {fav.room?.name}
                        {live && <LiveBadge />}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFav(fav.id)}
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200 hover:bg-red-500/20 hover:scale-110 flex-shrink-0"
                      style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "#f87171" }}
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10 text-sm text-es-text-dim">
              ⭐ Aucun favori pour l&apos;instant. Ajoutez des sessions depuis le planning !
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}