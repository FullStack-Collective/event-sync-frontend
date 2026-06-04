'use client';

import { useState, useEffect } from 'react';
import { WeekView } from '@/modules/events/components/WeekView';
import { MonthView } from '@/modules/events/components/MonthView';
import { eventService } from '@/modules/events/services/event.service';
import { Event } from '@/modules/events/types/event.types';

type ViewMode = 'month' | 'week';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [search, setSearch] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await eventService.getAll({ limit: 100, status: 'all' });
        if (response.success) {
          setEvents(response.data);
        } else {
          setError('Impossible de charger les événements');
        }
      } catch (err) {
        console.error('Erreur:', err);
        setError('Une erreur est survenue lors du chargement');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.description?.toLowerCase().includes(search.toLowerCase()) ||
    e.location?.toLowerCase().includes(search.toLowerCase())
  );

  const getMonthLabel = () =>
    currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const navigate = (direction: 1 | -1) => {
    const d = new Date(currentDate);
    if (viewMode === 'month') {
      d.setMonth(d.getMonth() + direction);
    } else {
      d.setDate(d.getDate() + 7 * direction);
    }
    setCurrentDate(d);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Chargement du calendrier...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-error/10 border border-error/30 rounded-2xl p-8 max-w-md mx-auto">
          <p className="text-error mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="btn-primary">
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gap-2 flex flex-col p-10">
      {/* Barre de recherche */}
      <div className="flex justify-between p-2 bg-amber-400 rounded-3xl">
         <div className=" p-4 w-71">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full bg-warm-white border border-clay rounded-lg p-4 text-sm  text-gray-400 outline-none focus:border-primary/60 transition"
        />
      </div>

       <div className=" p-4 w-71">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search events..."
          className="w-full bg-warm-white border border-clay rounded-lg p-4 text-sm  text-gray-400 outline-none focus:border-primary/60 transition"
        />
      </div>
      </div>
     

      {/* Header calendrier */}
      <div className="flex justify-between  p-2 bg-white rounded-lg">
        {/* Toggle Month / Week */}
        <div className="flex rounded-lg overflow-hidden border border-sage-800">
          {(['month', 'week'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-5 py-1.5 text-sm font-semibold transition ${
                viewMode === mode
                  ? 'bg-sage-800 text-white'
                  : 'bg-transparent text-sage-800 hover:bg-sage-100'
              }`}
            >
              {mode === 'month' ? 'Month' : 'Week'}
            </button>
          ))}
        </div>

        {/* Mois courant */}
        <span className="text-base font-semibold text-text-light">{getMonthLabel()}</span>

        {/* Navigation */}
        <div className="flex items-center gap-2">
          {[
            { label: 'Today', action: () => setCurrentDate(new Date()) },
            { label: '‹', action: () => navigate(-1) },
            { label: '›', action: () => navigate(1) },
          ].map(({ label, action }) => (
            <button
              key={label}
              onClick={action}
              className="px-3 py-1.5 text-sm font-semibold bg-warm-white border border-sage-800 rounded-lg text-sage-800 hover:bg-sage-50 transition"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Vue */}
      {viewMode === 'month' ? (
        <MonthView events={filteredEvents} currentMonth={currentDate} />
      ) : (
        <WeekView
          events={filteredEvents}
          currentWeek={currentDate}
          onWeekChange={setCurrentDate}
        />
      )}
    </div>
  );
}