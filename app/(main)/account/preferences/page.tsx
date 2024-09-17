// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';

/**
 * Renders the user preferences page..
 * @returns {JSX.Element} The rendered user preferences page..
 */
const AccountPreferences = (): JSX.Element => {
  return (
    <section className="grid grid-cols-2 gap-6">
      <div className="account-preferences-content">
        <p>Account Preferences</p>
      </div>
    </section>
  );
};

export default AccountPreferences;
