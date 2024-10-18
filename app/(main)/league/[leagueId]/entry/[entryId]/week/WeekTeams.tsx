// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { FormItem, FormControl } from '@/components/Form/Form';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { IWeekTeamsProps } from './WeekTeams.interface';
import { WeeklyPickButton } from '@/components/WeeklyPickButton/WeeklyPickButton';
import { hasTeamBeenPicked } from '@/utils/utils';
import { NFLTeams } from '@/api/apiFunctions.enum';

/**
 * Formats the date to 'day, mon date' format and the time to either 12 or 24-hour format based on the user's locale.
 * @param dateString The date string to format.
 * @returns The formatted date and time string.
 */
const formatDateTime = (dateString: string): string => {
  const date = new Date(dateString);

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  };
  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = date.toLocaleDateString('en-US', dateOptions);
  const formattedTime = date.toLocaleTimeString('en-US', timeOptions);

  return `${formattedDate} ・ ${formattedTime}`;
};

/**
 * Checks if the current game time is within 1 hour of the current time.
 * @param gameTime The game time to check.
 * @returns True if the current game time is within 1 hour of the current time, false otherwise.
 */
const checkCurrentGameTime = (gameTime: string): boolean => {
  const timestamp = new Date(gameTime);
  const currentTime = new Date();

  const currentTimeMinus1Hour = new Date(
    currentTime.getTime() - 60 * 60 * 1000,
  );

  return currentTimeMinus1Hour > timestamp;
};

/**
 * Renders the weekly picks page.
 * @param props The parameters for the weekly picks page.
 * @param props.field The form field.
 * @param props.schedule The schedule for the week.
 * @param props.selectedTeams The user's selected teams.
 * @param props.userPick The user's pick.
 * @param props.onWeeklyPickChange The function to call when the user's pick changes.
 * @param props.loadingTeamName The loading state for selecting teams.
 * @returns The rendered weekly picks page.
 */
const WeekTeams = ({
  field,
  schedule,
  selectedTeams,
  userPick,
  onWeeklyPickChange,
  loadingTeamName,
}: IWeekTeamsProps): JSX.Element => (
  <RadioGroup
    onValueChange={(value: string) => onWeeklyPickChange(value as NFLTeams)}
    defaultValue={userPick}
    value={userPick}
    onChange={field.onChange}
  >
    {schedule.map((scheduledGame) => {
      const disableGame = checkCurrentGameTime(scheduledGame.date);

      return (
        <div
          className="grid w-full grid-cols-[1fr_auto_1fr] gap-4 pb-8"
          style={{ direction: 'rtl' }}
          key={scheduledGame.id}
        >
          <div className="week-page-game-schedule col-span-3 text-center">
            <p>{formatDateTime(scheduledGame.date)}</p>
          </div>
          {scheduledGame.competitions[0].competitors.map(
            (competition, index) => (
              <>
                {index > 0 && (
                  <div className="h-20 flex self-end items-center">
                    <span>@</span>
                  </div>
                )}
                <FormItem key={competition.id} className="text-center">
                  <FormControl>
                    <WeeklyPickButton
                      loadingTeamName={loadingTeamName}
                      selectedTeam={competition.team.shortDisplayName.toLowerCase()}
                      homeAway={competition.homeAway}
                      team={competition.team.name}
                      src={competition.team.logo}
                      isDisabled={
                        disableGame ||
                        Boolean(loadingTeamName) ||
                        hasTeamBeenPicked(competition.team.name, selectedTeams)
                      }
                    />
                  </FormControl>
                </FormItem>
              </>
            ),
          )}
        </div>
      );
    })}
  </RadioGroup>
);
export default WeekTeams;
