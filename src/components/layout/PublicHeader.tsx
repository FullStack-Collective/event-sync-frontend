'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/',         label: 'Accueil'      },
  { href: '/events',   label: 'Événements'   },
  { href: '/speakers', label: 'Intervenants' },
];

export const PublicHeader = () => {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 border-b border-es-text-dim/20"
      style={{ backgroundColor: 'rgba(6,6,15,0.85)', backdropFilter: 'blur(16px)' }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #ffc600, #ff005d)' }}
            >
              <span className="text-white font-bold text-base">E</span>
            </div>
            <span
              className="text-xl font-bold"
              style={{
                background: 'linear-gradient(135deg, #ffc600, #ff005d)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              EventSync
            </span>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color:           isActive ? '#7c3aed' : '#8b8aaa',
                    backgroundColor: isActive ? 'rgba(124,58,237,0.1)' : 'transparent',
                    fontWeight:      isActive ? 600 : 400,
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#f1f0ff';
                      (e.currentTarget as HTMLElement).style.backgroundColor = '#111128';
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.color = '#8b8aaa';
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg transition"
            style={{ color: '#8b8aaa' }}
          >
            <span className="block w-5 h-0.5 rounded-full bg-current" />
            <span className="block w-5 h-0.5 rounded-full bg-current" />
            <span className="block w-3 h-0.5 rounded-full bg-current" />
          </button>

        </div>
      </div>
    </header>
  );
};