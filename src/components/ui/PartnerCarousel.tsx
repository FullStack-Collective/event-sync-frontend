// src/components/ui/PartnerCarousel.tsx
"use client";

import { useEffect, useRef } from "react";

const partners = [
  { name: "Hewlett Packard", color: "#0096D6" },
  { name: "HubSpot", color: "#FF7A59" },
  { name: "Intel", color: "#0071C5" },
  { name: "3M", color: "#E2001A" },
  { name: "Accenture", color: "#A100FF" },
  { name: "Adobe", color: "#FF0000" },
  { name: "Alphabet", color: "#4285F4" },
  { name: "Amazon", color: "#FF9900" },
  { name: "Aramark", color: "#0087DC" },
  { name: "AT&T", color: "#009FDF" },
  { name: "Bitwarden", color: "#175DDC" },
  { name: "BNP Paribas", color: "#009E60" },
  { name: "QBOE", color: "#000000" },
  { name: "Wayfair", color: "#C49A6C" },
  { name: "XPO", color: "#E31C23" },
  { name: "Johnson & Johnson", color: "#E31C23" },
  { name: "KPMG", color: "#003399" },
  { name: "Live Nation", color: "#E11D48" },
  { name: "Mars", color: "#E9542A" },
  { name: "Meta", color: "#0066FF" },
  { name: "Microsoft", color: "#F25022" },
];

export function PartnerCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let startTime: number | null = null;
    const speed = 40; // pixels par seconde - ajuste pour plus ou moins de rapidité

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      
      // Défilement continu vers la droite
      scrollPosRef.current = (scrollPosRef.current + speed * 0.016) % (scroller.scrollWidth / 2);
      
      if (scroller) {
        scroller.style.transform = `translateX(-${scrollPosRef.current}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Doubler les logos pour un effet infini seamless
  const allPartners = [...partners, ...partners];

  return (
    <div className="w-full overflow-hidden py-8 mt-16">
      <div className="relative">
        {/* Gradient fade left */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
        
        {/* Gradient fade right */}
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
        
        {/* Carrousel */}
        <div
          ref={scrollerRef}
          className="flex gap-12 whitespace-nowrap will-change-transform"
          style={{ width: "fit-content" }}
        >
          {allPartners.map((partner, index) => (
            <div
              key={`${partner.name}-${index}`}
              className="inline-flex items-center justify-center px-4 py-2"
            >
              <span 
                className="text-xl md:text-2xl font-semibold tracking-tight"
                style={{ 
                  color: partner.color,
                  textShadow: `0 0 20px ${partner.color}20`,
                }}
              >
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}