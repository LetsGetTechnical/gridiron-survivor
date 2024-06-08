// import { LeagueCard } from './LeagueCard';
// import { render, screen } from '@testing-library/react';
// import React from 'react';

// // Define the mock outside of describe block so it's available for all tests
// jest.mock('next/image', () => ({
//   __esModule: true,
//   default: ({ src }: { src: string }) => {
//     return <img data-testid="MockedLeagueCardLogo" src={src} />;
//   },
// }));

// describe('LeagueCard with custom league logo', () => {
//   it('renders correctly using the league-specific image if the user is not eliminated', () => {
//     render(
//       <LeagueCard
//         href="/leagues"
//         leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg"
//         survivors={11}
//         title="League 1"
//         totalPlayers={12}
//       />,
//     );

//     const leagueCard = screen.getByTestId('LeagueCard');
//     const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
//     const mockedLeagueCardLogo = screen.getByTestId('MockedLeagueCardLogo');
//     const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
//     const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

//     expect(leagueCard).toBeInTheDocument();
//     expect(leagueCardHeader).toBeInTheDocument();
//     expect(mockedLeagueCardLogo.src).toContain(
//       'https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg',
//     );
//     expect(leagueCardSurvivors).toBeInTheDocument();
//     expect(leagueCardSurvivors).toHaveTextContent('Survivors 11 / 12');
//     expect(leagueCardTitle).toBeInTheDocument();
//     expect(leagueCardTitle).toHaveTextContent('League 1');
//   });

//   it('renders correctly using the league-specific image if the user is eliminated', () => {
//     render(
//       <LeagueCard
//         href="/leagues"
//         leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg"
//         isEliminated={true}
//         survivors={11}
//         title="League 2"
//         totalPlayers={12}
//       />,
//     );

//     const leagueCard = screen.getByTestId('LeagueCard');
//     const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
//     const mockedLeagueCardLogo = screen.getByTestId('MockedLeagueCardLogo');
//     const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
//     const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

//     expect(leagueCard).toBeInTheDocument();
//     expect(leagueCard).toHaveClass('opacity-50', 'dark:bg-zinc-700');
//     expect(leagueCardHeader).toBeInTheDocument();
//     expect(mockedLeagueCardLogo.src).toContain(
//       'https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg',
//     );
//     expect(leagueCardSurvivors).toBeInTheDocument();
//     expect(leagueCardSurvivors).toHaveClass('text-foreground/50');
//     expect(leagueCardSurvivors).toHaveTextContent('ELIMINATED');
//     expect(leagueCardTitle).toBeInTheDocument();
//     expect(leagueCardTitle).toHaveClass('text-foreground/50');
//     expect(leagueCardTitle).toHaveTextContent('League 2');
//   });

//   it('renders correctly with the default league logo if the user is not eliminated', () => {
//     render(
//       <LeagueCard
//         href="/leagues"
//         survivors={11}
//         title="League 1"
//         totalPlayers={12}
//       />,
//     );

//     const leagueCard = screen.getByTestId('LeagueCard');
//     const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
//     const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
//     const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

//     expect(leagueCard).toBeInTheDocument();
//     expect(leagueCardHeader).toBeInTheDocument();
//     expect(leagueCardSurvivors).toBeInTheDocument();
//     expect(leagueCardSurvivors).toHaveTextContent('Survivors 11 / 12');
//     expect(leagueCardTitle).toBeInTheDocument();
//     expect(leagueCardTitle).toHaveTextContent('League 1');
//   });

//   it('renders correctly with the default league logo if the user is eliminated', () => {
//     render(
//       <LeagueCard
//         href="/leagues"
//         isEliminated={true}
//         survivors={11}
//         title="League 2"
//         totalPlayers={12}
//       />,
//     );

//     const leagueCard = screen.getByTestId('LeagueCard');
//     const leagueCardHeader = screen.getByTestId('LeagueCardHeader');
//     const leagueCardSurvivors = screen.getByTestId('LeagueCardSurvivors');
//     const leagueCardTitle = screen.getByTestId('LeagueCardTitle');

//     expect(leagueCard).toBeInTheDocument();
//     expect(leagueCard).toHaveClass('opacity-50', 'dark:bg-zinc-700');
//     expect(leagueCardHeader).toBeInTheDocument();
//     expect(leagueCardSurvivors).toBeInTheDocument();
//     expect(leagueCardSurvivors).toHaveClass('text-foreground/50');
//     expect(leagueCardSurvivors).toHaveTextContent('ELIMINATED');
//     expect(leagueCardTitle).toBeInTheDocument();
//     expect(leagueCardTitle).toHaveClass('text-foreground/50');
//     expect(leagueCardTitle).toHaveTextContent('League 2');
//   });
// });
