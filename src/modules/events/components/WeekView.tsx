'use client';

import Link from 'next/link';
import { Event } from '@/modules/events/types/event.types';

interface WeekViewProps {
  events: Event[];
  currentWeek: Date;
  onWeekChange: (newWeek: Date) => void;
}

const getWeekDays = (weekStart: Date): Date[] => {
  const start = new Date(weekStart);
  const diff = (start.getDay() + 6) % 7; // lundi = 0
  start.setDate(start.getDate() - diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const getEventColor = (event: Event): string => {
  if (event.isLive) return 'bg-live/20 border-live text-live';
  const diff = Math.ceil(
    (new Date(event.startDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  if (diff <= 0) return 'bg-sage-200 border-sage-400 text-sage-800';
  if (diff <= 3) return 'bg-error/15 border-error/40 text-error';
  if (diff <= 7) return 'bg-ochre-100 border-ochre-300 text-ochre-700';
  return 'bg-mint-100 border-mint-300 text-mint-800';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WeekView = ({ events, currentWeek, onWeekChange }: WeekViewProps) => {
  const weekDays = getWeekDays(currentWeek);
  const todayStr = new Date().toDateString();

  const getEventsForDay = (day: Date) => {
    const dayStr = day.toISOString().split('T')[0];
    return events.filter(
      (e) => new Date(e.startDate).toISOString().split('T')[0] === dayStr
    );
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-clay">
      {/* En-têtes */}
      <div className="grid grid-cols-7 bg-warm-white border-b border-clay">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((name, i) => (
          <div
            key={name}
            className={`py-2 text-center border-r border-clay last:border-r-0 ${
              i >= 5 ? 'text-primary' : 'text-text-muted-light'
            }`}
          >
            <div className="text-xs font-semibold">{name}</div>
            <div className="text-xs text-text-dim mt-0.5">
              {weekDays[i].toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </div>
          </div>
        ))}
      </div>

      {/* Cellules */}
      <div className="grid grid-cols-7">
        {weekDays.map((day, idx) => {
          const isToday = day.toDateString() === todayStr;
          const dayEvents = getEventsForDay(day);

          return (
            <div
              key={idx}
              className={[
                'min-h-[120px] p-1.5 border-r border-b border-clay last:border-r-0',
                isToday
                  ? 'bg-warm-white outline outline-[1.5px] outline-primary outline-offset-[-1.5px]'
                  : 'bg-warm-white',
              ].join(' ')}
            >
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className={`block p-1.5 rounded text-xs border hover:opacity-80 transition-opacity ${getEventColor(event)}`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-[10px] opacity-70 mt-0.5">
                      {new Date(event.startDate).toLocaleTimeString('fr-FR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};