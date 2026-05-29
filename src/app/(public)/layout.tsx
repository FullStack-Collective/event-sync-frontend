import { PublicHeader } from '@/components/layout/PublicHeader';
import { PublicFooter } from '@/components/layout/PublicFooter';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-es-bg to-es-bg2">
      <PublicHeader />
      <main className="relative z-10">
        {children}
      </main>
      <PublicFooter />
    </div>
  );
}