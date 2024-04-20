import { account } from './config';

export async function signInAccount(user: { email: string; password: string }) {
    try {
        const session = await account.createSession(user.email, user.password);

        return session;
    } catch (error) {
        console.log(error);
    }
	}
