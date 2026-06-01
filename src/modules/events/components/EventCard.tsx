import Link from 'next/link';
import { Event } from '@/types/event';

interface EventCardProps {
  event: Event;
  isPast?: boolean;
}

export const EventCard = ({ event, isPast = false }: EventCardProps) => {
  return (
    <Link href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group h-full"
        style={{
          backgroundColor: '#111128',
          border: '1px solid rgba(74,74,106,0.3)',
          opacity: isPast ? 0.82 : 1,
        }}
      >
        {/* Banner ou barre colorée */}
        {event.bannerUrl ? (
          <div className="overflow-hidden" style={{ height: '160px' }}>
            <img
              src={event.bannerUrl}
              alt={event.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        ) : (
          <div style={{
            height: '6px',
            background: isPast
              ? 'linear-gradient(90deg, #4a4a6a, #8b8aaa)'
              : 'linear-gradient(90deg, #7c3aed, #ff005d)',
          }} />
        )}

        <div className="p-5">
          {/* Badges */}
          <div className="flex gap-2 mb-3 flex-wrap">
            {event.isLive && (
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold"
                style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22c55e' }} />
                LIVE
              </span>
            )}
            {isPast && (
              <span
                className="px-2.5 py-1 rounded-full text-xs font-semibold"
                style={{ backgroundColor: 'rgba(74,74,106,0.3)', color: '#8b8aaa' }}
              >
                TERMINÉ
              </span>
            )}
          </div>

          {/* Titre */}
          <h3
            className="font-bold text-lg mb-2 line-clamp-1 transition-colors duration-200 group-hover:text-purple-400"
            style={{ color: '#f1f0ff' }}
          >
            {event.title}
          </h3>

          {/* Description */}
          {event.description && (
            <p className="text-sm mb-4 line-clamp-2" style={{ color: '#8b8aaa', lineHeight: 1.6 }}>
              {event.description}
            </p>
          )}

          {/* Meta */}
          <div className="text-sm flex flex-col gap-1.5" style={{ color: '#4a4a6a' }}>
            <span>
              📅 {new Date(event.startDate).toLocaleDateString('fr-FR', {
                day: 'numeric', month: 'long', year: 'numeric',
              })}
            </span>
            {event.location && <span>📍 {event.location}</span>}
            {(event.totalSessions > 0 || event.totalQuestions > 0) && (
              <div
                className="flex gap-4 pt-2 mt-1"
                style={{ borderTop: '1px solid rgba(74,74,106,0.2)' }}
              >
                {event.totalSessions > 0 && (
                  <span style={{ color: '#8b8aaa' }}>🎯 {event.totalSessions} sessions</span>
                )}
                {event.totalQuestions > 0 && (
                  <span style={{ color: '#8b8aaa' }}>💬 {event.totalQuestions} questions</span>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};