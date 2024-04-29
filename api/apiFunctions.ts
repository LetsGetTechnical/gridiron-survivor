import { account } from './config';
import { Client, Databases } from 'appwrite';

export async function loginAccount(user: { email: string; password: string }) {
  try {
    return await account.createEmailPasswordSession(user.email, user.password);
  } catch (error) {
    console.error(error);
  }
}

export async function logoutAccount() {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error(error);
  }
}

export async function getWeeklyPicks() {
  try {
    const client = new Client();

    const databases = new Databases(client);

    client
      .setEndpoint('https://cloud.appwrite.io/v1')
      .setProject('6616ea581ef9f5521c7d');

    return await databases.listDocuments(
      '6616ea9dcb86b246a7b0',
      '6622aa4d2db201231e31',
    );
  } catch (err) {
    console.error(err);
  }
}
