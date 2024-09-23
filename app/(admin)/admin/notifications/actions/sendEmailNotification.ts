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
 * @param props.sendEmailUsers - User id's being passed in from the notification page.
 */
export const sendEmailNotifications = async ({
  content,
  sendEmailUsers,
  subject,
}: {
  content: string;
  sendEmailUsers: string[];
  subject: string;
}): Promise<void> => {
  try {
    await messaging.createEmail(
      ID.unique(),
      subject,
      content,
      [],
      sendEmailUsers,
    );
  } catch (error) {
    console.error('Error Sending Email:', error);
    throw new Error('Error Sending Email');
  }
};
