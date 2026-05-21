"use client";

import { useState, useEffect } from "react";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const navLinks = [
  { label: "Événements", href: "#events" },
  { label: "Planning", href: "#planning" },
  { label: "Intervenants", href: "#speakers" },
  { label: "Mes Favoris", href: "#favoris" },
  { label: "Fonctionnalités", href: "#fonctionnalites" },
];

export function Navbar() {
  const [navBg, setNavBg] = useState("rgba(6,6,15,0.6)");
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setNavBg(window.scrollY > 50 ? "rgba(6,6,15,0.92)" : "rgba(6,6,15,0.6)");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[100] px-10 h-[68px] flex items-center justify-between backdrop-blur-2xl border-b border-white/[0.06] transition-colors duration-300 animate-slideDown"
      style={{ background: navBg }}
    >
      <Link href="/" className="font-display text-2xl font-extrabold tracking-tight bg-gradient-to-br from-violet-400 to-cyan-400 bg-clip-text text-transparent">
        EventSync <LiveBadge />
      </Link>

      <ul className="hidden md:flex gap-8 list-none">
        {navLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="text-sm font-medium text-es-text-muted transition-colors duration-200 relative group hover:text-white"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 right-0 h-px bg-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-es-text-muted">{user?.name}</span>
            <button
              onClick={logout}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 bg-red-500/20 border border-red-500/30 hover:bg-red-500/30"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <a
            href="#"
            className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "linear-gradient(135deg, #7c3aed, #a855f7)",
              boxShadow: "0 0 24px rgba(124,58,237,0.4)",
            }}
          >
            Espace Admin →
          </a>
        )}
      </div>
    </nav>
  );
}