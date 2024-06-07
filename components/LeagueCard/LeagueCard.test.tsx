import React from 'react';
import { render, screen } from '@testing-library/react';
import { LeagueCard } from './LeagueCard';

describe('LeagueCard', () => {
  it('renders correctly if the user is not eliminated', () => {
    render(
      <LeagueCard
        href="/leagues"
        survivors={11}
        title="League 1"
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');
    const leagueCardDescription = screen.getByTestId('LeagueCardDescription');

    expect(leagueCard).toBeInTheDocument();
    expect(leagueCardImage).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardDescription).toBeInTheDocument();
  });
  it('renders correctly with less opacity if the user is eliminated', () => {
    render(
      <LeagueCard
        href="/leagues"
        survivors={11}
        title="League 1"
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');
    const leagueCardDescription = screen.getByTestId('LeagueCardDescription');

    expect(leagueCard).toBeInTheDocument();
    expect(leagueCard).toHaveClass('LeagueCardEliminated');
    expect(leagueCardImage).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardDescription).toBeInTheDocument();
  });
});
