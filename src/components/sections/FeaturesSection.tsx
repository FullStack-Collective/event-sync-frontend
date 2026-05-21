"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";

const features = [
  {
    icon: "📅",
    title: "Planning Multi-Track",
    description: "Grille temporelle avec sessions en parallèle par salle. Navigation simple et claire entre les créneaux.",
    color: "violet",
  },
  {
    icon: "🔴",
    title: "Détection Live Automatique",
    description: 'Identification automatique des sessions en cours basée sur l\'heure. Badge "Live" visible partout.',
    color: "live",
  },
  {
    icon: "💬",
    title: "Q&A en Temps Réel",
    description: "Questions anonymes ou nominatives, triées par upvotes. Disponible uniquement pendant les sessions live.",
    color: "cyan",
  },
  {
    icon: "👤",
    title: "Pages Intervenants",
    description: "Pages publiques générées automatiquement avec biographie, liens et liste des sessions associées.",
    color: "pink",
  },
  {
    icon: "⭐",
    title: "Itinéraire Personnel",
    description: "Ajoutez des sessions en favoris pour créer votre planning personnalisé, stocké en local.",
    color: "gold",
  },
  {
    icon: "🔒",
    title: "Espace Admin Sécurisé",
    description: "Gestion complète des événements, sessions, salles et intervenants via un accès authentifié.",
    color: "violet",
  },
];

const colorClasses: Record<string, { icon: string; line: string }> = {
  violet: { icon: "bg-violet-500/15", line: "bg-violet-500" },
  cyan: { icon: "bg-cyan-500/15", line: "bg-cyan-500" },
  pink: { icon: "bg-pink-500/15", line: "bg-pink-500" },
  gold: { icon: "bg-amber-500/15", line: "bg-amber-500" },
  live: { icon: "bg-green-500/15", line: "bg-green-500" },
};

export function FeaturesSection() {
  return (
    <section id="fonctionnalites" className="relative z-[1] py-24 px-10 max-w-7xl mx-auto">
      <SectionTag>Fonctionnalités</SectionTag>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4">
        Tout ce dont vous avez besoin
      </h2>
      <p className="text-base max-w-xl mb-16 text-es-text-muted">
        Une plateforme pensée pour les organisateurs, les participants et les intervenants.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-5">
        {features.map((feature, i) => {
          const colors = colorClasses[feature.color] || colorClasses.violet;
          const delays = [0, 0.1, 0.2, 0, 0.1, 0.2];
          return (
            <Reveal key={feature.title} delay={delays[i] || 0}>
              <div className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group bg-es-bg2 border border-white/[0.06]">
                <div className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ${colors.line}`} />
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 ${colors.icon}`}>
                  {feature.icon}
                </div>
                <h3 className="font-display text-base font-bold mb-2">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-es-text-muted">
                  {feature.description}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}