import { LeagueEntries } from './LeagueEntries';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueEntries', () => {
  it(`renders 'default' state without a pick made`, () => {
    render(
      <LeagueEntries entryName="Entry 1" isLockedOutProp={false} linkUrl="" />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickLink = screen.getByTestId('league-entry-pick-link');

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 1');
    expect(leagueEntryPickLink).toHaveTextContent('Make Pick');
  });

  it('renders as if the user made a pick', () => {
    render(
      <LeagueEntries
        entryName="Entry 2"
        isLockedOutProp={false}
        linkUrl=""
        isPickSet={true}
      />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickLink = screen.getByTestId('league-entry-pick-link');

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 2');
    expect(leagueEntryPickLink).toHaveTextContent('Change Pick');
  });

  it('renders as if the user is eliminated', () => {
    render(
      <LeagueEntries
        entryName="Entry 3"
        isEliminated
        isLockedOutProp={false}
        isPickSet={false}
        linkUrl=""
      />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');

    expect(entryStatus).toHaveTextContent('eliminated');
    expect(leagueEntryContainerCard).toHaveClass('bg-muted');
    expect(leagueEntryNumber).toHaveTextContent('Entry 3');
  });

  it('renders teamLogo when user makes a pick', () => {
    const teamLogoUrl = 'https://example.com/logo.png';
    const linkUrl = '/change-pick';

    render(
      <LeagueEntries
        entryName="Entry 2"
        isLockedOutProp={false}
        isPickSet={true}
        linkUrl={linkUrl}
        teamLogo={teamLogoUrl}
      />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickLink = screen.getByTestId('league-entry-pick-link');
    const leagueLink = screen.getByTestId('league-entry-pick-link');
    const leagueEntryLogo = screen.getByTestId('league-entry-logo');

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryNumber).toHaveTextContent('Entry 2');
    expect(leagueEntryPickLink).toHaveTextContent('Change Pick');
    expect(leagueLink).toHaveAttribute('href', linkUrl);
    expect(leagueEntryLogo).toBeInTheDocument();
    expect(leagueEntryLogo).toHaveAttribute('src', teamLogoUrl);
  });
});
