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

export interface INFLTeam {
  teamName: string;
  teamLogo: string;
}

export interface IUserPicksData {
  [key: string]: {
    team: string;
    correct: boolean;
  };
}
