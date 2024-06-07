import { LeagueCard } from '../LeagueCard/LeagueCard';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueCardHeader', () => {
  it('renders correctly if user is not eliminated', () => {
    render(
      <LeagueCard
        href="#"
        survivors={11}
        title={'League 1'}
        totalPlayers={12}
      />,
    );

    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueCardSurvivors).toBeInTheDocument();
    expect(leagueCardSurvivors).toHaveTextContent('Survivors 11 / 12');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveTextContent('League 1');
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

    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueCardSurvivors).toBeInTheDocument();
    expect(leagueCardSurvivors).toHaveClass('text-foreground/50');
    expect(leagueCardSurvivors).toHaveTextContent('ELIMINATED');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveTextContent('League 2');
  });
});
