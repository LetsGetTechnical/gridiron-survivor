import { render, screen, waitFor } from '@testing-library/react';
import Leagues from './page';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues, cn } from '@/utils/utils';
import { getGameWeek, getCurrentUserEntries } from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(),
  cn: jest.fn(),
}));

jest.mock('@/api/apiFunctions', () => ({
  getGameWeek: jest.fn(),
  getCurrentUserEntries: jest.fn(),
}));

const mockLeagues = [
  {
    leagueId: '123',
    leagueName: 'Test League',
    logo: 'https://findmylogo.com/logo.png',
    participants: ['123456', '78'],
    survivors: ['123456', '78', '9'],
  },
];

const mockEntries = [
  {
    $id: '123',
    name: 'Test Entry',
    user: '123',
    league: '123',
    selectedTeams: [],
    eliminated: false,
  },
];

const mockGameWeek = {
  id: '123',
  week: 1,
};

const mockUseDataStore = useDataStore as jest.MockedFunction<
  typeof useDataStore
>;
const mockGetUserLeagues = getUserLeagues as jest.MockedFunction<
  typeof getUserLeagues
>;
const mockGetGameWeek = getGameWeek as jest.MockedFunction<typeof getGameWeek>;
const mockGetCurrentUserEntries = getCurrentUserEntries as jest.MockedFunction<
  typeof getCurrentUserEntries
>;

describe('Leagues Component', () => {
  const mockUpdateLeagues = jest.fn();
  const mockUpdateGameWeek = jest.fn();
  const mockUpdateEntries = jest.fn();
  const mockCn = cn as jest.MockedFunction<typeof cn>;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDataStore.mockReturnValue({
      user: { id: '123', leagues: [] },
      leagues: [],
      updateLeagues: mockUpdateLeagues,
      updateGameWeek: mockUpdateGameWeek,
      updateEntries: mockUpdateEntries,
    });
  });

  test('should display GlobalSpinner while loading data', async () => {
    render(<Leagues />);

    expect(screen.getByTestId('global-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetUserLeagues).toHaveBeenCalled();
    });
  });

  test('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    mockGetUserLeagues.mockResolvedValue([]);

    render(<Leagues />);

    await waitFor(() => {
      expect(mockGetUserLeagues).toHaveBeenCalled();
    });

    expect(
      screen.getByText('You are not enrolled in any leagues'),
    ).toBeInTheDocument();
  });

  test('should not call getGameWeek or getCurrentUserEntries if no leagues are found', async () => {
    mockGetUserLeagues.mockResolvedValue([]);

    render(<Leagues />);

    await waitFor(() => {
      expect(mockGetUserLeagues).toHaveBeenCalled();
      expect(mockGetGameWeek).not.toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).not.toHaveBeenCalled();
    });
  });

  test('should not display GlobalSpinner after loading data', async () => {
    mockUseDataStore.mockReturnValue({
      user: { id: '123', leagues: ['123'] },
      leagues: mockLeagues,
      updateLeagues: mockUpdateLeagues,
      updateGameWeek: mockUpdateGameWeek,
      updateEntries: mockUpdateEntries,
    });
    mockGetUserLeagues.mockResolvedValue(mockLeagues);
    mockGetGameWeek.mockResolvedValue(mockGameWeek);
    mockGetCurrentUserEntries.mockResolvedValue(mockEntries);

    render(<Leagues />);

    expect(screen.getByTestId('global-spinner')).toBeInTheDocument();

    await waitFor(() => {
      expect(mockGetUserLeagues).toHaveBeenCalled();
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
    });

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });
  test('should display "Test League" when leagues are found', async () => {
    mockUseDataStore.mockReturnValue({
      user: { id: '123', leagues: ['123'] },
      leagues: mockLeagues,
      updateLeagues: mockUpdateLeagues,
      updateGameWeek: mockUpdateGameWeek,
      updateEntries: mockUpdateEntries,
    });
    mockGetUserLeagues.mockResolvedValue(mockLeagues);
    mockGetGameWeek.mockResolvedValue(mockGameWeek);
    mockGetCurrentUserEntries.mockResolvedValue(mockEntries);

    render(<Leagues />);

    await waitFor(() => {
      expect(mockGetUserLeagues).toHaveBeenCalled();
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
    });

    expect(mockUpdateGameWeek).toHaveBeenCalledWith(mockGameWeek);
    expect(mockUpdateEntries).toHaveBeenCalledWith(mockEntries);

    expect(screen.getByText('Test League')).toBeInTheDocument();
  });
  test('should call getGameWeek and getCurrentUserEntries if leagues are found', async () => {
    mockUseDataStore.mockReturnValue({
      user: { id: '123', leagues: ['123'] },
      leagues: mockLeagues,
      updateLeagues: mockUpdateLeagues,
      updateGameWeek: mockUpdateGameWeek,
      updateEntries: mockUpdateEntries,
    });
    mockGetUserLeagues.mockResolvedValue(mockLeagues);
    mockGetGameWeek.mockResolvedValue(mockGameWeek);
    mockGetCurrentUserEntries.mockResolvedValue(mockEntries);

    render(<Leagues />);

    await waitFor(() => {
      expect(mockGetUserLeagues).toHaveBeenCalled();
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
    });

    expect(mockUpdateGameWeek).toHaveBeenCalledWith(mockGameWeek);
    expect(mockUpdateEntries).toHaveBeenCalledWith(mockEntries);
  });
});
