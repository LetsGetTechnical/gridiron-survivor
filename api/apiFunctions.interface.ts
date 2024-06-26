// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface IAccountData {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
  leagues: string[];
}
export interface IUserPick {
  [userId: string]: {
    team: string;
    correct: boolean;
  };
}
export interface IDeleteUser {
  success: boolean;
}
export interface IWeeklyPicks {
  leagueId: string;
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
export interface ILeague {
  leagueId: string;
  leagueName: string;
  logo: string;
  participants: string[];
  survivors: string[];
}
export interface IGameWeek {
  id: string;
  week: number;
}
