import { Models } from 'appwrite/types/models';
import { IGameWeek } from '@/api/IapiFunctions';

export interface IWeeklyPicksProps {
  NFLTeams: Models.Document[];
  currentGameWeek: IGameWeek;
  leagueId: string;
}
