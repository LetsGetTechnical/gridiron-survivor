import React from 'react';
import LogoNav from '../LogoNav/LogoNav';
import { Menu } from 'lucide-react';
import { Button } from '../button/Button';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../NavDrawer/NavDrawer';

export const Nav = () => {
  return (
    <nav className="flex h-16 items-center border-b border-zinc-100 from-[#4E160E] to-zinc-950 px-4 dark:border-zinc-800 dark:bg-gradient-to-b">
      <div className="mr-auto">
        <LogoNav />
      </div>
      <ul>
        <li>
          <Drawer>
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Gridiron Survivor</DrawerTitle>
              </DrawerHeader>
              <ul className="m-0 flex flex-col gap-4 p-0">
                <li>
                  <Button
                    className="p-0 text-base font-normal text-zinc-600"
                    variant="link"
                    label="Sign Out"
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
