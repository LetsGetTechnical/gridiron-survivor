import { Button } from '../Button/Button';
import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './ILeagueEntriesProps';
import * as React from 'react';

const LeagueEntries = React.forwardRef<HTMLDivElement, ILeagueEntriesProps>(
  ({ entryNumber, isEliminated = false, isPickSet = false }, ref) => (
    <div
      data-testid="LeagueEntryContainerCard"
      className={cn(
        'LeagueEntryContainerCard flex h-[4.5rem] gap-3 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
        isEliminated ? 'bg-zinc-100 dark:bg-zinc-900' : 'transparent',
      )}
      ref={ref}
    >
      <div
        className="LeagueEntryHeader flex w-2/3 items-center gap-12"
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
      </div>
      <div
        className="LeagueEntryFooter flex w-1/3 items-center justify-between gap-3"
        data-testid="LeagueEntryFooter"
      >
        <div
          className="LeagueEntryLogoContainer"
          data-testid="LeagueEntryLogoContainer"
        >
          {isEliminated || !isPickSet ? null : (
            <img
              className="LeagueEntryLogo h-12 w-12"
              data-testid="LeagueEntryLogo"
              src="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg"
            />
          )}
        </div>

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
      </div>
    </div>
  ),
);
LeagueEntries.displayName = 'LeagueEntries';

export { LeagueEntries };
