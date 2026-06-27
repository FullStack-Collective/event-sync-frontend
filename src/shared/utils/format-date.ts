/**
 * Utilitaires pour gérer les dates UTC correctement
 */

/**
 * Parse une date UTC et retourne un objet Date avec l'heure locale
 * Problème: new Date('2026-06-08T16:00:00.000Z') donne une date avec décalage
 * Solution: Extraire les composants UTC et créer la date locale correspondante
 */
export const parseUTCDate = (utcDateString: string): Date => {
  // Extraire les composants UTC
  const match = utcDateString.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/);
  
  if (match) {
    const [, year, month, day, hour, minute, second] = match;
    // Créer une date locale avec ces valeurs (pas de conversion)
    return new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute),
      parseInt(second)
    );
  }
  
  return new Date(utcDateString);
};

/**
 * Formate une date UTC en affichage local
 */
export const formatUTCDate = (utcDateString: string, format: 'date' | 'time' | 'datetime' = 'date'): string => {
  const date = parseUTCDate(utcDateString);
  
  if (format === 'time') {
    return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  }
  
  if (format === 'datetime') {
    return `${date.toLocaleDateString('fr-FR')} à ${date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
  }
  
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
};

/**
 * Vérifie si une date UTC correspond à un jour donné (en UTC)
 */
export const isSameUTCDay = (utcDateString: string, compareDate: Date): boolean => {
  const date = parseUTCDate(utcDateString);
  return (
    date.getFullYear() === compareDate.getFullYear() &&
    date.getMonth() === compareDate.getMonth() &&
    date.getDate() === compareDate.getDate()
  );
};

/**
 * Vérifie si une date UTC est aujourd'hui (comparaison UTC)
 */
export const isTodayUTC = (utcDateString: string): boolean => {
  const today = new Date();
  return isSameUTCDay(utcDateString, today);
};

/**
 * Calcule la différence en jours entre une date UTC et aujourd'hui
 */
export const getDaysDiff = (utcDateString: string): number => {
  const eventDate = parseUTCDate(utcDateString);
  const today = new Date();
  
  // Remettre les heures à 0 pour la comparaison
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);
  
  const diffTime = eventDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Vérifie si un événement est en cours (comparaison UTC)
 */
export const isLiveUTC = (startDate: string, endDate: string): boolean => {
  const now = new Date();
  const start = parseUTCDate(startDate);
  const end = parseUTCDate(endDate);
  return now >= start && now <= end;
};