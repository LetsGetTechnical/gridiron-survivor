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
      [],
      [],
      ['66bd072b4824aa77bd9b', '66da0993c6adb1bd868a'],
    );
  } catch (error) {
    throw new Error('Error Sending Email');
  }
};
