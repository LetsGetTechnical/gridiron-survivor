// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX } from 'react';
import { Button } from '../Button/Button';
import { useDataStore } from '@/store/dataStore';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../TableDropDownMenu/TableDropDownMenu';
import { LucideChevronsUpDown } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';

/**
 * Renders admin user settings.
 * @returns {JSX.Element} The rendered admin user settings component.
 */
export const AdminUserSettings = (): JSX.Element => {
  const router = useRouter();
  const { logoutAccount } = useAuthContext();
  const { user } = useDataStore((state) => state);

  /**
   * Handles the logout.
   * @returns {Promise<void>} The logout promise.
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutAccount();
      router.push('/login');
    } catch (error) {
      throw new Error('Logout failed');
    }
  };

  /**
   * Handles the route to edit profile
   * @returns {void} No return value.
   */
  const handleRoute = (): void => {
    router.push('/user/edit');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-full focus:outline-none"
        data-testid="admin-user-settings"
      >
        <div className="admin-user-settings w-[230px] flex gap-2 px-2 py-2 items-center border-[1px] border-zinc-700 rounded-[6px] text-zinc-50 overflow-hidden">
          <span className="bg-cyan-500 w-8 h-8 rounded-full" />
          <p className="truncate ... w-36 ">{user.email}</p>
          <LucideChevronsUpDown className="ml-auto text-zinc-300" size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-[1px] border-zinc-700 rounded-[6px]  w-[230px] p-0">
        <DropdownMenuItem className="cursor-pointer rounded-none">
          <Button
            className="flex justify-start p-0 text-base font-normal hover:no-underline w-full"
            variant="link"
            label="Edit Profile"
            onClick={handleRoute}
            data-testid="edit-profile-button"
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-none">
          <Button
            className="flex justify-start p-0 text-base font-normal hover:no-underline w-full"
            variant="link"
            label="Sign Out"
            onClick={handleLogout}
            data-testid="sign-out-button"
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
