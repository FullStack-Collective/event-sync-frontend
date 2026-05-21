"use client";

interface SectionTagProps {
  children: React.ReactNode;
}

export function SectionTag({ children }: SectionTagProps) {
  return (
    <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 uppercase tracking-[2px] mb-4">
      <span className="w-5 h-px bg-cyan-400" />
      {children}
    </div>
  );
}