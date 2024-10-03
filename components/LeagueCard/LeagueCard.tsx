// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { EliminatedStatus } from '../EliminatedStatus/EliminatedStatus';
import { ILeagueCardProps } from './LeagueCard.interface';
import { LeagueSurvivors } from '../LeagueSurvivors/LeagueSurvivors';
import * as React from 'react';
import Image from 'next/image';
import LeagueCardPlaceholderLogo from './LeagueCardPlaceholderLogo.svg';
import Link from 'next/link';

const LeagueCard = React.forwardRef<HTMLAnchorElement, ILeagueCardProps>(
  (
    {
      href,
      isEliminated = false,
      leagueCardLogo = LeagueCardPlaceholderLogo,
      survivors,
      title,
      totalPlayers,
    },
    ref,
  ) => (
    <Link
      data-testid="LeagueCard"
      href={href}
      className={cn(
        'LeagueCard flex max-h-32 place-items-center gap-6 rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm hover:bg-muted/50',
      )}
      ref={ref}
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
            'LeagueCardTitle text-2xl font-semibold leading-none tracking-tight text-foreground',
          )}
        >
          {title}
        </h4>

        <LeagueSurvivors survivors={survivors} totalPlayers={totalPlayers} />
        {isEliminated ? <EliminatedStatus /> : null}
      </div>
    </Link>
  ),
);
LeagueCard.displayName = 'LeagueCard';

export { LeagueCard };
