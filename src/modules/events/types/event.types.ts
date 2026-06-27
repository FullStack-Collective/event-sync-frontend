export interface Speaker {
  id: number;
  name: string;
  photoUrl?: string | null;
  bio?: string | null;
  twitter?: string | null;
  linkedin?: string | null;
}

export interface Room {
  id: number;
  name: string;
  capacity?: number | null;
}

export interface Session {
  id: number;
  title: string;
  description?: string | null;
  startTime: string;
  endTime: string;
  room: Room;
  speakers: { speaker: Speaker }[];
}
export interface Event {
  id: number;
  title: string;
  description: string | null;
  startDate: string;
  endDate: string;
  location: string | null;
  bannerUrl: string | null;
  createdAt: string;
  updatedAt: string;
  isLive: boolean;
  isUpcoming: boolean;
  isPast: boolean;
  totalSessions: number;
  totalQuestions: number;

  sessions: Session[];
 }

export interface EventListResponse {
    success : boolean;
    data: Event[];
    pagination : {
        page : number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}
export interface EventByDay {
    [date: string]: Event[];
}
export interface WeekRange {
    start: Date;
    end: Date;
    label: string;
}