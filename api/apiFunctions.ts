import { ID } from 'appwrite';
import { account, databases } from './config';

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
    return await databases.listDocuments(
      '6616ea9dcb86b246a7b0',
      '6622aa4d2db201231e31',
    );
  } catch (err) {
    console.error(err);
  }
}

export async function registerAccount(request: {
  email: string;
  password: string;
}) {
  const { email, password } = request;

  try {
    return await account.create(ID.unique(), email, password);
  } catch (error: any) {
    console.error(error);
  }
}
