// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '../../utils/utils';
import { ILeagueSurvivorsProps } from './LeagueSurvivors.interface';
import { JSX } from 'react';

/**
 * A component that displays the number of survivors and total players in a league.
 * @param {ILeagueSurvivorsProps} props - The props object for the component.
 * @param {string} props.className - Additional CSS classes to apply to the component.
 * @param {number} props.survivors - The number of survivors in the league.
 * @param {number} props.totalPlayers - The total number of players in the league.
 * @returns {JSX.Element} The rendered component.
 */
const LeagueSurvivors = ({
  className,
  survivors,
  totalPlayers,
}: ILeagueSurvivorsProps): JSX.Element => (
  <p
    data-testid="LeagueSurvivors"
    className={cn(`LeagueSurvivors text-sm text-foreground ${className}`)}
  >
    Survivors {survivors}
    <span
      data-testid="LeagueSurvivorsTotalPlayers"
      className="text-muted-foreground"
    >
      {' '}
      / {totalPlayers}
    </span>
  </p>
);

export { LeagueSurvivors };
