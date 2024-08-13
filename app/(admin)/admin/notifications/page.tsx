// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import AdminRootLayout from '../../layout';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminHome = (): JSX.Element => {
  return (
    <AdminRootLayout
      pageTitle="Notifications"
      pageDescription="Notify your players of any updates"
    >
      <section>
        <p>{`This is where I'd put my notifation dashboard, IF I HAD ONE!`}</p>
      </section>
    </AdminRootLayout>
  );
};

export default AdminHome;
