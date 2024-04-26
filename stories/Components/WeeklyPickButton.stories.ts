import type { Meta, StoryObj } from '@storybook/react';
import { WeeklyPickButton } from '../../components/weekly-pick-button/WeeklyPickButton';

const meta = {
  title: 'Components/WeeklyPickButton',
  component: WeeklyPickButton,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Displays the Gridiron Survivor logo',
      },
    },
  },
  argTypes: {
    team: { description: 'Name of the team' },
    src: { description: 'Team logo image source' },
  },
} satisfies Meta<typeof WeeklyPickButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    team: 'Ravens',
    src: '/assets/team-ravens.svg',
  },
};
