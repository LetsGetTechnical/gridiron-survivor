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

export interface INFLTeam {
  teamName: string;
  teamLogo: string;
}

/**
 * Enum representing database collections with their corresponding unique identifiers
 */
export enum Collection {
  USERS = '6626c4fa8f793ae275ee',
  GAMES = '6626a937b6302f6a4d28',
  GAME_RESULTS = '66313025000612a5380e',
  GAME_WEEK = '6622c701cb5a58fcdf06',
  CURRENT_WEEK = 'current_week',
  NFL_TEAMS = '662152bfabacfbda3bb3',
  NFL_SCHEDULE_2024 = 'nfl_schedule_2024',
}

/**
 * Enum representing the game weeks with their corresponding unique identifiers.
 */
export enum GameWeek {
  WEEK1 = '6622c75658b8df4c4612',
  WEEK2 = '6622c7596558b090872b',
  WEEK3 = '6622c75c7243c60640f3',
  WEEK4 = '6622c75f4364785d11f8',
  WEEK5 = '6622c77014d521146975',
  WEEK6 = '6622c773184f661996a8',
  WEEK7 = '6622c775d80607bbd6f2',
  WEEK8 = '6622c779120e17ae096e',
  WEEK9 = '6622c77c2250696b7d9d',
  WEEK10 = '6622c77f0bb9122345f5',
  WEEK11 = '66281fa40c7fbc69394e',
  WEEK12 = '664cfccf0005a64e7f35',
  WEEK13 = '664cfcd3002cb5e575ec',
}

/**
 * Enum representing important documents with their corresponding unique identifiers.
 */

export enum Document {
  CURRENT_GAME_WEEK = '664cfd88003c6cf2ff75',
}
