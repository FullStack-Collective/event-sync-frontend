'use client';

import Link from 'next/link';
import { Event } from '@/modules/events/types/event.types';

interface WeekViewProps {
  events: Event[];
  currentWeek: Date;
  onWeekChange: (d: Date) => void;
}

const getWeekDays = (weekStart: Date): Date[] => {
  const start = new Date(weekStart);
  const diff = (start.getDay() + 6) % 7;
  start.setDate(start.getDate() - diff);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const getEventStyle = (event: Event) => {
  const now = Date.now();
  const start = new Date(event.startDate).getTime();
  const end = new Date(event.endDate).getTime();
  if (now >= start && now <= end)
    return { classes: 'bg-error/15 border-error text-red-700', isLive: true };
  const diff = Math.ceil((start - now) / (1000 * 60 * 60 * 24));
  if (diff > 0 && diff <= 3)
    return { classes: 'bg-ochre-100 border-ochre-400 text-ochre-700', isLive: false };
  return { classes: 'bg-sage-50 border-sage-300 text-sage-700', isLive: false };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WeekView = ({ events, currentWeek, onWeekChange }: WeekViewProps) => {
  const weekDays = getWeekDays(currentWeek);
  const todayStr = new Date().toDateString();

  const getEventsForDay = (day: Date) => {
    const dayStr = day.toISOString().split('T')[0];
    return events.filter((e) => new Date(e.startDate).toISOString().split('T')[0] === dayStr);
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border-[1.5px] border-white animate-[fadeUp_.4s_cubic-bezier(.2,.9,.4,1)_both]">
      <div className="grid grid-cols-7 bg-gray-400 border-b-[1.5px] border-white text-sage-800">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((name, i) => (
          <div
            key={name}
            className={`py-2.5 text-center border-r border-white last:border-r-0 ${i >= 5 ? 'text-sage-600' : 'text-sage-600'}`}
          >
            <div className="text-[11px] font-bold tracking-widest uppercase">{name}</div>
            <div className="text-xs text-sage-800 mt-0.5">
              {weekDays[i].toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 bg-gray-300">
        {weekDays.map((day, idx) => {
          const isToday = day.toDateString() === todayStr;
          const dayEvents = getEventsForDay(day);
          return (
            <div
              key={idx}
              className={[
                'min-h-[120px] p-1.5 border-r border-b border-clay last:border-r-0 transition-colors',
                isToday
                  ? 'bg-gray-100  outline-sage-500 outline-offset-[-2px]'
                  : 'bg-gray-200 hover:bg-sage-50/50',
              ].join(' ')}
            >
              <div className="space-y-1">
                {dayEvents.map((event) => {
                  const { classes, isLive } = getEventStyle(event);
                  return (
                    <Link
                      key={event.id}
                      href={`/events/${event.id}`}
                      className={`block p-1.5 rounded-[4px] text-xs border font-semibold transition-transform hover:scale-[1.03] ${classes}`}
                    >
                      <div className="flex items-center gap-1 truncate">
                        {isLive && <span className="w-1.5 h-1.5 rounded-full bg-error flex-shrink-0 animate-ping" />}
                        <span className="truncate">{event.title}</span>
                      </div>
                      <div className="text-[10px] opacity-60 mt-0.5">
                        {new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};