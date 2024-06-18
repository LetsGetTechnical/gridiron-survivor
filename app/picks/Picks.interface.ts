// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { IGameWeek, INFLTeam } from '@/api/apiFunctions.interface';

export interface IWeeklyPicksProps {
  NFLTeams: INFLTeam[];
  currentGameWeek: IGameWeek;
  leagueId: string;
}
