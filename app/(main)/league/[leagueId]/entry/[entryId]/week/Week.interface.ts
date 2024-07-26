// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import {
  INFLTeam,
  ILeague,
  IWeeklyPicks,
  IUser,
} from '@/api/apiFunctions.interface';

export interface IWeekData {
  target: {
    value: string;
  };
}

export interface IWeekParams {
  params: {
    entryId: string;
    leagueId: string;
    weekId: string;
  };
}

export interface IWeeklyPickChange {
  data: IWeekData;
  entry: string;
  league: string;
  NFLTeams: INFLTeam[];
  setUserPick: React.Dispatch<React.SetStateAction<string>>;
  updateWeeklyPicks: ({}: IWeeklyPicks) => void;
  user: IUser;
  weeklyPicks: IWeeklyPicks;
  week: string;
}

export interface IWeekProps {
  entry: string;
  league: ILeague['leagueId'];
  NFLTeams: INFLTeam[];
  week: string;
}
