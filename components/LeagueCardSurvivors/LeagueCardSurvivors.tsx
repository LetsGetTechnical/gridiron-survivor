import { cn } from '@/utils/utils';
import { ILeagueCardSurvivorsProps } from './ILeagueCardSurvivorsProps';
import * as React from 'react';

const LeagueCardSurvivors = React.forwardRef<
  HTMLParagraphElement,
  ILeagueCardSurvivorsProps
>(({ className, isEliminated, survivors, totalPlayers, ...props }, ref) => (
  <p
    data-testid="LeagueCardSurvivors"
    ref={ref}
    className={cn(
      'LeagueCardSurvivors text-sm text-foreground',
      isEliminated ? 'text-foreground/50' : '',
      className,
    )}
    {...props}
  >
    {isEliminated ? 'ELIMINATED' : `Surviors ${survivors} `}
    {!isEliminated && (
      <span className="text-foreground/50"> / {totalPlayers}</span>
    )}
  </p>
));
LeagueCardSurvivors.displayName = 'LeagueCardSurvivors';

export { LeagueCardSurvivors };
