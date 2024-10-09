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
import React, { useEffect } from 'react';

/**
 * The admin home page.
 * @returns The rendered AdminHome page.
 */
const AdminNotifications = (): JSX.Element => {
  const [content, setContent] = useState<string>('');
  const [groupUsers, setGroupUsers] = useState<string[]>([]);
  const [leagueName, setLeagueName] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [emailRecipients, setEmailRecipients] = useState<string>('');

  /**
   * To grab all users from the league.
   * @returns The league data.
   */
  const getLeagueData = async (): Promise<void> => {
    try {
      const leagueId = '66e1cc9000160b10bf2c'; // TEST LEAGUE (DO NOT JOIN)
      const leagueData = await getCurrentLeague(leagueId);
      setGroupUsers(leagueData.participants);
      setLeagueName(leagueData.leagueName);
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
    await sendEmailNotifications({
      content,
      groupUsers,
      subject,
    });
  };

  /**
   * Function to handle radio selection logic.
   * @param value - Value of the radio buttons.
   */
  const handleRadioChange = (value: string): void => {
    setEmailRecipients(value);
  };

  useEffect(() => {
    /**
     * Fetches the league data.
     * @returns The league data.
     */
    const fetchData = async (): Promise<void> => {
      await getLeagueData();
    };
    fetchData();
  }, []);

  return (
    <section
      className="flex flex-col space-y-6"
      data-testid="admin-notifications-content"
    >
      <p>
        Choose the users you would like to email in{' '}
        <span className="font-bold text-orange-500">{leagueName}</span>.
      </p>
      <RadioGroupDefault
        defaultValue="all users"
        onValueChange={handleRadioChange}
        required
      >
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem
            value="all users"
            id="all"
            data-testid="all-users-option"
          />
          <LabelText htmlFor="all">All users</LabelText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem
            value="all survivors"
            id="survivors"
            data-testid="only-survivors-option"
          />
          <LabelText htmlFor="survivors">Only the survivors</LabelText>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupDefaultItem
            value="all losers"
            id="losers"
            data-testid="only-losers-option"
          />
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
        <p>
          This email will be sent to{' '}
          <span className="font-bold text-orange-500">
            {emailRecipients.toLowerCase()}
          </span>{' '}
          in <span className="font-bold text-orange-500">{leagueName}</span>
        </p>
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
