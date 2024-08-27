// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useEffect, useState } from 'react';
import LogoNav from '../LogoNav/LogoNav';
import { Menu } from 'lucide-react';
import { Button } from '../Button/Button';
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
import { useDataStore } from '@/store/dataStore';
import { ENTRY_URL, LEAGUE_URL } from '@/const/global';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { ILeague } from '@/api/apiFunctions.interface';

/**
 * Renders the navigation.
 * @returns {JSX.Element} The rendered navigation.
 */
export const Nav = (): JSX.Element => {
  const router = useRouter();
  const pathname = usePathname();
  const { logoutAccount } = useAuthContext();
  const [open, setOpen] = React.useState(false);

  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const { user } = useDataStore((state) => state);

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }
    setLeagues(user.leagues);
  }, [user]);

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
                  <div className="Leagues mx-auto max-w-3xl pt-10">
                    <h1 className="pb-10 text-center text-l font-bold tracking-tight">
                      Your leagues
                    </h1>
                    <section>
                      {leagues.length > 0 ? (
                        leagues.map((league) => (
                          <LeagueCard
                            key={league.leagueId}
                            href={`/${LEAGUE_URL}/${league.leagueId}/${ENTRY_URL}/all`}
                            leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
                            survivors={league.survivors.length}
                            title={league.leagueName}
                            totalPlayers={league.participants.length}
                          />
                        ))
                      ) : (
                        <div className="text-center">
                          <p className="text-lg font-bold">
                            You are not enrolled in any leagues
                          </p>
                        </div>
                      )}
                    </section>
                  </div>
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
