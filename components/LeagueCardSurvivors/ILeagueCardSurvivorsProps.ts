export interface ILeagueCardSurvivorsProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  isEliminated?: boolean;
  survivors: number;
  totalPlayers: number;
}
