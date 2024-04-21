import { Client, Account, ID} from "appwrite";

const url = "https://cloud.appwrite.io/v1";

const project = "5df5acd0d48c2";

const client = new Client().setEndpoint(url).setProject(project);

const account = new Account(client);


export { client, account, ID }

