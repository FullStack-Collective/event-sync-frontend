'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Accueil' },
  { href: '/events', label: 'Événements' },
  { href: '/speakers', label: 'Intervenants' },
];

export const PublicHeader = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-dark backdrop-blur border-bottom">
      <div className="container">
        <div className="flex items-center justify-center md:justify-between h-16">
          {/* Logo centré sur mobile, gauche sur desktop */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">E</span>
            </div>
            <span className="text-xl font-bold text-gradient">
              EventSync
            </span>
          </Link>

          {/* Navigation - centrée */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-gray transition ${
                  pathname === item.href ? 'text-violet font-semibold' : 'hover:text-white-hover'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};