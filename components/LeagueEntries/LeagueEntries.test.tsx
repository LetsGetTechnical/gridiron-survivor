import { LeagueEntries } from './LeagueEntries';
import { render, screen } from '@testing-library/react';
import React from 'react';

describe('LeagueEntries', () => {
  it(`renders 'default' state without a pick made`, () => {
    render(
      <LeagueEntries entryName="Entry 1" isLockedOutProp={false} linkUrl="" userPickHistory={[]} />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickLink = screen.getByTestId(
      'league-entry-pick-link',
    );
    const userHistoryPicks = screen.queryByTestId('user-pick-history');

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 1');
    expect(leagueEntryPickLink).toHaveTextContent('Make Pick');
    expect(userHistoryPicks).not.toBeInTheDocument();
  });

  it('renders as if the user made a pick', () => {
    render(
      <LeagueEntries
        entryName="Entry 2"
        linkUrl=""
        isPickSet={true}
        userPickHistory={['/team-a-logo.png']}
      />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickLink = screen.getByTestId(
      'league-entry-pick-link',
    );

    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(leagueEntryNumber).toHaveTextContent('Entry 2');
    expect(leagueEntryPickLink).toHaveTextContent('Change Pick');
    expect(screen.queryByTestId('user-pick-history')).toBeInTheDocument();
  });

  it('renders as if the user is eliminated', () => {
    render(
      <LeagueEntries
        entryName="Entry 3"
        isEliminated
        isPickSet={false}
        linkUrl=""
        userPickHistory={['/team-a-logo.png']}
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

  it('renders teamLogo when user makes a pick and shows user pick history logo', () => {
    const teamLogoUrl = 'https://example.com/logo.png';
    const linkUrl = '/change-pick';

    render(
      <LeagueEntries
        entryName="Entry 2"
        isPickSet={true}
        linkUrl={linkUrl}
        selectedTeamLogo={teamLogoUrl}
        userPickHistory={['/team-a-logo.png']}
      />,
    );

    const leagueEntryContainerCard = screen.getByTestId(
      'league-entry-container-card',
    );
    const leagueEntryNumber = screen.getByTestId('league-entry-number');
    const entryStatus = screen.getByTestId('entry-status');
    const leagueEntryPickLink = screen.getByTestId(
      'league-entry-pick-link',
    );
    const leagueLink = screen.getByTestId('league-entry-pick-link');
    const leagueEntryLogo = screen.getByTestId('league-entry-logo');

    expect(leagueEntryContainerCard).toBeInTheDocument();
    expect(entryStatus).toHaveTextContent('alive');
    expect(leagueEntryNumber).toHaveTextContent('Entry 2');
    expect(leagueEntryPickLink).toHaveTextContent('Change Pick');
    expect(leagueLink).toHaveAttribute('href', linkUrl);
    expect(leagueEntryLogo).toBeInTheDocument();
    expect(leagueEntryLogo).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Flogo.png&w=96&q=75',
    );
    expect(screen.getByTestId('league-history-logo')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fteam-a-logo.png&w=96&q=75',
    );
  });
  it('renders no pick when a previous week pick is not available', () => {
    const teamLogoUrl = 'https://example.com/logo.png';
    const linkUrl = '/change-pick';

    render(
      <LeagueEntries
        entryName="Entry 2"
        isPickSet={true}
        linkUrl={linkUrl}
        selectedTeamLogo={teamLogoUrl}
        userPickHistory={['', '/team-a-logo.png']}
      />,
    );

    const leagueEntryLogo = screen.getByTestId('league-entry-logo');
    const noPick = screen.getByTestId('no-pick');

    expect(leagueEntryLogo).toBeInTheDocument();
    expect(leagueEntryLogo).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Flogo.png&w=96&q=75',
    );
    expect(screen.getByTestId('league-history-logo')).toHaveAttribute(
      'src',
      '/_next/image?url=%2Fteam-a-logo.png&w=96&q=75',
    );
    expect(noPick).toBeInTheDocument();
    expect(noPick).toHaveTextContent('No Pick');
  });
});
