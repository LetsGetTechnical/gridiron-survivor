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
import LinkCustom from '../LinkCustom/LinkCustom';

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="w-56 focus:outline-none mx-auto"
        data-testid="admin-user-settings"
      >
        <div className="admin-user-settings w-full flex space-between gap-2 px-2 py-2 items-center border border-border rounded-lg text-foreground overflow-hidden">
          <span className="bg-cyan-500 w-8 h-8 rounded-full" />
          <p className="truncate ... w-36 ">{user.email}</p>
          <LucideChevronsUpDown className="text-muted-foreground" size={16} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border border-border rounded-lg p-0 w-56 ">
        <DropdownMenuItem className="cursor-pointer rounded-b-none flex focus:bg-muted">
          <LinkCustom
            className="text-base no-underline hover:text-foreground w-full py-2 px-0 text-muted-foreground hover:underline"
            href="/account/settings"
            data-testid="edit-profile-link"
          >
            Edit Profile
          </LinkCustom>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer rounded-none focus:bg-muted">
          <Button
            className="w-full text-base no-underline py-2 px-0 h-auto text-muted-foreground hover:text-foreground font-normal justify-normal hover:underline"
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
