// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { ID } from 'appwrite';
import { messaging } from '@/api/serverConfig';

/**
 * Function to send email.
 * @param props - subject, content.
 * @param props.content - The actual email you are wanting to send.
 * @param props.groupUsers - User id's being passed in from the notification page.
 * @param props.subject - The subject of the email.
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
    await messaging.createEmail(
      ID.unique(),
      subject,
      content,
      [],
      groupUsers,
      [],
      [],
      [],
    );
  } catch (error) {
    throw new Error('Error Sending Email');
  }
};
