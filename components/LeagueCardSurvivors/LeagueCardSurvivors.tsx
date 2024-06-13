import { cn } from '@/utils/utils';
import { ILeagueCardSurvivorsProps } from './ILeagueCardSurvivorsProps';
import * as React from 'react';

const LeagueCardSurvivors = React.forwardRef<
  HTMLParagraphElement,
  ILeagueCardSurvivorsProps
>(({ survivors, totalPlayers, ...props }) => (
  <p
    data-testid="LeagueCardSurvivors"
    className={cn('LeagueCardSurvivors text-sm text-foreground')}
    {...props}
  >
    Survivors {survivors}
    <span
      data-testid="LeagueCardSurvivorsTotalPlayers"
      className="text-foreground/50"
    >
      {' '}
      / {totalPlayers}
    </span>
  </p>
));
LeagueCardSurvivors.displayName = 'LeagueCardSurvivors';

export { LeagueCardSurvivors };
