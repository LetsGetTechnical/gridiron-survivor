export interface IAccountData {
  email: string;
  password: string;
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
