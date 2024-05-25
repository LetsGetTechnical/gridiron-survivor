import { Models } from 'appwrite/types/models';

export interface IAccountData {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
}
export interface IWeeklyPicks {
  gameId: string;
  gameWeekId: string;
  userResults: IUserPicksData | null;
}

export interface INFLTeam extends Models.Document {
  teamName: string;
  teamLogo: string;
}

export interface IUserPicksData {
  [key: string]: {
    team: string;
    correct: boolean;
  };
}

export interface IGameGroup {
  currentGameId: string;
  participants: string[];
  survivors: string[];
}
[];

export interface IGameWeek {
  id: string;
  week: number;
}
