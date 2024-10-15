// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';
import TableData from '@/components/TableData/TableData';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  return (
    <section className="grid grid-cols-2 gap-6">
      <TableData />
    </section>
  );
};

export default AdminLeagues;
