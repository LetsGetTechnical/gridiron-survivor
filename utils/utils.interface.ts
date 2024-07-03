// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import {
  IGameWeek,
  ILeague,
  INFLTeam,
  IUser,
  IWeeklyPicks,
} from '@/api/apiFunctions.interface';
import { IEntry } from '@/app/league/[leagueId]/entry/Entries.interface';

export interface IGetGameData {
  userId: IUser['id'];
  currentGameWeekId: IGameWeek['id'];
}

export interface IGetGameWeekResults {
  league: ILeague | null;
  weeklyPicksData: IWeeklyPicks;
}

export interface IGetUserPick {
  weeklyPicks: IWeeklyPicks['userResults'];
  userId: IUser['id'];
  entryId: IEntry['id'];
  NFLTeams: INFLTeam[];
}

export interface IParseUserPick {
  userId: IUser['id'];
  teamId: string;
}

export interface UseProcessGameProps {
  leagueId: string;
  gameWeek: { id: string };
  user: { id: string };
  NFLTeams: INFLTeam[];
  setUserPick: (data: string) => void; // eslint-disable-line
}

export interface UseProcessGameRespError {
  error: string;
}
export interface UseProcessGameRespSuccess {
  success: boolean;
}
