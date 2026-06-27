interface Props {
  title: string;
}

export function SessionTitle({ title }: Props) {
  return (
    <div className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-surface)] px-5 py-3">
      <h1 className="text-lg font-display font-semibold text-[var(--color-text)]">
        {title}
      </h1>
    </div>
  );
}
