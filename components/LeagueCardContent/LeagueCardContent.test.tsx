import React from 'react';
import { render, screen } from '@testing-library/react';
import { LeagueCardContent } from './LeagueCardContent';

describe('LeagueCardContent', () => {
  it('renders correctly', () => {
    render(<LeagueCardContent />);

    const leagueCardContent = screen.getByTestId('LeagueCardContent');
    const leagueCardImage = screen.getByTestId('LeagueCardImage');

    expect(leagueCardContent).toBeInTheDocument();
    expect(leagueCardImage).toBeInTheDocument();
  });
});
