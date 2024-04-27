import type { Decorator, Meta, StoryObj } from '@storybook/react';
import { WeeklyPickButton } from '../../components/weekly-pick-button/WeeklyPickButton';
import { RadioGroup } from '../../components/weekly-pick-button/RadioGroup';

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
    team: { description: 'Name of the team' },
    src: { description: 'Team logo image source' },
  },
} satisfies Meta<typeof WeeklyPickButton>;

export default meta;
type Story = StoryObj<typeof meta>;

const withRadioGroup: Decorator = (Story) => (
  <RadioGroup>
    <Story />
    <WeeklyPickButton team="Cowboys" src="/assets/team-cowboys.svg" />
  </RadioGroup>
);

export const Primary: Story = {
  args: {
    team: 'Ravens',
    src: '/assets/team-ravens.svg',
  },
  decorators: withRadioGroup,
};
