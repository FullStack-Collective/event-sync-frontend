"use client";
import Link from "next/link";

import { useEffect, useRef } from "react";
import { ArrowRight, Calendar, Users, Zap } from "lucide-react";
import { GlowAnimatedCounter } from "@/components/ui/GlowAnimatedCounter";
import { PartnerCarousel } from "@/components/ui/PartnerCarousel";

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-1 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-sage opacity-5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom mx-auto relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6 animate-fade-up">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Next-generation event platform
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-up animation-delay-100">
            Manage your events
            <br />
            <span className="text-gradient-primary">in real-time</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200">
            EventSync revolutionizes event management with a dynamic interface,
            real-time interactions, and a unique participatory experience.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
            <Link href="#about"  className="btn-outline text-lg px-8 py-3">
              Learn More
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20 pt-10 border-t border-border animate-fade-up animation-delay-400">
            <div className="text-center">
              <GlowAnimatedCounter targetValue={50} suffix="+" duration={2000} />
              <div className="text-text-muted text-lg mt-2">Events Organized</div>
            </div>
            
            <div className="text-center">
              <GlowAnimatedCounter targetValue={10000} suffix="k+" duration={2500} />
              <div className="text-text-muted text-lg mt-2">Active Participants</div>
            </div>
            
            <div className="text-center">
              <GlowAnimatedCounter targetValue={100} suffix="+" duration={2000} />
              <div className="text-text-muted text-lg mt-2">Expert Speakers</div>
            </div>
          </div>

          {/* Partners carousel */}
          <div className="mt-16 animate-fade-up animation-delay-500">
            <p className="text-text-muted text-2xl font-bold tracking-wider">
              They trust us
            </p>
            <PartnerCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}