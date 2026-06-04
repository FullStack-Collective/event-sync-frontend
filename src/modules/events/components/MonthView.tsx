'use client';

import Link from 'next/link';
import { Event } from '@/modules/events/types/event.types';

interface MonthViewProps {
  events: Event[];
  currentMonth: Date;
}

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const getMonthGrid = (date: Date): (Date | null)[] => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7; // lundi = 0
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;

  return Array.from({ length: totalCells }, (_, i) => {
    const dayNum = i - startOffset + 1;
    if (dayNum < 1 || dayNum > lastDay.getDate()) return null;
    return new Date(year, month, dayNum);
  });
};

const getEventPillColor = (event: Event): string => {
  if (event.isLive) return 'bg-live/20 text-live';
  const diffDays = Math.ceil(
    (new Date(event.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diffDays < 0)  return 'bg-sage-200 text-sage-800';
  if (diffDays <= 3) return 'bg-error/15 text-error';
  if (diffDays <= 7) return 'bg-ochre-100 text-ochre-700';
  return 'bg-mint-100 text-mint-800';
};

export const MonthView = ({ events, currentMonth }: MonthViewProps) => {
  const cells = getMonthGrid(currentMonth);
  const todayStr = new Date().toDateString();

  const getEventsForDay = (date: Date) => {
    const dayStr = date.toISOString().split('T')[0];
    return events.filter(
      (e) => new Date(e.startDate).toISOString().split('T')[0] === dayStr
    );
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-clay">
      {/* En-têtes */}
      <div className="grid grid-cols-7 bg-warm-white border-b border-clay">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`py-2 text-center text-xs font-semibold ${
              i >= 5 ? 'text-primary' : 'text-text-muted-light'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          const isToday = date?.toDateString() === todayStr;
          const dayEvents = date ? getEventsForDay(date) : [];
          const isCurrentMonth = date !== null;

          return (
            <div
              key={idx}
              className={[
                'min-h-[95px] p-1.5',
                'border-r border-b border-clay last-of-type:border-r-0',
                isCurrentMonth ? 'bg-warm-white' : 'bg-stone',
                isToday ? 'outline outline-[1.5px] outline-primary outline-offset-[-1.5px]' : '',
              ].join(' ')}
            >
              {date && (
                <>
                  <div
                    className={`text-xs text-right mb-1 font-medium ${
                      isToday ? 'text-primary font-bold' : 'text-text-muted-light'
                    }`}
                  >
                    {date.getDate()}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.map((event) => (
                      <Link
                        key={event.id}
                        href={`/events/${event.id}`}
                        className={`block px-1.5 py-0.5 rounded text-[11px] font-medium truncate hover:opacity-80 transition-opacity ${getEventPillColor(event)}`}
                      >
                        {new Date(event.startDate).toLocaleTimeString('fr-FR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        {event.title}
                      </Link>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};