import React from 'react';
import { SpeakerService } from '@/modules/speakers/services/speaker.service';
import { SpeakerCard } from '@/modules/speakers/components/SpeakerCard';

export const revalidate = 3600;

export default async function SpeakersPage() {
  const speakers = await SpeakerService.getAll();

  return (
    <main className="container-custom pt-28 md:pt-32 pb-20 md:pb-28 animate-fade-up">

      <div className="max-w-3xl mb-12 border-l-4 border-primary pl-6">
        <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
          // Our Experts
        </span>
        <h1 className="font-display text-3xl font-black tracking-tight sm:text-5xl uppercase">
          <span className="text-gradient-primary">Speakers</span>
        </h1>
        <p className="mt-4 text-md text-text-muted max-w-xl">
          Meet the experts and professionals sharing their knowledge in our sessions. 
          Explore their profiles to discover their background and scheduled interventions.
        </p>
      </div>

      {speakers.length === 0 ? (
        <div className="text-center py-18 bg-bg-surface rounded-card border border-dashed border-text-dim">
          <p className="font-mono text-sm text-text-muted">
            [ SYSTEM: No speakers found ]
          </p>
        </div>
      ) : (
        <>
          <p className="font-mono text-xs text-text-dim mb-6">
            {speakers.length} speaker{speakers.length > 1 ? 's' : ''} listed
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