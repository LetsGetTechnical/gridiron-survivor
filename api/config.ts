import { Client, Account} from "appwrite";

const projectID = process.env.PROJECT_ID.toString();

export const appwriteConfig = {
     url: "https://cloud.appwrite.io/v1",
     projectId: projectID,
   };
   
   export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
