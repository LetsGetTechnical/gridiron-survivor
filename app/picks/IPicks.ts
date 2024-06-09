import { Models } from 'appwrite/types/models';
import { IGameWeek, INFLTeam } from '@/api/IapiFunctions';

export interface IWeeklyPicksProps {
  NFLTeams: INFLTeam[];
  currentGameWeek: IGameWeek;
  leagueId: string;
}
