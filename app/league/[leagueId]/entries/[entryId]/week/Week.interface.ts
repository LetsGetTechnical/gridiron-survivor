// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { INFLTeam, ILeague } from '@/api/apiFunctions.interface';

export interface IWeekParams {
  params: {
    entryId: string;
    leagueId: string;
    weekId: string;
  };
}

export interface IWeekProps {
  entry: string;
  league: ILeague['leagueId'];
  NFLTeams: INFLTeam[];
  week: string;
}
