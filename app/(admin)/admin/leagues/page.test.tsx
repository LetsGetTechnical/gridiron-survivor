import { render, screen, waitFor } from '@testing-library/react';
import AdminLeagues from './page';

describe('AdminLeagues', () => {
  beforeEach(() => {
    render(<AdminLeagues />);
  })
  it('should render the League data table component', async () => {
    const leagueTable = screen.getByTestId('data-table');
    expect(leagueTable).toBe(1);
  });
});
