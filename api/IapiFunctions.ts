export interface IAccountData {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
  league: string[];
}
export interface IWeeklyPicks {
  gameId: string;
  gameWeekId: string;
  userResults: IUserPicksData | null;
}
export interface INFLTeam {
  teamId: string;
  teamName: string;
  teamLogo: string;
}
export interface IUserPicksData {
  [key: string]: {
    team: string;
    correct: boolean;
  };
}
export interface IGameGroup {
  currentGameId: string;
  participants: string[];
  survivors: string[];
}
export interface IGameWeek {
  id: string;
  week: number;
}
