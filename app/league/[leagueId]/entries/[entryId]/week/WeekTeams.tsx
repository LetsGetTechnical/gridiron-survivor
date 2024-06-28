// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { FormItem, FormControl } from '@/components/Form/Form';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { IWeekTeamsProps } from './WeekTeams.interface';
import { WeeklyPickButton } from '@/components/WeeklyPickButton/WeeklyPickButton';

/**
 * Renders the weekly picks page.
 * @param props The parameters for the weekly picks page.
 * @param props.field The form field.
 * @param props.schedule The schedule for the week.
 * @param props.userPick The user's pick.
 * @returns The rendered weekly picks page.
 */
const WeekTeams = ({
  field,
  schedule,
  userPick,
}: IWeekTeamsProps): JSX.Element => (
  <>
    {schedule.map((scheduledGame) => (
      <RadioGroup
        onValueChange={field.onChange}
        defaultValue={userPick}
        key={scheduledGame.id}
        className="grid w-full grid-cols-2 gap-4"
      >
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
