// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Button } from '../Button/Button';
import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './LeagueEntries.interface';
import React, { JSX } from 'react';
import Link from 'next/link';
import Image from 'next/image';

/**
 * A card that contains information on the user's entry for this league. Contains the entry number, their entry status (alive or eliminated), team logo once a pick is set, and a button to make a pick or change their pick
 * @param props - the props for LeagueEntries
 * @param props.entryName - the entry number of the user in that specific league
 * @param props.linkUrl - the url to the user's entry page
 * @param props.isEliminated - If true, the user is flagged as eliminat4ed
 * @param props.isPickSet - if true, the team logo of the picked team shows up on the LeagueEntries card and the button changes from "make a pick" to "chagne pick"
 * @param props.selectedTeamLogo - the team logo
 * @returns {React.JSX.Element} - A div element that contains the user's entry information
 */
const LeagueEntries = ({
  entryName,
  linkUrl,
  isEliminated = false,
  isPickSet = false,
  selectedTeamLogo = '',
}: ILeagueEntriesProps): JSX.Element => {
  return (
    <div
      data-testid="league-entry-container-card"
      className={cn(
        'league-entry-container-card grid h-21 min-w-fit items-center justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm',
        isEliminated ? 'bg-muted' : 'transparent',
        'grid-cols-2',
      )}
    >
      <section
        className="league-entry-header flex items-center gap-12"
        data-testid="league-entry-header"
      >
        <h4
          data-testid="league-entry-number"
          className={cn(
            'league-entry-number text-xl font-semibold leading-none tracking-tight',
            isEliminated ? 'opacity-50' : '',
          )}
        >
          {entryName}
        </h4>
        <EntryStatus isEliminated={isEliminated} />
      </section>
      <section
        className="league-entry-footer flex items-center justify-end gap-12"
        data-testid="league-entry-footer"
      >
        {isPickSet && (
          <div className="flex flex-col items-center border border-primary px-2 py-1 rounded-lg">
            <span className="text-xs">CURRENT</span>
            <Image
              className="league-entry-logo"
              height={40}
              width={40}
              data-testid="league-entry-logo"
              src={selectedTeamLogo}
              alt="teamLogo"
            />
          </div>
        )}

        <div
          className="league-entry-pick-button-container"
          data-testid="league-entry-pick-button-container"
        >
          {!isEliminated && (
            <Link href={linkUrl} data-testid="league-entry-pick-button-link">
              <Button
                className="league-entry-pick-button"
                data-testid="league-entry-pick-button"
                label={isPickSet ? 'Change Pick' : 'Make Pick'}
                variant={isPickSet ? 'secondary' : 'default'}
              />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};
export { LeagueEntries };
