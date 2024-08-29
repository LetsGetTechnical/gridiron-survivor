'use client';
// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Button } from '../Button/Button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../TableDropDownMenu/TableDropDownMenu';
import { LucideChevronsUpDown } from 'lucide-react';
import React from 'react';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';

/**
 * Renders admin user settings.
 * @returns {JSX.Element} The rendered admin user settings component.
 */
export const AdminUserSettings = (): React.JSX.Element => {
  const router = useRouter();
  const { logoutAccount } = useAuthContext();

  /**
   * Handles the logout.
   * @returns {Promise<void>} The logout promise.
   */
  const handleLogout = async (): Promise<void> => {
    try {
      await logoutAccount();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Handles the route to edit profile
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
        <div className="admin-user-settings flex gap-2 px-2 py-2 items-center outline outline-border rounded text-zinc-50">
          <span className="bg-cyan-500 w-8  h-8 rounded-full" />
          <p>Users Name</p>
          <LucideChevronsUpDown className="ml-auto text-zinc-300" size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="outline outline-border rounded border-zinc-700 w-[232px]">
        <DropdownMenuItem className="cursor-pointer">
          <Button
            className="flex justify-start p-0 text-base font-normal hover:no-underline w-full"
            variant="link"
            label="Edit Profile"
            onClick={handleRoute}
            data-testid="edit-profile-button"
          />
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
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
