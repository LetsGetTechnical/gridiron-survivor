import { Client, Account, ID} from "appwrite";

const url = "https://cloud.appwrite.io/v1";

const project = "6616ea581ef9f5521c7d";

const client = new Client().setEndpoint(url).setProject(project);

const account = new Account(client);


export { client, account, ID }

