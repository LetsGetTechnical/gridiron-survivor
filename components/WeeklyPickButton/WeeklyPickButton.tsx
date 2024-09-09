// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import Image from 'next/image';
import { Label } from '../Label/Label';
import { RadioGroupItem } from '../RadioGroup/RadioGroup';

type WeeklyPickButtonProps = {
  team: string;
  src: string;
  isDisabled?: boolean;
};

/**
 * Renders the weekly pick button.
 * @param props - The props
 * @param props.team - The team name
 * @param props.src - The image source
 * @param props.isDisabled - Whether the button is disabled
 * @returns The rendered weekly pick button.
 */
const WeeklyPickButton: React.FC<WeeklyPickButtonProps> = ({
  team,
  src,
  isDisabled = false,
}): JSX.Element => {
  return (
    <div className="flex items-center">
      <RadioGroupItem
        value={team}
        id={team}
        disabled={isDisabled}
        data-testid="team-radio"
      />
      <Label htmlFor={team} data-testid="team-label" disabled={isDisabled}>
        <Image
          src={src}
          alt={team}
          width={48}
          height={48}
          priority
          data-testid="team-image"
          className="h-12 w-12"
        />
        {team}
      </Label>
    </div>
  );
};

export { WeeklyPickButton };
