import { render, screen, waitFor } from '@testing-library/react';
import Week from './Week';
import { getCurrentLeague, createWeeklyPicks } from '@/api/apiFunctions';
import { useDataStore } from '@/store/dataStore';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  createWeeklyPicks: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
}));

describe('Week Component', () => {
  const mockUseDataStore = useDataStore as jest.Mock;
  const mockGetCurrentLeague = getCurrentLeague as jest.Mock;
  const mockCreateWeeklyPicks = createWeeklyPicks as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display GlobalSpinner while loading data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetCurrentLeague.mockResolvedValueOnce({ week: 1 });
    mockCreateWeeklyPicks.mockResolvedValueOnce({ week: 1 });
    render(<Week entry="entry-id" league="league-id" NFLTeams={[]} week="1" />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });
});
