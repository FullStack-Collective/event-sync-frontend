'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export const EventFilters = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab') || 'upcoming';
  const search = searchParams.get('search') || '';

  return (
    <div className="flex justify-between items-center flex-wrap gap-4 mb-6">

      {/* Tabs */}
      <div
        className="flex gap-1 p-1 rounded-xl"
        style={{ backgroundColor: '#111128' }}
      >
        {[
          { key: 'upcoming', label: '🗓 À venir'    },
          { key: 'past',     label: '📁 Historique' },
        ].map((t) => (
          <Link
            key={t.key}
            href={`/events?tab=${t.key}${search ? `&search=${search}` : ''}`}
            style={{ textDecoration: 'none' }}
          >
            <span
              className="block px-5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: tab === t.key ? '#7c3aed' : 'transparent',
                color:           tab === t.key ? 'white'   : '#8b8aaa',
              }}
            >
              {t.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Barre de recherche */}
      <form method="GET" action="/events" className="flex gap-2">
        <input type="hidden" name="tab" value={tab} />
        <input
          name="search"
          defaultValue={search}
          placeholder="Rechercher un événement..."
          className="text-sm px-4 py-2 rounded-xl outline-none"
          style={{
            backgroundColor: '#111128',
            border: '1px solid rgba(74,74,106,0.4)',
            color: '#f1f0ff',
            width: '240px',
          }}
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-xl text-sm font-semibold text-white"
          style={{ backgroundColor: '#7c3aed' }}
        >
          Chercher
        </button>
      </form>
    </div>
  );
};