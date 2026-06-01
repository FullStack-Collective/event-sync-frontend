import Link from 'next/link';
import { eventService } from '@/modules/events/services/event.service';

export default async function HomePage() {
  let upcomingEvents: any[] = [];

  try {
    const response = await eventService.getUpcoming(3);
    upcomingEvents = response.data || [];
  } catch (error: any) {
    console.error('Erreur chargement événements:', error);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#06060f' }}>

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center overflow-hidden" style={{ minHeight: '85vh' }}>
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.15) 0%, transparent 70%)',
        }} />
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse 50% 40% at 80% 80%, rgba(255,0,93,0.08) 0%, transparent 60%)',
        }} />

        <div className="relative z-10 text-center px-6" style={{ maxWidth: '860px', margin: '0 auto' }}>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full" style={{
            border: '1px solid rgba(124,58,237,0.35)',
            backgroundColor: 'rgba(124,58,237,0.1)',
          }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
            <span className="text-xs font-semibold tracking-widest" style={{ color: '#a855f7' }}>
              PLATEFORME D'ÉVÉNEMENTS
            </span>
          </div>

          {/* Title */}
          <h1 className="font-extrabold mb-6" style={{ fontSize: 'clamp(3rem, 8vw, 5.5rem)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            <span style={{ color: '#f1f0ff' }}>Gérez vos </span>
            <span style={{ background: 'linear-gradient(135deg, #ffc600, #ff005d)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              événements
            </span>
            <br />
            <span style={{ color: '#f1f0ff' }}>en temps réel</span>
          </h1>

          {/* Subtitle */}
          <p className="mb-10 mx-auto" style={{ fontSize: '1.15rem', color: '#8b8aaa', maxWidth: '540px', lineHeight: 1.7 }}>
            Une plateforme moderne pour naviguer dans vos événements, interagir avec les sessions et poser vos questions en direct.
          </p>

          {/* CTAs */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/events">
              <button className="font-bold rounded-xl px-8 py-3.5 text-white transition-all duration-200 hover:scale-105 hover:brightness-110" style={{
                background: 'linear-gradient(135deg, #ffc600, #ff005d)',
                boxShadow: '0 4px 20px rgba(255,198,0,0.3)',
                fontSize: '0.95rem',
              }}>
                Explorer les événements →
              </button>
            </Link>
            <Link href="/speakers">
              <button className="font-semibold rounded-xl px-8 py-3.5 transition-all duration-200 hover:brightness-125" style={{
                background: 'transparent',
                border: '1.5px solid rgba(241,240,255,0.2)',
                color: '#f1f0ff',
                fontSize: '0.95rem',
              }}>
                Voir les intervenants
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-20" style={{ backgroundColor: '#0d0d1e' }}>
        <div className="mx-auto px-6" style={{ maxWidth: '1200px' }}>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3" style={{ color: '#f1f0ff' }}>
              Pourquoi choisir <span style={{ color: '#7c3aed' }}>EventSync</span> ?
            </h2>
            <p style={{ color: '#8b8aaa' }}>Tout ce dont vous avez besoin pour vivre vos événements pleinement</p>
          </div>
          <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {[
              { icon: '📅', title: 'Planning Multi-Track', desc: 'Visualisez toutes les sessions en parallèle par salle et horaire.' },
              { icon: '💬', title: 'Q/R en direct',        desc: 'Posez vos questions aux intervenants et votez pour les meilleures.' },
              { icon: '⭐', title: 'Sessions favorites',   desc: 'Créez votre agenda personnel et ne manquez aucune session.' },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1" style={{
                backgroundColor: '#111128',
                border: '1px solid rgba(74,74,106,0.3)',
              }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: 'rgba(124,58,237,0.15)' }}>
                  {f.icon}
                </div>
                <h3 className="font-bold text-lg mb-2" style={{ color: '#f1f0ff' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8b8aaa' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {upcomingEvents.length > 0 && (
        <section className="py-20" style={{ backgroundColor: '#06060f' }}>
          <div className="mx-auto px-6" style={{ maxWidth: '1200px' }}>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold" style={{ color: '#f1f0ff' }}>Événements à venir</h2>
              <Link href="/events" className="font-semibold text-sm transition-colors duration-200 hover:brightness-125" style={{ color: '#7c3aed', textDecoration: 'none' }}>
                Voir tout →
              </Link>
            </div>

            <div className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {upcomingEvents.map((event: any) => (
                <Link key={event.id} href={`/events/${event.id}`} style={{ textDecoration: 'none' }}>
                  <div className="rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group" style={{
                    backgroundColor: '#111128',
                    border: '1px solid rgba(74,74,106,0.3)',
                  }}>
                    {event.bannerUrl ? (
                      <div className="overflow-hidden" style={{ height: '160px' }}>
                        <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      </div>
                    ) : (
                      <div style={{ height: '6px', background: 'linear-gradient(90deg, #7c3aed, #ff005d)' }} />
                    )}

                    <div className="p-5">
                      {event.isLive && (
                        <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full text-xs font-bold" style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e' }}>
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: '#22c55e' }} />
                          LIVE
                        </div>
                      )}

                      <h3 className="font-bold text-lg mb-2 transition-colors duration-200 group-hover:text-purple-400 line-clamp-1" style={{ color: '#f1f0ff' }}>
                        {event.title}
                      </h3>

                      {event.description && (
                        <p className="text-sm mb-4 line-clamp-2" style={{ color: '#8b8aaa', lineHeight: 1.6 }}>
                          {event.description}
                        </p>
                      )}

                      <div className="text-sm flex flex-col gap-1.5" style={{ color: '#4a4a6a' }}>
                        <span>📅 {new Date(event.startDate).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        {event.location && <span>📍 {event.location}</span>}
                        {(event.totalSessions > 0 || event.totalQuestions > 0) && (
                          <div className="flex gap-4 pt-2 mt-1" style={{ borderTop: '1px solid rgba(74,74,106,0.2)' }}>
                            {event.totalSessions > 0 && <span style={{ color: '#8b8aaa' }}>🎯 {event.totalSessions} sessions</span>}
                            {event.totalQuestions > 0 && <span style={{ color: '#8b8aaa' }}>💬 {event.totalQuestions} questions</span>}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
}