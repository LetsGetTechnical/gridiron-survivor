export interface ILeagueCardHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isEliminated?: boolean;
  survivors: number;
  title: string;
  totalPlayers: number;
}
