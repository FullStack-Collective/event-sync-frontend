"use client";

export function AnimatedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 animate-bgShift"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 20% 10%, rgba(124,58,237,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 80% 90%, rgba(6,182,212,0.08) 0%, transparent 55%),
          radial-gradient(ellipse 40% 30% at 60% 40%, rgba(236,72,153,0.06) 0%, transparent 50%)
        `,
      }}
    />
  );
}