'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Layers } from 'lucide-react';
import { eventService } from '@/modules/events/services/event.service';
import { Event } from '@/modules/events/types/event.types';



const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

const formatTime = (d: string) =>
  new Date(d).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

const isLiveNow = (start: string, end: string) => {
  const now = Date.now();
  return now >= new Date(start).getTime() && now <= new Date(end).getTime();
};

const getInitials = (name: string) =>
  name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);

const AVATAR_GRADIENTS = [
  'from-sage-300 to-mint-500',
  'from-sage-400 to-ochre-400',
  'from-sage-700 to-mint-500',
  'from-sage-200 to-sage-600',
];

export default function EventDetailPage() {
  
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await eventService.getById(parseInt(id));
        if (res.success) setEvent(res.data);
        else setError('Événement introuvable');
      } catch {
        setError('Erreur lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !event) return (
    <div className="text-center py-20">
      <p className="text-error mb-4">{error ?? 'Événement introuvable'}</p>
      <button onClick={() => router.push('/events')} className="btn-primary">
        ← Retour aux événements
      </button>
    </div>
  );

  const live = isLiveNow(event.startDate, event.endDate);

  const allSpeakers = (event.sessions ?? []).flatMap((s) =>
    (s.speakers ?? []).map((ss) => ss.speaker)
  );
  const uniqueSpeakers = Array.from(
    new Map(allSpeakers.map((sp) => [sp.id, sp])).values()
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 mt-16">

      {/* Back */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-sage-400 hover:text-sage-500 transition mb-5"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux événements
      </Link>

      {/* Banner */}
      <div className="relative h-44 rounded-2xl overflow-hidden mb-[-40px] bg-gradient-to-br from-sage-500 to-mint-500">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        {live && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-live text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            LIVE NOW
          </div>
        )}
      </div>

      {/* Header card */}
      <div className="relative z-10 bg-warm-white border-[1.5px] border-clay rounded-2xl px-6 pt-14 pb-6 mb-6">
        <h1 className="text-2xl md:text-3xl font-extrabold text-sage-800 tracking-tight mb-4 leading-tight">
          {event.title}
        </h1>
        {event.description && (
          <p className="text-sm text-sage-400 leading-relaxed mb-5">{event.description}</p>
        )}
        <div className="flex flex-wrap gap-4">
          <span className="inline-flex items-center gap-2 text-sm text-sage-400 font-medium">
            <Calendar className="w-4 h-4 text-primary" />
            {formatDate(event.startDate)}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-sage-400 font-medium">
            <Clock className="w-4 h-4 text-primary" />
            {formatTime(event.startDate)} – {formatTime(event.endDate)}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-2 text-sm text-sage-400 font-medium">
              <MapPin className="w-4 h-4 text-primary" />
              {event.location}
            </span>
          )}
        </div>
      </div>

      {/* Sessions */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Layers className="w-4 h-4 text-sage-500" />
          <h2 className="text-lg font-bold text-sage-700 tracking-tight">Sessions</h2>
          <span className="bg-sage-100 text-sage-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {event.sessions?.length ?? 0}
          </span>
        </div>

        {!event.sessions?.length ? (
          <div className="bg-warm-white border-[1.5px] border-clay rounded-xl p-6 text-center text-sage-300 text-sm">
            Aucune session pour cet événement
          </div>
        ) : (
          <div className="flex flex-col gap-2.5">
            {event.sessions.map((session) => {
              const sessionLive = isLiveNow(session.startTime, session.endTime);
              return (
                <Link
                  key={session.id}
                  href={`/events/${id}/sessions/${session.id}`}
                  className={[
                    'group flex items-center gap-4 bg-warm-white border-[1.5px] rounded-xl px-4 py-3 transition-all duration-150 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-8px_rgba(45,106,79,.15)]',
                    sessionLive ? 'border-error border-l-[3px]' : 'border-clay hover:border-sage-300',
                  ].join(' ')}
                >
                  {/* Time block */}
                  <div className="bg-sage-50 border-[1.5px] border-sage-100 rounded-lg px-3 py-2 text-center min-w-[68px] flex-shrink-0">
                    <div className="text-sm font-bold text-sage-600 leading-none">
                      {formatTime(session.startTime)}
                    </div>
                    <div className="text-[9px] text-sage-200 my-0.5">▼</div>
                    <div className="text-xs font-medium text-sage-300">
                      {formatTime(session.endTime)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      {sessionLive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-error flex-shrink-0 animate-ping" />
                      )}
                      <span className="text-sm font-semibold text-sage-800 truncate">
                        {session.title}
                      </span>
                    </div>
                    {session.room && (
                      <span className="text-xs text-sage-400">
                        🚪 {session.room.name}
                        {session.room.capacity ? ` · ${session.room.capacity} places` : ''}
                      </span>
                    )}
                  </div>

                  {/* Speaker avatars */}
                  {session.speakers?.length > 0 && (
                    <div className="flex -space-x-2 flex-shrink-0">
                      {session.speakers.slice(0, 3).map((ss, i) => (
                        <div
                          key={ss.speaker.id}
                          title={ss.speaker.name}
                          className={`w-7 h-7 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-[10px] font-bold border-2 border-white`}
                        >
                          {getInitials(ss.speaker.name)}
                        </div>
                      ))}
                    </div>
                  )}

                  <span className="text-sage-300 text-base flex-shrink-0 transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Speakers */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-4 h-4 text-sage-500" />
          <h2 className="text-lg font-bold text-sage-700 tracking-tight">Speakers</h2>
          <span className="bg-sage-100 text-sage-600 text-xs font-bold px-2.5 py-0.5 rounded-full">
            {uniqueSpeakers.length}
          </span>
        </div>

        {!uniqueSpeakers.length ? (
          <div className="bg-warm-white border-[1.5px] border-clay rounded-xl p-6 text-center text-sage-300 text-sm">
            Aucun speaker pour cet événement
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {uniqueSpeakers.map((speaker, i) => (
              <Link
                key={speaker.id}
                href={`/events/${id}/speaker/${speaker.id}`}
                className="group bg-warm-white border-[1.5px] border-clay rounded-xl p-4 flex flex-col items-center gap-2 hover:border-sage-300 hover:-translate-y-1 hover:shadow-[0_6px_20px_-8px_rgba(45,106,79,.15)] transition-all duration-150"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length]} flex items-center justify-center text-white text-lg font-bold`}
                >
                  {getInitials(speaker.name)}
                </div>
                <span className="text-sm font-semibold text-sage-800 text-center">
                  {speaker.name}
                </span>
                <span className="text-xs text-sage-400">
                  {(event.sessions ?? []).filter((s) =>
                    (s.speakers ?? []).some((ss) => ss.speaker.id === speaker.id)
                  ).length} session(s)
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}