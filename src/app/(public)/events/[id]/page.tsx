'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Layers, Users, ChevronRight } from 'lucide-react';
import { eventService } from '@/modules/events/services/event.service';
import { Event } from '@/modules/events/types/event.types';
import { parseUTCDate, isLiveUTC } from '@/shared/utils/format-date';

const formatDate = (dateString: string) => {
  const date = parseUTCDate(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'long',
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
};

const formatTime = (dateString: string) => {
  const date = parseUTCDate(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const getDuration = (start: string, end: string) => {
  const startDate = parseUTCDate(start);
  const endDate = parseUTCDate(end);
  const diffHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;
};

export default function EventDetailPage() {
  const { id } = useParams<{ id: string }>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await eventService.getById(parseInt(id));
        if (res.success) setEvent(res.data);
        else setError('Event not found');
      } catch {
        setError('Error loading event');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (error || !event) return (
    <div className="text-center py-20">
      <p className="text-error mb-4">{error ?? 'Event not found'}</p>
       
    </div>
  );

  const isLive = isLiveUTC(event.startDate, event.endDate);
  const duration = getDuration(event.startDate, event.endDate);

  return (
    <div className="container-custom py-8 max-w-4xl">
   

       <div className="relative h-48 rounded-xl overflow-hidden mb-[-32px] bg-gradient-sage">
         <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")` }}
        />
        
         {isLive && (
          <div className="absolute bottom-4 left-4">
            <span className="live-badge">
              LIVE NOW
            </span>
          </div>
        )}
      </div>

       <div className="relative z-10 card p-6 pt-12">
         <h1 className="text-2xl md:text-3xl font-display font-bold text-text tracking-tight mb-3 leading-tight">
          {event.title}
        </h1>

         {event.description && (
          <p className="text-sm text-text-muted leading-relaxed mb-5">
            {event.description}
          </p>
        )}

         <div className="flex flex-wrap gap-x-5 gap-y-3 pb-4 border-b border-border">
          <div className="inline-flex items-center gap-2 text-sm text-text-muted">
            <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
            {formatDate(event.startDate)}
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-text-muted">
            <Clock className="w-4 h-4 text-primary flex-shrink-0" />
            {formatTime(event.startDate)} — {formatTime(event.endDate)}
          </div>
          {event.location && (
            <div className="inline-flex items-center gap-2 text-sm text-text-muted">
              <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
              {event.location}
            </div>
          )}
          <div className="inline-flex items-center gap-2 text-sm text-text-dim">
            <Clock className="w-4 h-4 text-text-dim flex-shrink-0" />
            Duration: {duration}
          </div>
        </div>

         <div className="flex gap-8 pt-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{event.totalSessions}</p>
            <p className="text-xs text-text-muted">Sessions</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{event.totalQuestions}</p>
            <p className="text-xs text-text-muted">Questions</p>
          </div>
        </div>
      </div>

       <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Link
          href={`/events/${id}/sessions`}
          className="flex items-center justify-between bg-bg-surface border border-border rounded-xl px-5 py-4 hover:border-primary/50 hover:bg-bg-surface/80 transition-all duration-200 flex-1 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-text">View Sessions</div>
              <div className="text-xs text-text-muted mt-0.5">
                {event.sessions?.length ?? 0} session(s) in program
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-text-dim group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>

        <Link
          href={`/events/${id}/speakers`}
          className="flex items-center justify-between bg-bg-surface border border-border rounded-xl px-5 py-4 hover:border-primary/50 hover:bg-bg-surface/80 transition-all duration-200 flex-1 group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-text">View Speakers</div>
              <div className="text-xs text-text-muted mt-0.5">
                Event speakers
              </div>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-text-dim group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
        </Link>
      </div>
    </div>
  );
}