import { account, databases, ID, appwriteConfig } from './config';

export async function loginAccount(user: { email: string; password: string }) {
  try {
    // Authenticate user with email and password and get JWT token
    const session = await account.createEmailPasswordSession(user.email, user.password);
    if (session && session.token) {
      return session.token;
    } else {
      throw new Error('JWT token not found in session');
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function logoutAccount() {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error(error);
  }
}

export async function getUserWeeklyPick(data: {
  userId: string;
  weekNumber: string;
  token: string; // JWT token
}) {
  try {
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${data.token}`);
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      '66313025000612a5380e',
    );
    return response.documents[0].userResults;
  } catch (error) {
    console.error(error);
  }
}

export async function getAllWeeklyPicks() {
  try {
    const headers = new Headers();
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      '66313025000612a5380e',
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function getNFLTeams() {
  try {
    const headers = new Headers();
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      '662152bfabacfbda3bb3',
    );
    return response;
  } catch (error) {
    console.error(error);
  }
}

export async function registerAccount(request: {
  email: string;
  password: string;
}) {
  const { email, password } = request;

  try {
    return await account.create(ID.unique(), email, password);
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createWeeklyPicks(data: {
  gameId: string;
  gameWeekId: string;
  userResults: string;
  token: string; // JWT token
}) {
  try {
    const headers = new Headers();
    headers.set('Authorization', `Bearer ${data.token}`);
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      '66313025000612a5380e',
      '663130a100297f77c3c8',
      data,
    );
  } catch (error) {
    console.error(error);
  }
}
