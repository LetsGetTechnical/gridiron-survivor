import { LeagueSurvivors } from './LeagueSurvivors';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueSurvivors', () => {
  it('renders correctly if user is not eliminated', () => {
    render(<LeagueSurvivors survivors={11} totalPlayers={12} />);

    const leagueSurvivors = screen.getByTestId('LeagueSurvivors');

    expect(leagueSurvivors).toBeInTheDocument();
    expect(leagueSurvivors).toHaveTextContent('Survivors 11 / 12');
  });
});
