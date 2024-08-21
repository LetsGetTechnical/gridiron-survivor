// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useState } from 'react';
import { sendEmailNotifications } from './actions/sendEmailNotification';
import React from 'react';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminNotifications = (): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const participants = ['66bd072b001f6b1f6ac0'];
  const [subject, setSubject] = useState<string>('');

  /**
   * To handle the form submission.
   * @param event - Takes the inputted information and sends it via Email.
   */
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await sendEmailNotifications({ content, participants, subject });
  };

  return (
    <section data-testid="admin-notifications-content">
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          onChange={(e) => setSubject(e.target.value)}
          data-testid="subject-text"
        />
        <label htmlFor="content">Content:</label>
        <textarea
          name="content"
          id="content"
          onChange={(e) => setContent(e.target.value)}
          data-testid="content-text"
        />
        <button type="submit" data-testid="send-email">
          Send Email
        </button>
      </form>
    </section>
  );
};

export default AdminNotifications;
