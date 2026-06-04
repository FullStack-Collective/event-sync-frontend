import Link from 'next/link';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Event } from '@/modules/events/types/event.types';

interface EventCardProps {
  event: Event;
  variant?: 'grid' | 'list';
}

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const getBadgeColor = (event: Event) => {
  if (event.isLive) return 'bg-red-500/20 text-red-400 border-red-500/50';
  if (event.isUpcoming) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
  return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
};

const getBadgeText = (event: Event) => {
  if (event.isLive) return '🔴 EN DIRECT';
  if (event.isUpcoming) return '📅 À VENIR';
  return '✅ PASSÉ';
};

export const EventCard = ({ event, variant = 'grid' }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id}`}>
      <div className={`group bg-[#111128] rounded-2xl overflow-hidden border border-[#4a4a6a]/30 hover:border-[#7c3aed]/50 transition-all duration-300 hover:-translate-y-1 ${
        variant === 'list' ? 'flex gap-4' : ''
      }`}>
        <div className="p-5">
          <div className="mb-3">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold border ${getBadgeColor(event)}`}>
              {getBadgeText(event)}
            </span>
          </div>
          
          <h3 className="text-xl font-bold text-es-text mb-2 group-hover:text-[#7c3aed] transition line-clamp-1">
            {event.title}
          </h3>
          
          {event.description && (
            <p className="text-es-text-muted text-sm mb-4 line-clamp-2">
              {event.description}
            </p>
          )}
          
          <div className="space-y-2 text-sm text-es-text-dim">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(event.startDate).toLocaleDateString('fr-FR')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{formatTime(event.startDate)} - {formatTime(event.endDate)}</span>
            </div>
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="line-clamp-1">{event.location}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};