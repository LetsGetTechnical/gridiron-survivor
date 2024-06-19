import { render, screen } from '@testing-library/react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';

const mockGameGroup = {
  survivors: ['1', '2'],
  participants: ['1', '2'],
};

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn().mockReturnValue({
    gameGroup: mockGameGroup,
  }),
}));

describe('Game Group', () => {
  it('should display the right data', () => {
    render(
      <LeagueCard
        href="/leagues"
        leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
        survivors={mockGameGroup.survivors.length}
        title="69ers"
        totalPlayers={mockGameGroup.participants.length}
      />,
    );

    expect(screen.getByText('2 / 3')).toBeInTheDocument();
  });
});
