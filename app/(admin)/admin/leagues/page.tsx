// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { createLeague } from '@/api/apiFunctions';
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
  const createNewLeague = async ({
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
  return (
    <section className="grid grid-cols-2 gap-6">
      <button
        type="submit"
        onClick={() =>
          createNewLeague({
            leagueName: 'Test League Creation',
            participants: ['66bd072b001f6b1f6ac0'],
            survivors: ['66bd072b001f6b1f6ac0'],
            type: 'string',
          })
        }
      >
        Add New Entry
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
