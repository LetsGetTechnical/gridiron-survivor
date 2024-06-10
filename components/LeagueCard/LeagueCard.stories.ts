import { Meta, StoryObj } from '@storybook/react';
import { LeagueCard } from './LeagueCard';

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof LeagueCard> = {
  component: LeagueCard,
  title: 'Components/LeagueCard',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Primary UI component for user selecting a league to view.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LeagueCard>;

export const DefaultLeagueCard: Story = {
  args: {
    href: '#',
    isEliminated: false,
    survivors: 8,
    title: 'League name',
    totalPlayers: 10,
  },
};

export const EliminatedLeagueCard: Story = {
  args: {
    href: '#',
    isEliminated: true,
    survivors: 8,
    title: 'League name',
    totalPlayers: 10,
  },
};
