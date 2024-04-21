import { Client, Databases, Account, ID, Query, Storage } from "appwrite";

const url = "https://cloud.appwrite.io/v1";

const project = "66246c40e329b9509f71";

const client: Client = new Client().setEndpoint(url).setProject(project);

const account = new Account(client);
const database = new Databases(client);
const storage = new Storage(client);

export { client, account, database, storage, Query, ID }