import { Client, Account, } from "appwrite";

const url = "https://cloud.appwrite.io/v1";

const project = "66246c40e329b9509f71";

const client = new Client().setEndpoint(url).setProject(project);

const account = new Account(client);


export { client, account}