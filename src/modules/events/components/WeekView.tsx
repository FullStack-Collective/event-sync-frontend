'use client';

import Link from 'next/link';
import { Event } from '@/modules/events/types/event.types';
import { parseUTCDate, formatUTCDate, isLiveUTC, getDaysDiff } from '@/shared/utils/format-date';

interface WeekViewProps {
  events: Event[];
  currentWeek: Date;
  onWeekChange: (newWeek: Date) => void;
}

const getWeekDays = (weekStart: Date): Date[] => {
  const start = new Date(weekStart);
  const dayOfWeek = start.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  start.setDate(start.getDate() - diff);
  
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
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
      isLive: true 
    };
  }
  
  // Today but not started yet - Accent (Ochre)
  if (diffDays === 0) {
    return { 
      classes: 'bg-accent/15 border-l-[3px] border-accent text-accent hover:bg-accent/25', 
      isLive: false 
    };
  }
  
  // Within next 7 days - Warning (Ochre lighter)
  if (diffDays <= 7 && diffDays > 0) {
    return { 
      classes: 'bg-warning/10 border-l-[3px] border-warning text-warning hover:bg-warning/20', 
      isLive: false 
    };
  }
  
  // Far future (> 7 days) - Secondary (Mint)
  if (diffDays > 7) {
    return { 
      classes: 'bg-secondary/10 border-l-[3px] border-secondary text-secondary hover:bg-secondary/20', 
      isLive: false 
    };
  }
  
  // Past event - Muted text
  return { 
    classes: 'bg-text-muted/10 border-l-[3px] border-text-muted text-text-muted hover:bg-text-muted/20', 
    isLive: false 
  };
};

export const WeekView = ({ events, currentWeek }: WeekViewProps) => {
  const weekDays = getWeekDays(currentWeek);
  const todayStr = new Date().toDateString();

  const getEventsForDay = (day: Date): Event[] => {
    const dayYear = day.getFullYear();
    const dayMonth = day.getMonth();
    const dayDate = day.getDate();

    return events.filter((event) => {
      const eventDate = parseUTCDate(event.startDate);
      return (
        eventDate.getFullYear() === dayYear &&
        eventDate.getMonth() === dayMonth &&
        eventDate.getDate() === dayDate
      );
    });
  };

  const isWeekend = (date: Date): boolean => {
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-7 gap-3">
        {/* Day Headers */}
        {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => {
          const isWeekendDay = idx >= 5;
          return (
            <div
              key={day}
              className={`text-center py-2 text-xs font-bold tracking-wider border-b ${
                isWeekendDay 
                  ? 'text-text-muted border-border' 
                  : 'text-text-dim border-border'
              }`}
            >
              {day}
              <div className="text-[10px] mt-1 font-normal text-text-dim">
                {formatDate(weekDays[idx])}
              </div>
            </div>
          );
        })}

        {/* Day Cells */}
        {weekDays.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const isToday = day.toDateString() === todayStr;
          const isWeekendDay = isWeekend(day);
          
          return (
            <div
              key={idx}
              className={`min-h-[140px] p-2 rounded-xl transition-all duration-200 ${
                isToday 
                  ? 'bg-primary/10 ring-1 ring-primary/30' 
                  : 'bg-bg hover:bg-bg-surface/30'
              }`}
            >
              {/* Day indicator */}
              <div className={`text-right text-[10px] mb-2 font-mono ${
                isToday ? 'text-primary' : isWeekendDay ? 'text-text-muted' : 'text-text-dim'
              }`}>
                {isToday && <span className="mr-1">●</span>}
              </div>
              
              {/* Events list */}
              <div className="space-y-1.5">
                {dayEvents.length === 0 ? (
                  <div className="text-center text-text-dim text-[10px] py-2">
                    —
                  </div>
                ) : (
                  dayEvents.map((event) => {
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
                          {/* Event time */}
                          <span className="text-[10px] opacity-70 font-mono">
                            {eventTime}
                          </span>
                          {/* Event title */}
                          <span className="truncate flex-1">
                            {event.title}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};