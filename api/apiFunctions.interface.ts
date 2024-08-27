// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { IEntry } from '@/app/(main)/league/[leagueId]/entry/Entries.interface';

export interface IAccountData {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
  leagues: ILeague[];
}
export interface IUserPick {
  [userId: string]: {
    [entryId: IEntry['$id']]: {
      teamName: string;
      correct: boolean;
    };
  };
}
export interface IDeleteUser {
  success: boolean;
}
export interface IWeeklyPicks {
  leagueId: string;
  gameWeekId: string;
  userResults: IUserPicksData;
}
export interface INFLTeam {
  teamId: string;
  teamName: string;
}
export interface IUserPicksData extends IUserPick {}
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
