'use client';

import Link from 'next/link';
import { Event } from '@/modules/events/types/event.types';

interface WeekViewProps {
  events: Event[];
  currentWeek: Date;
  onWeekChange: (newWeek: Date) => void;
}

const getWeekDays = (weekStart: Date): Date[] => {
  const days: Date[] = [];
  const start = new Date(weekStart);
  
  const dayOfWeek = start.getDay();
  const diff = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  start.setDate(start.getDate() - diff);
  
  for (let i = 0; i < 7; i++) {
    const day = new Date(start);
    day.setDate(start.getDate() + i);
    days.push(day);
  }
  return days;
};

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
};

const getEventColor = (event: Event): string => {
  const today = new Date();
  const eventDate = new Date(event.startDate);
  const diffDays = Math.ceil((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  if (event.isLive) return 'bg-green-500/20 border-green-500 text-green-400';
  if (diffDays === 0) return 'bg-yellow-500/20 border-yellow-500 text-yellow-400';
  if (diffDays <= 3) return 'bg-red-500/20 border-red-500 text-red-400';
  if (diffDays <= 7) return 'bg-orange-500/20 border-orange-500 text-orange-400';
  return 'bg-[#7c3aed]/20 border-[#7c3aed] text-[#a855f7]';
};

export const WeekView = ({ events, currentWeek, onWeekChange }: WeekViewProps) => {
  const weekDays = getWeekDays(currentWeek);
  
  const getEventsForDay = (day: Date): Event[] => {
    const dayStr = day.toISOString().split('T')[0];
    return events.filter(event => {
      const eventDay = new Date(event.startDate).toISOString().split('T')[0];
      return eventDay === dayStr;
    });
  };

  const goToPreviousWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() - 7);
    onWeekChange(newWeek);
  };

  const goToNextWeek = () => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + 7);
    onWeekChange(newWeek);
  };

  const goToToday = () => {
    onWeekChange(new Date());
  };

  return (
    <div className="w-full">
       <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#4a4a6a]/30">
        <div className="flex items-center gap-3">
          <button
            onClick={goToPreviousWeek}
            className="px-3 py-1 rounded-lg bg-[#111128] text-[#8b8aaa] hover:text-white transition"
          >
            ← Last Week
          </button>
          <button
            onClick={goToToday}
            className="px-3 py-1 rounded-lg bg-[#7c3aed]/20 text-[#7c3aed] hover:bg-[#7c3aed]/30 transition"
          >
            Today
          </button>
          <button
            onClick={goToNextWeek}
            className="px-3 py-1 rounded-lg bg-[#111128] text-[#8b8aaa] hover:text-white transition"
          >
            Next Week →
          </button>
        </div>
        <div className="text-es-text font-semibold">
          {formatDate(weekDays[0])} - {formatDate(weekDays[6])} {weekDays[0].getFullYear()}
        </div>
      </div>

       <div className="grid grid-cols-7 gap-2">
         {['MON', 'TUE', 'WEN', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
          <div
            key={day}
            className="text-center py-2 text-sm font-semibold text-[#8b8aaa] border-b border-[#4a4a6a]/30"
          >
            {day}
            <div className="text-xs mt-1 text-[#4a4a6a]">
              {formatDate(weekDays[idx])}
            </div>
          </div>
        ))}

         {weekDays.map((day, idx) => {
          const dayEvents = getEventsForDay(day);
          const isToday = day.toDateString() === new Date().toDateString();
          
          return (
            <div
              key={idx}
              className={`min-h-[120px] p-2 rounded-lg ${
                isToday ? 'bg-[#7c3aed]/10 border border-[#7c3aed]/30' : 'bg-[#111128]/50'
              }`}
            >
              <div className={`text-xs text-right mb-2 ${isToday ? 'text-[#7c3aed]' : 'text-[#4a4a6a]'}`}>
                {formatDate(day)}
              </div>
              <div className="space-y-1">
                {dayEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className={`block p-1.5 rounded text-xs border transition-all hover:scale-105 ${getEventColor(event)}`}
                  >
                    <div className="font-medium truncate">{event.title}</div>
                    <div className="text-[10px] opacity-75">
                      {new Date(event.startDate).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
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