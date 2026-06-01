import { Event } from '@/types/event';
import { EventCard } from './EventCard';
import Link from 'next/link';

interface EventListProps {
  events: Event[];
  isPast: boolean;
  total: number;
  search?: string;
}

export const EventList = ({ events, isPast, total, search }: EventListProps) => {
  if (events.length === 0) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-4">{isPast ? '📁' : '🗓'}</div>
        <p className="text-lg mb-3" style={{ color: '#8b8aaa' }}>
          Aucun événement {isPast ? 'passé' : 'à venir'}
          {search && <span> pour "<strong>{search}</strong>"</span>}
        </p>
        <Link
          href={`/events?tab=${isPast ? 'upcoming' : 'past'}`}
          className="font-semibold"
          style={{ color: '#7c3aed', textDecoration: 'none' }}
        >
          Voir les événements {isPast ? 'à venir' : 'passés'} →
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Compteur */}
      <p className="text-sm mb-6" style={{ color: '#4a4a6a' }}>
        {total} événement{total > 1 ? 's' : ''}{' '}
        {isPast ? 'passé' : 'à venir'}{total > 1 ? 's' : ''}
        {search && (
          <span> · "<span style={{ color: '#8b8aaa' }}>{search}</span>"</span>
        )}
      </p>

      {/* Grille */}
      <div
        className="grid gap-6"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}
      >
        {events.map((event) => (
          <EventCard key={event.id} event={event} isPast={isPast} />
        ))}
      </div>
    </>
  );
};