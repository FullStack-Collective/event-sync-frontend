import { PublicHeader } from "@/components/home/layout/PublicHeader";
import { PublicFooter } from "@/components/home/layout/PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicHeader />
      <main className="flex-1 relative overflow-hidden pt-20 md:pt-24 pb-10 md:pb-16">
        <div className="fixed inset-0 bg-glow pointer-events-none opacity-40" />
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}