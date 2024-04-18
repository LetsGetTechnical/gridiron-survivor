import { Client, Account } from "appwrite";

const client = new Client();

const account = new Account(client);

client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('5df5acd0d48c2') // Your project ID
;

const logout = async () =>  {
    try {
        const logoutSession = await account.deleteSession('current');
        return logoutSession;
    } catch (error) {
        console.log(error)
    }
}

export default logout