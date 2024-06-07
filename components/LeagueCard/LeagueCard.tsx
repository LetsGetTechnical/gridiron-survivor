import { cn } from '@/utils/utils';
import { ILeagueCardProps } from './ILeagueCard';
import { LeagueCardContent } from '../LeagueCardContent/LeagueCardContent';
import { LeagueCardHeader } from '../LeagueCardHeader/LeagueCardHeader';
import * as React from 'react';
import Link from 'next/link';

const LeagueCard = React.forwardRef<HTMLAnchorElement, ILeagueCardProps>(
  ({
    className,
    href,
    isEliminated,
    survivors,
    title,
    totalPlayers,
    ...props
  }) => (
    <Link
      data-testid="LeagueCard"
      href={href}
      className={cn(
        'LeagueCard flex h-32 place-items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
        isEliminated ? 'opacity-50 dark:bg-zinc-700' : '',
        className,
      )}
      {...props}
    >
      <LeagueCardContent />
      <LeagueCardHeader
        isEliminated={isEliminated}
        survivors={survivors}
        title={title}
        totalPlayers={totalPlayers}
      />
    </Link>
  ),
);
LeagueCard.displayName = 'LeagueCard';

export { LeagueCard };
