// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { LucideCog, LucideChevronsUpDown } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '../TableDropDownMenu/TableDropDownMenu';
import { Button } from '../Button/Button';
import { ILeague } from '@/api/apiFunctions.interface';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';
import Image from 'next/image';

/**
 * The admin logo component.
 * @returns The rendered admin logo.
 */
export const AdminQuickMenu = ({ ...props }): React.JSX.Element => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { user } = useDataStore((state) => state);
  const [selectedLeague, setSelectedLeague] = useState<String>('Admin');

  /**
   * Fetches the user's leagues.
   * @returns {Promise<void>}
   */
  const getLeagues = async (): Promise<void> => {
    try {
      const userLeagues = await getUserLeagues(user.leagues);
      setLeagues(userLeagues);
    } catch (error) {
      throw new Error('Error fetching user leagues');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getLeagues();
  }, [user]);

  /**
   * changes the current league selected
   * @returns {void}
   */
  const changeLeague = (league: string): void => {
    setSelectedLeague(league);
  };

  return (
    <div
      className="admin-quick-menu flex items-center border-b-2 border-border px-6"
      data-testid="admin-quick-menu"
    >
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <div className="flex gap-2 px-2 py-2 items-center border-[1px] border-zinc-700 rounded-[6px] w-80 ">
            <LucideCog className="w-8 h-8 p-1 bg-zinc-700" />
            <p>{selectedLeague}</p>
            <LucideChevronsUpDown className="ml-auto text-zinc-300" size={16} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="border-[1px] border-zinc-700 rounded-[6px]  w-80 p-0">
          <DropdownMenuItem className="pl-[16px] h-[56px] cursor-pointer">
            <LucideCog className="w-8 h-8 p-1 mr-2  bg-zinc-700" />
            <p>Admin</p>
          </DropdownMenuItem>
          <hr className="border-zinc-700 w-full" />
          <p className="pl-[16px] my-[4px] text-zinc-400">Leagues</p>
          {leagues.map((league) => (
            <DropdownMenuItem className="pl-[16px] cursor-pointer">
              <Button
                className="flex justify-start items-center p-0 text-base font-normal hover:no-underline w-full"
                variant="link"
                label=""
                onClick={() => changeLeague(league?.leagueName)}
                data-testid="edit-profile-button"
              >
                <div className="w-[32px] h-[32px] relative rounded-[4px] overflow-hidden mr-[8px]">
                  <Image
                    src="/assets/team-logo-placeholder.jpg"
                    alt=""
                    fill={true}
                  />
                </div>
                {league.leagueName}
              </Button>
            </DropdownMenuItem>
          ))}
          <hr className="border-zinc-700 w-full" />
          <DropdownMenuItem className="pl-[16px] h-[44px] focus:none hover:none">
            <div className="w-[16px] h-[16px] relative rounded-[4px] overflow-hidden mr-[8px]">
              <Image src="/assets/plus-icon.svg" alt="" fill={true} />
            </div>
            <p>
              Create league <span>(Coming Soon)</span>
            </p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
