// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import {
  LucideBell,
  LucideHome,
  LucideLayoutGrid,
  LucideUsers,
} from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { AdminUserSettings } from '../AdminUserSettings/AdminUserSettings';

/**
 * The admin nav component.
 * @returns The rendered admin nav.
 */
export const AdminNav = (): React.JSX.Element => {
  return (
    <nav className="flex flex-col justify-between h-full pt-2 pb-3 px-3 text-sm text-zinc-400">
      <ul className="admin-nav-main flex flex-col gap-y-2">
        <li>
          <Link
            href="#"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideHome className="w-4 h-4" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideLayoutGrid className="w-4 h-4" />
            Leauges
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideUsers className="w-4 h-4" />
            Players
          </Link>
        </li>
        <li>
          <Link
            href="#"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideBell className="w-4 h-4" />
            Notifications
          </Link>
        </li>
      </ul>
      <AdminUserSettings />
    </nav>
  );
};
