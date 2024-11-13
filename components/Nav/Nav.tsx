// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX } from 'react';
import LogoNav from '../LogoNav/LogoNav';
import { Menu } from 'lucide-react';
import { Button } from '../Button/Button';
import NavLink from '../NavLink/NavLink';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../NavDrawer/NavDrawer';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/utils';
import { useAuthContext } from '@/context/AuthContextProvider';

/**
 * Renders the navigation.
 * @returns {JSX.Element} The rendered navigation.
 */
export const Nav = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { logoutAccount } = useAuthContext();
  const [open, setOpen] = React.useState(false);
  /**
   * Handles closing the drawer.
   * @returns {void} No return value.
   */
  const handleClose = (): void => setOpen(false);

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

  return (
    <nav
      className={cn(
        'flex h-16 items-center border-b border-border from-[#4E160E] to-zinc-950 px-4 bg-gradient-to-b',
        pathname === '/login' ||
          pathname === '/register' ||
          pathname === '/recover-password' ||
          pathname === '/account/recovery'
          ? 'hidden'
          : '',
      )}
      data-testid="nav"
    >
      <div className="mr-auto">
        <LogoNav />
      </div>
      <ul>
        <li>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger data-testid="drawer-trigger">
              <Menu className="text-foreground" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle data-testid="title">Gridiron Survivor</DrawerTitle>
              </DrawerHeader>
              <ul className="m-0 flex flex-col gap-1 p-0">
                <NavLink
                  href="/account/settings"
                  testId="settings-link"
                  onClose={handleClose}
                >
                  Settings
                </NavLink>
                <NavLink
                  href="/league/all"
                  testId="league-link"
                  onClose={handleClose}
                >
                  Leagues
                </NavLink>
                <NavLink
                  href="/account/profile"
                  testId="profile-link"
                  onClose={handleClose}
                >
                  Profile
                </NavLink>
                <li>
                  <Button
                    className="p-0 text-base font-normal hover:text-primary-muted transition-colors text-white"
                    variant="link"
                    label="Sign Out"
                    onClick={() => {
                      setOpen(false);
                      handleLogout();
                    }}
                    data-testid="sign-out-button"
                  />
                </li>
              </ul>
            </DrawerContent>
          </Drawer>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
