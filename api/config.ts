// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Client, Account, Databases, ID, Functions } from 'appwrite';

const URL = process.env.NEXT_PUBLIC_APPWRITE_API_URL as string;
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID as string;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;

export const appwriteConfig = {
  url: URL,
  projectId: PROJECT_ID,
  databaseId: DATABASE_ID,
};

export const client = new Client();

client.setEndpoint(appwriteConfig.url);
client.setProject(appwriteConfig.projectId);

export const account = new Account(client);
export const databases = new Databases(client);
export const functions = new Functions(client);
export { ID };
