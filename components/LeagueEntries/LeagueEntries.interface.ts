// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface ILeagueEntriesProps {
  entryName: string;
  linkUrl: string;
  isEliminated?: boolean;
  isPickSet?: boolean;
  isLockedOutProp: boolean;
  userPickHistory: string[];
  selectedTeamLogo?: string;
}
