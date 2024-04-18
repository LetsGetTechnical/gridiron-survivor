import {account} from "./appwrite"

const logout = async () =>  {
    try {
        const logoutSession = await account.deleteSession('current');
        return logoutSession;
    } catch (error) {
        console.error(error)
    }
}

export default logout

