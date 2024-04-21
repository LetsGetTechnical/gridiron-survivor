import { Client, Databases, Account, ID, Query, Storage } from "appwrite";

const url = "https://cloud.appwrite.io/v1";

const project = "5df5acd0d48c2";

const client: Client = new Client().setEndpoint(url).setProject(project);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID }

