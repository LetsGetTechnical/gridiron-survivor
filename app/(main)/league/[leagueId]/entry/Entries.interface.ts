// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ILeague, INFLTeam, IUser } from '@/api/apiFunctions.interface';

export interface IEntry {
  $id: string;
  name: string;
  user: IUser;
  league: ILeague;
  selectedTeams: INFLTeam[];
}

export interface IEntryProps {
  name: string;
  user: IUser['id'];
  league: ILeague['leagueId'];
  selectedTeams?: INFLTeam[];
}
