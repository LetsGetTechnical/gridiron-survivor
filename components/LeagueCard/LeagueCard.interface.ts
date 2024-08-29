// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

export interface ILeagueCardProps {
  href: string;
  isEliminated?: boolean;
  leagueCardLogo?: string;
  survivors: number;
  title: string;
  totalPlayers: number;
}
