'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Speaker } from '../types/speaker.types';

interface SpeakerCardProps {
  speaker: Speaker;
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

export function SpeakerCard({ speaker }: SpeakerCardProps) {
  const initials = getInitials(speaker.name);
  const avatarColor = getAvatarColor(speaker.name);

  return (
    <div className="card card-hover p-6 flex flex-col items-center text-center bg-bg-surface border-border group transition-all duration-300">

      {/* Avatar: photo or initials */}
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-bg border-2 border-primary/20 mb-4 shadow-sm flex-shrink-0">
        {speaker.photoUrl ? (
          <Image
            src={speaker.photoUrl}
            alt={`${speaker.name}'s avatar`}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={`w-full h-full flex items-center justify-center font-display font-black text-xl tracking-tight ${avatarColor}`}
          >
            {initials}
          </div>
        )}
      </div>

      {/* Name */}
      <h3 className="font-display text-lg font-bold text-text mb-2 tracking-tight leading-snug">
        {speaker.name}
      </h3>

      {/* Truncated Bio */}
      <p className="text-sm text-text-muted line-clamp-3 mb-6 h-[4.5rem] overflow-hidden">
        {speaker.bio ?? 'No biography available for this speaker.'}
      </p>

      {/* CTA */}
      <Link
        href={`/speakers/${speaker.id}`}
        className="btn-primary mt-auto w-full justify-center text-xs uppercase tracking-wider font-mono"
      >
        View Profile
      </Link>
    </div>
  );
}