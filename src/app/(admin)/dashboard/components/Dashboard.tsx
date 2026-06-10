'use client';

import { Card, CardContent, CardHeader, Grid, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { useDataProvider } from 'react-admin';
import { Event, Room, Speaker, Session } from '@mui/icons-material';

interface DashboardStats {
  totalEvents: number;
  totalSessions: number;
  totalSpeakers: number;
  totalRooms: number;
  liveSessions: number;
  upcomingEvents: number;
}

export default function Dashboard() {
  const dataProvider = useDataProvider();
  const [stats, setStats] = useState<DashboardStats>({
    totalEvents: 0,
    totalSessions: 0,
    totalSpeakers: 0,
    totalRooms: 0,
    liveSessions: 0,
    upcomingEvents: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        
        // Récupérer les événements
        const eventsResponse = await dataProvider.getList('events', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });
        
        // Récupérer les sessions
        const sessionsResponse = await dataProvider.getList('sessions', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });
        
        // Récupérer les speakers
        const speakersResponse = await dataProvider.getList('speakers', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });
        
        // Récupérer les rooms
        const roomsResponse = await dataProvider.getList('rooms', {
          pagination: { page: 1, perPage: 100 },
          sort: { field: 'id', order: 'ASC' },
          filter: {},
        });
        
        // Compter les événements à venir
        const upcomingEvents = eventsResponse.data.filter((event: any) => event.isUpcoming).length;
        
        // Compter les sessions live
        const liveSessions = sessionsResponse.data.filter((session: any) => session.isLive).length;
        
        setStats({
          totalEvents: eventsResponse.total,
          totalSessions: sessionsResponse.total,
          totalSpeakers: speakersResponse.total,
          totalRooms: roomsResponse.total,
          liveSessions,
          upcomingEvents,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, [dataProvider]);

  const statCards = [
    {
      title: 'Événements',
      value: stats.totalEvents,
      subtitle: `${stats.upcomingEvents} à venir`,
      icon: Event,
      color: '#ff8c42',
      bgColor: 'rgba(255, 140, 66, 0.1)',
    },
    {
      title: 'Sessions',
      value: stats.totalSessions,
      subtitle: `${stats.liveSessions} en direct`,
      icon: Session,
      color: '#52b788',
      bgColor: 'rgba(82, 183, 136, 0.1)',
    },
    {
      title: 'Speakers',
      value: stats.totalSpeakers,
      subtitle: 'Intervenants',
      icon: Speaker,
      color: '#f4a261',
      bgColor: 'rgba(244, 162, 97, 0.1)',
    },
    {
      title: 'Salles',
      value: stats.totalRooms,
      subtitle: 'Espaces disponibles',
      icon: Room,
      color: '#2d6a4f',
      bgColor: 'rgba(45, 106, 79, 0.1)',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gradient-primary">
          Dashboard
        </h1>
        <p className="text-text-muted mt-2">
          Bienvenue dans l'interface d'administration EventSync
        </p>
      </div>
      
      <Grid container spacing={3}>
        {statCards.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
              <Card className="card-hover" sx={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: card.bgColor }}
                    >
                      <IconComponent style={{ color: card.color, fontSize: '1.5rem' }} />
                    </div>
                    <Typography variant="h4" component="div" sx={{ color: 'var(--color-text)', fontWeight: 'bold' }}>
                      {card.value}
                    </Typography>
                  </div>
                  <Typography variant="h6" sx={{ color: 'var(--color-text)', fontSize: '1rem', fontWeight: 600 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    {card.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      
      {/* Section des actions rapides */}
      <div className="mt-8">
        <h2 className="text-xl font-display font-semibold text-text mb-4">
          Actions rapides
        </h2>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card className="card-hover" sx={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--color-text)', marginBottom: '1rem' }}>
                  📅 Événements récents
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                  Créez un nouvel événement ou gérez les événements existants
                </Typography>
                <button className="btn-outline text-sm mt-4">
                  Gérer les événements
                </button>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card className="card-hover" sx={{ background: 'var(--color-bg-surface)', border: '1px solid var(--color-border)', borderRadius: '1rem' }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: 'var(--color-text)', marginBottom: '1rem' }}>
                  🎤 Speakers
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--color-text-muted)' }}>
                  Ajoutez des intervenants et assignez-les aux sessions
                </Typography>
                <button className="btn-outline text-sm mt-4">
                  Gérer les speakers
                </button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}