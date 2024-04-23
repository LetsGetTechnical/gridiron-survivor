import { account } from "./config"

export async function loginAccount(user: { email: string; password: string }) {
  try {
      const session = await account.createEmailPasswordSession(user.email, user.password);
      return session;
  } catch (error) {
      console.error(error);
  }
}
// Sign out user
export async function logoutAccount() {
  try {
      const result = await account.deleteSession('current');
      return result;
  } catch (error) {
      console.error(error);
  }
}