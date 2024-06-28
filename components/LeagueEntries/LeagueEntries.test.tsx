import { LeagueEntries } from './LeagueEntries';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueEntries', () => {
  it(`renders 'default' state without a pick made`, () => {
    render(<LeagueEntries entryNumber={1} />);

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickButton = screen.getByTestId(
      'league-entry-pick-button',
    );

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 1');
    expect(leagueEntryPickButton).toHaveTextContent('Make Pick');
  });

  it('renders as if the user made a pick', () => {
    render(<LeagueEntries entryNumber={2} isPickSet={true} />);

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickButton = screen.getByTestId(
      'league-entry-pick-button',
    );

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 2');
    expect(leagueEntryPickButton).toHaveTextContent('Change Pick');
  });

  it('renders as if the user is eliminated', () => {
    render(<LeagueEntries entryNumber={3} isEliminated isPickSet={false} />);

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');

    expect(entryStatus).toHaveTextContent('eliminated');
    expect(leagueEntryContainerCard).toHaveClass(
      'bg-zinc-100 dark:bg-zinc-900',
    );
    expect(leagueEntryNumber).toHaveTextContent('Entry 3');
  });
});
