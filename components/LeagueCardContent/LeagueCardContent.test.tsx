import { LeagueCard } from '../LeagueCard/LeagueCard';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueCardContent', () => {
  it('renders correctly if user is not eliminated', () => {
    render(
      <LeagueCard
        href="#"
        survivors={11}
        title={'League 1'}
        totalPlayers={12}
      />,
    );

    const leagueCardContent = screen.getByTestId('LeagueCardContent');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');

    expect(leagueCardContent).toBeInTheDocument();
    expect(leagueCardImage).toBeInTheDocument();
  });
  it('renders correctly if user is eliminated', () => {
    render(
      <LeagueCard
        href="#"
        isEliminated={true}
        survivors={11}
        title={'League 2'}
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardContent = screen.getByTestId('LeagueCardContent');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');

    expect(leagueCard).toHaveClass('opacity-50', 'dark:bg-zinc-700');
    expect(leagueCardContent).toBeInTheDocument();
    expect(leagueCardImage).toBeInTheDocument();
  });
});
