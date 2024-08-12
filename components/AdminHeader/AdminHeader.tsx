// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import Heading from '@/components/Heading/Heading';

/**
 * The admin header component.
 * @returns The rendered admin header.
 */
export const AdminHeader = (): React.JSX.Element => {
  return (
    <header className="admin-header pt-6 px-6 pb-8 space-y-2">
      <Heading as="h2">Admin Home</Heading>
      <p className="text-zinc-400 max-w-prose">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore cumque
        tempora laborum velit perferendis tenetur.
      </p>
    </header>
  );
};
