import { account } from './config';

interface User {
    email: string;
    password: string;
}

// Sign in user
export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
	}
// Sign out user
export async function signOutAccount() {
    try {
        const result = await account.deleteSession('current');

        return result;
    } catch (error) {
        console.log(error);
    }
}
