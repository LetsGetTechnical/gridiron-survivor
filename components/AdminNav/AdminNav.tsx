// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { AdminUserSettings } from '../AdminUserSettings/AdminUserSettings';
import Link from 'next/link';
import {
  LucideBell,
  LucideHome,
  LucideLayoutGrid,
  LucideUsers,
} from 'lucide-react';
import React from 'react';

/**
 * The admin nav component.
 * @returns The rendered admin nav.
 */
export const AdminNav = (): React.JSX.Element => {
  return (
    <nav
      className="admin-nav flex flex-col justify-between h-full pt-2 pb-3 px-3 text-sm text-zinc-400"
      data-testid="admin-nav"
    >
      <ul className="flex flex-col gap-y-2">
        <li>
          <Link
            href="/admin"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideHome className="w-4 h-4" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/admin/leagues"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideLayoutGrid className="w-4 h-4" />
            Leagues
          </Link>
        </li>
        <li>
          <Link
            href="/admin/players"
            className="p-3 hover:bg-zinc-800 focus:bg-zinc-800 rounded-md flex gap-2 items-center hover:text-zinc-50 transition duration-300"
          >
            <LucideUsers className="w-4 h-4" />
            Players
          </Link>
        </li>
        <li>
          <Link
            href="/admin/notifications"
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
