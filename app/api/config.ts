import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
 // url: ,
  //projectId: ,
  //databaseId:,
  //storageId: ,
  //userCollectionId:, 
  //postCollectionId: ,
  //savesCollectionId: ,
};

export const client = new Client();

//client.setEndpoint(appwriteConfig.url);
//client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
