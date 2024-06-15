// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Button } from '../Button/Button';
import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './LeagueEntries.interface';
import * as React from 'react';

const LeagueEntries = React.forwardRef<HTMLDivElement, ILeagueEntriesProps>(
  ({ entryNumber, isEliminated = false, isPickSet = false }, ref) => (
    <div
      data-testid="LeagueEntryContainerCard"
      className={cn(
        'LeagueEntryContainerCard grid h-20 min-w-fit grid-cols-2 justify-between rounded-lg border bg-card p-4 text-card-foreground shadow-sm outline dark:border-zinc-800',
        isEliminated ? 'bg-zinc-100 dark:bg-zinc-900' : 'transparent',
      )}
      ref={ref}
    >
      <section
        className="LeagueEntryHeader flex items-center gap-2 md:gap-12"
        data-testid="LeagueEntryHeader"
      >
        <h4
          data-testid="LeagueEntryNumber"
          className={cn(
            'LeagueEntryNumber text-xl font-semibold leading-none tracking-tight',
            isEliminated ? 'opacity-50' : '',
          )}
        >
          Entry {entryNumber}
        </h4>
        <EntryStatus isEliminated={isEliminated} />
      </section>
      <section
        className="LeagueEntryFooter flex items-center justify-end gap-2 md:gap-12"
        data-testid="LeagueEntryFooter"
      >
        {isEliminated || !isPickSet ? null : (
          <img
            className="LeagueEntryLogo h-12 w-12"
            data-testid="LeagueEntryLogo"
            src="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg"
            alt="League name"
          />
        )}

        <div
          className="LeagueEntryPickButtonContainer"
          data-testid="LeagueEntryPickButtonContainer"
        >
          {isEliminated ? null : (
            <Button
              className="LeagueEntryPickButton"
              data-testid="LeagueEntryPickButton"
              label={isPickSet ? 'Change Pick' : 'Make Pick'}
              variant={isPickSet ? 'secondary' : 'default'}
            />
          )}
        </div>
      </section>
    </div>
  ),
);
LeagueEntries.displayName = 'LeagueEntries';

export { LeagueEntries };
