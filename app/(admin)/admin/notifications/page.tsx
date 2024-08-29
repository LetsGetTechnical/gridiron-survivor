// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { Button } from '@/components/Button/Button';
import { getCurrentLeague } from '@/api/apiFunctions';
import { Input } from '@/components/Input/Input';
import { JSX, useState } from 'react';
import { Label } from '@/components/Label/Label';
import { sendEmailNotifications } from './actions/sendEmailNotification';
import React from 'react';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminNotifications = (): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
  const [subject, setSubject] = useState<string>('');

  /**
   * To grab all users from the league.
   */
  const getLeagueData = async (): Promise<void> => {
    try {
      const leagueId = '66c6618900033d179dda';
      const leagueData = await getCurrentLeague(leagueId);
      setGroupUsers(leagueData.participants);
    } catch (error) {
      console.error('Error Sending Email:', error);
      throw new Error('Error Sending Email');
    }
  };

  /**
   * Handle form submission
   * @param event - Prevents the default reloading.
   */
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    await sendEmailNotifications({ content, groupUsers, subject });
  };

  return (
    <section data-testid="admin-notifications-content">
      <Button
        label="Email Testers"
        type="button"
        onClick={getLeagueData}
        data-testid="email-testers"
      />
      <form onSubmit={handleSubmit}>
        <Label htmlFor="subject">Subject:</Label>
        <Input
          type="text"
          id="subject"
          data-testid="subject-text"
          onChange={(e) => setSubject(e.target.value)}
        />
        <Label htmlFor="content">Content:</Label>
        <textarea
          name="content"
          id="content"
          onChange={(e) => setContent(e.target.value)}
          data-testid="content-text"
        />
        <Button label="Send Email" type="submit" data-testid="send-email" />
      </form>
    </section>
  );
};

export default AdminNotifications;
