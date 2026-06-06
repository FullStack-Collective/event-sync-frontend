'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/events', label: 'Calendrier' },
  { href: '/speakers', label: 'Intervenants' },
];

export const PublicHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-[#06060f]/80 backdrop-blur-lg border-b border-[#4a4a6a]/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-[#ffc600] to-[#ff005d] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#ffc600] to-[#ff005d] bg-clip-text text-transparent">
              EventSync
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[#8b8aaa] hover:text-white transition-colors duration-200 ${
                  pathname === item.href ? 'text-[#7c3aed] font-semibold' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="w-20 hidden md:block"></div>
        </div>
      </div>
    </header>
  );
};