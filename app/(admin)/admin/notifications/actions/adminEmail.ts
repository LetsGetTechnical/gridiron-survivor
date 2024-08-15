// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { ID } from 'appwrite';
import * as sdk from 'node-appwrite';

const URL = process.env.NEXT_PUBLIC_APPWRITE_API_URL as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const API_KEY = process.env.APPWRITE_API_KEY as string;

const client = new sdk.Client()
  .setEndpoint(URL)
  .setProject(PROJECT_ID)
  .setKey(API_KEY);

const messaging = new sdk.Messaging(client);

/**
 * Sends an email to the user who's userID is added in.
 */
export const sendEmailNotification = async (): Promise<void> => {
  try {
    await messaging.createEmail(
      ID.unique(), // messageId
      'Test', // subject
      'Testing', // content
      [], // topics (optional)
      [], // users (optional)
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error Sending Email');
  }
};
