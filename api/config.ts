import { Client, Account} from "appwrite";

export const appwriteConfig = {
     url: process.env.PROJECT_URL,
     projectId: process.env.PROJECT_ID,
   };
   
   export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
