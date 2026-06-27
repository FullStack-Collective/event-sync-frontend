import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  ChevronRight,
  Radio,
} from "lucide-react";
import { eventService } from "@/modules/events/services/event.service";
import { sessionService } from "@/modules/sessions/services/session.service";
import type { Session } from "@/modules/sessions/types/session.type";

interface PageProps {
  params: { id: string };
}

const fmtTime = (d: string) =>
  new Date(d).toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  });

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const durationMin = (a: string, b: string) =>
  Math.max(
    0,
    Math.round((new Date(b).getTime() - new Date(a).getTime()) / 60000),
  );

const computeStatus = (s: Session): Session["status"] => {
  if (s.status) return s.status;
  const now = Date.now();
  const start = new Date(s.startTime).getTime();
  const end = new Date(s.endTime).getTime();
  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "live";
};

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

export default async function SessionsPage({ params }: PageProps) {
  const eventId = Number(params.id);
  if (Number.isNaN(eventId)) notFound();

  const [event, sessionsRaw] = await Promise.all([
    eventService.getEventByIdSafe(eventId),
    sessionService.getByEvent(eventId).catch(() => [] as Session[]),
  ]);

  if (!event) notFound();

  const sessions = [...sessionsRaw]
    .map((s) => ({ ...s, status: computeStatus(s) }))
    .sort((a, b) => {
      if (a.status === "live" && b.status !== "live") return -1;
      if (b.status === "live" && a.status !== "live") return 1;
      return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
    });

  const total = sessions.length;
  const liveCount = sessions.filter((s) => s.status === "live").length;

  return (
    <section className="relative z-10 min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
      <div className="w-full max-w-4xl">
        {/* Back link */}
        <Link
          href={`/events/${event.id}`}
          className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text transition mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;événement
        </Link>

        {/* Header */}
        <header className="mb-10">
          <p className="text-xs uppercase tracking-widest text-primary/80">
            Programme des sessions
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-text">
            {event.title}
          </h1>

          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-text-muted">
            <span className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {fmtDate(event.startDate)}
            </span>
            <span className="inline-flex items-center gap-2">
              <Users className="w-4 h-4" />
              {total} session{total > 1 ? "s" : ""}
            </span>
            {liveCount > 0 && (
              <span className="inline-flex items-center gap-2 text-primary">
                <Radio className="w-4 h-4 animate-pulse" />
                {liveCount} en direct
              </span>
            )}
          </div>
        </header>

        {/* List */}
        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-border bg-bg-surface p-12 text-center">
            <p className="text-text-dim">
              Aucune session disponible pour cet événement.
            </p>
          </div>
        ) : (
          <ul className="grid gap-4">
            {sessions.map((session) => {
              const mins = durationMin(session.startTime, session.endTime);
              return (
                <li key={session.id}>
                  <Link
                    href={`/events/${event.id}/sessions/${session.id}`}
                    className="group block rounded-2xl border border-border bg-bg-surface p-6 transition hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="flex items-start gap-4">
                      {/* Time column */}
                      <div className="hidden sm:flex flex-col items-center justify-center min-w-22 py-2 px-3 rounded-xl bg-bg-elevated border border-border">
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
                          <div className="min-w-0">
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
                                {fmtTime(session.startTime)} —{" "}
                                {fmtTime(session.endTime)}
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

                            {session.speakers &&
                              session.speakers.length > 0 && (
                                <div className="mt-3 flex items-center gap-2">
                                  <div className="flex -space-x-2">
                                    {session.speakers.slice(0, 4).map((sp) => (
                                      <div
                                        key={sp.id}
                                        title={sp.name}
                                        className="w-7 h-7 rounded-full border-2 border-bg-surface bg-bg-elevated overflow-hidden flex items-center justify-center text-[10px] font-semibold text-text-muted"
                                      >
                                        {sp.avatarUrl ? (
                                          <img
                                            src={sp.avatarUrl}
                                            alt={sp.name}
                                            className="w-full h-full object-cover"
                                          />
                                        ) : (
                                          sp?.name?.split(" ") || []
                                            .map((p) => p[0])
                                            .slice(0, 2)
                                            .join("")
                                        )}
                                      </div>
                                    ))}
                                  </div>
                                  <span className="text-xs text-text-muted">
                                    {session.speakers.length} speaker
                                    {session.speakers.length > 1 ? "s" : ""}
                                  </span>
                                </div>
                              )}
                          </div>

                          <ChevronRight className="w-5 h-5 text-text-dim group-hover:text-primary group-hover:translate-x-0.5 transition" />
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
