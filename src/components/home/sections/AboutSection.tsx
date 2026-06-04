"use client";

import { useEffect, useRef } from "react";
import { Sparkles, MessageCircle, Users, Calendar, CheckCircle } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Gestion en temps réel",
    description: "Planifiez et modifiez vos événements en direct avec une interface intuitive.",
  },
  {
    icon: MessageCircle,
    title: "Questions/Réponses live",
    description: "Interagissez avec les participants via notre système de Q&A intégré.",
  },
  {
    icon: Users,
    title: "Pages speakers",
    description: "Chaque intervenant dispose d'une page publique professionnelle.",
  },
  {
    icon: Calendar,
    title: "Planning multi-track",
    description: "Visualisez toutes les sessions en parallèle dans une grille temporelle.",
  },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".animate-on-scroll");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-up");
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-on-scroll opacity-0">
              Pourquoi choisir{" "}
              <span className="text-gradient-primary">EventSync</span>
            </h2>
            <p className="text-text-muted mb-6 animate-on-scroll opacity-0">
              EventSync est bien plus qu'une simple plateforme de gestion d'événements. 
              Nous révolutionnons la façon dont les organisateurs et les participants 
              interagissent lors des conférences et des workshops.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                "Interface moderne et réactive",
                "Support multi-utilisateurs",
                "Analytics en temps réel",
                "Sécurité et fiabilité",
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 animate-on-scroll opacity-0"
                >
                  <CheckCircle className="w-5 h-5 text-primary" />
                  <span className="text-text">{item}</span>
                </div>
              ))}
            </div>

            <button className="btn-primary animate-on-scroll opacity-0">
              En savoir plus
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Right Column - Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card card-hover p-6 animate-on-scroll opacity-0"
              >
                <feature.icon className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
                <p className="text-text-muted text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}