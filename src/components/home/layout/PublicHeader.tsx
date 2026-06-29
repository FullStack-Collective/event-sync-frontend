"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Heart } from "lucide-react";
import Image from "next/image";
import logo from "@/app/(public)/logo/Logo.png";
import { useFavorites } from "@/modules/sessions/hooks/useFavorites";

const navItems = [
  { label: "Home", href: "#home", sectionId: "home" },
  { label: "Events", href: "#events", sectionId: "events" },
  { label: "Speakers", href: "#speakers", sectionId: "speakers" },
  { label: "About", href: "#about", sectionId: "about" },
];

export function PublicHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const { favorites } = useFavorites();

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname === "/" && window.location.hash) {
      const sectionId = window.location.hash.replace("#", "");
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState(null, "", "/");
        }, 150);
      }
    }
  }, [pathname]);

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    sectionId: string
  ) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (pathname === "/") {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
        setCurrentHash(href);
      }
    } else {
      router.push(`/${href}`);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-bg-surface/80 backdrop-blur-xl border-b border-border shadow-lg"
            : "bg-transparent"
        }`}
      >
        <nav className="container-custom mx-auto flex items-center justify-between">
          <Link href="/" className="group relative z-10">
            <div className="flex items-center gap-2">
              <Image
                src={logo}
                alt="Logo"
                width={150}
                height={75}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = pathname === "/" && currentHash === item.href;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavigation(e, item.href, item.sectionId)}
                  className={`text-text-muted hover:text-primary transition-colors duration-200 font-medium relative group ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  {item.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-sage group-hover:w-full transition-all duration-300" />
                </a>
              );
            })}
          </div>

           <div className="hidden md:flex items-center gap-3 py-2">
            <Link
              href="/favorites"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface text-sm text-text-muted hover:border-warm-white hover:text-text transition"
            >
              <Heart
                className={`w-4 h-4 transition-colors ${
                  favorites.length > 0 ? "fill-red-400 text-red-400" : ""
                }`}
              />
              My Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
              )}
            </Link>
            <Link href="/events" className="btn-primary">
              Explore all events
              <span className="ml-2">→</span>
            </Link>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden z-50 relative p-2"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-text" />
            )}
          </button>
        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-bg/95 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex flex-col items-center justify-center h-full gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavigation(e, item.href, item.sectionId)}
                className="text-2xl font-display text-text hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/favorites"
              className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border bg-bg-surface text-sm text-text-muted hover:border-red-400/50 hover:text-red-400 transition mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Heart
                className={`w-4 h-4 ${favorites.length > 0 ? "fill-red-400 text-red-400" : ""}`}
              />
              My Favorites
              {favorites.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favorites.length > 9 ? "9+" : favorites.length}
                </span>
              )}
            </Link>
            <Link href="/events" className="btn-primary">
              Explore all events
              <span className="ml-2">→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}