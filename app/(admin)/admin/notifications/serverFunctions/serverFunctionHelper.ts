// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { ID } from 'appwrite';
import { messaging, users } from '@/api/serverConfig';

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
      ['672a3534000502297d88'],
      [],
      [],
      groupUsers,
    );
  } catch (error) {
    throw error;
  }
};

/**
 * Function to take the userIDs and grab their targetIDs for emailing.
 * @param props - userIDs
 * @param props.userIDs - All the passed in userIDs.
 * @returns {Promise<void>}
 */
export async function getUserTargets({
  userIDs,
}: {
  userIDs: string[];
}): Promise<string[]> {
  try {
    const userTargets = await Promise.all(
      userIDs.map(async (userID) => {
        const userTarget = await users.get(userID);
        return userTarget.targets.map((target) => target.$id);
      }),
    );
    return userTargets.flat();
  } catch (error) {
    throw error;
  }
}
