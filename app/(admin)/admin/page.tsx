// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { JSX, useEffect } from 'react';
import { isUserAdmin } from '@/utils/utils';
import { useRouter } from 'next/navigation';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered login page.
 */
const AdminHome = (): JSX.Element => {
  const router = useRouter();

  useEffect(() => {
    isAdmin();
  }, []);

  /**
   * Check if the user is an admin
   * @returns {Promise<void>}
   */
  const isAdmin = async (): Promise<void> => {
    const isAdmin = await isUserAdmin();
    if (!isAdmin) {
      router.push('/league/all');
    }
  };

  return <div>Admin Home</div>;
};

export default AdminHome;
