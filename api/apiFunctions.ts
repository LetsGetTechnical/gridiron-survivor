import { account } from "./config"

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