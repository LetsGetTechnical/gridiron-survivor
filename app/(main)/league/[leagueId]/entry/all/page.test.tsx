import { render, screen, waitFor } from '@testing-library/react';
import Entry from './page';
import { useDataStore } from '@/store/dataStore';
import { getGameWeek, getCurrentUserEntries } from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  getCurrentUserEntries: jest.fn(() =>
    Promise.resolve([
      {
        id: '123',
        week: 1,
      },
    ]),
  ),
}));

describe('Entry Component', () => {
  const mockUseDataStore = useDataStore as jest.Mock;
  const mockGetGameWeek = getGameWeek as jest.Mock;
  const mockGetCurrentUserEntries = getCurrentUserEntries as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display GlobalSpinner while loading data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        id: '123',
        week: 1,
      },
    ]);
    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should not display GlobalSpinner and load data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        id: '123',
        week: 1,
      },
    ]);
    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).not.toBeInTheDocument();
    });
  });
});
