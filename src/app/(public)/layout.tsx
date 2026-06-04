import { PublicHeader } from "@/components/home/layout/PublicHeader";
import { PublicFooter } from "@/components/home/layout/PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PublicHeader />
      <main className="relative overflow-hidden">
        <div className="fixed inset-0 bg-glow pointer-events-none opacity-40" />
        {children}
      </main>
      <PublicFooter />
    </>
  );
}