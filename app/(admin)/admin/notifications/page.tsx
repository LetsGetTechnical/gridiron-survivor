// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminNotifications = (): JSX.Element => {
  return (
    <section data-testid="admin-notifications-content">
      <p>{`This is where I'd put my notifation dashboard, IF I HAD ONE!`}</p>
    </section>
  );
};

export default AdminNotifications;
