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
