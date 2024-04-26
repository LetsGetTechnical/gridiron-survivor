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
} from '../nav-drawer/drawer';

export const Nav = () => {
  return (
    <nav className="flex h-16 items-center border-b border-zinc-100 from-[#4E160E] to-zinc-950 px-4 dark:border-zinc-800 dark:bg-gradient-to-b">
      <div className="mr-auto">
        <LogoNav />
      </div>
      <ul>
        <li>
          <Drawer direction="right">
            <DrawerTrigger>
              <Menu />
            </DrawerTrigger>
            <DrawerContent className="left-auto right-0 top-0 mt-0 h-screen w-4/5 gap-4 rounded-none border-l border-zinc-100 px-4 dark:border-zinc-800">
              <DrawerHeader className="h-16 items-center px-0">
                <div className="flex">
                  <div className="mr-auto">
                    <p className="font-bold">Gridiron Survivor</p>
                  </div>
                  <DrawerTrigger>
                    <X />
                  </DrawerTrigger>
                </div>
              </DrawerHeader>
              <Button label="Sign Out" />
            </DrawerContent>
          </Drawer>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
