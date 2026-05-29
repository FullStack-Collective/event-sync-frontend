'use client';

import Link from 'next/link';
import { Calendar, MapPin, MessageCircle, Users } from 'lucide-react';
import { Event } from '@/types/event.types';
import { cn, formatDate } from '@/shared/utils/format-date';

interface EventCardProps {
  event: Event;
  variant?: 'grid' | 'list';
  className?: string;
}

export const EventCard = ({ event, variant = 'grid', className }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id}`}>
      <div
        className={cn(
          'group bg-es-bg2 rounded-es overflow-hidden border border-es-text-dim/30',
          'hover:border-es-violet/50 hover:shadow-es-glow transition-all duration-300',
          variant === 'grid' ? 'flex flex-col' : 'flex gap-4',
          className
        )}
      >
        {/* Banner */}
        {event.bannerUrl && (
          <div
            className={cn(
              'relative overflow-hidden bg-gradient-primary',
              variant === 'grid' ? 'h-48' : 'h-32 w-48'
            )}
          >
            <img
              src={event.bannerUrl}
              alt={event.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        )}

        {/* Content */}
        <div className={cn('p-5', variant === 'list' && 'flex-1')}>
          {/* Badge Live */}
          {event.isLive && (
            <div className="mb-3 inline-flex items-center gap-2 px-2 py-1 rounded-full bg-es-live/20 text-es-live text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-es-live opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-es-live"></span>
              </span>
              LIVE
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-display font-bold text-es-text mb-2 group-hover:text-es-violet transition-colors line-clamp-1">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="text-es-text-muted text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
          )}

          {/* Meta info */}
          <div className="space-y-2 text-sm text-es-text-dim">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
            <div className="flex gap-4 pt-2">
              {event.totalSessions > 0 && (
                <div className="flex items-center gap-1 text-es-text-muted">
                  <Users className="h-3 w-3" />
                  <span className="text-xs">{event.totalSessions} sessions</span>
                </div>
              )}
              {event.totalQuestions > 0 && (
                <div className="flex items-center gap-1 text-es-text-muted">
                  <MessageCircle className="h-3 w-3" />
                  <span className="text-xs">{event.totalQuestions} questions</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};