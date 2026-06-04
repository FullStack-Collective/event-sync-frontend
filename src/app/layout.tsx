import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-bg">
      <PublicHeader />
      <main className="relative overflow-hidden">
        {/* Glow effect de fond global */}
        <div className="fixed inset-0 bg-glow pointer-events-none opacity-40" />
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}