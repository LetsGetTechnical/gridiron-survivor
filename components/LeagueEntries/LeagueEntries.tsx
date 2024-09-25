// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Button } from '../Button/Button';
import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './LeagueEntries.interface';
import React, { JSX, useEffect, useState } from 'react';
import LinkCustom from 'next/link';
import Image from 'next/image';

/**
 * A card that contains information on the user's entry for this league. Contains the entry number, their entry status (alive or eliminated), team logo once a pick is set, and a button to make a pick or change their pick
 * @param props - the props for LeagueEntries
 * @param props.entryName - the entry number of the user in that specific league
 * @param props.linkUrl - the url to the user's entry page
 * @param props.isEliminated - If true, the user is flagged as eliminat4ed
 * @param props.isPickSet - if true, the team logo of the picked team shows up on the LeagueEntries card and the button changes from "make a pick" to "chagne pick"
 * @param props.userPickHistory - the user's pick history for this entry
 * @param props.selectedTeamLogo - the team logo
 * @param props.isLockedOutProp
 * @returns {React.JSX.Element} - A div element that contains the user's entry information
 */
const LeagueEntries = ({
  entryName,
  isEliminated = false,
  isPickSet = false,
  linkUrl,
  isLockedOutProp = false,
  userPickHistory,
  selectedTeamLogo = '',
}: ILeagueEntriesProps): JSX.Element => {
  const [isLockedOut, setLockedOut] = useState<boolean>(isLockedOutProp);

  useEffect(() => {
    /**
     * Checks if the user is locked out from making a pick.
     */
    const checkLockout = (): void => {
      const currentDateAndTime = new Date();
      const day = currentDateAndTime.getUTCDay();
      const hours = currentDateAndTime.getUTCHours();
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
        'league-entry-container-card grid h-21 min-w-fit items-center justify-between rounded-lg border border-border bg-card p-4 text-card-foreground shadow-sm',
        isEliminated ? 'bg-muted' : 'transparent',
        userPickHistory.length === 0 ? 'grid-cols-2' : 'grid-cols-3',
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
      {userPickHistory.length > 0 && (
        <section
          className="flex gap-2 overflow-x-scroll justify-end mr-2"
          data-testid="user-pick-history"
        >
          {userPickHistory?.map((logoURL, index) => (
            <div
              key={`${logoURL ? logoURL : 'no-pick'}-${index + 1}`}
              className="flex flex-col h-[66px] opacity-80 items-center justify-center border border-border px-4 py-1 rounded-lg gap-1"
            >
              <span className="text-xs">WEEK {index + 1}</span>
              {logoURL ? (
                <Image
                  className="league-entry-logo"
                  width={40}
                  height={40}
                  data-testid="league-history-logo"
                  src={logoURL}
                  alt="teamLogo"
                />
              ) : (
                <span
                  className="text-xs h-10 w-full text-primary pt-2"
                  data-testid="no-pick"
                >
                  No Pick
                </span>
              )}
            </div>
          ))}
        </section>
      )}
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
