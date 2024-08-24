// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import Heading from '@/components/Heading/Heading';

/**
 * The header for the admin pages.
 * @returns The rendered AdminHeader component.
 */
export const AdminHeader = (): React.JSX.Element => {
  return (
    <header
      className="admin-header pt-6 px-6 pb-8 space-y-2 h-1/2"
      data-testid="admin-header"
    >
      <Heading as="h2" data-testid="admin-header-heading">
        Page Title
      </Heading>
      <p
        className="text-zinc-400 max-w-prose"
        data-testid="admin-header-description"
      >
        Page Description
      </p>
    </header>
  );
};
