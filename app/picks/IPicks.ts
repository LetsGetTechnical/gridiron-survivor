import { Models } from 'appwrite/types/models';
import { IGameWeek, INFLTeam } from '@/api/apiFunctions.interface';

export interface IWeeklyPicksProps {
  NFLTeams: INFLTeam[];
  currentGameWeek: IGameWeek;
  leagueId: string;
}
