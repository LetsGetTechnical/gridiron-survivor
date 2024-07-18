// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { ControllerRenderProps, FieldValues } from 'react-hook-form';

export interface ISchedule {
  id: string;
  uid: string;
  date: string;
  name: string;
  shortName: string;
  startDate: string;
  season: {
    year: number;
    type: number;
    slug: string;
  };
  week: {
    number: number;
  };
  competitions: ICompetition[];
  links: ILink[];
  status: IStatus;
}

export interface IWeekTeamsProps {
  field: ControllerRenderProps<FieldValues, string>;
  schedule: ISchedule[];
  userPick: string;
  // eslint-disable-next-line no-unused-vars
  onWeeklyPickChange: (teamSelect: string) => Promise<void>;
}

interface ICompetition {
  id: string;
  uid: string;
  date: string;
  attendance: number;
  type: {
    id: string;
    abbreviation: string;
  };
  timeValid: boolean;
  neutralSite: boolean;
  conferenceCompetition: boolean;
  playByPlayAvailable: boolean;
  recent: boolean;
  venue: IVenue;
  competitors: ICompetitor[];
  notes: unknown[];
  status: IStatus;
  broadcasts: IBroadcast[];
  format: {
    regulation: {
      periods: number;
    };
  };
  tickets: ITicket[];
  startDate: string;
  geoBroadcasts: IGeoBroadcast[];
  odds: IOdds[];
}

interface IVenue {
  id: string;
  fullName: string;
  address: {
    city: string;
    state: string;
  };
  indoor: boolean;
}

interface ICompetitor {
  id: string;
  uid: string;
  type: string;
  order: number;
  homeAway: string;
  team: ITeam;
  score: string;
  statistics: unknown[];
}

interface ITeam {
  id: string;
  uid: string;
  location: string;
  name: string;
  abbreviation: string;
  displayName: string;
  shortDisplayName: string;
  color: string;
  alternateColor: string;
  isActive: boolean;
  venue: {
    id: string;
  };
  links: ILink[];
  logo: string;
}

interface ILink {
  rel: string[];
  href: string;
  text: string;
  isExternal: boolean;
  isPremium: boolean;
}

interface IStatus {
  clock: number;
  displayClock: string;
  period: number;
  type: {
    id: string;
    name: string;
    state: string;
    completed: boolean;
    description: string;
    detail: string;
    shortDetail: string;
  };
  isTBDFlex?: boolean;
}

interface IBroadcast {
  market: string;
  names: string[];
}

interface ITicket {
  summary: string;
  numberAvailable: number;
  links: {
    href: string;
  }[];
}

interface IGeoBroadcast {
  type: {
    id: string;
    shortName: string;
  };
  market: {
    id: string;
    type: string;
  };
  media: {
    shortName: string;
  };
  lang: string;
  region: string;
}

interface IOdds {
  provider: {
    id: string;
    name: string;
    priority: number;
  };
  details: string;
  overUnder: number;
  spread: number;
  awayTeamOdds: ITeamOdds;
  homeTeamOdds: ITeamOdds;
  open: IOddsDetail;
  current: IOddsDetail;
}

interface ITeamOdds {
  favorite: boolean;
  underdog: boolean;
  team: {
    id: string;
    uid: string;
    abbreviation: string;
    name: string;
    displayName: string;
    logo: string;
  };
}

interface IOddsDetail {
  over: IOddsValue;
  under: IOddsValue;
  total: {
    alternateDisplayValue: string;
    american: string;
  };
}

interface IOddsValue {
  value: number;
  displayValue: string;
  alternateDisplayValue: string;
  decimal: number;
  fraction: string;
  american: string;
}
