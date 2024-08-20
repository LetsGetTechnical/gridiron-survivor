// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useState } from 'react';
import { sendEmailNotifications } from './actions/sendEmailNotification';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminNotifications = (): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const participants = ['66bd072b001f6b1f6ac0'];
  const [subject, setSubject] = useState<string>('');

  return (
    <section data-testid="admin-notifications-content">
      <form
        action={async () => {
          await sendEmailNotifications({ content, participants, subject });
        }}
      >
        <label htmlFor="title">Subject:</label>
        <input
          type="text"
          placeholder="Enter title for email.."
          id="title"
          onChange={(e) => setSubject(e.target.value)}
        />
        <label htmlFor="message">Content:</label>
        <textarea
          name="message"
          id="message"
          placeholder="Hey John,..."
          onChange={(e) => setContent(e.target.value)}
        />
        <button type="submit">Send Email</button>
      </form>
    </section>
  );
};

export default AdminNotifications;
