import { Suspense } from 'react';
import { eventService } from '@/modules/events/services/event.service';
import { EventFilters } from '@/modules/events/components/EventFilters';
import { EventList } from '@/modules/events/components/EventList';

export default async function EventsPage({
  searchParams,
}: {
  searchParams: { tab?: string; search?: string };
}) {
  const tab = searchParams.tab || 'upcoming';
  const search = searchParams.search || '';
  const isPast = tab === 'past';

  let events: any[] = [];
  let total = 0;

  try {
    const response = await eventService.getAll({
      page: 1,
      limit: 50,
      search: search || undefined,
      status: isPast ? 'past' : 'upcoming',
      sortBy: 'startDate',
      sortOrder: isPast ? 'desc' : 'asc',
    });
    events = response.data || [];
    total = response.pagination?.total || 0;
  } catch (error) {
    console.error('Erreur chargement événements:', error);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#06060f', paddingBottom: '4rem' }}>

      {/* En-tête */}
      <div className="py-10" style={{ borderBottom: '1px solid rgba(74,74,106,0.2)' }}>
        <div className="mx-auto px-6" style={{ maxWidth: '1200px' }}>
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: '#f1f0ff' }}>
            Événements
          </h1>
          <p style={{ color: '#8b8aaa' }}>
            Découvrez et participez aux événements de votre communauté
          </p>
        </div>
      </div>

      <div className="mx-auto px-6 pt-8" style={{ maxWidth: '1200px' }}>
        {/* Filtres (client component) */}
        <Suspense fallback={null}>
          <EventFilters />
        </Suspense>

        {/* Liste (server component) */}
        <EventList
          events={events}
          isPast={isPast}
          total={total}
          search={search}
        />
      </div>
    </div>
  );
}