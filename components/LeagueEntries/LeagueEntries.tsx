// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './LeagueEntries.interface';
import LinkCustom from '../LinkCustom/LinkCustom';
import React, { JSX, useEffect, useState } from 'react';

/**
 * A card that contains information on the user's entry for this league. Contains the entry number, their entry status (alive or eliminated), team logo once a pick is set, and a button to make a pick or change their pick
 * @param props - the props for LeagueEntries
 * @param props.entryName - the entry number of the user in that specific league
 * @param props.linkUrl - the url to the user's entry page
 * @param props.isEliminated - If true, the user is flagged as eliminat4ed
 * @param props.isPickSet - if true, the team logo of the picked team shows up on the LeagueEntries card and the button changes from "make a pick" to "chagne pick"
 * @param props.teamLogo - the team logo
 * @param props.lockout - if true, the user is locked out from making a pick
 * @returns {React.JSX.Element} - A div element that contains the user's entry information
 */

/**
 * Display all entries for a league.
 * @param {string} leagueId - The league id.
 * @returns {JSX.Element} The rendered entries component.
 */
const LeagueEntries = ({
  entryName,
  isEliminated = false,
  isPickSet = false,
  linkUrl,
  isLockedOutProp = false,
  teamLogo = '',
}: ILeagueEntriesProps): JSX.Element => {
  const [isLockedOut, setLockedOut] = useState<boolean>(isLockedOutProp);

  useEffect(() => {
    /**
     * Checks if the user is locked out from making a pick
     */
    const checkLockout = (): void => {
      const now = new Date();
      const day = now.getUTCDay();
      const hours = now.getUTCHours();
      if (
        (day === 4 && hours >= 0) ||
        (day > 4 && day < 2) ||
        (day === 2 && hours < 12)
      ) {
        setLockedOut(true);
      } else {
        setLockedOut(false);
      }
    };

    checkLockout();

    const intervalId = setInterval(checkLockout, 60 * 60 * 1000);

    return (): void => clearInterval(intervalId);
  }, []);

  return (
    <div
      data-testid="league-entry-container-card"
      className={cn(
        'league-entry-container-card grid h-20 min-w-fit grid-cols-2 justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm',
        isEliminated ? 'bg-muted' : 'transparent',
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
          <img
            className="league-entry-logo h-12 w-12"
            data-testid="league-entry-logo"
            src={teamLogo}
            alt="teamLogo"
          />
        )}

        <div
          className="league-entry-pick-button-container"
          data-testid="league-entry-pick-button-container"
        >
          {!isEliminated && (
            <LinkCustom
              aria-disabled={isLockedOut === true ? 'true' : 'false'}
              className={cn(
                'league-entry-pick-link',
                isLockedOut === true ? 'opacity-50 cursor-not-allowed' : '',
              )}
              dataTestidProp="league-entry-pick-link"
              href={linkUrl}
              onClick={(e: { preventDefault: () => unknown }) =>
                isLockedOut === true && e.preventDefault()
              }
              size={'defaultButton'}
              variant={isPickSet ? 'secondaryButton' : 'primaryButton'}
            >
              {isPickSet ? 'Change Pick' : 'Make Pick'}
            </LinkCustom>
          )}
        </div>
      </section>
    </div>
  );
};

export { LeagueEntries };
