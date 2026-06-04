"use client";

import { useEffect, useRef } from "react";

const partners = [
  { name: "Hewlett Packard", color: "#465257" },
  { name: "HubSpot", color: "#465257" },
  { name: "Intel", color: "#465257" },
  { name: "3M", color: "#465257" },
  { name: "Accenture", color: "#465257" },
  { name: "Adobe", color: "#465257" },
  { name: "Alphabet", color: "#465257" },
  { name: "Amazon", color: "#465257" },
  { name: "Aramark", color: "#465257" },
  { name: "AT&T", color: "#465257" },
  { name: "Bitwarden", color: "#465257" },
  { name: "BNP Paribas", color: "#465257" },
  { name: "QBOE", color: "#465257" },
  { name: "Wayfair", color: "#465257" },
  { name: "XPO", color: "#465257" },
  { name: "Johnson & Johnson", color: "#465257" },
  { name: "KPMG", color: "#465257" },
  { name: "Live Nation", color: "#465257" },
  { name: "Mars", color: "#465257" },
  { name: "Meta", color: "#465257" },
  { name: "Microsoft", color: "#465257" },
];

export function PartnerCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let startTime: number | null = null;
    const speed = 30;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = (timestamp - startTime) / 1000;
      
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

  const allPartners = [...partners, ...partners];

  return (
    <div className="w-full overflow-hidden pt-2">
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