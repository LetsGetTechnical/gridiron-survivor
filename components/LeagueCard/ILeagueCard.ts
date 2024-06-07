export interface ILeagueCardProps
  extends React.HTMLAttributes<HTMLAnchorElement> {
  href: string;
  isEliminated?: boolean;
  survivors: number;
  title: string;
  totalPlayers: number;
}
