import React from 'react';
import LogoNav from '../logonav/LogoNav';
import { Menu, X } from 'lucide-react';
import { Button } from '../button/Button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../nav-drawer/NavDrawer';

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
              <ul className="flex flex-col gap-4">
                <li>
                  <Button label="Sign Out" />
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
