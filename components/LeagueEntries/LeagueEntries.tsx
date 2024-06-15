import { Button } from '../Button/Button';
import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './ILeagueEntriesProps';
import * as React from 'react';

const LeagueEntries = React.forwardRef<HTMLDivElement, ILeagueEntriesProps>(
  ({ entryNumber, isEliminated = false, isPickSet = false }) => (
    <div
      data-testid="LeagueEntryContainerCard"
      className={cn(
        'LeagueEntryContainerCard flex h-[4.5rem] gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
        isEliminated ? 'bg-zinc-100 dark:bg-zinc-900' : 'transparent',
      )}
    >
      <div
        className="LeagueEntryCardHeader flex w-2/3 items-center gap-12"
        data-testid="LeagueCardHeader"
      >
        <h4
          data-testid="entryNumber"
          className={cn(
            'LeagueName text-xl font-semibold leading-none tracking-tight',
            isEliminated ? 'opacity-50' : '',
          )}
        >
          Entry {entryNumber}
        </h4>
        <EntryStatus isEliminated={isEliminated} />
      </div>
      <div className="flex w-1/3 items-center justify-between gap-3">
        <div>
          {isEliminated || !isPickSet ? null : (
            <img
              className="h-12 w-12"
              src="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg"
            />
          )}
        </div>

        <div>
          {isEliminated ? null : (
            <Button
              label={isPickSet ? 'Change Pick' : 'Make  Pick'}
              variant={isPickSet ? 'secondary' : 'default'}
            />
          )}
        </div>
      </div>
    </div>
  ),
);
LeagueEntries.displayName = 'LeagueEntries';

export { LeagueEntries };
