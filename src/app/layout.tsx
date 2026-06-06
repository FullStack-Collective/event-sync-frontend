import type { Metadata } from "next";
import { DM_Sans, Syne, JetBrains_Mono } from "next/font/google";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Agora - Real-time event management",
  description: "Platform for real-time event management and participant engagement",
  icons: {
    icon: "/favicon.ico?v=2",
    shortcut: "/favicon.ico?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${syne.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
 b041103 (add events)
        {children}
      </body>
    </html>
  );
}