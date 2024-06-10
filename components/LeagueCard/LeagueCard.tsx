// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { ILeagueCardProps } from './ILeagueCardProps';
import { LeagueCardSurvivors } from '../LeagueCardSurvivors/LeagueCardSurvivors';
import * as React from 'react';
import Image from 'next/image';
import LeagueCardPlaceholderLogo from './LeagueCardPlaceholderLogo.svg';
import Link from 'next/link';

const LeagueCard = React.forwardRef<HTMLAnchorElement, ILeagueCardProps>(
  ({
    href,
    isEliminated = false,
    leagueCardLogo = LeagueCardPlaceholderLogo,
    survivors,
    title,
    totalPlayers,
  }) => (
    <Link
      data-testid="LeagueCard"
      href={href}
      className={cn(
        'LeagueCard flex max-h-32 place-items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800',
        isEliminated ? 'opacity-50 dark:bg-zinc-700' : '',
      )}
    >
      <Image
        alt="League Logo"
        className="LeagueCardLogo aspect-square h-24 w-24 rounded-xl"
        data-testid="LeagueCardLogo"
        height={96}
        src={leagueCardLogo}
        width={96}
      />
      <div
        className="LeagueCardHeader flex flex-col space-y-1.5"
        data-testid="LeagueCardHeader"
      >
        <h4
          title={title}
          data-testid="LeagueCardTitle"
          className={cn(
            'LeagueCardTitle text-2xl font-semibold leading-none tracking-tight dark:text-zinc-50',
            isEliminated ? 'text-foreground/50' : '',
          )}
        >
          {title}
        </h4>
        <LeagueCardSurvivors
          isEliminated={isEliminated}
          survivors={survivors}
          totalPlayers={totalPlayers}
        />
      </div>
    </Link>
  ),
);
LeagueCard.displayName = 'LeagueCard';

export { LeagueCard };
