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
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((startOffset + lastDay.getDate()) / 7) * 7;
  return Array.from({ length: totalCells }, (_, i) => {
    const n = i - startOffset + 1;
    return n >= 1 && n <= lastDay.getDate() ? new Date(year, month, n) : null;
  });
};

const getEventStyle = (event: Event) => {
  const now = new Date();
  const nowTime = now.getTime();
  const start = new Date(event.startDate);
  const startTime = start.getTime();
  const end = new Date(event.endDate).getTime();

  if (nowTime >= startTime && nowTime <= end) {
    return {
      classes: 'bg-error/15 text-red-700 border-l-[2.5px] border-error',
      isLive: true,
    };
  }

  const isSameMonth = 
    start.getFullYear() === now.getFullYear() && 
    start.getMonth() === now.getMonth();

  if (startTime > nowTime && isSameMonth) {
    return { 
      classes: 'bg-ochre-100 text-ochre-700 border-l-[2.5px] border-ochre-500', 
      isLive: false 
    };
  }
  
  return { 
    classes: 'bg-sage-50 text-sage-700 border-l-[2.5px] border-sage-400', 
    isLive: false 
  };
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
    <div className="w-full rounded-xs overflow-hidden border-[1.5px] border-clay animate-[fadeUp_.4s_cubic-bezier(.2,.9,.4,1)_both] bg-gray-100">
      {/* En-têtes */}
      <div className="grid grid-cols-7 bg-gray-400 border-b-[1.5px] border-gray-400">
        {DAY_NAMES.map((d, i) => (
          <div
            key={d}
            className={`py-2.5 text-center  text-[11px] font-bold tracking-widest uppercase ${
              i >= 5 ? 'text-sage-500' : 'text-mint-800'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-7 ">
        {cells.map((date, idx) => {
          const isToday = date?.toDateString() === todayStr;
          const dayEvents = date ? getEventsForDay(date) : [];

          return (
            <div
              key={idx}
              className={[
                'min-h-[100px]  p-1.5 border-r border-b border-white last:border-r-0 transition-colors duration-150',
                !date ? 'bg-stone/60' : isToday ? 'bg-gray-200' : 'bg-gray-300 hover:bg-sage-50/50',
                isToday ? ' outline-sage-500 outline-offset-[-2px]' : '',
              ].join(' ')}
            >
              {date && (
                <>
                  <div className={`text-xs text-right mb-1 font-semibold ${isToday ? 'text-sage-500' : 'text-sage-300'}`}>
                    {date.getDate()}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.map((event) => {
                      const { classes, isLive } = getEventStyle(event);
                      return (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          className={`block px-1.5 py-0.5 rounded-[4px] text-[11px] font-semibold truncate transition-transform hover:scale-[1.03] ${classes} ${isLive ? 'animate-pulse' : ''}`}
                        >
                          {isLive && <span className="inline-block w-1.5 h-1.5 rounded-full bg-error align-middle mr-1 animate-ping" />}
                          {new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}{' '}
                          {event.title}
                        </Link>
                      );
                    })}
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