// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import * as sdk from 'node-appwrite';
import { ID } from 'appwrite';

const API_KEY = process.env.APPWRITE_API_KEY as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const URL = process.env.NEXT_PUBLIC_APPWRITE_API_URL as string;

const client = new sdk.Client()
  .setKey(API_KEY)
  .setProject(PROJECT_ID)
  .setEndpoint(URL);

const messaging = new sdk.Messaging(client);

/**
 * Function to send email.
 * @param props - subject, content.
 * @param props.content - The email itself.
 * @param props.participants - All the users of the league.
 * @param props.subject - The header of the email.
 */
export const sendEmailNotifications = async ({
  content,
  participants,
  subject,
}: {
  subject: string;
  content: string;
  participants: string[];
}): Promise<void> => {
  try {
    await messaging.createEmail(
      ID.unique(), // messageId
      subject, // subject
      content, // content
      [], // topics (optional)
      participants, // users (optional)
    );
  } catch (error) {
    throw new Error('Error Sending Email');
  }
};
