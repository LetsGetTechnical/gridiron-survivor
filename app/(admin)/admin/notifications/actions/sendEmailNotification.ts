// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { ID } from 'appwrite';
import { messaging } from '@/api/serverConfig';

/**
 * Function to send email.
 * @param props - subject, content.
 * @param props.content - The email itself.
 * @param props.subject - The header of the email.
 * @param props.groupUsers - All userId's of the league.
 */
export const sendEmailNotifications = async ({
  content,
  groupUsers,
  subject,
}: {
  content: string;
  groupUsers: string[];
  subject: string;
}): Promise<void> => {
  try {
    await messaging.createEmail(ID.unique(), subject, content, [], groupUsers);
  } catch (error) {
    console.error('Error Sending Email:', error);
    throw new Error('Error Sending Email');
  }
};
