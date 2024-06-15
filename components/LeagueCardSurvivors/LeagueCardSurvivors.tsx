// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { ILeagueCardSurvivorsProps } from './LeagueCardSurvivors.interface';
import * as React from 'react';

const LeagueCardSurvivors = React.forwardRef<
  HTMLParagraphElement,
  ILeagueCardSurvivorsProps
>(({ isEliminated, survivors, totalPlayers, ...props }) => (
  <p
    data-testid="LeagueCardSurvivors"
    className={cn(
      'LeagueCardSurvivors text-sm text-foreground',
      isEliminated ? 'text-foreground/50' : '',
    )}
    {...props}
  >
    {isEliminated ? 'ELIMINATED' : `Survivors ${survivors} `}
    {isEliminated === false && (
      <span
        data-testid="LeagueCardSurvivorsTotalPlayers"
        className="text-foreground/50"
      >
        {' '}
        / {totalPlayers}
      </span>
    )}
  </p>
));
LeagueCardSurvivors.displayName = 'LeagueCardSurvivors';

export { LeagueCardSurvivors };
