"use client";

import Link from "next/link";
import { Clock, ChevronRight, Radio } from "lucide-react";
import { FavoriteButton } from "./FavoriteButton";
import type { Session } from "../types/session.type";

const fmtTime = (d: string) =>
  new Date(d).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

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

interface Props {
  sessions: Session[];
  eventId: string | number;
}

export function SessionList({ sessions, eventId }: Props) {
  if (sessions.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-bg-surface p-12 text-center">
        <p className="text-text-dim">Aucune session disponible pour cet événement.</p>
      </div>
    );
  }

  return (
    <ul className="grid gap-4">
      {sessions.map((session) => {
        const mins = durationMin(session.startTime, session.endTime);
        return (
          <li key={session.id}>
            <Link
              href={`/events/${eventId}/sessions/${session.id}`}
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
                                  sp?.name?.split(" ").map((p) => p[0]).slice(0, 2).join("")
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

                    {/* Actions : favoris + chevron */}
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
  );
}