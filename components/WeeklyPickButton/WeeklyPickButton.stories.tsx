// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { WeeklyPickButton } from './WeeklyPickButton';
import { RadioGroup } from '../RadioGroup/RadioGroup';

const meta = {
  title: 'Components/WeeklyPickButton',
  component: WeeklyPickButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Button for weekly team selection',
      },
    },
  },
  argTypes: {
    homeAway: { description: 'Location of game' },
    team: { description: 'Name of the team' },
    src: { description: 'Team logo image source' },
  },
} satisfies Meta<typeof WeeklyPickButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Wraps the story in a radio group.
 * @param Story - The story
 * @returns The wrapped story.
 */
const withRadioGroup: Decorator = (Story) => (
  <RadioGroup>
    <Story />
    <WeeklyPickButton homeAway='Home' team="Cowboys" src="/assets/team-logo-placeholder.jpg" loadingTeamName={"ravens"} selectedTeam={""} />
  </RadioGroup>
);

export const Primary: Story = {
  args: {
    homeAway: 'Home',
    team: 'Ravens',
    src: '/assets/team-logo-placeholder.jpg',
    loadingTeamName: 'ravens',
    selectedTeam: '',
  },
  decorators: withRadioGroup,
};
