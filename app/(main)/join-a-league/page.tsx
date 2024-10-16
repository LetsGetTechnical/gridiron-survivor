// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import Heading from '@/components/Heading/Heading';
import React from 'react';
import Image from 'next/image';
import LeagueCardPlaceholderLogo from '@/components/LeagueCard/LeagueCardPlaceholderLogo.svg';
import { Button } from '@/components/Button/Button';

const openLeagues = [
  {
    name: 'My PR is better than yours',
    players: 100,
    buyIn: '$15',
  },
  {
    name: 'Wordpress is Dead',
    players: 80,
    buyIn: '$50',
  },
  {
    name: 'Tests are for losers',
    players: 200,
    buyIn: '$10',
  },
];

/**
 * Renders the join a league page.
 * @returns {React.JSX.Element} The rendered pick a league page.
 */
const JoinALeague = (): React.JSX.Element => {
  return (
    <section className="mx-auto max-w-3xl">
      <Heading as="h1" className="py-10 text-center">
        Join a league
      </Heading>
      <div>
        {openLeagues.map((league) => (
          <div
            key={league.name}
            className="join-a-league-card flex items-center gap-4 border-b border-border py-4"
          >
            <Image
              alt="League Logo"
              className="LeagueCardLogo aspect-square h-12 w-12 rounded-xl"
              data-testid="LeagueCardLogo"
              height={96}
              src={LeagueCardPlaceholderLogo}
              width={96}
            />
            <div className="league-info-container">
              <Heading as="h3">{league.name}</Heading>
              <div className="league-info flex gap-4 text-xs">
                <p>Players: {league.players}</p>
                <p>Buy-In: {league.buyIn}</p>
              </div>
            </div>
            <Button size={'sm'} className="ml-auto">
              Join
            </Button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JoinALeague;
