// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import Image from 'next/image';
import { Label } from '../Label/Label';
import { RadioGroupItem } from '../RadioGroup/RadioGroup';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

type WeeklyPickButtonProps = {
  homeAway: string;
  team: string;
  src: string;
  isDisabled?: boolean;
  loadingTeamName: string | null;
  selectedTeam: string;
};

/**
 * Renders the weekly pick button.
 * @param props - The props
 * @param props.team - The team name
 * @param props.src - The image source
 * @param props.isDisabled - Whether the button is disabled
 * @param props.homeAway - Shows whether the team is home or away.
 * @param props.loadingTeamName - The loading state for selecting teams.
 * @param props.selectedTeam - The selected team that the user chose.
 * @returns The rendered weekly pick button.
 */
const WeeklyPickButton: React.FC<WeeklyPickButtonProps> = ({
  homeAway,
  team,
  src,
  isDisabled = false,
  loadingTeamName,
  selectedTeam,
}): JSX.Element => {
  return (
    <>
      <label htmlFor={team} className="capitalize" data-testid="home-away">
        {homeAway}
      </label>
      <div className="flex items-center mt-4">
        <RadioGroupItem
          value={team}
          id={team}
          //   disabled={isDisabled}
          data-testid="team-radio"
          className="peer focus:outline-none"
        />

        <Label
          htmlFor={team}
          data-testid="team-label"
        //   disabled={isDisabled}
          className="flex-col sm:flex-row peer-aria-checked:border-accent peer-focus:outline-none peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-white peer-focus-visible:rounded-xl peer-focus-visible:outline-offset-4"
        >
          <Image
            src={src}
            alt=""
            width={48}
            height={48}
            priority
            data-testid="team-image"
            className="h-12 w-12"
          />
          {loadingTeamName === selectedTeam ? <LoadingSpinner /> : <>{team}</>}
        </Label>
      </div>
    </>
  );
};

export { WeeklyPickButton };
