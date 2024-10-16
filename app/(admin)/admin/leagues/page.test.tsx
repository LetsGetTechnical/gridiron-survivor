import { render, screen, waitFor } from '@testing-library/react';
import AdminLeagues from './page';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn().mockReturnValue({
    user: { leagues: ['league1', 'league2'] },
  }),
}));

describe('AdminLeagues', () => {
  beforeEach(() => {
    render(<AdminLeagues />);
  })
  it('should render the League data table component', async () => {
    await waitFor(() => {
      const leagueTable = screen.getByTestId('data-table');
      expect(leagueTable).toBeInTheDocument();  // Verifies table is present
    });
  });
});
