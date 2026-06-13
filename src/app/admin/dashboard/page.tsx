'use client';

import { useEffect, useState } from 'react';
import { Calendar, Users, Mic, MessageCircle, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    sessions: 0,
    speakers: 0,
    questions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const token = localStorage.getItem('admin_token');

      try {
        const [eventsRes, sessionsRes, speakersRes, questionsRes] = await Promise.all([
          fetch(`${API_URL}/api/events`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/api/sessions`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/api/speakers`, { headers: { Authorization: `Bearer ${token}` } }),
          fetch(`${API_URL}/api/questions`, { headers: { Authorization: `Bearer ${token}` } }).catch(() => ({ json: () => ({ data: [] }) })),
        ]);

        const eventsData = await eventsRes.json();
        const sessionsData = await sessionsRes.json();
        const speakersData = await speakersRes.json();

        setStats({
          events: eventsData.data?.length || 0,
          sessions: sessionsData.data?.length || 0,
          speakers: speakersData.data?.length || 0,
          questions: 0,
        });
      } catch (error) {
        console.error('Erreur chargement stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: 'Événements', value: stats.events, icon: Calendar, color: 'from-amber-500 to-orange-500' },
    { title: 'Sessions', value: stats.sessions, icon: TrendingUp, color: 'from-emerald-500 to-teal-500' },
    { title: 'Speakers', value: stats.speakers, icon: Mic, color: 'from-blue-500 to-cyan-500' },
    { title: 'Questions', value: stats.questions, icon: MessageCircle, color: 'from-purple-500 to-pink-500' },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-gradient-primary">
          Tableau de bord
        </h1>
        <p className="text-text-muted mt-1">
          Bienvenue dans votre espace d'administration EventSync
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <div
            key={stat.title}
            className="card p-6 card-hover"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold text-text">{stat.value}</span>
            </div>
            <h3 className="text-text-muted text-sm font-medium">{stat.title}</h3>
          </div>
        ))}
      </div>

      <div className="card p-6">
        <h2 className="text-xl font-display font-semibold mb-4">
          Accès rapide
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a href="/admin/#/events" className="btn-outline text-center">
            Gérer les événements
          </a>
          <a href="/admin/#/sessions" className="btn-outline text-center">
            Gérer les sessions
          </a>
          <a href="/admin/#/speakers" className="btn-outline text-center">
            Gérer les speakers
          </a>
          <a href="/admin/#/rooms" className="btn-outline text-center">
            Gérer les salles
          </a>
        </div>
      </div>
    </div>
  );
}