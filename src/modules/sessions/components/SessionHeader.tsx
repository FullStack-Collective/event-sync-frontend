import { Session } from "../types/session.type";

interface Props {
  session: Session;
}

export function SessionHeader({ session }: Props) {
  const isLive = session.status === "live";

  return (
    <div className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] p-8 min-h-[420px] flex flex-col">
      {/* Badge LIVE (coin haut-gauche style image) */}
      {isLive && (
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--color-sage-700)] border border-[var(--color-mint-500)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-mint-400)] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-mint-500)]" />
          </span>
          <span className="text-xs font-medium text-[var(--color-mint-200)] uppercase tracking-wider">
            Live
          </span>
        </div>
      )}

      <div className="flex-1 flex items-center justify-center">
        {session.description ? (
          <p className="text-[var(--color-text-muted)] text-center max-w-2xl">
            {session.description}
          </p>
        ) : (
          <div className="text-[var(--color-text-dim)] text-sm">
            Diffusion en cours…
          </div>
        )}
      </div>
    </div>
  );
}
