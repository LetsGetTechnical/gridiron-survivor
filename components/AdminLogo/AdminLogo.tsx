// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import LogoNav from '@/components/LogoNav/LogoNav';

/**
 * The admin logo component.
 * @returns The rendered admin logo.
 */
export const AdminLogo = (): React.JSX.Element => {
  return (
    <div className="flex items-center border-b-2 border-border">
      <div className="admin-logo flex gap-2 px-3 py-2 items-center">
        <LogoNav />
      </div>
    </div>
  );
};
