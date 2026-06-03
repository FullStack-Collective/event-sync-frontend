import "./globals.css";
import React from "react";

export const metadata = {
  title: "EventSync",
  description: "Gestion d'événements",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-white text-gray-900">
        {children}
      </body>
    </html>
  );
}