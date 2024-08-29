import { LeagueCard } from './LeagueCard';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// Define the mock outside of describe block so it's available for all tests
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src }: { src: string }) => {
    return <img data-testid="MockedLeagueCardLogo" src={src} />;
  },
}));

describe('LeagueCard with custom league logo', () => {
  it('renders correctly using the league-specific image', () => {
    render(
      <LeagueCard
        href="/leagues"
        leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg"
        survivors={11}
        title="League 1"
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const mockedLeagueCardLogo = screen.getByTestId('MockedLeagueCardLogo');
    const leagueSurvivors = screen.getByTestId('LeagueSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

    expect(leagueCard).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(mockedLeagueCardLogo).toBeInTheDocument();
    expect(leagueSurvivors).toBeInTheDocument();
    expect(leagueSurvivors).toHaveTextContent('Survivors 11 / 12');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveTextContent('League 1');
  });

  it('renders correctly with the default league logo', () => {
    render(
      <LeagueCard
        href="/leagues"
        survivors={11}
        title="League 1"
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueSurvivors = screen.getByTestId('LeagueSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

    expect(leagueCard).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueSurvivors).toBeInTheDocument();
    expect(leagueSurvivors).toHaveTextContent('Survivors 11 / 12');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveTextContent('League 1');
  });

  it('renders correctly if the user is eliminated', () => {
    render(
      <LeagueCard
        href="/leagues"
        isEliminated={true}
        survivors={11}
        title="League 1"
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueSurvivors = screen.getByTestId('LeagueSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');
    const eliminatedStatus = screen.getByTestId('eliminated-status');

    expect(leagueCard).toBeInTheDocument();
    expect(eliminatedStatus).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueSurvivors).toBeInTheDocument();
    expect(leagueSurvivors).toHaveTextContent('Survivors 11 / 12');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveTextContent('League 1');
  });

  it('should apply hover effect on mouse hover', () => {
    render(
      <LeagueCard
        href="/leagues"
        isEliminated={true}
        survivors={11}
        title="League 1"
        totalPlayers={12}
      />,
    );
    const leagueCard = screen.getByTestId('LeagueCard');
    fireEvent.mouseOver(leagueCard);

    expect(leagueCard).toHaveClass('hover:bg-zinc-800');
  });
});
