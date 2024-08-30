// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { Button } from '@/components/Button/Button';
import { getCurrentLeague } from '@/api/apiFunctions';
import { Input } from '@/components/Input/Input';
import { JSX, useState } from 'react';
import { LabelText } from '@/components/LabelText/LabelText';
import {
  RadioGroupDefault,
  RadioGroupDefaultItem,
} from '@/components/RadioGroupDefault/RadioGroupDefault';
import { sendEmailNotifications } from './actions/sendEmailNotification';
import { Textarea } from '@/components/Textarea/Textarea';
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
    const leagueId = '66c6618900033d179dda';
    const leagueData = await getCurrentLeague(leagueId);
    setGroupUsers(leagueData.participants);
    try {
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
    <section
      className="flex flex-col space-y-6"
      data-testid="admin-notifications-content"
    >
      <p>
        Choose the users you would like to email in INSERT_CURRENT_LEAGUE_HERE
      </p>
      <RadioGroupDefault
        defaultValue="all"
        onValueChange={getLeagueData}
        required
      >
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem value="all" id="all" />
          <LabelText htmlFor="all">All users</LabelText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem value="survivors" id="survivors" />
          <LabelText htmlFor="survivors">Only the survivors</LabelText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem value="losers" id="losers" />
          <LabelText htmlFor="losers">Only the losers</LabelText>
        </div>
      </RadioGroupDefault>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-6 max-w-[80ch]"
      >
        <div className="flex gap-2 flex-col">
          <LabelText htmlFor="subject" className="text-lg">
            Subject:
          </LabelText>
          <Input
            data-testid="subject-text"
            id="subject"
            name="subject"
            onChange={(e) => setSubject(e.target.value)}
            type="text"
          />
        </div>
        <div className="flex gap-2 flex-col">
          <LabelText htmlFor="content" className="text-lg">
            Message:
          </LabelText>
          <Textarea
            data-testid="content-text"
            id="content"
            name="content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button
          className="md:max-w-fit"
          data-testid="send-email"
          label="Send email"
          type="submit"
        />
      </form>
    </section>
  );
};

export default AdminNotifications;
