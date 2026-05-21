"use client";

import { LiveBadge } from "@/components/ui/LiveBadge";
import Link from "next/link";

const footerLinks = {
  platform: [
    { label: "Événements", href: "#events" },
    { label: "Planning", href: "#planning" },
    { label: "Intervenants", href: "#speakers" },
    { label: "Mes favoris", href: "#favoris" },
  ],
  organizers: [
    { label: "Connexion admin", href: "#" },
    { label: "Créer un événement", href: "#" },
    { label: "Gérer les sessions", href: "#" },
    { label: "Documentation", href: "#" },
  ],
  evolutions: [
    { label: "Notifications live", href: "#" },
    { label: "Inscriptions sessions", href: "#" },
    { label: "Analytics", href: "#" },
    { label: "Modération Q&A", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="relative z-[1] border-t border-white/[0.06] pt-16 pb-10 px-10 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 mb-12">
        <div>
          <Link href="/" className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-3 inline-block">
            EventSync <LiveBadge />
          </Link>
          <p className="text-sm leading-7 max-w-[280px] text-es-text-muted">
            La plateforme de gestion d&apos;événements moderne. Remplacez le papier par une expérience digitale fluide et engageante.
          </p>
        </div>

        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <div className="font-display text-xs font-bold uppercase tracking-wider mb-4 text-es-text-muted">
              {category === "platform" ? "Plateforme" : category === "organizers" ? "Organisateurs" : "Évolutions"}
            </div>
            <ul className="flex flex-col gap-2.5 list-none">
              {links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-es-text-dim hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/[0.06] pt-7 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-es-text-dim">
        <span>© 2025 EventSync — Plateforme de gestion d&apos;événements</span>
        <span className="flex items-center gap-2">
          <LiveBadge />
          Système opérationnel
        </span>
      </div>
    </footer>
  );
}