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
 * @param props.groupEmailTest - All users of the league.
 */
export const sendEmailNotifications = async ({
  content,
  groupEmailTest,
  subject,
}: {
  content: string;
  groupEmailTest: string[];
  subject: string;
}): Promise<void> => {
  try {
    await messaging.createEmail(
      ID.unique(), // messageId
      subject, // subject
      content, // content
      [], // topics (optional)
      groupEmailTest, // users (optional)
    );
  } catch (error) {
    throw new Error('Error Sending Email');
  }
};
