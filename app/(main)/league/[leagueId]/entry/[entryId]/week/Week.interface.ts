// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import {
  INFLTeam,
  ILeague,
  IWeeklyPicks,
  IUser,
} from '@/api/apiFunctions.interface';
import { NFLTeams } from '@/api/apiFunctions.enum';

export interface IWeekParams {
  params: {
    entryId: string;
    leagueId: string;
    weekId: string;
  };
}

export interface IWeeklyPickChange {
  teamSelect: NFLTeams;
  entry: string;
  league: string;
  NFLTeams: INFLTeam[];
  setUserPick: React.Dispatch<React.SetStateAction<string>>;
  updateWeeklyPicks: ({}: IWeeklyPicks) => void;
  user: IUser;
  weeklyPicks: IWeeklyPicks;
  week: string;
  setLoadingTeamName: (loadData: string | null) => void;
}

export interface IWeekProps {
  entry: string;
  league: ILeague['leagueId'];
  NFLTeams: INFLTeam[];
  week: string;
}
