import React from 'react';
import Link from 'next/link';
import { SpeakerService } from '@/modules/speakers/services/speaker.service';
import { SpeakerCard } from '@/modules/speakers/components/SpeakerCard';

export const revalidate = 3600;

export  async function SpeakersSection() {
  const speakers = await SpeakerService.getAll();
  
  const featuredSpeakers = speakers.slice(0, 4);

  return (
    <section id="speakers" className="container-custom py-16 md:py-24 animate-fade-up">
        <div className="max-w-3xl mb-12 border-l-4 border-primary pl-6">
        <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
          // Meet Our Experts
        </span>
        <h2 className="font-display text-3xl font-black tracking-tight sm:text-5xl uppercase">
          <span className="text-gradient-primary">Our Speakers</span>
        </h2>
        <p className="mt-4 text-md text-text-muted max-w-xl">
          Discover the industry leaders and visionaries who will be sharing their 
          expertise during our upcoming sessions.
        </p>
      </div>

      {featuredSpeakers.length === 0 ? (
        <div className="text-center py-18 bg-bg-surface rounded-card border border-dashed border-text-dim">
          <p className="font-mono text-sm text-text-muted">
            [ SYSTEM: No speakers available at the moment ]
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredSpeakers.map((speaker, index) => (
              <SpeakerCard key={speaker.id} speaker={speaker} index={index} />
            ))}
          </div>

          <div className="flex justify-center pt-4">
            <Link 
              href="/speakers" 
              className="btn-primary px-8 py-3 font-mono text-xs uppercase tracking-wider text-center shadow-md hover:scale-[1.02] transition-transform duration-200"
            >
              View All Speakers <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}