// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { IEntry } from '@/app/(main)/league/[leagueId]/entry/Entries.interface';

export interface IAccountData {
  email: string;
  password: string;
}
export interface IUser {
  documentId: string;
  // for the appwrite auth collection
  id: string;
  email: string;
  leagues: string[];
  labels: string[];
}

export interface ICollectionUser {
  documentId: string;
  // for the custom user collection
  id: string;
  email: string;
  leagues: string[];
}
export interface IUserPick {
  [userId: string]: {
    [leagueId: string]: {
      [entryId: IEntry['$id']]: {
        teamName: string;
        correct: boolean;
      };
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
  teamLogo: string;
  teamName: string;
}
export interface IEntryHistoryTeam extends Omit<INFLTeam, 'teamId'> {}
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

export interface IRecoveryToken {
  $id: string;
  expire: string;
  phrase?: string;
  secret: string;
  userId: string;
}
