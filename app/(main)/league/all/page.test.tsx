import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Leagues from './page';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';
import {
  getGameWeek,
  getAllLeagues,
  getUserDocumentId,
} from '@/api/apiFunctions';
import { AuthContext } from '@/context/AuthContextProvider';

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
  getAllLeagues: jest.fn(() =>
    Promise.resolve([
      {
        leagueId: '123',
        leagueName: 'Test League',
        logo: 'https://example.com/logo.png',
        participants: ['123456', '78', '9'],
        survivors: ['123456', '78'],
      },
    ]),
  ),
}));

jest.mock('@/context/AuthContextProvider', () => ({
  useAuthContext: jest.fn(() => ({ user: { id: '123' } })),
}));

describe('Leagues Component', () => {
  const mockUseDataStore = useDataStore as unknown as jest.Mock;
  const mockGetUserLeagues = getUserLeagues as jest.Mock;
  const mockGetGameWeek = getGameWeek as jest.Mock;
  const mockGetAllLeagues = getAllLeagues as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  xtest('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
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

  xtest('should display GlobalSpinner while loading data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    render(<Leagues />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });
  xtest('should not display GlobalSpinner after loading data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });

    render(<Leagues />);

    expect(screen.getByTestId('global-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });
  });

  xtest('should handle form submission to join a league', async () => {
    mockUseDataStore.mockReturnValueOnce({
      user: { id: '123', leagues: [] },
      allLeagues: [
        {
          leagueId: '123',
          leagueName: 'Test League',
          logo: 'https://findmylogo.com/logo.png',
          participants: ['123456', '78'],
          survivors: ['123456', '78', '9'],
        },
      ],
    });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByLabelText(/Select league to join/i);
    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Join League/i));

    await waitFor(() => {
      expect(
        screen.getByText('Added Test League to your leagues!'),
      ).toBeInTheDocument();
    });
  });
});
