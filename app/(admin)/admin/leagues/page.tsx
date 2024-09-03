// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useState } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import {
  createLeague,
  deleteLeague,
  getCurrentLeague,
} from '@/api/apiFunctions';
import { ILeagueCreate } from '@/api/apiFunctions.interface';
import TableData from '@/components/TableData/TableData';
import { Header, columns } from '@/components/TableColumns/TableColumns';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  const [table, setTable] = useState<boolean>(false);
  const [data, setData] = useState<Header[]>([]);
  // /**
  //  * Create a new league.
  //  * @param props - Props passed in for creating a league.
  //  * @param props.leagueName - Name for the League.
  //  * @param props.participants - All users in the league.
  //  * @param props.survivors - Users left in the league who haven't been eliminated.
  //  * @param props.type - Type of league. I just put 'string'.
  //  */
  // const handleAddLeague = async ({
  //   leagueName,
  //   participants,
  //   survivors,
  //   type,
  // }: ILeagueCreate): Promise<void> => {
  //   try {
  //     await createLeague({ leagueName, participants, survivors, type });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // /**
  //  * Handle deleting a league.
  //  */
  // const handleDeleteLeague = async (): Promise<void> => {
  //   try {
  //     await deleteLeague();
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
      const response = await getCurrentLeague(leagueId);
      const data: Header[] = [
        {
          leagueName: response.leagueName,
          participants: response.participants.length,
          survivors: response.survivors.length,
        },
      ];
      setData(data);
      setTable(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid grid-cols-2 gap-6">
      {/* <button
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
      </button> */}
      {!table && (
        <button
          type="submit"
          onClick={() => handleGetLeague({ leagueId: '66c6618900033d179dda' })}
          className="border-2"
        >
          Example League Card for Testing
        </button>
      )}
      {table && <TableData columns={columns} data={data} />}
      {/* <button type="submit" onClick={() => handleDeleteLeague()}>
        Delete A League
      </button> */}
      {/* <LeagueCard
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
      /> */}
    </section>
  );
};

export default AdminLeagues;
