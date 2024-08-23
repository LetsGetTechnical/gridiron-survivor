import { render, screen } from '@testing-library/react';
import AdminLeagues from './page';

describe('AdminLeagues', () => {
  it('should render the AdminLeagues page with LeagueCard components', () => {
    render(<AdminLeagues />);
    const leagueCards = screen.getAllByTestId('LeagueCard');
    expect(leagueCards.length).toBe(3);
  });
});
