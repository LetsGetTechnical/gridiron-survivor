import { render, screen, waitFor } from '@testing-library/react';
import Leagues from './page';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';
import { getGameWeek } from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(() => Promise.resolve([])),
}));

jest.mock('@/api/apiFunctions', () => ({
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
}));

describe('Leagues Component', () => {
  const mockUseDataStore = useDataStore as jest.Mock;
  const mockGetUserLeagues = getUserLeagues as jest.Mock;
  const mockGetGameWeek = getGameWeek as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    render(<Leagues />);

    await waitFor(() => {
      expect(
        screen.getByText('You are not enrolled in any leagues'),
      ).toBeInTheDocument();
    });
  });

  test('should display GlobalSpinner while loading data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    render(<Leagues />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });
});
