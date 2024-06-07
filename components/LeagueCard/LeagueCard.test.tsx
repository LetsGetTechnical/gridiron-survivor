import { LeagueCard } from './LeagueCard';
import { render, screen } from '@testing-library/react';
import React from 'react';

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
    const leagueCardContent = screen.getByTestId('LeagueCardContent');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');
    const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

    expect(leagueCard).toBeInTheDocument();
    expect(leagueCardContent).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueCardImage).toBeInTheDocument();
    expect(leagueCardSurvivors).toBeInTheDocument();
    expect(leagueCardSurvivors).toHaveTextContent('Survivors 11 / 12');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveTextContent('League 1');
  });
  it('renders correctly if the user is eliminated', () => {
    render(
      <LeagueCard
        href="/leagues"
        isEliminated={true}
        survivors={11}
        title="League 2"
        totalPlayers={12}
      />,
    );

    const leagueCard = screen.getByTestId('LeagueCard');
    const leagueCardContent = screen.getByTestId('LeagueCardContent');
    const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');
    const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
    const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

    expect(leagueCard).toBeInTheDocument();
    expect(leagueCard).toHaveClass('opacity-50', 'dark:bg-zinc-700');
    expect(leagueCardContent).toBeInTheDocument();
    expect(leagueCardHeader).toBeInTheDocument();
    expect(leagueCardImage).toBeInTheDocument();
    expect(leagueCardSurvivors).toBeInTheDocument();
    expect(leagueCardSurvivors).toHaveClass('text-foreground/50');
    expect(leagueCardSurvivors).toHaveTextContent('ELIMINATED');
    expect(leagueCardTitle).toBeInTheDocument();
    expect(leagueCardTitle).toHaveClass('text-foreground/50');
    expect(leagueCardTitle).toHaveTextContent('League 2');
  });
});
