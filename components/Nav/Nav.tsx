// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX } from 'react';
import LogoNav from '../LogoNav/LogoNav';
import { Menu } from 'lucide-react';
import { Button } from '../Button/Button';
import Link from 'next/link';
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
        'flex h-16 items-center border-b border-zinc-100 from-[#4E160E] to-zinc-950 px-4 dark:border-zinc-800 dark:bg-gradient-to-b',
        pathname === '/login' || pathname === '/register' ? 'hidden' : '',
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
              <Menu className="text-zinc-600 dark:text-white" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle data-testid="title">Gridiron Survivor</DrawerTitle>
              </DrawerHeader>
              <ul className="m-0 flex flex-col gap-4 p-0">
                <li>
                  <Link
                    data-testid="link-nav"
                    href="/league/all"
                    className="pb-3 text-base font-normal text-zinc-600"
                  >
                    Leagues
                  </Link>
                </li>
                <li>
                  <Button
                    className="p-0 text-base font-normal text-zinc-600"
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
