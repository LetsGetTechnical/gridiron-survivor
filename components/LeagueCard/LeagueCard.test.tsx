import React from 'react';
import { render, screen } from '@testing-library/react';
import { LeagueCardContent } from '../LeagueCardContent/LeagueCardContent';
import { LeagueCardHeader } from '../LeagueCardHeader/LeagueCardHeader';
import { LeagueCardTitle } from '../LeagueCardTitle/LeagueCardTitle';
import { LeagueCard } from './LeagueCard';
import { LeagueCardSurvivors } from '../LeagueCardSurvivors/LeagueCardSurvivors';

describe('LeagueCard', () => {
  it('renders correctly if the user is not eliminated', () => {
    render(
      <LeagueCard>
        <LeagueCardContent />
        <LeagueCardHeader>
          <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
          <LeagueCardSurvivors />
        </LeagueCardHeader>
      </LeagueCard>,
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
      <LeagueCard isEliminated>
        <LeagueCardContent />
        <LeagueCardHeader>
          <LeagueCardTitle>LeagueCard Title</LeagueCardTitle>
          <LeagueCardSurvivors />
        </LeagueCardHeader>
      </LeagueCard>,
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
