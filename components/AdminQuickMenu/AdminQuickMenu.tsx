// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { LucideCog, LucideChevronsUpDown } from 'lucide-react';
import React from 'react';

/**
 * The admin logo component.
 * @returns The rendered admin logo.
 */
export const AdminQuickMenu = (): React.JSX.Element => {
  return (
    <div className="admin-quick-menu flex gap-2 px-2 py-2 items-center outline outline-border rounded w-80">
      <LucideCog className="w-8 h-8 p-1 bg-zinc-700" />
      <p>Admin</p>
      <LucideChevronsUpDown className="ml-auto text-zinc-300" size={16} />
    </div>
  );
};
