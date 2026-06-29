import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SpeakerService } from '@/modules/speakers/services/speaker.service';
import { notFound } from 'next/navigation';
import { Globe, Calendar } from 'lucide-react';

interface Props {
  params: Promise<{ id: string }>;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('');
}

function getAvatarColor(name: string): string {
  const colors = [
    'bg-primary/20 text-primary',
    'bg-secondary/20 text-secondary',
    'bg-accent/20 text-accent',
    'bg-primary-light/20 text-primary-light',
  ];
  const index =
    name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    colors.length;
  return colors[index];
}

export default async function SpeakerDetailPage({ params }: Props) {
  const { id } = await params;

  let speaker;
  try {
    speaker = await SpeakerService.getById(id);
  } catch {
    return notFound();
  }

  const initials = getInitials(speaker.name);
  const avatarColor = getAvatarColor(speaker.name);

  return (
    <main className="container-custom pt-28 md:pt-32 pb-20 md:pb-28 max-w-5xl animate-fade-in">

      <nav className="mb-8 flex items-center gap-2 font-mono text-xs text-text-dim">
        <Link href="/speakers" className="hover:text-secondary transition-colors">
          Speakers
        </Link>
        <span>/</span>
        <span className="text-text-muted">{speaker.name}</span>
      </nav>

      <div className="card p-8 md:p-12 flex flex-col md:flex-row gap-10 items-start relative overflow-hidden mb-12 bg-bg-surface border-border">
        <div className="absolute inset-0 bg-glow pointer-events-none opacity-60" />

        <div className="relative w-36 h-36 md:w-48 md:h-48 rounded-card overflow-hidden bg-bg border border-text-dim flex-shrink-0 mx-auto md:mx-0 shadow-md">
          {speaker.photoUrl ? (
            <Image
              src={speaker.photoUrl}
              alt={speaker.name}
              fill
              priority
              className="object-cover"
            />
          ) : (
            <div
              className={`w-full h-full flex items-center justify-center font-display font-black text-4xl tracking-tight ${avatarColor}`}
            >
              {initials}
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left z-10 w-full">
          <span className="font-mono text-xs text-secondary tracking-widest uppercase block mb-2">
            // Speaker ID #{speaker.id}
          </span>
          <h1 className="font-display text-3xl md:text-4xl font-black text-text uppercase mb-4 tracking-tight">
            {speaker.name}
          </h1>

          {(speaker.linkedin || speaker.twitter || speaker.website || speaker.facebook) && (
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8 font-mono text-xs">
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-button bg-bg border border-border text-text-muted hover:text-secondary hover:border-secondary transition-all"
                >
                  <Globe className="w-4 h-4 text-secondary" />
                  <span>LinkedIn</span>
                </a>
              )}
              {speaker.twitter && (
                <a
                  href={speaker.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-button bg-bg border border-border text-text-muted hover:text-accent hover:border-accent transition-all"
                >
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Twitter / X</span>
                </a>
              )}
              {speaker.website && (
                <a
                  href={speaker.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-button bg-bg border border-border text-text-muted hover:text-primary-light hover:border-primary-light transition-all"
                >
                  <Globe className="w-4 h-4 text-primary" />
                  <span>Website</span>
                </a>
              )}
              {speaker.facebook && (
                <a
                  href={speaker.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-button bg-bg border border-border text-text-muted hover:text-accent hover:border-accent transition-all"
                >
                  <Globe className="w-4 h-4 text-accent" />
                  <span>Facebook</span>
                </a>
              )}
            </div>
          )}

          <h2 className="font-mono text-xs text-text-muted uppercase tracking-wider border-b border-border pb-2 mb-3 text-left">
            Biography
          </h2>
          <p className="text-text-muted text-left leading-relaxed whitespace-pre-line text-sm md:text-base">
            {speaker.bio ?? "This speaker has not written a biography yet."}
          </p>
        </div>
      </div>

      <div className="animate-slide-up">
        <h2 className="font-display text-2xl font-bold uppercase text-text mb-6 flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary flex-shrink-0" />
          Sessions &amp; Schedule
          {speaker.sessions.length > 0 && (
            <span className="ml-auto font-mono text-xs text-text-dim font-normal normal-case tracking-normal">
              {speaker.sessions.length} session{speaker.sessions.length > 1 ? 's' : ''}
            </span>
          )}
        </h2>

        {speaker.sessions.length === 0 ? (
          <div className="bg-bg-surface border border-dashed border-border rounded-card p-8 text-center text-sm font-mono text-text-muted">
            [ No scheduled or past sessions found for this expert ]
          </div>
        ) : (
          <div className="space-y-4">
            {speaker.sessions.map((speakerSession) => {
              const actualSession = speakerSession.session;
              
              if (!actualSession) return null;

              return (
                <div
                  key={actualSession.id}
                  className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-bg-surface border-border hover:border-primary/50 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-mono text-xs text-accent flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(actualSession.startTime).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                    <h3 className="font-display text-lg font-bold text-text">
                      {actualSession.title}
                    </h3>
                    {actualSession.description && (
                      <p className="text-sm text-text-muted mt-1 line-clamp-2">
                        {actualSession.description}
                      </p>
                    )}
                  </div>

                  <Link
                    href={`/events/${actualSession.eventId}/sessions/${actualSession.id}`}
                    className="btn-primary sm:self-center font-mono text-xs uppercase tracking-wider text-center shadow-sm flex-shrink-0"
                  >
                    View Session
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}