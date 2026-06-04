import { notFound } from 'next/navigation';
import { eventService } from '@/modules/events/services/event.service';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

 const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
};

const getDuration = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffHours = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60);
  return `${diffHours} heures`;
};

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const eventId = parseInt(params.id);
  
  if (isNaN(eventId)) {
    notFound();
  }
  
  try {
    const response = await eventService.getById(eventId);
    
    if (!response.success || !response.data) {
      notFound();
    }
    
    const event = response.data;
    
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {event.bannerUrl && (
          <div className="w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <img
              src={event.bannerUrl}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        <div className="flex gap-2 mb-4">
          {event.isLive && (
            <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-semibold animate-pulse">
              🔴 EN DIRECT
            </span>
          )}
          {event.isUpcoming && !event.isLive && (
            <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-sm font-semibold">
              📅 À VENIR
            </span>
          )}
          {event.isPast && (
            <span className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm font-semibold">
              ✅ PASSÉ
            </span>
          )}
        </div>
        
        <h1 className="text-3xl md:text-5xl font-bold text-es-text mb-4">
          {event.title}
        </h1>
        
        {event.description && (
          <div className="bg-[#111128] rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-es-text mb-3">Description</h2>
            <p className="text-es-text-muted leading-relaxed">
              {event.description}
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#111128] rounded-2xl p-4 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-[#7c3aed]" />
            <div>
              <p className="text-sm text-es-text-muted">Date</p>
              <p className="text-es-text font-medium">{formatDate(event.startDate)}</p>
            </div>
          </div>
          
          <div className="bg-[#111128] rounded-2xl p-4 flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#7c3aed]" />
            <div>
              <p className="text-sm text-es-text-muted">Horaire</p>
              <p className="text-es-text font-medium">
                {formatTime(event.startDate)} - {formatTime(event.endDate)}
              </p>
            </div>
          </div>
          
          {event.location && (
            <div className="bg-[#111128] rounded-2xl p-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-[#7c3aed]" />
              <div>
                <p className="text-sm text-es-text-muted">Lieu</p>
                <p className="text-es-text font-medium">{event.location}</p>
              </div>
            </div>
          )}
          
          <div className="bg-[#111128] rounded-2xl p-4 flex items-center gap-3">
            <Users className="w-5 h-5 text-[#7c3aed]" />
            <div>
              <p className="text-sm text-es-text-muted">Durée</p>
              <p className="text-es-text font-medium">{getDuration(event.startDate, event.endDate)}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-[#111128] rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-es-text mb-4">Statistiques</h2>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-[#7c3aed]">{event.totalSessions}</p>
              <p className="text-sm text-es-text-muted">Sessions</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-[#7c3aed]">{event.totalQuestions}</p>
              <p className="text-sm text-es-text-muted">Questions</p>
            </div>
          </div>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}