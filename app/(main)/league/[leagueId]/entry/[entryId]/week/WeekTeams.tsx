// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { FormItem, FormControl } from '@/components/Form/Form';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { IWeekTeamsProps } from './WeekTeams.interface';
import { WeeklyPickButton } from '@/components/WeeklyPickButton/WeeklyPickButton';

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
 * Renders the weekly picks page.
 * @param props The parameters for the weekly picks page.
 * @param props.field The form field.
 * @param props.schedule The schedule for the week.
 * @param props.selectedTeams The user's selected teams.
 * @param props.userPick The user's pick.
 * @param props.onWeeklyPickChange The function to call when the user's pick changes.
 * @returns The rendered weekly picks page.
 */
const WeekTeams = ({
  field,
  schedule,
  selectedTeams,
  userPick,
  onWeeklyPickChange,
}: IWeekTeamsProps): JSX.Element => (
  <>
    {schedule.map((scheduledGame) => (
      <RadioGroup
        onValueChange={(value: string) => onWeeklyPickChange(value)}
        defaultValue={userPick}
        value={userPick}
        key={scheduledGame.id}
        className="grid w-full grid-cols-2 gap-4 pb-8"
        onChange={field.onChange}
      >
        <div className="week-page-game-schedule col-span-2 text-center">
          <p>{formatDateTime(scheduledGame.date)}</p>
        </div>
        {scheduledGame.competitions[0].competitors.map((competition) => (
          <FormItem key={competition.id}>
            <FormControl>
              <WeeklyPickButton
                team={competition.team.name}
                src={competition.team.logo}
              />
            </FormControl>
          </FormItem>
        ))}
      </RadioGroup>
    ))}
  </>
);
export default WeekTeams;
