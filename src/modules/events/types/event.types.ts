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