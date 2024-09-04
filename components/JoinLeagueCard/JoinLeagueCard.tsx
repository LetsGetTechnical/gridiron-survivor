// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { IJoinLeagueCardProps } from './JoinLeagueCard.interface';
import * as React from 'react';
import Image from 'next/image';
import JoinLeagueCardPlaceholderLogo from './JoinLeagueCardPlaceholderLogo.svg';
import { Button } from '../Button/Button';
import Heading from '../Heading/Heading';

const JoinLeagueCard = React.forwardRef<
  HTMLAnchorElement,
  IJoinLeagueCardProps
>(({ leagueCardLogo = JoinLeagueCardPlaceholderLogo, title, totalPlayers }) => (
  <div
    data-testid="JoinLeagueCard"
    className={cn(
      'JoinLeagueCard flex place-items-center gap-6 rounded-lg border bg-card p-4 text-card-foreground shadow-sm dark:border-zinc-800 hover:bg-zinc-800',
    )}
  >
    <Image
      alt="League Logo"
      className="JoinLeagueCardLogo aspect-square h-24 w-24 rounded-xl"
      data-testid="JoinLeagueCardLogo"
      height={96}
      src={leagueCardLogo}
      width={96}
    />
    <div
      className="LeagueCardHeader flex flex-col space-y-1.5"
      data-testid="LeagueCardHeader"
    >
      <Heading
        as="h4"
        data-testid="LeagueCardTitle"
        className={cn(
          'LeagueCardTitle !text-2xl font-semibold leading-none tracking-tight dark',
        )}
      >
        {title}
      </Heading>
      <p className="text-foreground/50">Players: {totalPlayers}</p>
    </div>
    <Button
      label="Join League"
      className="ml-auto"
      data-testid="join-league-button"
    />
  </div>
));
JoinLeagueCard.displayName = 'LeagueCard';

export { JoinLeagueCard };
