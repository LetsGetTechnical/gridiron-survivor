// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { INFLTeam } from '@/api/apiFunctions.interface';

export interface IWeekParams {
  params: {
    entryId: string;
    leagueId: string;
    weekId: string;
  };
}

export interface IWeekProps {
  entry: string;
  league: string;
  NFLTeams: INFLTeam[];
  week: string;
}
