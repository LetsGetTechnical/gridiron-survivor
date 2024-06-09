// Acceptance Criteria

// - [ ] Items to include: Entry name, Survivors, Make a Pick button, Change button
// - [ ] Entry #
// - [ ] Current week #
// - [ ] Need to add Eliminated state
// - [ ] Works in both desktop and mobile
// - [ ] Unit tests all variants
import { Button } from '../Button/Button';
import { cn } from '@/utils/utils';
import { ILeagueEntriesProps } from './ILeagueEntriesProps';
import { LeagueCardSurvivors } from '../LeagueCardSurvivors/LeagueCardSurvivors';
import * as React from 'react';
import LinkCustom from '../LinkCustom/LinkCustom';
import { Label } from '../Label/Label';

const LeagueEntries = React.forwardRef<HTMLDivElement, ILeagueEntriesProps>(
  ({
    entryNumber,
    isEliminated = false,
    isPickSet = false,
    survivors,
    leagueName,
    totalPlayers,
    weekNumber,
  }) => (
    <div
      data-testid="LeagueEntryContainerCard"
      className={cn(
        'LeagueEntryContainerCard grid max-h-32 gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
        isEliminated ? 'opacity-50 dark:bg-zinc-700' : '',
      )}
    >
      <div
        className="LeagueEntryCardHeader flex justify-between gap-x-3"
        data-testid="LeagueCardHeader"
      >
        <h4
          data-testid="LeagueName"
          className={cn(
            'LeagueName text-2xl font-semibold leading-none tracking-tight dark:text-zinc-50',
            isEliminated ? 'text-foreground/50' : '',
          )}
        >
          {leagueName}
        </h4>
        <div>
          {isEliminated ? (
            <p className="uppercase">eliminated</p>
          ) : (
            <Button
              label={isPickSet ? 'Change Pick' : 'Make a Pick'}
              variant={isPickSet ? 'secondary' : 'default'}
            />
          )}
        </div>
      </div>
      <div
        className="LeagueEntryCardFooter flex justify-between"
        data-testid="LeagueEntryCardFooter"
      >
        <LeagueCardSurvivors
          isEliminated={isEliminated}
          survivors={survivors}
          totalPlayers={totalPlayers}
        />
        <p className="text-sm text-foreground/50">
          Entry {entryNumber} ・ Week {weekNumber}
        </p>
      </div>
    </div>
  ),
);
LeagueEntries.displayName = 'LeagueEntries';

export { LeagueEntries };
