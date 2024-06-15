import { LeagueEntries } from './LeagueEntries';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueEntries', () => {
  it('renders without a pick made', () => {
    render(<LeagueEntries entryNumber={1} />);

    const leagueEntryContainerCard = screen.getByTestId(
      'LeagueEntryContainerCard',
    );
    const leagueEntryNumber = screen.getByTestId('LeagueEntryNumber');
    const entryStatus = screen.getByTestId('EntryStatus');
    const leagueEntryPickButton = screen.getByTestId('LeagueEntryPickButton');

    expect(entryStatus).toBeInTheDocument();
    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 1');
    expect(leagueEntryPickButton).toBeInTheDocument();
    expect(leagueEntryPickButton).toHaveTextContent('Make Pick');
  });

  it('renders with a pick made', () => {
    render(<LeagueEntries entryNumber={2} isPickSet={true} />);

    const leagueEntryContainerCard = screen.getByTestId(
      'LeagueEntryContainerCard',
    );
    const leagueEntryNumber = screen.getByTestId('LeagueEntryNumber');
    const entryStatus = screen.getByTestId('EntryStatus');
    const leagueEntryLogo = screen.getByTestId('LeagueEntryLogo');
    const leagueEntryPickButton = screen.getByTestId('LeagueEntryPickButton');

    expect(entryStatus).toBeInTheDocument();
    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryLogo).toBeInTheDocument();
    expect(leagueEntryNumber).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 2');
    expect(leagueEntryPickButton).toBeInTheDocument();
    expect(leagueEntryPickButton).toHaveTextContent('Change Pick');
  });

  it('renders as if the user is eliminated', () => {
    render(<LeagueEntries entryNumber={3} isEliminated isPickSet={false} />);

    const leagueEntryContainerCard = screen.getByTestId(
      'LeagueEntryContainerCard',
    );
    const leagueEntryNumber = screen.getByTestId('LeagueEntryNumber');
    const entryStatus = screen.getByTestId('EntryStatus');

    expect(entryStatus).toBeInTheDocument();
    expect(entryStatus).toHaveTextContent('eliminated');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryContainerCard).toHaveClass(
      'bg-zinc-100 dark:bg-zinc-900',
    );
    expect(leagueEntryNumber).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 3');
  });
});
