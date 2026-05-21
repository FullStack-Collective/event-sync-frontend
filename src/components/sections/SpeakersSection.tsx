"use client";

import { Reveal } from "@/components/ui/Reveal";
import { SectionTag } from "@/components/ui/SectionTag";
import { SpeakerAvatar } from "@/components/ui/SpeakerAvatar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { useSpeakers } from "@/hooks/useSpeakers";
import Link from "next/link";

export function SpeakersSection() {
  const { speakers, isLoading, error, refetch } = useSpeakers();

  if (isLoading) {
    return (
      <section
        id="speakers"
        className="relative z-[1] py-24 px-10 max-w-7xl mx-auto"
      >
        <div className="flex justify-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="speakers"
        className="relative z-[1] py-24 px-10 max-w-7xl mx-auto"
      >
        <ErrorMessage message={error} onRetry={refetch} />
      </section>
    );
  }

  return (
    <section
      id="speakers"
      className="relative z-[1] py-24 px-10 max-w-7xl mx-auto"
    >
      <SectionTag>Intervenants</SectionTag>
      <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-tight leading-tight mb-4">
        Les experts qui prennent la parole
      </h2>
      <p className="text-base max-w-xl mb-16 text-es-text-muted">
        Chaque intervenant dispose d&apos;une page publique accessible à tous.
      </p>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {speakers.map((speaker, i) => (
          <Reveal key={speaker.id} delay={i * 0.1}>
            <Link href={`/speaker/${speaker.id}`}>
              <div className="rounded-2xl p-7 text-center cursor-pointer transition-all duration-300 hover:-translate-y-1.5 group relative overflow-hidden bg-es-bg2 border border-white/[0.06] h-full">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-violet-500 to-cyan-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

                <div className="mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                  <SpeakerAvatar
                    name={speaker.name}
                    photoUrl={speaker.photoUrl}
                    color="violet"
                    size="lg"
                  />
                </div>

                <div className="font-display text-lg font-bold mb-1">
                  {speaker.name}
                </div>
                <div className="text-xs mb-3 text-es-text-muted">
                  Intervenant
                </div>

                <div className="text-[0.82rem] leading-relaxed mb-4 text-es-text-dim line-clamp-3">
                  {speaker.bio || "Aucune biographie disponible."}
                </div>

                <div className="flex gap-2 justify-center">
                  {speaker.twitter && (
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200 hover:bg-violet-500/15 hover:text-violet-400 hover:border-violet-500/30 cursor-pointer bg-es-bg3 border border-white/[0.06] text-es-text-muted">
                      𝕏
                    </span>
                  )}
                  {speaker.linkedin && (
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200 hover:bg-violet-500/15 hover:text-violet-400 hover:border-violet-500/30 cursor-pointer bg-es-bg3 border border-white/[0.06] text-es-text-muted">
                      in
                    </span>
                  )}
                  {speaker.website && (
                    <span className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all duration-200 hover:bg-violet-500/15 hover:text-violet-400 hover:border-violet-500/30 cursor-pointer bg-es-bg3 border border-white/[0.06] text-es-text-muted">
                      🔗
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-4 text-xs flex items-center justify-center gap-1.5 text-es-text-muted border-t border-white/[0.06]">
                  📅 {speaker.sessions?.length || 0} sessions
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
