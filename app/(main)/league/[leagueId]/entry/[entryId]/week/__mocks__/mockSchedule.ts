// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ISchedule } from '../WeekTeams.interface';

export const mockSchedule: ISchedule[] = [
  {
    id: '401671789',
    uid: 's:20~l:28~e:401671789',
    date: '2024-09-06T00:20Z',
    name: 'Baltimore Ravens at Kansas City Chiefs',
    shortName: 'BAL @ KC',
    season: {
      year: 2024,
      type: 2,
      slug: 'regular-season',
    },
    week: {
      number: 1,
    },
    competitions: [
      {
        id: '401671789',
        uid: 's:20~l:28~e:401671789~c:401671789',
        date: '2024-09-06T00:20Z',
        attendance: 0,
        type: {
          id: '1',
          abbreviation: 'STD',
        },
        timeValid: true,
        neutralSite: false,
        conferenceCompetition: false,
        playByPlayAvailable: false,
        recent: false,
        venue: {
          id: '3622',
          fullName: 'GEHA Field at Arrowhead Stadium',
          address: {
            city: 'Kansas City',
            state: 'MO',
          },
          indoor: false,
        },
        competitors: [
          {
            id: '12',
            uid: 's:20~l:28~t:12',
            type: 'team',
            order: 0,
            homeAway: 'home',
            team: {
              id: '12',
              uid: 's:20~l:28~t:12',
              location: 'Kansas City',
              name: 'Chiefs',
              abbreviation: 'KC',
              displayName: 'Kansas City Chiefs',
              shortDisplayName: 'Chiefs',
              color: 'e31837',
              alternateColor: 'ffb612',
              isActive: true,
              venue: {
                id: '3622',
              },
              links: [
                {
                  rel: ['clubhouse', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/_/name/kc/kansas-city-chiefs',
                  text: 'Clubhouse',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['roster', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/roster/_/name/kc/kansas-city-chiefs',
                  text: 'Roster',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['stats', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/stats/_/name/kc/kansas-city-chiefs',
                  text: 'Statistics',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['schedule', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/schedule/_/name/kc',
                  text: 'Schedule',
                  isExternal: false,
                  isPremium: false,
                },
              ],
              logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/kc.png',
            },
            score: '0',
            statistics: [],
          },
          {
            id: '33',
            uid: 's:20~l:28~t:33',
            type: 'team',
            order: 1,
            homeAway: 'away',
            team: {
              id: '33',
              uid: 's:20~l:28~t:33',
              location: 'Baltimore',
              name: 'Ravens',
              abbreviation: 'BAL',
              displayName: 'Baltimore Ravens',
              shortDisplayName: 'Ravens',
              color: '29126f',
              alternateColor: '000000',
              isActive: true,
              venue: {
                id: '3814',
              },
              links: [
                {
                  rel: ['clubhouse', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/_/name/bal/baltimore-ravens',
                  text: 'Clubhouse',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['roster', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/roster/_/name/bal/baltimore-ravens',
                  text: 'Roster',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['stats', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/stats/_/name/bal/baltimore-ravens',
                  text: 'Statistics',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['schedule', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/schedule/_/name/bal',
                  text: 'Schedule',
                  isExternal: false,
                  isPremium: false,
                },
              ],
              logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/bal.png',
            },
            score: '0',
            statistics: [],
          },
        ],
        notes: [],
        status: {
          clock: 0.0,
          displayClock: '0:00',
          period: 0,
          type: {
            id: '1',
            name: 'STATUS_SCHEDULED',
            state: 'pre',
            completed: false,
            description: 'Scheduled',
            detail: 'Thu, September 5th at 8:20 PM EDT',
            shortDetail: '9/5 - 8:20 PM EDT',
          },
          isTBDFlex: false,
        },
        broadcasts: [
          {
            market: 'national',
            names: ['NBC'],
          },
        ],
        format: {
          regulation: {
            periods: 4,
          },
        },
        tickets: [
          {
            summary: 'Tickets as low as $259',
            numberAvailable: 4974,
            links: [
              {
                href: 'https://www.vividseats.com/kansas-city-chiefs-tickets-geha-field-at-arrowhead-stadium-3-4-2025--sports-nfl-football/production/4785905?wsUser=717',
              },
              {
                href: 'https://www.vividseats.com/geha-field-at-arrowhead-stadium-tickets/venue/92?wsUser=717',
              },
            ],
          },
        ],
        startDate: '2024-09-06T00:20Z',
        geoBroadcasts: [
          {
            type: {
              id: '1',
              shortName: 'TV',
            },
            market: {
              id: '1',
              type: 'National',
            },
            media: {
              shortName: 'NBC',
            },
            lang: 'en',
            region: 'us',
          },
        ],
        odds: [
          {
            provider: {
              id: '58',
              name: 'ESPN BET',
              priority: 1,
            },
            details: 'KC -2.5',
            overUnder: 46.5,
            spread: -2.5,
            awayTeamOdds: {
              favorite: false,
              underdog: true,
              team: {
                id: '33',
                uid: 's:20~l:28~t:33',
                abbreviation: 'BAL',
                name: 'Ravens',
                displayName: 'Baltimore Ravens',
                logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/bal.png',
              },
            },
            homeTeamOdds: {
              favorite: true,
              underdog: false,
              team: {
                id: '12',
                uid: 's:20~l:28~t:12',
                abbreviation: 'KC',
                name: 'Chiefs',
                displayName: 'Kansas City Chiefs',
                logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/kc.png',
              },
            },
            open: {
              over: {
                value: 1.87,
                displayValue: '20/23',
                alternateDisplayValue: '-115',
                decimal: 1.87,
                fraction: '20/23',
                american: '-115',
              },
              under: {
                value: 1.95,
                displayValue: '20/21',
                alternateDisplayValue: '-105',
                decimal: 1.95,
                fraction: '20/21',
                american: '-105',
              },
              total: {
                alternateDisplayValue: '47',
                american: '47',
              },
            },
            current: {
              over: {
                value: 1.83,
                displayValue: '5/6',
                alternateDisplayValue: '-120',
                decimal: 1.83,
                fraction: '5/6',
                american: '-120',
              },
              under: {
                value: 2.0,
                displayValue: '1/1',
                alternateDisplayValue: 'EVEN',
                decimal: 2.0,
                fraction: '1/1',
                american: 'EVEN',
              },
              total: {
                alternateDisplayValue: '46.5',
                american: '46.5',
              },
            },
          },
        ],
      },
    ],
    links: [
      {
        language: 'en-US',
        rel: ['summary', 'desktop', 'event'],
        href: 'https://www.espn.com/nfl/game/_/gameId/401671789/ravens-chiefs',
        text: 'Gamecast',
        shortText: 'Gamecast',
        isExternal: false,
        isPremium: false,
      },
    ],
    status: {
      clock: 0.0,
      displayClock: '0:00',
      period: 0,
      type: {
        id: '1',
        name: 'STATUS_SCHEDULED',
        state: 'pre',
        completed: false,
        description: 'Scheduled',
        detail: 'Thu, September 5th at 8:20 PM EDT',
        shortDetail: '9/5 - 8:20 PM EDT',
      },
    },
  },
  {
    id: '401671805',
    uid: 's:20~l:28~e:401671805',
    date: '2024-09-07T00:15Z',
    name: 'Green Bay Packers at Philadelphia Eagles',
    shortName: 'GB VS PHI',
    season: {
      year: 2024,
      type: 2,
      slug: 'regular-season',
    },
    week: {
      number: 1,
    },
    competitions: [
      {
        id: '401671805',
        uid: 's:20~l:28~e:401671805~c:401671805',
        date: '2024-09-07T00:15Z',
        attendance: 0,
        type: {
          id: '1',
          abbreviation: 'STD',
        },
        timeValid: true,
        neutralSite: true,
        conferenceCompetition: false,
        playByPlayAvailable: false,
        recent: false,
        venue: {
          id: '8748',
          fullName: 'Corinthians Arena',
          address: {
            city: 'Sao Paulo',
          },
          indoor: false,
        },
        competitors: [
          {
            id: '21',
            uid: 's:20~l:28~t:21',
            type: 'team',
            order: 0,
            homeAway: 'home',
            team: {
              id: '21',
              uid: 's:20~l:28~t:21',
              location: 'Philadelphia',
              name: 'Eagles',
              abbreviation: 'PHI',
              displayName: 'Philadelphia Eagles',
              shortDisplayName: 'Eagles',
              color: '06424d',
              alternateColor: '000000',
              isActive: true,
              venue: {
                id: '3806',
              },
              links: [
                {
                  rel: ['clubhouse', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/_/name/phi/philadelphia-eagles',
                  text: 'Clubhouse',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['roster', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/roster/_/name/phi/philadelphia-eagles',
                  text: 'Roster',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['stats', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/stats/_/name/phi/philadelphia-eagles',
                  text: 'Statistics',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['schedule', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/schedule/_/name/phi',
                  text: 'Schedule',
                  isExternal: false,
                  isPremium: false,
                },
              ],
              logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/phi.png',
            },
            score: '0',
            statistics: [],
          },
          {
            id: '9',
            uid: 's:20~l:28~t:9',
            type: 'team',
            order: 1,
            homeAway: 'away',
            team: {
              id: '9',
              uid: 's:20~l:28~t:9',
              location: 'Green Bay',
              name: 'Packers',
              abbreviation: 'GB',
              displayName: 'Green Bay Packers',
              shortDisplayName: 'Packers',
              color: '204e32',
              alternateColor: 'ffb612',
              isActive: true,
              venue: {
                id: '3798',
              },
              links: [
                {
                  rel: ['clubhouse', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/_/name/gb/green-bay-packers',
                  text: 'Clubhouse',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['roster', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/roster/_/name/gb/green-bay-packers',
                  text: 'Roster',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['stats', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/stats/_/name/gb/green-bay-packers',
                  text: 'Statistics',
                  isExternal: false,
                  isPremium: false,
                },
                {
                  rel: ['schedule', 'desktop', 'team'],
                  href: 'https://www.espn.com/nfl/team/schedule/_/name/gb',
                  text: 'Schedule',
                  isExternal: false,
                  isPremium: false,
                },
              ],
              logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/gb.png',
            },
            score: '0',
            statistics: [],
          },
        ],
        notes: [
          {
            type: 'event',
            headline: 'NFL São Paulo Game',
          },
        ],
        status: {
          clock: 0.0,
          displayClock: '0:00',
          period: 0,
          type: {
            id: '1',
            name: 'STATUS_SCHEDULED',
            state: 'pre',
            completed: false,
            description: 'Scheduled',
            detail: 'Fri, September 6th at 8:15 PM EDT',
            shortDetail: '9/6 - 8:15 PM EDT',
          },
          isTBDFlex: false,
        },
        broadcasts: [
          {
            market: 'national',
            names: ['Peacock'],
          },
        ],
        format: {
          regulation: {
            periods: 4,
          },
        },
        tickets: [
          {
            summary: 'Tickets as low as $566',
            numberAvailable: 171,
            links: [
              {
                href: 'https://www.vividseats.com/philadelphia-eagles-tickets-itaquera-arena-corinthians-9-6-2024--sports-nfl-football/production/4924743?wsUser=717',
              },
              {
                href: 'https://www.vividseats.com/venues/itaquera-arena-(corinthians)-tickets.html?wsUser=717',
              },
            ],
          },
        ],
        startDate: '2024-09-07T00:15Z',
        geoBroadcasts: [
          {
            type: {
              id: '4',
              shortName: 'Streaming',
            },
            market: {
              id: '1',
              type: 'National',
            },
            media: {
              shortName: 'Peacock',
            },
            lang: 'en',
            region: 'us',
          },
        ],
        odds: [
          {
            provider: {
              id: '58',
              name: 'ESPN BET',
              priority: 1,
            },
            details: 'PHI -1.5',
            overUnder: 48.5,
            spread: -1.5,
            awayTeamOdds: {
              favorite: false,
              underdog: true,
              team: {
                id: '9',
                uid: 's:20~l:28~t:9',
                abbreviation: 'GB',
                name: 'Packers',
                displayName: 'Green Bay Packers',
                logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/gb.png',
              },
            },
            homeTeamOdds: {
              favorite: true,
              underdog: false,
              team: {
                id: '21',
                uid: 's:20~l:28~t:21',
                abbreviation: 'PHI',
                name: 'Eagles',
                displayName: 'Philadelphia Eagles',
                logo: 'https://a.espncdn.com/i/teamlogos/nfl/500/scoreboard/phi.png',
              },
            },
            open: {
              over: {
                value: 1.91,
                displayValue: '10/11',
                alternateDisplayValue: '-110',
                decimal: 1.91,
                fraction: '10/11',
                american: '-110',
              },
              under: {
                value: 1.91,
                displayValue: '10/11',
                alternateDisplayValue: '-110',
                decimal: 1.91,
                fraction: '10/11',
                american: '-110',
              },
              total: {
                alternateDisplayValue: '48.5',
                american: '48.5',
              },
            },
            current: {
              over: {
                value: 1.91,
                displayValue: '10/11',
                alternateDisplayValue: '-110',
                decimal: 1.91,
                fraction: '10/11',
                american: '-110',
              },
              under: {
                value: 1.91,
                displayValue: '10/11',
                alternateDisplayValue: '-110',
                decimal: 1.91,
                fraction: '10/11',
                american: '-110',
              },
              total: {
                alternateDisplayValue: '48.5',
                american: '48.5',
              },
            },
          },
        ],
      },
    ],
    links: [
      {
        language: 'en-US',
        rel: ['summary', 'desktop', 'event'],
        href: 'https://www.espn.com/nfl/game/_/gameId/401671805/packers-eagles',
        text: 'Gamecast',
        shortText: 'Gamecast',
        isExternal: false,
        isPremium: false,
      },
    ],
    status: {
      clock: 0.0,
      displayClock: '0:00',
      period: 0,
      type: {
        id: '1',
        name: 'STATUS_SCHEDULED',
        state: 'pre',
        completed: false,
        description: 'Scheduled',
        detail: 'Fri, September 6th at 8:15 PM EDT',
        shortDetail: '9/6 - 8:15 PM EDT',
      },
    },
  },
];
