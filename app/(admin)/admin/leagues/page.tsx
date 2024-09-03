// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import {
  createLeague,
  deleteLeague,
  getCurrentLeague,
} from '@/api/apiFunctions';
import { ILeagueCreate } from '@/api/apiFunctions.interface';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  /**
   * Create a new league.
   * @param props - Props passed in for creating a league.
   * @param props.leagueName - Name for the League.
   * @param props.participants - All users in the league.
   * @param props.survivors - Users left in the league who haven't been eliminated.
   * @param props.type - Type of league. I just put 'string'.
   */
  const handleAddLeague = async ({
    leagueName,
    participants,
    survivors,
    type,
  }: ILeagueCreate): Promise<void> => {
    try {
      await createLeague({ leagueName, participants, survivors, type });
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handle deleting a league.
   */
  const handleDeleteLeague = async (): Promise<void> => {
    try {
      await deleteLeague();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * To get league data.
   * @param props - Props being passed to get the league's data.
   * @param props.leagueId - ID of the league.
   */
  const handleGetLeague = async ({
    leagueId,
  }: {
    leagueId: string;
  }): Promise<void> => {
    try {
      await getCurrentLeague(leagueId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid grid-cols-2 gap-6">
      <button
        type="submit"
        onClick={() =>
          handleAddLeague({
            leagueName: 'Test League Creation',
            participants: ['66bd072b001f6b1f6ac0'],
            survivors: ['66bd072b001f6b1f6ac0'],
            type: 'string',
          })
        }
      >
        Add New League
      </button>
      <button
        type="submit"
        onClick={() => handleGetLeague({ leagueId: '66c6618900033d179dda' })}
      >
        Get League Data
      </button>
      <button type="submit" onClick={() => handleDeleteLeague()}>
        Delete A League
      </button>
      <LeagueCard
        href={'#'}
        survivors={20}
        title={'Demo League 1'}
        totalPlayers={30}
      />
      <LeagueCard
        href={'#'}
        survivors={20}
        title={'Demo League 2'}
        totalPlayers={30}
      />
      <LeagueCard
        href={'#'}
        survivors={20}
        title={'Demo League 3'}
        totalPlayers={30}
      />
    </section>
  );
};

export default AdminLeagues;
