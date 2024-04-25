import { Client, Account} from "appwrite";

export const appwriteConfig = {
     url: "https://cloud.appwrite.io/v1",
     projectId: "6616ea581ef9f5521c7d",
   };
   
   export const client = new Client();

client.setEndpoint(String(appwriteConfig.url));
client.setProject(String(appwriteConfig.projectId));

export const account = new Account(client);
