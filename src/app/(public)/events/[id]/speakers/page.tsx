import React from 'react';
import { SpeakerService } from '@/modules/speakers/services/speaker.service';
import { SpeakerCard } from '@/modules/speakers/components/SpeakerCard';
import Link from 'next/link';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EventSpeakersPage({ params }: Props) {
  const { id } = await params;
  const eventId = parseInt(id, 10);

  if (isNaN(eventId)) {
    return (
      <div className="container-custom pt-32 text-center font-mono text-sm text-text-muted">
        [ ERROR: Invalid Event ID ]
      </div>
    );
  }

  const speakers = await SpeakerService.getByEventId(eventId);

  return (
    <main className="container-custom pt-28 md:pt-32 pb-20 md:pb-28 animate-fade-up">
        <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-text-dim">
        <Link href="/" className="hover:text-secondary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href={`/events/${eventId}`} className="hover:text-secondary transition-colors">
          Event #{eventId}
        </Link>
        <span>/</span>
        <span className="text-text-muted">Speakers</span>
      </nav>

      <div className="max-w-3xl mb-12 border-l-4 border-primary pl-6">
        <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
          // Event Lineup
        </span>
        <h1 className="font-display text-3xl font-black tracking-tight sm:text-5xl uppercase">
          <span className="text-gradient-primary">Event Speakers</span>
        </h1>
        <p className="mt-4 text-md text-text-muted max-w-xl">
          Discover all the experts, specialists, and hosts speaking at this specific event. 
          Click on their profiles to see their biographies and full schedules.
        </p>
      </div>

      {/* Grid or Empty State */}
      {speakers.length === 0 ? (
        <div className="text-center py-18 bg-bg-surface rounded-card border border-dashed border-text-dim">
          <p className="font-mono text-sm text-text-muted">
            [ SYSTEM: No speakers assigned to this event yet ]
          </p>
        </div>
      ) : (
        <>
          <p className="font-mono text-xs text-text-dim mb-6">
            {speakers.length} speaker{speakers.length > 1 ? 's' : ''} confirmed for this event
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {speakers.map((speaker, index) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
            ))}
          </div>
        </>
      )}
    </main>
  );
}