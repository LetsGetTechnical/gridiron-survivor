import { Client, Account, Databases, ID } from 'appwrite';

export const appwriteConfig = {
  url: 'https://api.gridironsurvivor.com/v1',
  projectId: '6616ea581ef9f5521c7d',
  databaseId: '6616ea9dcb86b246a7b0',
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
