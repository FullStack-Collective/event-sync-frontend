'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, Variants } from 'framer-motion'; // <-- Importations critiques
import { Speaker } from '../types/speaker.types';

interface SpeakerCardProps {
  speaker: Speaker;
  index: number; // <-- Requis pour calculer le décalage (stagger)
}

function getInitials(name: string): string {
  return name.trim().split(/\s+/).slice(0, 2).map((word) => word[0]?.toUpperCase() ?? '').join('');
}

function getAvatarColor(name: string): string {
  const colors = ['bg-primary/20 text-primary', 'bg-secondary/20 text-secondary', 'bg-accent/20 text-accent', 'bg-primary-light/20 text-primary-light'];
  const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  return colors[index];
}

export function SpeakerCard({ speaker, index }: SpeakerCardProps) {
  const initials = getInitials(speaker.name);
  const avatarColor = getAvatarColor(speaker.name);

  // Configuration stricte des états d'animation
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.05, // Décalage de 50ms par carte (0.05s)
        ease: [0.21, 1.02, 0.43, 1.01] // Courbe fluide pour l'amorti
      }
    },
    hover: {
      y: -6, // Effet de flottement au survol
      boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.08)", // Ombre portée douce
      transition: { duration: 0.25, ease: "easeInOut" }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: true, margin: "-50px" }} 
      whileHover="hover"
      className="card p-6 flex flex-col items-center text-center bg-bg-surface border border-border rounded-xl group will-change-transform"
    >
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-bg border-2 border-primary/20 mb-4 shadow-sm shrink-0">
        {speaker.photoUrl ? (
          <Image
            src={speaker.photoUrl}
            alt={`${speaker.name}'s avatar`}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center font-display font-black text-xl tracking-tight ${avatarColor}`}>
            {initials}
          </div>
        )}
      </div>

      <h3 className="font-display text-lg font-bold text-text mb-2 tracking-tight leading-snug">
        {speaker.name}
      </h3>

      <p className="text-sm text-text-muted line-clamp-3 mb-6 h-18 overflow-hidden">
        {speaker.bio ?? 'No biography available for this speaker.'}
      </p>

      <Link
        href={`/speakers/${speaker.id}`}
        className="btn-primary mt-auto w-full justify-center text-xs uppercase tracking-wider font-mono"
      >
        View Profile
      </Link>
    </motion.div>
  );
}