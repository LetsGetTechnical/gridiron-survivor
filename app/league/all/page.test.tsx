import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Leagues from './page';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(),
}));

jest.mock('@/api/apiFunctions', () => ({
  getGameWeek: jest.fn(),
}));

describe('Leagues Component', () => {
  const mockUser = { id: '123', leagues: [] };
  const mockUseDataStore = require('@/store/dataStore').useDataStore;
  const mockGetUserLeagues = require('@/utils/utils').getUserLeagues;
  const mockGetGameWeek = require('@/api/apiFunctions').getGameWeek;

  beforeEach(() => {
    mockUseDataStore.mockReturnValue({ user: mockUser });
    mockGetUserLeagues.mockResolvedValue([]);
    mockGetGameWeek.mockResolvedValue({ week: 1 });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    render(<Leagues />);

    await waitFor(() => {
      expect(
        screen.getByText('You are not enrolled in any leagues'),
      ).toBeInTheDocument();
    });
  });
});
