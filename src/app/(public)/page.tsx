import Link from 'next/link';
import { eventService } from '@/modules/events/services/event.service';

export default async function HomePage() {
  let upcomingEvents: any[] = [];
  let errorMessage = '';
  
  try {
    const response = await eventService.getUpcoming(3);
    upcomingEvents = response.data || [];
  } catch (error: any) {
    console.error('Erreur lors du chargement des événements:', error);
    errorMessage = error?.message || 'Impossible de charger les événements';
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ffc600] to-[#ff005d] opacity-10"></div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-[#ffc600] to-[#ff005d] bg-clip-text text-transparent">
              EventSync
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-[#8b8aaa] mb-8 max-w-2xl mx-auto">
            La plateforme moderne pour gérer vos événements et interagir avec vos participants en temps réel
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/events">
              <button className="bg-gradient-to-r from-[#ffc600] to-[#ff005d] text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 hover:scale-105">
                Explorer les événements
              </button>
            </Link>
            <Link href="/speakers">
              <button className="border-2 border-[#ffc600] text-[#ffc600] font-semibold py-3 px-6 rounded-xl hover:bg-[#ffc600] hover:text-[#06060f] transition-all duration-200">
                Voir les intervenants
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[#0d0d1e]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#f1f0ff] mb-4">
              Pourquoi choisir <span className="text-[#7c3aed]">EventSync</span> ?
            </h2>
            <p className="text-[#8b8aaa] max-w-2xl mx-auto">
              Une plateforme complète pour vos événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111128] rounded-2xl p-6 border border-[#4a4a6a]/30 hover:border-[#7c3aed]/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#7c3aed]/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="text-xl font-semibold text-[#f1f0ff] mb-2">Planning Multi-Track</h3>
              <p className="text-[#8b8aaa] text-sm">Visualisez toutes les sessions en parallèle par salle et horaire</p>
            </div>

            <div className="bg-[#111128] rounded-2xl p-6 border border-[#4a4a6a]/30 hover:border-[#7c3aed]/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#7c3aed]/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-[#f1f0ff] mb-2">Q/R en direct</h3>
              <p className="text-[#8b8aaa] text-sm">Interagissez avec les intervenants via notre système de questions</p>
            </div>

            <div className="bg-[#111128] rounded-2xl p-6 border border-[#4a4a6a]/30 hover:border-[#7c3aed]/50 transition-all hover:-translate-y-1">
              <div className="w-12 h-12 bg-[#7c3aed]/20 rounded-2xl flex items-center justify-center mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-xl font-semibold text-[#f1f0ff] mb-2">Sessions favorites</h3>
              <p className="text-[#8b8aaa] text-sm">Créez votre agenda personnel et ne manquez aucune session</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-[#f1f0ff]">
                Événements à venir
              </h2>
              <Link href="/events">
                <button className="text-[#7c3aed] hover:text-[#a855f7] transition">
                  Voir tout →
                </button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event: any, index: number) => (
                <div
                  key={event.id}
                  className="bg-[#111128] rounded-2xl overflow-hidden border border-[#4a4a6a]/30 hover:border-[#7c3aed]/50 transition-all hover:-translate-y-1"
                >
                  {event.bannerUrl && (
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={event.bannerUrl} 
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    {event.isLive && (
                      <div className="inline-flex items-center gap-2 px-2 py-1 rounded-full bg-green-500/20 text-green-500 text-xs font-semibold mb-3">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        LIVE
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[#f1f0ff] mb-2 hover:text-[#7c3aed] transition">
                      {event.title}
                    </h3>
                    {event.description && (
                      <p className="text-[#8b8aaa] text-sm mb-4 line-clamp-2">
                        {event.description}
                      </p>
                    )}
                    <div className="space-y-2 text-sm text-[#4a4a6a]">
                      <div>📅 {new Date(event.startDate).toLocaleDateString('fr-FR')}</div>
                      {event.location && <div>📍 {event.location}</div>}
                      <div className="flex gap-4 pt-2">
                        {event.totalSessions > 0 && (
                          <span>🎯 {event.totalSessions} sessions</span>
                        )}
                        {event.totalQuestions > 0 && (
                          <span>💬 {event.totalQuestions} questions</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

       {errorMessage && (
        <div className="text-center py-10 text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
}