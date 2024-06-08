import { LeagueCard } from '../LeagueCard/LeagueCard';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueCardSurvivors', () => {
  it('renders correctly if user is not eliminated', () => {
    render(
      <LeagueCard
        href="#"
        survivors={11}
        title={'League 1'}
        totalPlayers={12}
      />,
    );

    const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');

    expect(leagueCardSurvivors).toBeInTheDocument();
    expect(leagueCardSurvivors).toHaveTextContent('Survivors 11 / 12');
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

    const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');

    expect(leagueCardSurvivors).toBeInTheDocument();
    expect(leagueCardSurvivors).toHaveClass('text-foreground/50');
    expect(leagueCardSurvivors).toHaveTextContent('ELIMINATED');
  });
});
