// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import Heading from '@/components/Heading/Heading';

/**
 * The header for the admin pages.
 * @param props - The props
 * @param props.pageTitle - The title of the page
 * @param props.pageDescription - The description of the page
 * @returns The rendered AdminHeader component.
 */
export const AdminHeader = (): React.JSX.Element => {
  return (
    <header className="admin-header pt-6 px-6 pb-8 space-y-2 h-1/2">
      <Heading as="h2">Page Title</Heading>
      <p className="text-zinc-400 max-w-prose">Page Description</p>
    </header>
  );
};
