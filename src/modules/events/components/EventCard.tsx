import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '@/modules/events/types/event.types';

interface EventCardProps {
  event: Event;
  variant?: 'grid' | 'list';
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
  });

const formatTime = (date: string) =>
  new Date(date).toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });

const getBadge = (event: Event) => {
  if (event.isLive)
    return { label: 'EN DIRECT', classes: 'bg-live/15 text-live border-live/30' };
  if (event.isUpcoming)
    return { label: 'À VENIR', classes: 'bg-sage-100 text-sage-600 border-sage-200' };
  return { label: 'PASSÉ', classes: 'bg-clay text-text-muted-light border-clay' };
};

export const EventCard = ({ event, variant = 'grid' }: EventCardProps) => {
  const badge = getBadge(event);

  return (
    <Link href={`/events/${event.id}`}>
      <div
        className={`group bg-warm-white border border-clay rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-200 ${
          variant === 'list' ? 'flex' : ''
        }`}
      >
        {/* Banner */}
        <div className="h-24 bg-sage-100 flex items-center justify-center">
          <Calendar className="w-8 h-8 text-sage-400" />
        </div>

        <div className="p-5">
          {/* Badge */}
          <span
            className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border mb-3 ${badge.classes}`}
          >
            {badge.label}
          </span>

          {/* Titre */}
          <h3 className="text-base font-bold text-text-light mb-1 group-hover:text-primary transition line-clamp-1">
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="text-sm text-text-muted-light mb-4 line-clamp-2 leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Métadonnées */}
          <div className="space-y-1.5 text-xs text-text-muted-light">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>{formatDate(event.startDate)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span>
                {formatTime(event.startDate)} – {formatTime(event.endDate)}
              </span>
            </div>
            {event.location && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};