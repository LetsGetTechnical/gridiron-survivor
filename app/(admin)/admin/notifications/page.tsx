// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';
import { sendEmailNotification } from './actions/adminEmail';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminHome = (): JSX.Element => {
  return (
    <section>
      <form
        action={async () => {
          await sendEmailNotification();
        }}
      >
        <button type="submit">Send</button>
      </form>
    </section>
  );
};

export default AdminHome;
