export interface IAccountData {
  email: string;
  password: string;
}
export interface IUser {
  id: string;
  email: string;
}
export interface IUserWeeklyPick {
  userId: string;
  weekNumber: string;
}
export interface IWeeklyPicks {
  gameId: string;
  gameWeekId: string;
  userResults: string;
}

export interface INFLTeams { 
  teamName: string;
  teamLogo: string;
}