// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { ID } from 'appwrite';
import { messaging } from '@/api/serverConfig';

/**
 * Function to send email.
 * @param props - subject, content.
 * @param props.content - The actual email you are wanting to send.
 * @param props.sendEmailUsers - User id's being passed in from the notification page.
 * @param props.subject - The subject of the email.
 * @param props.testBCC - The target IDs of users needed to BCC emails.
 */
export const sendEmailNotifications = async ({
  content,
  sendEmailUsers,
  subject,
  testBCC,
}: {
  content: string;
  sendEmailUsers: string[];
  subject: string;
  testBCC: string[];
}): Promise<void> => {
  try {
    await messaging.createEmail(
      ID.unique(),
      subject,
      content,
      [],
      sendEmailUsers,
      [],
      [],
      testBCC,
    );
  } catch (error) {
    throw new Error('Error Sending Email');
  }
};
