import { account, databases, appwriteConfig } from "./config"

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

export async function getUserWeeklyPick(data: {userId: string, weekNumber: number}) {
    try {
        const response = await databases.listDocuments(appwriteConfig.databaseId, "66313025000612a5380e");
        return JSON.parse(response.documents[0].userResults)[data.userId];
    } catch (err) {
        console.error(err);
    }
}


export async function createWeeklyPicks(data:{gameId: string, gameWeekId: string, userResults: string}) {
    try {
        return await databases.updateDocument(appwriteConfig.databaseId, "66313025000612a5380e", "663130a100297f77c3c8", data);
    } catch (err) {
        console.error(err);
    }
}