import { HeroSection } from "@/components/home/sections/HeroSection";
import { EventsSection } from "@/components/home/sections/EventsSection";
import { SpeakersSection } from "@/components/home/sections/SpeakersSection";
import { AboutSection } from "@/components/home/sections/AboutSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EventsSection />
      <SpeakersSection />
    </>
  );
}