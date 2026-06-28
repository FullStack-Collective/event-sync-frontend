import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Users, Radio } from "lucide-react";
import { eventService } from "@/modules/events/services/event.service";
import { sessionService } from "@/modules/sessions/services/session.service";
import { SessionList } from "@/modules/sessions/components/SessionList";
import type { Session } from "@/modules/sessions/types/session.type";

interface PageProps {
  params: { id: string };
}

const fmtDate = (d: string) =>
  new Date(d).toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

const computeStatus = (s: Session): Session["status"] => {
  if (s.status) return s.status;
  const now = Date.now();
  const start = new Date(s.startTime).getTime();
  const end = new Date(s.endTime).getTime();
  if (now < start) return "upcoming";
  if (now > end) return "ended";
  return "live";
};

export default async function SessionsPage({ params }: PageProps) {
  const eventId = Number(params.id);
  if (Number.isNaN(eventId)) notFound();

  const [event, sessionsRaw] = await Promise.all([
    eventService.getEventByIdSafe(eventId),
    sessionService.getByEvent(eventId).catch((err) => {
      console.error("[sessions/page] getByEvent failed:", err);
      return [] as Session[];
    }),
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
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs uppercase tracking-widest text-primary/80">
                Programme des sessions
              </p>
              <h1 className="mt-3 text-4xl sm:text-5xl font-display font-bold text-text">
                {event.title}
              </h1>
            </div>

            {/* Lien vers les favoris */}
            <Link
              href="/favorites"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface text-sm text-text-muted hover:border-red-400/50 hover:text-red-400 transition mt-4 sm:mt-0"
            >
              ♥ Mes favoris
            </Link>
          </div>

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

        {/* Liste avec boutons favoris */}
        <SessionList sessions={sessions} eventId={event.id} />
      </div>
    </section>
  );
}