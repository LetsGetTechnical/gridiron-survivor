export interface ILeagueCardTitleProps
  extends React.HTMLAttributes<HTMLHeadingElement> {
  isEliminated?: boolean;
  title: string;
}
