import Link from "next/link";
import { Mail, MapPin, Calendar, Users } from "lucide-react";
import Image from "next/image";
import logo from "@/app/(public)/logo/Logo.png";

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-bg-surface/50 border-t border-border mt-20">
      <div className="container-custom mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="#home"
              className="group relative z-10"
            >
              <div className="flex items-center gap-2">
                <Image
                  src={logo}
                  alt="Logo"
                  width={100}
                  height={50}
                />
              </div>
            </Link>
            <p className="text-text-muted text-sm">
              The real-time event management and attendee engagement platform.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Calendar className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Calendar className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Calendar className="w-5 h-5" />
              </a>
              <a href="#" className="text-text-muted hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <h3 className="font-display font-semibold text-text">Navigation</h3>
            <ul>
              <li>
                <a href="#home" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Home
                </a>
              </li>
              <li>
                <a href="#events" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Events
                </a>
              </li>
              <li>
                <a href="#speakers" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Speakers
                </a>
              </li>
              <li>
                <a href="#about" className="text-text-muted hover:text-primary transition-colors text-sm">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-text">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">
                  API Reference
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <Link href="#" className="text-text-muted hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-display font-semibold text-text">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Antananarivo, Madagascar</span>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>contact@agora.com</span>
              </li>
              <li className="flex items-start gap-3 text-text-muted text-sm">
                <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                <span>Support 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-text-muted text-sm">
            © {currentYear} Agora. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}