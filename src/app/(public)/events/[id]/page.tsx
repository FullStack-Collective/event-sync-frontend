'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, MapPin, Layers, Users, ChevronRight } from 'lucide-react';
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 mt-16">

      {/* Back */}
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-semibold text-sage-400 hover:text-sage-500 transition mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Retour aux événements
      </Link>

      {/* Banner */}
      <div className="">
      <div className="relative h-40 rounded-2xl overflow-hidden mb-[-36px] bg-gradient-to-br from-sage-800 to-mint-500">
        <div className="absolute inset-0 opacity-[0.07]"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        {live && (
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-live text-white text-xs font-bold px-3 py-1.5 rounded-full">
            <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
            LIVE NOW
          </div>
        )}
      </div>

      {/* Event card */}
      <div className="relative z-10 bg-warm-white border-[1.5px] border-clay rounded-2xl px-6 pt-12 pb-6 mb-5">
        <h1 className="text-2xl font-extrabold text-sage-800 tracking-tight mb-3 leading-tight">
          {event.title}
        </h1>

        {event.description && (
          <p className="text-sm text-sage-400 leading-relaxed mb-5">
            {event.description}
          </p>
        )}

        <div className="flex flex-col gap-2.5">
          <span className="inline-flex items-center gap-2 text-sm text-sage-500 font-medium">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            {formatDate(event.startDate)}
          </span>
          <span className="inline-flex items-center gap-2 text-sm text-sage-500 font-medium">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            {formatTime(event.startDate)} – {formatTime(event.endDate)}
          </span>
          {event.location && (
            <span className="inline-flex items-center gap-2 text-sm text-sage-500 font-medium">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              {event.location}
            </span>
          )}
        </div>
      </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-between gap-3">
        {/* Sessions */}
        <Link
          href={`/events/${id}/sessions`}
          className="group flex items-center justify-between bg-warm-white border-[1.5px] border-clay rounded-xl px-5 py-4 hover:border-sage-400 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-8px_rgba(45,106,79,.15)] transition-all duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sage-50 border-[1.5px] border-sage-100 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-sage-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-sage-800">Voir les sessions</div>
              <div className="text-xs text-sage-400 mt-0.5">
                {event.sessions?.length ?? 0} session(s) au programme
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-sage-300 group-hover:text-sage-500 group-hover:translate-x-0.5 transition-all" />
        </Link>

        {/* Speakers */}
        <Link
          href={`/events/${id}/speakers`}
          className="group flex items-center justify-between bg-warm-white border-[1.5px] border-clay rounded-xl px-5 py-4 hover:border-sage-400 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-8px_rgba(45,106,79,.15)] transition-all duration-150"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-sage-50 border-[1.5px] border-sage-100 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-sage-500" />
            </div>
            <div>
              <div className="text-sm font-bold text-sage-800">Voir les speakers</div>
              <div className="text-xs text-sage-400 mt-0.5">
                Intervenants de cet événement
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-sage-300 group-hover:text-sage-500 group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}