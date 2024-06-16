// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import {
  IGameWeek,
  ILeague,
  IUser,
  IWeeklyPicks,
} from '@/api/apiFunctions.interface';
import { Models } from 'appwrite/types/models';

export interface IGetGameData {
  userId: IUser['id'];
  currentGameWeekId: IGameWeek['id'];
}

export interface IGetGameWeekResults {
  league: ILeague | null;
  weeklyPicksData: IWeeklyPicks | '';
}

export interface IGetUserPick {
  weeklyPicks: IWeeklyPicks['userResults'];
  userId: IUser['id'];
  NFLTeams: Models.Document[];
}

export interface IParseUserPick {
  userId: IUser['id'];
  teamId: string;
}
