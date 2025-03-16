export interface Match {
  id: string;
  homeTeam: {
    id: string;
    name: string;
    logo: string;
  };
  awayTeam: {
    id: string;
    name: string;
    logo: string;
  };
  score?: {
    home: number;
    away: number;
  };
  date: string;
  time: string;
  status: 'FINISHED' | 'SCHEDULED' | 'POSTPONED';
}

export interface Matchday {
  id: number;
  name: string;
  matches: Match[];
}

export interface MatchdayListResponse {
  matchdays: {
    id: number;
    name: string;
  }[];
}

export interface MatchdayResponse {
  matchday: Matchday;
} 