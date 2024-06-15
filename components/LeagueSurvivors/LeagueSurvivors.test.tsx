import { LeagueCard } from '../LeagueCard/LeagueCard';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueSurvivors', () => {
  it('renders correctly if user is not eliminated', () => {
    render(
      <LeagueCard
        href="#"
        survivors={11}
        title={'League 1'}
        totalPlayers={12}
      />,
    );

    const leagueSurvivors = screen.getByTestId('LeagueSurvivors');

    expect(leagueSurvivors).toBeInTheDocument();
    expect(leagueSurvivors).toHaveTextContent('Survivors 11 / 12');
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

    const leagueSurvivors = screen.getByTestId('LeagueSurvivors');

    expect(leagueSurvivors).toBeInTheDocument();
    expect(leagueSurvivors).toHaveClass('text-foreground/50');
    expect(leagueSurvivors).toHaveTextContent('ELIMINATED');
  });
});
