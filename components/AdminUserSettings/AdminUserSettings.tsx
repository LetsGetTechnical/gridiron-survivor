// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { LucideChevronsUpDown } from 'lucide-react';
import React from 'react';

/**
 * The admin user settings component.
 * @returns The rendered admin user settings.
 */
export const AdminUserSettings = (): React.JSX.Element => {
  return (
    <div
      className="admin-user-settings flex gap-2 px-2 py-2 items-center outline outline-border rounded text-foreground"
      data-testid="admin-user-settings"
    >
      <span className="bg-cyan-500 w-8 h-8 rounded-full" />
      <p>Users Name</p>
      <LucideChevronsUpDown
        className="ml-auto text-muted-foreground"
        size={16}
      />
    </div>
  );
};
