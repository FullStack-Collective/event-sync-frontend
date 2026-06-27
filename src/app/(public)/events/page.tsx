'use client';

import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { WeekView } from '@/modules/events/components/WeekView';
import { MonthView } from '@/modules/events/components/MonthView';
import { eventService } from '@/modules/events/services/event.service';
import { Event } from '@/modules/events/types/event.types';
import { ArrowRight } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';
type ViewMode = 'month' | 'week';
type FilterMode = 'all' | 'live' | 'soon' | 'future';
const getEventStatus = (event: Event): 'live' | 'soon' | 'future' | 'past' => {
  const now = new Date();
  const nowTime = now.getTime();
  const start = new Date(event.startDate);
  const startTime = start.getTime();
  const end = new Date(event.endDate).getTime();

  if (nowTime >= startTime && nowTime <= end) return 'live';
  
  if (startTime < nowTime) return 'past';

  const isSameMonth = 
    start.getFullYear() === now.getFullYear() && 
    start.getMonth() === now.getMonth();

  if (isSameMonth) return 'soon';

  return 'future';
};

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterMode>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await eventService.getAll({ limit: 100, status: 'all' });
        if (response.success) setEvents(response.data);
        else setError('Impossible de charger les événements');
      } catch {
        setError('Une erreur est survenue lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((e) => {
    const matchSearch =
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.description?.toLowerCase().includes(search.toLowerCase()) ||
      e.location?.toLowerCase().includes(search.toLowerCase());

    const status = getEventStatus(e);
    const matchFilter =
      filter === 'all' ||
      (filter === 'live' && status === 'live') ||
      (filter === 'soon' && status === 'soon') ||
      (filter === 'future' && status === 'future');

    return matchSearch && matchFilter;
  });

  const getMonthLabel = () =>
    currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigate = (direction: 1 | -1) => {
    const d = new Date(currentDate);
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    viewMode === 'month'
      ? d.setMonth(d.getMonth() + direction)
      : d.setDate(d.getDate() + 7 * direction);
    setCurrentDate(d);
  };

  const FILTERS: { key: FilterMode; label: string; extra?: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'Live' },
    { key: 'soon', label: 'Upcoming' },
  ];

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sage-400 text-sm">Chargement du calendrier…</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="text-center py-12">
      <div className="bg-error/10 border border-error/30 rounded-2xl p-8 max-w-md mx-auto">
        <p className="text-error mb-4">{error}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">
          Réessayer
        </button>
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 mt-[-2vw]">

      <div className="relative mb-3 ">
        <Search className="absolute left-3.5 top-1/2 ml-[25rem] -translate-y-1/2 w-4 h-4 text-sage-300 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events ...."
          className="text-green-300 ml-[25rem] border-[1.5px] border-clay rounded-xl pl-10 pr-4 py-2.5 text-sm  placeholder:text-sage-300 outline-none focus:border-sage-400 focus:shadow-[0_0_0_3px_rgba(45,106,79,0.08)] transition-all"
        />
      </div>



      <div className="flex items-center justify-between bg-gray-800 border-[1.5px] border-gray-600 rounded-xl px-4 py-2.5 mb-3 gap-3 flex-wrap">
        <div className="flex rounded-lg overflow-hidden border-[1.5px] border-gray-600">
          {(['month', 'week'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={[
                'px-5 py-1.5 text-sm font-bold transition-all',
                viewMode === mode
                  ? 'bg-sage-800 text-white'
                  : 'bg-transparent text-white hover:bg-sage-800',
              ].join(' ')}
            >
              {mode === 'month' ? 'Month' : 'Week'}
            </button>
          ))}
        </div>

        <div className="flex gap-2 mb-3 flex-wrap bg-gray-800 rounded-lg p-2 ">
        {FILTERS.map(({ key, label }) => {
          const isActive = filter === key;
          const isLive = key === 'live';
          const isSoon = key === 'soon';
          return (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={[
                'flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold border-[1.5px] transition-all duration-150',
                isActive && isLive
                  ? 'bg-live border-live text-white'
                  : isActive && isSoon
                  ? 'bg-ochre-500 border-ochre-500 text-white'
                  : isActive
                  ? 'bg-sage-500 border-sage-500 text-white'
                  : isLive
                  ? 'bg-warm-white border-live text-live hover:bg-live/10'
                  : isSoon
                  ? 'bg-warm-white border-ochre-500 text-ochre-600 hover:bg-ochre-50'
                  : 'bg-warm-white border-clay text-sage-500 hover:border-sage-400 hover:bg-sage-50',
              ].join(' ')}
            >
              {isLive && (
                <span className="w-1.5 h-1.5 rounded-full bg-live animate-pulse inline-block" />
              )}
              {label}
            </button>
          );
        })}
      </div>
      <div className="flex items-center gap-2">
          {[
            { label: <span className="flex items-center"><ArrowLeft />Past</span>, fn: () => navigate(-1) },
            { label: 'Today', fn: () => setCurrentDate(new Date()) },
            { label: <span className="flex items-center"> Next <ArrowRight className=" text-[8px]" /></span> , fn: () => navigate(1) },
          ].map(({ label, fn }) => (
            <button
              key={label}
              onClick={fn}
              className="px-3 py-1.5 text-sm font-bold bg-warm-white border-[1.5px] border-sage-800 rounded-lg text-sage-800 hover:bg-sage-800 hover:text-white transition-all duration-150"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <span className=" font-bold text-white tracking-tight ml-[29rem] text-2xl">
          {getMonthLabel()}
      </span>

       {viewMode === 'month' ? (
        <MonthView events={filteredEvents} currentMonth={currentDate} />
      ) : (
        <WeekView events={filteredEvents} currentWeek={currentDate} onWeekChange={setCurrentDate} />
      )}

       <div className="flex gap-5 mt-3 flex-wrap">
        {[
          { color: 'bg-error/20 border-error/50', label: 'Live' },
          { color: 'bg-ochre-100 border-ochre-500/50', label: 'In the month' },
          { color: 'bg-sage-100 border-sage-500/50', label: 'Next month' },
        ].map(({ color, label }) => (
          <div key={label} className="flex items-center gap-2 text-xs font-semibold text-sage-500">
            <div className={`w-3 h-3 rounded-[3px] border ${color}`} />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}