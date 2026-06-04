"use client";

import { useEffect, useRef } from "react";
import { Calendar, ArrowRight } from "lucide-react";

const speakers = [
  {
    id: 1,
    name: "Sophie Martin",
    role: "Directrice Technique @ TechCorp",
    bio: "Experte en IA et transformation digitale avec plus de 15 ans d'expérience.",
    image: "/api/placeholder/150/150",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 2,
    name: "Thomas Bernard",
    role: "CTO @ CloudFactory",
    bio: "Spécialiste DevOps et architecte cloud, passionné par l'open source.",
    image: "/api/placeholder/150/150",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 3,
    name: "Marie Dubois",
    role: "Data Scientist @ AI Labs",
    bio: "Pionnière dans l'application du machine learning pour l'industrie.",
    image: "/api/placeholder/150/150",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
  {
    id: 4,
    name: "Lucas Petit",
    role: "Lead Developer @ StartupHub",
    bio: "Full-stack developer et contributeur actif à la communauté tech.",
    image: "/api/placeholder/150/150",
    socials: { twitter: "#", linkedin: "#", github: "#" },
  },
];

export function SpeakersSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll(".speaker-card");
            cards.forEach((card, index) => {
              setTimeout(() => {
                card.classList.add("animate-fade-up");
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
    <section id="speakers" ref={sectionRef} className="py-20 relative">
      <div className="container-custom mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Nos <span className="text-gradient-primary">Speakers</span>
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Des experts passionnés qui partagent leur savoir et leur expérience
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {speakers.map((speaker) => (
            <div
              key={speaker.id}
              className="speaker-card card card-hover text-center p-6 opacity-0"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 mx-auto rounded-full bg-gradient-sage p-0.5">
                  <div className="w-full h-full rounded-full bg-bg-surface flex items-center justify-center">
                    <div className="text-4xl font-bold text-primary opacity-30">
                      {speaker.name.charAt(0)}
                    </div>
                  </div>
                </div>
              </div>
              
              <h3 className="text-xl font-display font-semibold mt-4 mb-1">
                {speaker.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-2">{speaker.role}</p>
              <p className="text-text-muted text-sm mb-4">{speaker.bio}</p>
              
              <div className="flex justify-center gap-3 pt-2 border-t border-border">
                <a href={speaker.socials.twitter} className="text-text-muted hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" />
                </a>
                <a href={speaker.socials.linkedin} className="text-text-muted hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" />
                </a>
                <a href={speaker.socials.github} className="text-text-muted hover:text-primary transition-colors">
                  <Calendar className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="btn-primary">
            Voir tous les speakers
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}