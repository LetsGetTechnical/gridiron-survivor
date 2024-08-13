// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import Heading from '@/components/Heading/Heading';

export interface IAdminHeaderProps {
  pageTitle: string;
  pageDescription?: string;
}

/**
 * The header for the admin pages.
 * @param props - The props
 * @param props.pageTitle - The title of the page
 * @param props.pageDescription - The description of the page
 * @returns The rendered AdminHeader component.
 */
export const AdminHeader = ({
  pageTitle,
  pageDescription,
}: IAdminHeaderProps): React.JSX.Element => {
  return (
    <header className="admin-header pt-6 px-6 pb-8 space-y-2">
      <Heading as="h2" className="leading-9">
        {pageTitle}
      </Heading>
      <p className="text-zinc-400 max-w-prose leading-6">{pageDescription}</p>
    </header>
  );
};
