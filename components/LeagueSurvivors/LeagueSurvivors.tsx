// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { ILeagueSurvivorsProps } from './LeagueSurvivors.interface';
import * as React from 'react';

const LeagueSurvivors = React.forwardRef<
  HTMLParagraphElement,
  ILeagueSurvivorsProps
>(({ className, survivors, totalPlayers, ...props }) => (
  <p
    data-testid="LeagueSurvivors"
    className={cn(`LeagueSurvivors text-sm text-foreground ${className}`)}
    {...props}
  >
    Survivors {survivors}
    <span
      data-testid="LeagueSurvivorsTotalPlayers"
      className="text-foreground/50"
    >
      {' '}
      / {totalPlayers}
    </span>
  </p>
));
LeagueSurvivors.displayName = 'LeagueSurvivors';

export { LeagueSurvivors };
