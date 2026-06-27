'use client';

import Link from 'next/link';
import { Event } from '@/modules/events/types/event.types';
import { parseUTCDate, formatUTCDate, isLiveUTC, getDaysDiff } from '@/shared/utils/format-date';

interface MonthViewProps {
  events: Event[];
  currentMonth: Date;
}

const DAY_NAMES = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

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

/**
 * Get event style based on status using Sage Green palette
 */
const getEventStyle = (event: Event) => {
  const diffDays = getDaysDiff(event.startDate);
  const isLive = isLiveUTC(event.startDate, event.endDate);
  
  // LIVE EVENT - Live green
  if (isLive) {
    return {
      classes: 'bg-live/15 border-l-[3px] border-live text-live hover:bg-live/25',
      isLive: true,
    };
  }
  
  // Today but not started yet - Accent (Ochre)
  if (diffDays === 0) {
    return { 
      classes: 'bg-accent/15 border-l-[3px] border-accent text-accent hover:bg-accent/25', 
      isLive: false,
    };
  }
  
  // Within next 7 days - Warning (Ochre lighter)
  if (diffDays <= 7 && diffDays > 0) {
    return { 
      classes: 'bg-warning/10 border-l-[3px] border-warning text-warning hover:bg-warning/20', 
      isLive: false,
    };
  }
  
  // Far future (> 7 days) - Secondary (Mint)
  if (diffDays > 7) {
    return { 
      classes: 'bg-secondary/10 border-l-[3px] border-secondary text-secondary hover:bg-secondary/20', 
      isLive: false,
    };
  }
  
  // Past event - Muted text
  return { 
    classes: 'bg-text-muted/10 border-l-[3px] border-text-muted text-text-muted hover:bg-text-muted/20', 
    isLive: false,
  };
};

export const MonthView = ({ events, currentMonth }: MonthViewProps) => {
  const cells = getMonthGrid(currentMonth);
  const todayStr = new Date().toDateString();

  const getEventsForDay = (date: Date): Event[] => {
    const dayYear = date.getFullYear();
    const dayMonth = date.getMonth();
    const dayDate = date.getDate();

    return events.filter((event) => {
      const eventDate = parseUTCDate(event.startDate);
      return (
        eventDate.getFullYear() === dayYear &&
        eventDate.getMonth() === dayMonth &&
        eventDate.getDate() === dayDate
      );
    });
  };

  return (
    <div className="w-full rounded-xl overflow-hidden border border-border bg-bg">
      {/* Day Headers */}
      <div className="grid grid-cols-7 bg-bg-surface/50 border-b border-border">
        {DAY_NAMES.map((day, i) => (
          <div
            key={day}
            className={`py-3 text-center text-[11px] font-bold tracking-wider uppercase ${
              i >= 5 ? 'text-text-muted' : 'text-text-dim'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Days Grid */}
      <div className="grid grid-cols-7">
        {cells.map((date, idx) => {
          const isToday = date?.toDateString() === todayStr;
          const dayEvents = date ? getEventsForDay(date) : [];

          return (
            <div
              key={idx}
              className={[
                'min-h-[100px] p-2 border-r border-b border-border last:border-r-0 transition-all duration-200',
                !date ? 'bg-bg/40' : isToday ? 'bg-primary/10 ring-1 ring-primary/30' : 'bg-bg hover:bg-bg-surface/30',
              ].join(' ')}
            >
              {date && (
                <>
                  {/* Day number */}
                  <div className={`text-xs text-right mb-2 font-mono ${
                    isToday ? 'text-primary font-bold' : 'text-text-dim'
                  }`}>
                    {date.getDate()}
                  </div>
                  
                  {/* Events list */}
                  <div className="space-y-1.5">
                    {dayEvents.map((event) => {
                      const { classes, isLive } = getEventStyle(event);
                      const eventTime = formatUTCDate(event.startDate, 'time');
                      
                      return (
                        <Link
                          key={event.id}
                          href={`/events/${event.id}`}
                          className={`block px-2 py-1.5 rounded-md text-[11px] font-medium transition-all duration-200 hover:translate-x-0.5 ${classes}`}
                        >
                          <div className="flex items-center gap-1.5">
                            {/* Live indicator */}
                            {isLive && (
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-live opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-live"></span>
                              </span>
                            )}
                            {/* Time */}
                            <span className="text-[10px] opacity-70 font-mono">
                              {eventTime}
                            </span>
                            {/* Title */}
                            <span className="truncate flex-1">
                              {event.title}
                            </span>
                          </div>
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