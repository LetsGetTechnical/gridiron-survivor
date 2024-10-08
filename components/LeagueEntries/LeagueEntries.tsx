// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { cn } from '@/utils/utils';
import { EntryStatus } from '../EntryStatus/EntryStatus';
import { ILeagueEntriesProps } from './LeagueEntries.interface';
import Image from 'next/image';
import LinkCustom from '../LinkCustom/LinkCustom';
import React, { JSX } from 'react';
import useLockout from '@/hooks/useLockout';

/**
 * A card that contains information on the user's entry for this league. Contains the entry number, their entry status (alive or eliminated), team logo once a pick is set, and a button to make a pick or change their pick
 * @param props - the props for LeagueEntries
 * @param props.entryName - the entry number of the user in that specific league
 * @param props.linkUrl - the url to the user's entry page
 * @param props.isEliminated - If true, the user is flagged as eliminat4ed
 * @param props.isPickSet - if true, the team logo of the picked team shows up on the LeagueEntries card and the button changes from "make a pick" to "chagne pick"
 * @param props.userPickHistory - the user's pick history for this entry
 * @param props.selectedTeamLogo - the team logo
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
  userPickHistory,
  selectedTeamLogo = '',
}: ILeagueEntriesProps): JSX.Element => {
  const lockedOut = useLockout();

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
              aria-disabled={lockedOut === true ? 'true' : 'false'}
              className={cn(
                'league-entry-pick-link',
                lockedOut === true ? 'opacity-50 cursor-not-allowed' : '',
              )}
              dataTestidProp="league-entry-pick-link"
              href={linkUrl}
              onClick={(e: { preventDefault: () => unknown }) =>
                lockedOut === true && e.preventDefault()
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
