import { render, screen, waitFor } from "@testing-library/react";
import AdminPlayers from "./page";
import { getAllLeagueEntries } from "@/api/apiFunctions";

jest.mock('@/api/apiFunctions', () => ({
    getAllLeagueEntries: jest.fn(),
}));

describe('Admin players page', () => {
  render(<AdminPlayers />);

  const mockGetAllLeagueEntries = getAllLeagueEntries as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Player data table component', async () => {
    mockGetAllLeagueEntries.mockResolvedValue({});

    await waitFor(() => {
        const playerTable = screen.getByTestId('data-table');
        expect(playerTable).toBeInTheDocument();
    })
  })
});
