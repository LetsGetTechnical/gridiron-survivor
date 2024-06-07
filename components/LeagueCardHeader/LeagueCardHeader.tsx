import { cn } from '@/utils/utils';
import { ILeagueCardHeaderProps } from './ILeagueCardHeaderProps';
import { LeagueCardSurvivors } from '../LeagueCardSurvivors/LeagueCardSurvivors';
import { LeagueCardTitle } from '../LeagueCardTitle/LeagueCardTitle';
import * as React from 'react';

const LeagueCardHeader = React.forwardRef<
  HTMLDivElement,
  ILeagueCardHeaderProps
>(
  (
    { className, isEliminated, survivors, title, totalPlayers, ...props },
    ref,
  ) => (
    <div
      className={cn('LeagueCardHeader flex flex-col space-y-1.5', className)}
      data-testid="LeagueCardHeader"
      ref={ref}
      {...props}
    >
      <LeagueCardTitle isEliminated={isEliminated} title={title} />
      <LeagueCardSurvivors
        isEliminated={isEliminated}
        survivors={survivors}
        totalPlayers={totalPlayers}
      />
    </div>
  ),
);
LeagueCardHeader.displayName = 'LeagueCardHeader';

export { LeagueCardHeader };
