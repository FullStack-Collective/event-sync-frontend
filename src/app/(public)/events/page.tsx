import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { EventCard } from "@/components/shared/EventCard";
import { eventService } from "@/modules/events";
import { Event } from "@/types/event";



export default async function HomePage() {
  let upcomingEvents: Event[] = [];
  try {
    const response = await eventService.getUpcoming(3);
    upcomingEvents = response.data || [];
  } catch (error) {
    console.error("Erreur lors du chargement des événements:", error);
  }

  return (
    <div>
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary opacity-10 animate-bgShift"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 animate-fade-up">
            <span className="bg-gradient-primary bg-clip-text text-transparent ">
              EventSync
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-es-text-muted mb-8 max-w-2xl mx-auto animate-fade-up animation-delay-200">
            La plateforme moderne pour gérer vos événements et interagir avec
            vos participants en temps réel
          </p>
          <div className="flex justify-center gap-4 animate-fade-up animation-delay-400">
            <Link href="/events">
              <Button variant="primary" size="lg">
                Explorer les événements
              </Button>
            </Link>
            <Link href="/speakers">
              <Button variant="outline" size="lg">
                Voir les intervenants
              </Button>
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-es-violet/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
                opacity: 0.3 + Math.random() * 0.4,
              }}
            />
          ))}
        </div>
      </section>

      <section className="py-20 bg-es-bg2">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-es-text mb-4">
              Pourquoi choisir <span className="text-es-violet">EventSync</span>{" "}
              ?
            </h2>
            <p className="text-es-text-muted max-w-2xl mx-auto">
              Une plateforme complète pour vos événements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-green-600">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-es-bg3 rounded-es p-6 border border-es-text-dim/30 hover:border-es-violet/50 transition-all duration-300 hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="w-12 h-12 bg-es-violet/20 rounded-es flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-display font-semibold text-es-text mb-2">
                  {feature.title}
                </h3>
                <p className="text-es-text-muted text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {upcomingEvents.length > 0 && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-display font-bold text-es-text">
                Événements à venir
              </h2>
              <Link href="/events">
                <Button variant="ghost" size="sm" className="bg-green-600 p-6">
                  Voir tout →
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

const features = [
  {
    icon: "📅",
    title: "Planning Multi-Track",
    description:
      "Visualisez toutes les sessions en parallèle par salle et horaire",
  },
  {
    icon: "💬",
    title: "Q/R en direct",
    description:
      "Interagissez avec les intervenants via notre système de questions",
  },
  {
    icon: "⭐",
    title: "Sessions favorites",
    description: "Créez votre agenda personnel et ne manquez aucune session",
  },
];
