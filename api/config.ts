import { Client, Account, Databases, ID } from 'appwrite';

export const appwriteConfig = {
  url: 'https://cloud.appwrite.io/v1',
  projectId: '6616ea581ef9f5521c7d',
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export { ID };
