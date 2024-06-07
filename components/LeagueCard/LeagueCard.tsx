import * as React from 'react';
import { cn } from '@/utils/utils';
import { ILeagueCardProps } from './ILeagueCard';

const LeagueCard = React.forwardRef<HTMLDivElement, ILeagueCardProps>(
  ({ className, isEliminated = false, ...props }, ref) => (
    <div
      data-testid="LeagueCard"
      ref={ref}
      className={cn(
        'LeagueCard flex h-32 place-items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
        className,
        { 'LeagueCardEliminated opacity-50 dark:bg-zinc-700': isEliminated },
      )}
      {...props}
    />
  ),
);
LeagueCard.displayName = 'LeagueCard';

export { LeagueCard };
