export interface Session {
  id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  eventId: string;
  status: "upcoming" | "live" | "ended";
  speakers?: Array<{
    id: string;
    name: string;
    avatarUrl?: string;
  }>;
}
