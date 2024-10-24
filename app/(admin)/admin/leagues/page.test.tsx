import { render, screen, waitFor } from '@testing-library/react';
import AdminLeagues from './page';
import { getUserLeagues } from '@/utils/utils';
import { getAllLeagueEntries } from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({
    user: {
      documentId: '123',
      id: '1234',
      email: 'test@test.com',
      leagues: ['league1', 'league2'],
    },
  })),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(() => Promise.resolve([])),
  cn: jest.fn(),
}));

jest.mock('@/api/apiFunctions', () => ({
  getAllLeagueEntries: jest.fn(),
}));

describe('AdminLeagues', () => {
  render(<AdminLeagues />);

  const mockGetUserLeagues = getUserLeagues as jest.Mock;
  const mockGetAllLeagueEntries = getAllLeagueEntries as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the League data table component', async () => {
    mockGetAllLeagueEntries.mockResolvedValue([]);

    mockGetUserLeagues.mockResolvedValue([]);

    await waitFor(() => {
      const leagueTable = screen.getByTestId('data-table');
      expect(leagueTable).toBeInTheDocument();
    });
  });
});
