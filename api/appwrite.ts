import { Client, Databases, Account } from "appwrite";

const url = "https://cloud.appwrite.io/v1";

const project = "5df5acd0d48c2";

const client: Client = new Client();

client.setEndpoint(url).setProject(project);

export const account: Account = new Account(client);
export const database: Databases = new Databases(client);