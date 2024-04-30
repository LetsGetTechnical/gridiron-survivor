import { account, databases } from "./config"
import { ID } from "appwrite";


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
        return await databases.listDocuments("6616ea9dcb86b246a7b0", "6622c8ee35b5aa500fa4");
    } catch (err) {
        console.error(err);
    }
}

export async function createWeeklyPicks(data:{gameId: string, gameWeekId: string, usersResults: string}) {
    try {
        return await databases.createDocument("6616ea9dcb86b246a7b0", "6622c8ee35b5aa500fa4", ID.unique(), data);
    } catch (err) {
        console.error(err);
    }
}