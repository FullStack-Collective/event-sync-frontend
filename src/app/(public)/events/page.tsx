'use client';

import { useState, useEffect } from 'react';
import { WeekView } from '@/modules/events/components/WeekView';
import { eventService } from '@/modules/events/services/event.service';
import { Event } from '@/modules/events/types/event.types';

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await eventService.getAll({ 
          limit: 100,
          status: 'all'
        });
        
        if (response.success) {
          setEvents(response.data);
        } else {
          setError("Impossible de charger les événements");
        }
      } catch (err) {
        console.error("Erreur:", err);
        setError("Une erreur est survenue lors du chargement");
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, []);

  const handleWeekChange = (newWeek: Date) => {
    setCurrentWeek(newWeek);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#7c3aed] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-es-text-muted">loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-[#7c3aed] rounded-lg text-white hover:bg-[#6d28d9] transition"
        >
          try
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-es-text mb-2">
          Calendar Events
        </h1>
        <p className="text-es-text-muted">
          {events.length} all events • Click to see details
        </p>
      </div>

       <WeekView
        events={events}
        currentWeek={currentWeek}
        onWeekChange={handleWeekChange}
      />
    </div>
  );
}