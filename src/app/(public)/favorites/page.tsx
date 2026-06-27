"use client";

import { useFavorites } from "@/modules/sessions/hooks/useFavorites";
import { FavoriteButton } from "@/modules/sessions/components/FavoriteButton";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  Clock,
  Calendar,
  ChevronRight,
  Radio,
} from "lucide-react";
import type { Session } from "@/modules/sessions/types/session.type";

const fmtTime = (d: string) =>
  new Date(d).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const durationMin = (a: string, b: string) =>
  Math.max(0, Math.round((new Date(b).getTime() - new Date(a).getTime()) / 60000));

const statusStyles: Record<Session["status"], string> = {
  live: "bg-primary/15 text-primary border-primary/40",
  upcoming: "bg-bg-elevated text-text-muted border-border",
  ended: "bg-bg-elevated text-text-dim border-border opacity-70",
};

const statusLabel: Record<Session["status"], string> = {
  live: "En direct",
  upcoming: "À venir",
  ended: "Terminé",
};

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();

  return (
    <section className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-4xl">
        {/* Back */}
        <Link
          href="/events"
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour aux événements
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-primary/80">
            Mes sessions favorites
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-text flex items-center gap-3">
            <Heart className="w-8 h-8 fill-red-400 text-red-400" />
            Favoris
          </h1>
          <p className="mt-3 text-sm text-text-muted">
            {favorites.length === 0
              ? "Aucune session enregistrée"
              : `${favorites.length} session${favorites.length > 1 ? "s" : ""} sauvegardée${favorites.length > 1 ? "s" : ""}`}
          </p>
        </header>

        {/* Empty state */}
        {favorites.length === 0 ? (
          <div className="rounded-2xl border border-border bg-bg-surface p-12 text-center">
            <Heart className="w-12 h-12 text-text-dim mx-auto mb-4" />
            <p className="text-text-dim mb-2">Vous n&apos;avez pas encore de sessions favorites.</p>
            <p className="text-sm text-text-dim mb-6">
              Cliquez sur le cœur <Heart className="inline w-4 h-4 mx-1" /> sur une session pour l&apos;ajouter ici.
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/30 text-primary text-sm hover:bg-primary/20 transition"
            >
              Parcourir les événements
            </Link>
          </div>
        ) : (
          <ul className="grid gap-4">
            {favorites.map((session) => {
              const mins = durationMin(session.startTime, session.endTime);
              return (
                <li key={session.id}>
                  <Link
                    href={`/events/${session.eventId}/sessions/${session.id}`}
                    className="group block rounded-2xl border border-border bg-bg-surface p-6 transition hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      {/* Time column */}
                      <div className="hidden sm:flex flex-col items-center justify-center min-w-[5.5rem] py-2 px-3 rounded-xl bg-bg-elevated border border-border">
                        <span className="text-lg font-semibold text-text">
                          {fmtTime(session.startTime)}
                        </span>
                        <span className="text-[10px] uppercase tracking-wider text-text-dim mt-1">
                          {mins} min
                        </span>
                      </div>

                      {/* Main */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            {/* Status + date mobile */}
                            <div className="flex items-center gap-2 flex-wrap">
                              <span
                                className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${statusStyles[session.status]}`}
                              >
                                {session.status === "live" && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                )}
                                {statusLabel[session.status]}
                              </span>
                              <span className="sm:hidden inline-flex items-center gap-1 text-xs text-text-muted">
                                <Clock className="w-3.5 h-3.5" />
                                {fmtTime(session.startTime)} — {fmtTime(session.endTime)}
                              </span>
                            </div>

                            <h3 className="mt-2 text-lg font-semibold text-text group-hover:text-primary transition truncate">
                              {session.title}
                            </h3>

                            {session.description && (
                              <p className="mt-1.5 text-sm text-text-muted line-clamp-2">
                                {session.description}
                              </p>
                            )}

                            {/* Date */}
                            <div className="mt-2 flex items-center gap-1 text-xs text-text-dim">
                              <Calendar className="w-3.5 h-3.5" />
                              {fmtDate(session.startTime)}
                            </div>

                            {/* Speakers */}
                            {session.speakers && session.speakers.length > 0 && (
                              <div className="mt-3 flex items-center gap-2">
                                <div className="flex -space-x-2">
                                  {session.speakers.slice(0, 4).map((sp) => (
                                    <div
                                      key={sp.id}
                                      title={sp.name}
                                      className="w-7 h-7 rounded-full border-2 border-bg-surface bg-bg-elevated overflow-hidden flex items-center justify-center text-[10px] font-semibold text-text-muted"
                                    >
                                      {sp.avatarUrl ? (
                                        <img src={sp.avatarUrl} alt={sp.name} className="w-full h-full object-cover" />
                                      ) : (
                                        sp.name.split(" ").map((p) => p[0]).slice(0, 2).join("")
                                      )}
                                    </div>
                                  ))}
                                </div>
                                <span className="text-xs text-text-muted">
                                  {session.speakers.length} speaker{session.speakers.length > 1 ? "s" : ""}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <FavoriteButton session={session} />
                            <ChevronRight className="w-5 h-5 text-text-dim group-hover:text-primary group-hover:translate-x-0.5 transition" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}